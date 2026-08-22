/* JEWEL MOVE — Core Game Engine */

document.addEventListener('DOMContentLoaded', () => {

    // ── State ────────────────────────────────────────────────────
    let currentLevelIndex = 0;
    let gameState = [];
    let moveCount = 0;
    let timerSeconds = 0;
    let timerInterval = null;
    let isTimerRunning = false;
    let undoStack = [];
    let isLevelSolved = false;
    let completedLevels = new Set();
    let globalResetsLeft = 2;
    let globalSkipsLeft = 2;
    let roundUndosLeft = 3;
    let roundResetsUsed = 0;
    let totalMovesMade = 0;
    let highestUnlocked = 1;
    let starsCache = {};

    // Drag
    let activePiece = null;
    let startMousePos = { x: 0, y: 0 };
    let startPieceGrid = { x: 0, y: 0 };
    let cellPx = 0;
    let axis = 'both';

    // ── DOM ──────────────────────────────────────────────────────
    const boardElem        = document.getElementById('game-board');
    const gridOverlayElem  = document.getElementById('grid-overlay');
    const piecesLayerElem  = document.getElementById('pieces-layer');
    const btnMap           = document.getElementById('btn-map');
    const btnSkip          = document.getElementById('btn-skip');
    const btnUndo          = document.getElementById('btn-undo');
    const btnReset         = document.getElementById('btn-reset');
    const mapModal         = document.getElementById('map-modal');
    const btnCloseMap      = document.getElementById('btn-close-map');
    const modalLevel       = document.getElementById('modal-level-display');
    const modalMoves       = document.getElementById('modal-moves-display');
    const modalTime        = document.getElementById('modal-time-display');
    const levelSelectGrid  = document.getElementById('level-select-grid');
    const winModal         = document.getElementById('win-modal');
    const winStats         = document.getElementById('win-stats-text');
    const btnNext          = document.getElementById('btn-next-level');

    // ── Boot ─────────────────────────────────────────────────────
    buildGrid();
    loadLevel(0);
    setupListeners();
    window.addEventListener('resize', () => { updateCellPx(); renderPieces(); });

    
    function updateButtonsUI() {
        const lblSkip = document.getElementById('lbl-skip');
        const lblUndo = document.getElementById('lbl-undo');
        const lblReset = document.getElementById('lbl-reset');
        
        if (lblSkip) lblSkip.textContent = 'Skip (' + globalSkipsLeft + ')';
        if (lblUndo) lblUndo.textContent = 'Undo (' + roundUndosLeft + ')';
        if (lblReset) lblReset.textContent = 'Reset (' + globalResetsLeft + ')';
        
        btnUndo.disabled = undoStack.length === 0 || roundUndosLeft <= 0;
        btnSkip.disabled = globalSkipsLeft <= 0 && currentLevelIndex !== 0;
        btnReset.disabled = globalResetsLeft <= 0;
    }

    // ── Grid ─────────────────────────────────────────────────────
    function buildGrid() {
        gridOverlayElem.innerHTML = '';
        for (let i = 0; i < 36; i++) {
            const t = document.createElement('div');
            t.className = 'tile';
            gridOverlayElem.appendChild(t);
        }
        updateCellPx();
    }

    function updateCellPx() {
        cellPx = boardElem.getBoundingClientRect().width / 6;
    }

    // ── Load Level ───────────────────────────────────────────────
    function loadLevel(idx) {
        if (idx < 0) idx = 0;
        if (idx >= levels.length) {
            if (completedLevels.size >= 15) { showOverallWinModal(); return; }
            idx = 0;
        }
        if (idx > highestUnlocked && idx !== 0) return;
        currentLevelIndex = idx;

        moveCount = 0;
        isLevelSolved = false;
        undoStack = [];
        roundUndosLeft = 3;
        roundResetsUsed = 0;
        resetTimer();
        updateButtonsUI();

        winModal.classList.remove('active');
        mapModal.classList.remove('active');

        const lvl = levels[currentLevelIndex];
        gameState = [
            JSON.parse(JSON.stringify(lvl.player)),
            ...JSON.parse(JSON.stringify(lvl.pieces))
        ];
        gameState[0].isPlayer = true;

        // Position exit sign at correct row
        const exit = lvl.exit;
        const exitElem = document.getElementById('exit-marker');
        if (exitElem) {
            exitElem.style.top = `${(exit.y / 6) * 100}%`;
            exitElem.style.height = `${(1 / 6) * 100}%`;
        }

        renderPieces();
        syncModalStats();
        buildLevelGrid();

        // Demo hint
        const hint = document.getElementById('demo-hint');
        if (hint) hint.style.display = lvl.isDemo ? 'flex' : 'none';
    }

    // ── Render Pieces ────────────────────────────────────────────
    function renderPieces(celebrating) {
        updateCellPx();
        piecesLayerElem.innerHTML = '';
        gameState.forEach(piece => {
            const el = document.createElement('div');
            el.className = 'piece' + (piece.isPlayer ? ' player-piece' : '');
            el.dataset.id = piece.id;
            el.style.width  = `${piece.width * cellPx}px`;
            el.style.height = `${piece.height * cellPx}px`;
            el.style.transform = `translate3d(${piece.x*cellPx}px,${piece.y*cellPx}px,0)`;
            const inner = document.createElement('div');
            inner.className = 'piece-inner';
            inner.innerHTML = generate3DPieceSVG(piece, celebrating && piece.isPlayer);
            el.appendChild(inner);
            piecesLayerElem.appendChild(el);
            if (!isLevelSolved) attachDrag(el, piece);
        });
    }

    function movePieceDOM(piece) {
        if (!cellPx) updateCellPx();
        const el = piecesLayerElem.querySelector(`[data-id="${piece.id}"]`);
        if (el) el.style.transform = `translate3d(${piece.x*cellPx}px,${piece.y*cellPx}px,0)`;
    }

    // ── Drag ─────────────────────────────────────────────────────
    function attachDrag(el, piece) {
        el.addEventListener('mousedown', e => startDrag(e, piece, el));
        el.addEventListener('touchstart', e => startDrag(e, piece, el), { passive: false });
    }

    function startDrag(e, piece, el) {
        if (isLevelSolved) return;
        e.preventDefault();
        activePiece = piece;
        startPieceGrid = { x: piece.x, y: piece.y };
        const c = e.touches ? e.touches[0] : e;
        startMousePos = { x: c.clientX, y: c.clientY };
        axis = piece.direction === 'horizontal' ? 'x' : piece.direction === 'vertical' ? 'y' : 'both';
        el.classList.add('dragging');
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);
        window.addEventListener('touchcancel', onEnd);
    }

    function onMove(e) {
        if (!activePiece) return;
        e.preventDefault();
        const c = e.touches ? e.touches[0] : e;
        const dx = c.clientX - startMousePos.x;
        const dy = c.clientY - startMousePos.y;
        const el = piecesLayerElem.querySelector(`[data-id="${activePiece.id}"]`);
        if (!el) return;
        let px = startPieceGrid.x * cellPx;
        let py = startPieceGrid.y * cellPx;
        if (axis === 'x') px += dx;
        else if (axis === 'y') py += dy;
        else if (Math.abs(dx) > Math.abs(dy)) px += dx;
        else py += dy;
        el.style.transform = `translate3d(${px}px,${py}px,0)`;
    }

    function onEnd(e) {
        if (!activePiece) return;
        const el = piecesLayerElem.querySelector(`[data-id="${activePiece.id}"]`);
        if (el) el.classList.remove('dragging');
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchend', onEnd);
        window.removeEventListener('touchcancel', onEnd);

        const c = e.changedTouches ? e.changedTouches[0] : e;
        const dx = (c.clientX || startMousePos.x) - startMousePos.x;
        const dy = (c.clientY || startMousePos.y) - startMousePos.y;
        let gdx = Math.round(dx / cellPx);
        let gdy = Math.round(dy / cellPx);
        if (axis === 'x') gdy = 0;
        if (axis === 'y') gdx = 0;
        if (axis === 'both') { if (Math.abs(dx) > Math.abs(dy)) gdy = 0; else gdx = 0; }

        const tx = startPieceGrid.x + gdx;
        const ty = startPieceGrid.y + gdy;
        const final = stepToward(activePiece, startPieceGrid.x, startPieceGrid.y, tx, ty);

        if (final.x !== startPieceGrid.x || final.y !== startPieceGrid.y) {
            saveUndo();
            activePiece.x = final.x;
            activePiece.y = final.y;
            moveCount++;
            syncModalStats();
            updateButtonsUI();
            startTimer();
            if (activePiece.isPlayer && checkWin()) triggerWin();
        }

        movePieceDOM(activePiece);
        activePiece = null;
    }

    // ── Collision Engine ─────────────────────────────────────────
    function inBounds(x, y, w, h) {
        return x >= 0 && y >= 0 && x + w <= 6 && y + h <= 6;
    }

    function cellFree(x, y, skipId) {
        return !gameState.some(p => p.id !== skipId &&
            x >= p.x && x < p.x + p.width && y >= p.y && y < p.y + p.height);
    }

    function posFree(piece, tx, ty) {
        if (!inBounds(tx, ty, piece.width, piece.height)) return false;
        for (let dx = 0; dx < piece.width; dx++)
            for (let dy = 0; dy < piece.height; dy++)
                if (!cellFree(tx + dx, ty + dy, piece.id)) return false;
        return true;
    }

    function stepToward(piece, sx, sy, tx, ty) {
        let cx = sx, cy = sy;
        const stepX = tx > sx ? 1 : tx < sx ? -1 : 0;
        const stepY = ty > sy ? 1 : ty < sy ? -1 : 0;
        while (cx !== tx || cy !== ty) {
            const nx = cx + stepX, ny = cy + stepY;
            if (posFree(piece, nx, ny)) { cx = nx; cy = ny; }
            else break;
        }
        return { x: cx, y: cy };
    }

    function checkWin() {
        const p = gameState[0];
        const exitY = levels[currentLevelIndex].exit.y;
        return p.y === exitY && p.x >= 4;
    }

    function triggerWin() {
        isLevelSolved = true;
        stopTimer();
        completedLevels.add(currentLevelIndex);
        highestUnlocked = Math.max(highestUnlocked, currentLevelIndex + 1);
        let stars = 3;
        if (moveCount > 25) stars--;
        if (moveCount > 40) stars--;
        stars -= roundResetsUsed;
        if (roundUndosLeft < 3) stars--;
        if (stars < 1) stars = 1;
        starsCache[currentLevelIndex] = Math.max(starsCache[currentLevelIndex] || 0, stars);
        totalMovesMade += moveCount;

        const player = gameState[0];
        const exitX = levels[currentLevelIndex].exit.x;  // right-edge column (5)
        // Player is 2 cells wide; last valid position = exitX - width = col 3 (x=3→cols 3+4) or col 4 (x=4→cols 4+5)
        // Keep wherever the player actually is (already >= 4 at this point)
        const celebrateX = player.x;

        const playerEl = piecesLayerElem.querySelector(`[data-id="${player.id}"]`);

        // Phase 1: slide character smoothly to exit position
        if (playerEl) {
            playerEl.style.transition = 'transform 0.55s cubic-bezier(0.25,1,0.5,1)';
            playerEl.style.transform = `translate3d(${celebrateX * cellPx}px,${player.y * cellPx}px,0)`;
        }

        // Phase 2: swap SVG to celebration graphic IN-PLACE (avoids full re-render that resets position)
        setTimeout(() => {
            const cel = piecesLayerElem.querySelector(`[data-id="${player.id}"]`);
            if (cel) {
                // Replace inner SVG with thumbs-up version
                const inner = cel.querySelector('.piece-inner');
                if (inner) inner.innerHTML = generate3DPieceSVG(player, true);
                // Snap transform to exit position and start bounce
                cel.style.transition = 'none';
                cel.style.transform = `translate3d(${celebrateX * cellPx}px,${player.y * cellPx}px,0)`;
                cel.style.animation = 'celebrateBounce 0.6s ease infinite alternate';
            }
        }, 560);

        // Phase 3: show win card
        setTimeout(() => {
            if (completedLevels.size >= 16) {
                showOverallWinModal();
            } else {
                const lvl = levels[currentLevelIndex];
                winStats.textContent = `Cleared ${lvl.isDemo ? 'DEMO' : 'Level ' + lvl.id} in ${moveCount} move${moveCount!==1?'s':''} • ${formatTime(timerSeconds)}`;
                
                const modalStars = document.querySelector('.win-stars');
                if(modalStars) {
                    modalStars.innerHTML = '';
                    for(let i=0; i<3; i++) {
                        modalStars.innerHTML += `<span style="color: ${i < starsCache[currentLevelIndex] ? '#ffd700' : '#4a5568'}; text-shadow: ${i < starsCache[currentLevelIndex] ? '0 0 6px rgba(255,215,0,0.7)' : 'none'};">★</span>`;
                    }
                }
                
                winModal.classList.add('active');
                buildLevelGrid();
            }
        }, 1050);
    }


    // ── Undo / Reset / Skip ──────────────────────────────────────
    function saveUndo() {
        undoStack.push({ gs: JSON.parse(JSON.stringify(gameState)), mc: moveCount });
    }

    function undoMove() {
        if (!undoStack.length || isLevelSolved || roundUndosLeft <= 0) return;
        const prev = undoStack.pop();
        gameState = prev.gs;
        moveCount = prev.mc;
        roundUndosLeft--;
        renderPieces();
        syncModalStats();
        updateButtonsUI();
    }

    function resetLevel() {
        if (globalResetsLeft <= 0) return;
        globalResetsLeft--;
        roundResetsUsed++;
        moveCount = 0;
        isLevelSolved = false;
        undoStack = [];
        roundUndosLeft = 3;
        resetTimer();
        updateButtonsUI();
        const lvl = levels[currentLevelIndex];
        gameState = [
            JSON.parse(JSON.stringify(lvl.player)),
            ...JSON.parse(JSON.stringify(lvl.pieces))
        ];
        gameState[0].isPlayer = true;
        renderPieces();
        syncModalStats();
    }
    function skipLevel() {
        if (currentLevelIndex === 0) { loadLevel(1); return; }
        if (globalSkipsLeft <= 0) return;
        globalSkipsLeft--;
        completedLevels.add(currentLevelIndex);
        starsCache[currentLevelIndex] = 1;
        highestUnlocked = Math.max(highestUnlocked, currentLevelIndex + 1);
        updateButtonsUI();
        loadLevel(currentLevelIndex + 1);
    }
    function showOverallWinModal() {
        let allStars = 0;
        for (let i = 1; i <= 15; i++) {
            allStars += (starsCache[i] || 0);
        }
        document.getElementById('overall-stars').textContent = allStars;
        document.getElementById('overall-moves').textContent = totalMovesMade;
        document.getElementById('overall-win-modal').classList.add('active');
    }

    // ── Modal & Level Grid ───────────────────────────────────────
    function syncModalStats() {
        const lvl = levels[currentLevelIndex];
        modalLevel.textContent = lvl.isDemo ? 'DEMO' : String(lvl.id).padStart(2,'0');
        modalMoves.textContent = moveCount;
        modalTime.textContent  = formatTime(timerSeconds);
    }

    function buildLevelGrid() {
        levelSelectGrid.innerHTML = '';
        levels.forEach((lvl, idx) => {
            const done = completedLevels.has(idx);
            const locked = idx > highestUnlocked && idx !== 0;
            const badge = document.createElement('div');
            badge.className = `level-badge${idx === currentLevelIndex ? ' active-level' : ''}${done ? ' done-level' : ''}`;
            if (locked) badge.style.opacity = '0.5';
            
            let starsHtml = '';
            const earned = starsCache[idx] || 0;
            for(let s=1; s<=3; s++) {
                starsHtml += `<span class="star${s <= earned ? ' star-lit' : ''}">★</span>`;
            }
            
            badge.innerHTML = `
                <div class="level-num">${lvl.isDemo ? 'DEMO' : (locked ? '🔒' : 'L' + String(lvl.id).padStart(2,'0'))}</div>
                <div class="level-stars">${starsHtml}</div>`;
            
            badge.addEventListener('click', () => {
                if (!locked) loadLevel(idx);
            });
            levelSelectGrid.appendChild(badge);
        });
    }

    // ── Timer ────────────────────────────────────────────────────
    function startTimer() {
        if (isTimerRunning) return;
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            modalTime.textContent = formatTime(timerSeconds);
        }, 1000);
    }
    function stopTimer()  { isTimerRunning = false; clearInterval(timerInterval); timerInterval = null; }
    function resetTimer() { stopTimer(); timerSeconds = 0; modalTime.textContent = '00:00'; }
    function formatTime(s) {
        return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
    }

    // ── Event Listeners ──────────────────────────────────────────
    function setupListeners() {
        btnMap.addEventListener('click', () => { syncModalStats(); buildLevelGrid(); mapModal.classList.add('active'); });
        btnCloseMap.addEventListener('click', () => mapModal.classList.remove('active'));
        btnSkip.addEventListener('click', skipLevel);
        btnUndo.addEventListener('click', undoMove);
        btnReset.addEventListener('click', resetLevel);
        btnNext.addEventListener('click', () => loadLevel(currentLevelIndex + 1));

        // Close map modal by clicking backdrop
        mapModal.addEventListener('click', e => { if (e.target === mapModal) mapModal.classList.remove('active'); });
        document.getElementById('btn-play-again').addEventListener('click', () => location.reload());
        winModal.addEventListener('click', e => { /* do nothing - require button */ });
    }
});

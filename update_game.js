const fs = require('fs');
let code = fs.readFileSync('d:/moveit/game.js', 'utf8');

// 1. Add state variables
code = code.replace(
    'let completedLevels = new Set();   // tracks which level indices are beaten',
    'let completedLevels = new Set();\n    let globalResetsLeft = 2;\n    let globalSkipsLeft = 2;\n    let roundUndosLeft = 3;\n    let roundResetsUsed = 0;\n    let totalMovesMade = 0;\n    let highestUnlocked = 1;\n    let starsCache = {};'
);

// 2. Add updateButtonsUI function
const updateButtonsUIFunc = `
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
`;
code = code.replace('// ── Grid ─────────────────────────────────────────────────────', updateButtonsUIFunc + '\n    // ── Grid ─────────────────────────────────────────────────────');

// 3. Modifying loadLevel
code = code.replace(
    'function loadLevel(idx) {\n        if (idx < 0) idx = 0;\n        if (idx >= levels.length) idx = 0;',
    'function loadLevel(idx) {\n        if (idx < 0) idx = 0;\n        if (idx >= levels.length) {\n            if (completedLevels.size >= 15) { showOverallWinModal(); return; }\n            idx = 0;\n        }\n        if (idx > highestUnlocked && idx !== 0) return;'
);
code = code.replace(
    'undoStack = [];\n        resetTimer();\n        updateUndoBtn();',
    'undoStack = [];\n        roundUndosLeft = 3;\n        roundResetsUsed = 0;\n        resetTimer();\n        updateButtonsUI();'
);

// 4. Update check in undoMove
code = code.replace(
    'if (!undoStack.length || isLevelSolved) return;',
    'if (!undoStack.length || isLevelSolved || roundUndosLeft <= 0) return;'
);
code = code.replace(
    'moveCount = prev.mc;\n        renderPieces();\n        syncModalStats();\n        updateUndoBtn();',
    'moveCount = prev.mc;\n        roundUndosLeft--;\n        renderPieces();\n        syncModalStats();\n        updateButtonsUI();'
);
// replace updateUndoBtn in onEnd
code = code.replace('updateUndoBtn();\n            startTimer();', 'updateButtonsUI();\n            startTimer();');


// 5. Update resetLevel and skipLevel
code = code.replace(
    'function resetLevel() { loadLevel(currentLevelIndex); }\n    function skipLevel()  { loadLevel(currentLevelIndex + 1); }\n    function updateUndoBtn() { btnUndo.disabled = undoStack.length === 0; }',
    `function resetLevel() {
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
    }`
);

// 6. Update triggerWin
code = code.replace(
    'completedLevels.add(currentLevelIndex);',
    'completedLevels.add(currentLevelIndex);\n        highestUnlocked = Math.max(highestUnlocked, currentLevelIndex + 1);\n        let stars = 3;\n        if (moveCount > 25) stars--;\n        if (moveCount > 40) stars--;\n        stars -= roundResetsUsed;\n        if (roundUndosLeft < 3) stars--;\n        if (stars < 1) stars = 1;\n        starsCache[currentLevelIndex] = Math.max(starsCache[currentLevelIndex] || 0, stars);\n        totalMovesMade += moveCount;'
);

const winTimeoutOld = `setTimeout(() => {
            const lvl = levels[currentLevelIndex];
            winStats.textContent = \`Cleared \${lvl.isDemo ? 'DEMO' : 'Level ' + lvl.id} in \${moveCount} move\${moveCount!==1?'s':''} • \${formatTime(timerSeconds)}\`;
            winModal.classList.add('active');
            buildLevelGrid(); // refresh stars
        }, 1050);`;
const winTimeoutNew = `setTimeout(() => {
            if (completedLevels.size >= 16) {
                showOverallWinModal();
            } else {
                const lvl = levels[currentLevelIndex];
                winStats.textContent = \`Cleared \${lvl.isDemo ? 'DEMO' : 'Level ' + lvl.id} in \${moveCount} move\${moveCount!==1?'s':''} • \${formatTime(timerSeconds)}\`;
                
                const modalStars = document.querySelector('.win-stars');
                if(modalStars) {
                    modalStars.innerHTML = '';
                    for(let i=0; i<3; i++) {
                        modalStars.innerHTML += \`<span style="color: \${i < starsCache[currentLevelIndex] ? '#ffd700' : '#4a5568'}; text-shadow: \${i < starsCache[currentLevelIndex] ? '0 0 6px rgba(255,215,0,0.7)' : 'none'};">★</span>\`;
                    }
                }
                
                winModal.classList.add('active');
                buildLevelGrid();
            }
        }, 1050);`;
code = code.replace(winTimeoutOld, winTimeoutNew);

// 7. Update buildLevelGrid
const buildGridOld = `            const done = completedLevels.has(idx);
            const badge = document.createElement('div');
            badge.className = \`level-badge\${idx === currentLevelIndex ? ' active-level' : ''}\${done ? ' done-level' : ''}\`;
            badge.innerHTML = \`
                <div class="level-num">\${lvl.isDemo ? 'DEMO' : 'L' + String(lvl.id).padStart(2,'0')}</div>
                <div class="level-stars">\${['★','★','★'].map(s =>
                    \`<span class="star\${done?' star-lit':''}">\${s}</span>\`).join('')}</div>\`;
            badge.addEventListener('click', () => loadLevel(idx));`;

const buildGridNew = `            const done = completedLevels.has(idx);
            const locked = idx > highestUnlocked && idx !== 0;
            const badge = document.createElement('div');
            badge.className = \`level-badge\${idx === currentLevelIndex ? ' active-level' : ''}\${done ? ' done-level' : ''}\`;
            if (locked) badge.style.opacity = '0.5';
            
            let starsHtml = '';
            const earned = starsCache[idx] || 0;
            for(let s=1; s<=3; s++) {
                starsHtml += \`<span class="star\${s <= earned ? ' star-lit' : ''}">★</span>\`;
            }
            
            badge.innerHTML = \`
                <div class="level-num">\${lvl.isDemo ? 'DEMO' : (locked ? '🔒' : 'L' + String(lvl.id).padStart(2,'0'))}</div>
                <div class="level-stars">\${starsHtml}</div>\`;
            
            badge.addEventListener('click', () => {
                if (!locked) loadLevel(idx);
            });`;
code = code.replace(buildGridOld, buildGridNew);

// Fix setupListeners for play again button
code = code.replace('winModal.addEventListener(', 'document.getElementById(\'btn-play-again\').addEventListener(\'click\', () => location.reload());\n        winModal.addEventListener(');

fs.writeFileSync('d:/moveit/game.js', code);
console.log('Successfully updated game.js');

/* JEWEL MOVE — SVG Graphics Library */

function generate3DPieceSVG(piece, celebrating) {
    if (piece.isPlayer) return celebrating ? generateCelebratingSVG() : generatePlayerSVG();
    switch (piece.type) {
        case 'chair': return generateChairSVG();
        case 'sofa': case 'sofa-long': return generateSofaSVG(piece);
        case 'roller-double': case 'roller-triple': return generateRollerSVG(piece);
        default: return generateCounterSVG(piece);
    }
}

/* ── Player walking (default) ─────────────────────────────────── */
function generatePlayerSVG() {
    return `<svg class="piece-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#1565c0"/></linearGradient>
  <linearGradient id="pg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffca28"/><stop offset="100%" stop-color="#f57f17"/></linearGradient>
  <linearGradient id="br1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ef5350"/><stop offset="100%" stop-color="#7f0000"/></linearGradient>
  <linearGradient id="bb1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#0d47a1"/></linearGradient>
</defs>
<!-- shadow --><ellipse cx="100" cy="90" rx="88" ry="9" fill="rgba(0,0,0,0.28)"/>
<!-- trolley base --><rect x="108" y="22" width="72" height="55" rx="5" fill="#90a4ae" stroke="#37474f" stroke-width="2"/>
<!-- trolley handle --><rect x="174" y="16" width="8" height="66" rx="3" fill="#455a64"/>
<circle cx="177" cy="18" r="5" fill="#111"/><circle cx="177" cy="79" r="5" fill="#111"/>
<!-- body --><ellipse cx="65" cy="50" rx="22" ry="28" fill="url(#pg1)"/>
<!-- vest --><polygon points="58,36 72,36 76,68 54,68" fill="url(#pg2)"/>
<!-- head top-down --><circle cx="65" cy="26" r="18" fill="#3e2723"/>
<ellipse cx="65" cy="22" rx="14" ry="13" fill="#6d4c41"/>
<ellipse cx="72" cy="50" rx="7" ry="11" fill="#ffcc80"/>
<!-- arms --><path d="M72,34 L108,34" stroke="#ffcc80" stroke-width="9" stroke-linecap="round" fill="none"/>
<path d="M72,66 L108,66" stroke="#ffcc80" stroke-width="9" stroke-linecap="round" fill="none"/>
<!-- red box --><rect x="112" y="16" width="52" height="30" rx="5" fill="url(#br1)" stroke="#ffd700" stroke-width="2"/>
<line x1="138" y1="16" x2="138" y2="46" stroke="#ffd700" stroke-width="2.5"/>
<line x1="112" y1="31" x2="164" y2="31" stroke="#ffd700" stroke-width="2.5"/>
<circle cx="138" cy="31" r="4" fill="#fff"/>
<!-- blue box --><rect x="116" y="52" width="52" height="28" rx="5" fill="url(#bb1)" stroke="#ffd700" stroke-width="2"/>
<line x1="142" y1="52" x2="142" y2="80" stroke="#ffd700" stroke-width="2.5"/>
<line x1="116" y1="66" x2="168" y2="66" stroke="#ffd700" stroke-width="2.5"/>
<circle cx="142" cy="66" r="4" fill="#fff"/>
<!-- sparkles --><path d="M120 22 l2 3 3 0 -2 2 1 3 -3-2 -3 2 1-3 -2-2 3 0z" fill="#fff"/>
<path d="M154 57 l2 3 3 0 -2 2 1 3 -3-2 -3 2 1-3 -2-2 3 0z" fill="#fff"/>
</svg>`;
}

/* ── Player celebrating with thumbs up ────────────────────────── */
function generateCelebratingSVG() {
    return `<svg class="piece-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="cg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#42a5f5"/><stop offset="100%" stop-color="#1565c0"/></linearGradient>
  <linearGradient id="cg2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffca28"/><stop offset="100%" stop-color="#f57f17"/></linearGradient>
</defs>
<!-- shadow --><ellipse cx="100" cy="90" rx="88" ry="9" fill="rgba(0,0,0,0.28)"/>
<!-- body --><ellipse cx="80" cy="55" rx="22" ry="26" fill="url(#cg1)"/>
<!-- vest --><polygon points="72,42 88,42 92,72 68,72" fill="url(#cg2)"/>
<!-- head --><circle cx="80" cy="30" r="18" fill="#3e2723"/>
<ellipse cx="80" cy="27" rx="14" ry="12" fill="#6d4c41"/>
<ellipse cx="87" cy="55" rx="7" ry="10" fill="#ffcc80"/>
<!-- big smile face --><ellipse cx="94" cy="28" rx="10" ry="9" fill="#ffcc80"/>
<circle cx="91" cy="26" r="1.5" fill="#222"/><circle cx="97" cy="26" r="1.5" fill="#222"/>
<path d="M90,31 Q94,36 98,31" stroke="#c62828" stroke-width="2" fill="none" stroke-linecap="round"/>
<!-- right arm THUMBS UP --><path d="M88,44 L130,22" stroke="#ffcc80" stroke-width="10" stroke-linecap="round" fill="none"/>
<!-- thumb fist --><ellipse cx="138" cy="18" rx="14" ry="11" fill="#ffcc80" stroke="#e65100" stroke-width="1.5"/>
<!-- thumb up finger --><rect x="131" y="4" width="10" height="16" rx="5" fill="#ffcc80" stroke="#e65100" stroke-width="1.5"/>
<!-- left arm --><path d="M72,66 L40,75" stroke="#ffcc80" stroke-width="9" stroke-linecap="round" fill="none"/>
<!-- sparkle burst --><g fill="#ffd700">
  <path d="M165,10 l3,7 7,0 -6,5 2,7 -6-4 -6,4 2-7 -6-5 7,0z"/>
  <path d="M178,35 l2,5 5,0 -4,3 2,5 -5-3 -5,3 2-5 -4-3 5,0z"/>
  <path d="M155,30 l2,4 4,0 -3,3 1,4 -4-3 -4,3 1-4 -3-3 4,0z"/>
</g>
<!-- green glow ring --><circle cx="94" cy="28" r="13" fill="none" stroke="#69f0ae" stroke-width="2" opacity="0.7"/>
</svg>`;
}

/* ── Armchair 1×1 ─────────────────────────────────────────────── */
function generateChairSVG() {
    return `<svg class="piece-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="ch1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#9c27b0"/><stop offset="100%" stop-color="#4a148c"/></linearGradient>
  <linearGradient id="ch2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ba68c8"/><stop offset="100%" stop-color="#7b1fa2"/></linearGradient>
</defs>
<rect x="5" y="5" width="90" height="90" rx="16" fill="url(#ch1)" stroke="#380060" stroke-width="3"/>
<!-- backrest --><rect x="9" y="9" width="82" height="20" rx="8" fill="#6a1b9a"/>
<!-- left arm --><rect x="9" y="9" width="20" height="82" rx="8" fill="#6a1b9a"/>
<!-- right arm --><rect x="71" y="9" width="20" height="82" rx="8" fill="#6a1b9a"/>
<!-- cushion --><rect x="25" y="25" width="50" height="60" rx="10" fill="url(#ch2)" stroke="#ce93d8" stroke-width="1.5"/>
<!-- cushion highlight --><ellipse cx="50" cy="38" rx="20" ry="8" fill="rgba(255,255,255,0.18)"/>
<!-- sneakers prop --><ellipse cx="43" cy="54" rx="7" ry="13" fill="#fff" stroke="#90a4ae" stroke-width="1" transform="rotate(-12 43 54)"/>
<ellipse cx="57" cy="57" rx="7" ry="13" fill="#42a5f5" stroke="#1565c0" stroke-width="1" transform="rotate(10 57 57)"/>
</svg>`;
}

/* ── Sofa (2-seat vertical/horizontal, long 3-seat) ───────────── */
function generateSofaSVG(piece) {
    const iv = piece.direction === 'vertical';
    const w = (iv ? 1 : piece.width) * 100, h = (iv ? piece.height : 1) * 100;
    const vb = `0 0 ${w} ${h}`;
    // color by id pattern
    let c1='#43a047', c2='#1b5e20', c3='#66bb6a';
    if (piece.id.includes('sofa2') || piece.id.includes('longsofa')) { c1='#fb8c00'; c2='#e65100'; c3='#ffa726'; }
    // headphones prop (center)
    const cx=w/2, cy=h/2;
    const prop = `<path d="M${cx-12},${cy} C${cx-12},${cy-14} ${cx+12},${cy-14} ${cx+12},${cy}" stroke="#e53935" stroke-width="4" fill="none"/>
<circle cx="${cx-13}" cy="${cy}" r="5" fill="#111"/><circle cx="${cx+13}" cy="${cy}" r="5" fill="#111"/>`;
    return `<svg class="piece-svg" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="sf${piece.id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient>
</defs>
<rect x="5" y="5" width="${w-10}" height="${h-10}" rx="14" fill="url(#sf${piece.id})" stroke="rgba(0,0,0,0.45)" stroke-width="3"/>
<!-- back cushion edge -->${iv?`<rect x="5" y="5" width="16" height="${h-10}" rx="10" fill="${c2}"/>`:`<rect x="5" y="5" width="${w-10}" height="16" rx="10" fill="${c2}"/>`}
<!-- seat highlight --><rect x="14" y="14" width="${w-28}" height="${h-28}" rx="8" fill="rgba(255,255,255,0.13)"/>
<ellipse cx="${cx}" cy="${h*0.3}" rx="${w*0.3}" ry="${h*0.1}" fill="rgba(255,255,255,0.15)"/>
${prop}
</svg>`;
}

/* ── Roller counter ───────────────────────────────────────────── */
function generateRollerSVG(piece) {
    const iv = piece.direction === 'vertical';
    const w = (iv?1:piece.width)*100, h=(iv?piece.height:1)*100;
    const n = piece.type==='roller-triple'?3:2;
    let rollers='';
    if(iv){ const step=(h-36)/(n-1); for(let i=0;i<n;i++){const y=18+i*step; rollers+=`<rect x="8" y="${y-7}" width="84" height="14" rx="6" fill="url(#rc)"/><line x1="14" y1="${y}" x2="86" y2="${y}" stroke="#546e7a" stroke-dasharray="5 3" stroke-width="1.5"/>`;} }
    else{ const step=(w-36)/(n-1); for(let i=0;i<n;i++){const x=18+i*step; rollers+=`<rect x="${x-7}" y="8" width="14" height="84" rx="6" fill="url(#rc)"/><line x1="${x}" y1="14" x2="${x}" y2="86" stroke="#546e7a" stroke-dasharray="5 3" stroke-width="1.5"/>`;} }
    return `<svg class="piece-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="rc" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#eceff1"/><stop offset="50%" stop-color="#fff"/><stop offset="100%" stop-color="#90a4ae"/></linearGradient>
  <linearGradient id="wd${piece.id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6d4c41"/><stop offset="100%" stop-color="#3e2723"/></linearGradient>
</defs>
<rect x="4" y="4" width="${w-8}" height="${h-8}" rx="10" fill="url(#wd${piece.id})" stroke="#d4af37" stroke-width="2"/>
${rollers}
</svg>`;
}

/* ── Jewellery counters ───────────────────────────────────────── */
function generateCounterSVG(piece) {
    const iv = piece.direction === 'vertical';
    const w=(iv?1:piece.width)*100, h=(iv?piece.height:1)*100;
    const cx=w/2, cy=h/2;
    const configs = {
        'counter-gold':    { g0:'#f9e04b', g1:'#c79b00', accent:'#ffe082', prop: `<rect x="${cx-14}" y="${cy-7}" width="28" height="14" rx="3" fill="#ffd700" stroke="#b8860b" stroke-width="1.5"/><rect x="${cx-10}" y="${cy-10}" width="20" height="10" rx="2" fill="#ffe57f" stroke="#b8860b" stroke-width="1"/>` },
        'counter-diamond': { g0:'#4dd0e1', g1:'#006064', accent:'#b2ebf2', prop: `<polygon points="${cx},${cy-14} ${cx+12},${cy} ${cx},${cy+14} ${cx-12},${cy}" fill="#e0f7fa" stroke="#00acc1" stroke-width="1.5"/><polygon points="${cx},${cy-14} ${cx+12},${cy} ${cx},${cy-2} ${cx-12},${cy}" fill="rgba(255,255,255,0.7)"/>` },
        'counter-silver':  { g0:'#cfd8dc', g1:'#607d8b', accent:'#eceff1', prop: `<rect x="${cx-15}" y="${cy-9}" width="30" height="18" rx="4" fill="#eceff1" stroke="#90a4ae" stroke-width="1.5"/><line x1="${cx-10}" y1="${cy}" x2="${cx+10}" y2="${cy}" stroke="#9e9e9e" stroke-width="1"/>` },
        'counter-platinum':{ g0:'#78909c', g1:'#263238', accent:'#b0bec5', prop: `<rect x="${cx-13}" y="${cy-8}" width="26" height="16" rx="3" fill="#b0bec5" stroke="#455a64" stroke-width="1.5"/>` },
        'counter-billing': { g0:'#8d6e63', g1:'#3e2723', accent:'#d7ccc8', prop: `<rect x="${cx-12}" y="${cy-10}" width="24" height="20" rx="3" fill="#37474f"/><rect x="${cx-8}" y="${cy-7}" width="16" height="9" fill="#81c784"/><rect x="${cx-6}" y="${cy+4}" width="12" height="3" rx="1" fill="#fff"/>` },
        'counter-service': { g0:'#a1887f', g1:'#4e342e', accent:'#d7ccc8', prop: `<rect x="${cx-14}" y="${cy-13}" width="28" height="28" rx="3" fill="#d7ccc8" stroke="#8d6e63" stroke-width="1.5"/><circle cx="${cx}" cy="${cy+1}" r="10" fill="#f44336"/><circle cx="${cx}" cy="${cy+1}" r="6" fill="#ff8f00"/>` },
        'counter-showcase':{ g0:'#455a64', g1:'#1c313a', accent:'#f1c40f', prop: `<rect x="${cx-14}" y="${cy-10}" width="28" height="20" rx="3" fill="rgba(255,255,255,0.15)" stroke="#f1c40f" stroke-width="1.5"/><ellipse cx="${cx}" cy="${cy}" rx="8" ry="5" fill="rgba(255,215,0,0.3)"/>` }
    };
    const cfg = configs[piece.type] || configs['counter-gold'];
    return `<svg class="piece-svg" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="ctg${piece.id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${cfg.g0}"/><stop offset="100%" stop-color="${cfg.g1}"/></linearGradient>
  <filter id="shad${piece.id}"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.35"/></filter>
</defs>
<rect x="4" y="4" width="${w-8}" height="${h-8}" rx="9" fill="url(#ctg${piece.id})" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" filter="url(#shad${piece.id})"/>
<!-- glass top panel --><rect x="10" y="10" width="${w-20}" height="${h-20}" rx="6" fill="rgba(255,255,255,0.12)"/>
<!-- highlight strip --><rect x="10" y="10" width="${w-20}" height="8" rx="4" fill="rgba(255,255,255,0.28)"/>
<!-- counter label background --><rect x="${cx-18}" y="${cy-16}" width="36" height="32" rx="5" fill="rgba(0,0,0,0.18)"/>
${cfg.prop}
</svg>`;
}

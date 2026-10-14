// ===== Hi-fi overrides: key screens rebuilt with Vision-style components =====
const OKP_ = pill('ok glow', `${ic('check')} Safe · LOTO on · A-114`);
const OKS_ = pill('ok', `${ic('check')} Safe · LOTO on`);
const WEI_ = backup(WEI);
const APP = t => `<div class="apphd"><span class="appic">${ic('spark')}</span>Maintenance Co-pilot<span class="sp"></span>${t}</div>`;
const HINT = st => `<div class="glass hint" style="${st}"><div class="aihd"><span class="aiic">${ic('spark')}</span><span class="k">Suggestion</span><span class="ev">3 of 5 past jobs</span></div>
  <div class="ht">Plug hard to reach?</div><div class="hb">On R-07 the cable guide often blocks the key.</div>
  <div class="btns">${say('HINT', 'pri')}${say('ASK WEI')}${say('NOT NOW')}</div></div>`;
const OV = {
  S01: sc('aisle') + timer('Window opens in 4 min') + mic() +
    `<div class="glass win" style="left:50%;top:47%;transform:translate(-50%,-50%);width:70%">${APP('13:56')}
    <div class="wgrid"><div>
      <div><span class="tag p3">P3 · Planned</span><span class="tag learn">Learning job</span></div>
      <div class="h1">R-07 · J4 grease change</div>
      <div class="sm t2">Line 2 · Cell 4 · Thu 14:00–14:45</div>
      <div class="row"><span>Why now</span><span>J4 current +18% · fails in ~9–14 d</span></div>
      <div class="row"><span>Your mode</span><span>Coach · first time</span></div>
      <div class="row"><span>Backup</span><span class="aic">Wei · watching live</span></div>
      <div class="row" style="border:0"><span>Kit</span><span>RG-2 · seal kit S-J4 · Bin 14</span></div>
    </div><div style="display:flex;flex-direction:column;gap:1.2cqw">
      <div class="thumb" style="flex:1"><svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><use href="#joint"/></svg><span class="rg"></span>
        <span class="tb">${ic('check')} Rehearsed 2/2</span><span class="tl">Digital twin · J4</span></div>
      <div class="btns" style="margin:0">${say('DETAILS')}${say('START JOB', 'pri')}</div>
    </div></div></div>`,
  S09: sc('cell') + OKP_ + timer('33 min left') + WEI_ + mic('🔊 "Machine is safe. 8 steps, about 22 minutes."') +
    `<div class="glass win" style="left:50%;top:44%;transform:translate(-50%,-50%);text-align:center;padding:2.4cqw 3.4cqw 2cqw">
      <div class="bigok">${ic('check')}</div><div class="h1" style="margin:0">Safe to work</div>
      <div class="sm t2">8 steps · about 22 min · 3 gates passed</div>
      <div class="phz"><div class="on"><b>Access</b><span>3 steps</span></div><div><b>Purge</b><span>1 step</span></div><div><b>Inject</b><span>1 step</span></div><div><b>Restore</b><span>3 steps</span></div></div>
      <div class="fadebar"><i></i></div></div>`,
  S10: sc('joint') + sc('hand') + OKS_ + timer('29 min left') + WEI_ +
    mic('🔊 "Outlet first, so the old grease has somewhere to go."') +
    ring(64, 62, 8) + tagw(69, 50, 'Outlet · M6 · 5 mm hex') +
    ring(52.5, 24.4, 6, 'ghost') + tagw(56, 20, 'Inlet · not yet', 'ghost') +
    strip('Access · 2/8', 'Remove outlet plug', say('DONE', 'pri')),
  S11: sc('joint') + sc('hand') + OKS_ + timer('28 min left') + WEI_ + mic() +
    ring(61, 30, 7) + tagw(66, 24, `Still pinned to the plug`, 'ghost') +
    `<div class="glass panel" style="width:74%;bottom:7%;display:block"><div style="display:flex;align-items:center;justify-content:space-between">
      <div class="seg"><span class="on">Clip</span><span>3D</span><span>Specs</span><span>History</span></div><div class="lbl" style="margin:0 4.6cqw 0 0">Step 2/8 · outlet plug</div></div>
      <div class="xbtn">${ic('x')}</div>
      <div style="display:grid;grid-template-columns:1.15fr 1fr;gap:2.2cqw">
        <div class="vid"><svg class="sc" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><use href="#joint"/><use href="#hand"/></svg>
          <div class="play">${ic('play')}</div><div class="vcap">0:04 / 0:12 · Wei's job · Mar</div><div class="scrub"><i style="width:33%"></i></div></div>
        <div style="padding-top:1cqw">
          <div class="row"><span>Size</span><span>M6 · 5 mm hex</span></div>
          <div class="row"><span>Direction</span><span>Anticlockwise</span></div>
          <div class="row" style="border:0"><span>Seal washer</span><span>Keep · check for cracks</span></div>
          <div class="srcline">${ic('check')} WI-J4-LUB v3.2 · approved by Reliability</div>
          <div class="btns">${say('HIDE')}${say('PLAY', 'pri')}</div></div></div></div>`,
  S12: sc('joint') + sc('hand') + OKS_ + timer('26 min left') + WEI_ + mic() +
    ring(64, 62, 8) +
    HINT('top:22%') +
    strip('Access · 2/8', 'Remove outlet plug', say('DONE', 'pri')),
  S15: sc('joint') + sc('gun') + OKS_ + timer('16 min left') + WEI_ + mic() +
    ring(64, 62, 8) + tagw(69, 50, 'Stop when fresh grease appears') +
    `<div class="dtag gauge" style="left:16%;top:13%"><div class="lbl">RG-2 · smart gun</div>
      <div class="gv"><span class="v">42</span><span class="u">/ 60 ml</span></div>
      <div class="gbar"><i style="width:70%"></i></div><div class="gl"><span>0</span><span>55 caution</span><span>60 stop</span></div></div>` +
    strip('Inject · 5/8', 'Pump slowly, watch the outlet', say('GREASE OUT', 'pri')),
  S19: sc('aisle') + pill('grey', 'In production') + WEI_ + `<div class="mic rec">${ic('mic')} 0:41</div>` +
    `<div class="glass panel" style="display:block;width:64%">
      <div class="qhd"><div class="lbl">Debrief</div><span class="qd"><i class="on"></i><i></i><i></i></span><span class="lbl" style="margin:0">1 of 3</span></div>
      <div class="vo"><div class="orb"></div><div><div class="h1" style="margin:0">What surprised you?</div>
        <div class="tr t2">"The cable guide blocked the outlet. I had to lift it first<span class="t3">…</span>"</div></div></div>
      <div class="srcline">${ic('spark')} Picked because you used a hint at step 2 · Next: was the prediction right?</div>
      <div class="btns">${say('SKIP')}${say('NEXT', 'pri')}</div></div>`,
  S20: sc('aisle') + mic() +
    `<div class="glass win" style="left:50%;top:50%;transform:translate(-50%,-50%);width:66%">${APP('14:39')}
      <div style="display:flex;align-items:center;gap:1.3cqw"><div class="bigok" style="width:4.4cqw;height:4.4cqw;font-size:2.2cqw;margin:0">${ic('check')}</div>
      <div><div class="h1" style="margin:0">Done in 39 min</div><div class="sm t2" style="margin:0">Inside the window · 4.1 A after fix (baseline 4.0)</div></div></div>
      <div class="loops">
        <div class="lp"><span class="li">${ic('doc')}</span><div><b>Work order logged</b><span>Steps · photos · 12 Nm · 48 ml</span></div></div>
        <div class="lp"><span class="li ai">${ic('spark')}</span><div><b>Prediction confirmed</b><span>#PM-2291 · model updated</span></div></div>
        <div class="lp"><span class="li p">${ic('user')}</span><div><b>Tip in review</b><span>Cable guide · Reliability</span></div></div>
        <div class="lp"><span class="li w">${ic('loop')}</span><div><b>Assisted 1 of 2</b><span>Next time: Prompt mode</span></div></div>
      </div><div class="btns">${say('FINISH', 'pri')}</div></div>`
};

// ===== D · VERIFY =====
SCREENS.push({
  ph: 'D · Verify: restore, test run, hand back', id: 'S16', title: 'Restore gate · before power comes back',
  trig: '⚙ "Grease out" + 🎙 "Done" on steps 6–7 (plugs, cover)',
  fov: sc('joint') + OKS + timer('11 min left') + backup(WEI) + mic() +
    `<div class="glass panel" style="border:2px solid var(--warn)"><div class="col">
      <div class="lbl">Gate · restore (step 8/8)</div>
      <div class="row"><span>Plugs torqued 12 Nm</span><span class="okc">12.1 / 11.9 ✓ <span class="src">smart wrench</span></span></div>
      <div class="row"><span>Cover refitted</span><span class="okc">photo ✓</span></div>
      <div class="row"><span>Tools counted</span><span class="okc">4 / 4 ✓ <span class="src">tool tags</span></span></div>
      <div class="row"><span>People in cell</span><span class="okc">0 ✓ <span class="src">badge gate</span></span></div>
      <div class="row" style="border:0"><span>Remove lock A-114 · Q1 ON</span><span class="warnc">you · then confirm</span></div>
    </div><div class="cmdcol">${say('CELL CLEAR', 'pri')}</div></div>` +
    co(14, 62, 1) + co(14, 90, 2) + co(85, 83, 3),
  purpose: 'Locking out had a gate, and so does restoring. Leaving tools or people inside is the risk at the end of any job.',
  layers: ['Safety pill', 'Panel', 'Audio'],
  els: ['<b>Readings from connected tools</b>: torque from the smart wrench, tool count from tags, people from the badge gate. Almost nothing for Alex to declare himself.',
    '<b>The last item is the human action</b>: Alex removes his own lock. Only then can the pill change.',
    '<b>CELL CLEAR</b> = L3. It is only accepted when every row is ✓ and the lock sensor reads open.'],
  ix: ['🎙 "Cell clear". If any row is ⚠, that row is read aloud and the command is disabled.', 'The pill changes from green to amber TEST RUN.'],
  next: 'S17'
});
SCREENS.push({
  ph: '', id: 'S17', title: 'Test run · watch from outside the fence',
  trig: '🎙 "Cell clear" · robot runs a test program',
  fov: sc('cell') + pill('warn', '⚠ TEST RUN · KEEP OUT') + timer('8 min left') + backup(WEI) + mic() +
    `<div class="hatch" style="left:44%;top:14%;width:50%;height:78%"></div>` +
    `<div class="dtag" style="left:4%;top:14%"><div class="lbl">J4 current · live</div><div class="v okc">4.1 A</div>normal 4.0 · was 4.8</div>` +
    `<div class="chip" style="left:4%;top:44%">Cycles <b>8 / 10</b> <span class="okc">all in range</span></div>` +
    strip('VERIFY', 'Stay outside, watch J4', say('STOP', '')) +
    co(55, 18, 1) + co(3, 14, 2) + co(3, 44, 3) + co(88, 89, 4),
  purpose: 'Prove the fix with data, not just "it sounds fine". This also closes the loop on the prediction.',
  layers: ['Safety pill', 'Hazard zone', 'Live data tag', 'Strip'],
  els: ['<b>Red hatched keep-out zone</b> over the robot\'s reach. If Alex walks into it, X1 is triggered.',
    '<b>Live current</b> shown against the normal value and the value before the fix: an instant before/after comparison.',
    '<b>Cycle counter</b>: 10 test cycles need to stay in range.',
    '<b>STOP</b> is always available; here it is also written in the strip.'],
  ix: ['⚙ Fully automatic; Alex only watches.', 'Data tags are placed to the side so the view of the moving robot stays clear.'],
  next: 'S18 when 10/10 cycles are in range'
});
SCREENS.push({
  ph: '', id: 'S18', title: 'Fix verified · hand back to production',
  trig: '⚙ 10 / 10 cycles in range',
  fov: sc('cell') + pill('grey', 'READY · LOTO OFF') + timer('6 min left') + backup(WEI) + mic() +
    `<div class="glass panel"><div class="col">
      <div class="h1"><span class="okc">✓</span> Fix verified</div>
      <div class="row"><span>J4 current</span><span>4.8 A (+21%) → <b class="okc">4.1 A (+2%)</b></span></div>
      <div class="row"><span>Test cycles</span><span class="okc">10 / 10 in range</span></div>
      <div class="row" style="border:0"><span>Line lead</span><span>Maya will be told: R-07 ready</span></div>
    </div><div class="cmdcol">${say('HAND BACK', 'pri')}${say('HOLD')}</div></div>` +
    co(14, 79, 1) + co(14, 91, 2) + co(85, 76, 3),
  purpose: 'A clear end point with a formal hand-back to production. It is the technician\'s decision, backed by evidence.',
  layers: ['Safety pill', 'Panel', 'Audio'],
  els: ['<b>Before → after</b> in one line: the result Alex can be proud of, and the proof for Maya.',
    '<b>Hand-off target</b> named (Maya, the line lead), so he knows who gets the message.',
    '<b>HAND BACK / HOLD</b>. Hold asks for a reason and keeps the line stopped.'],
  ix: ['🎙 "Hand back" → Maya gets a push notification and the pill changes to IN PRODUCTION.'],
  next: 'S19'
});
// ===== E · CLOSE & LEARN =====
SCREENS.push({
  ph: 'E · Close & learn: debrief, automatic log, skill update', id: 'S19', title: '2-minute voice debrief',
  trig: '🎙 "Hand back" · Alex walks away from the cell',
  fov: sc('aisle') + pill('grey', 'IN PRODUCTION') + backup(WEI) + mic('🎙 0:41') +
    `<div class="glass panel"><div class="col">
      <div class="lbl">Debrief · question 1 of 3</div>
      <div class="h1">What surprised you?</div>
      <div class="wave"><i style="height:30%"></i><i style="height:70%"></i><i style="height:45%"></i><i style="height:90%"></i><i style="height:55%"></i><i style="height:35%"></i><i style="height:80%"></i><i style="height:40%"></i></div>
      <div class="sm" style="opacity:.85"><i>"The cable guide blocked the outlet. I had to lift it first…"</i></div>
      <div class="sm" style="font-size:1.6cqw;opacity:.7">Next: Was the prediction right? · Anything wrong in the instructions?</div>
    </div><div class="cmdcol">${say('NEXT', 'pri')}${say('SKIP')}</div></div>` +
    co(14, 66, 1) + co(14, 82, 2) + co(14, 91, 3) + co(85, 78, 4),
  purpose: 'Capture what the system couldn\'t see, while it is still fresh. Speaking takes 2 minutes; writing a report takes 20.',
  layers: ['Panel', 'Audio'],
  els: ['<b>3 questions picked by the Brain</b> from what happened: hint used at step 2 → "what surprised you"; finding recorded → "was the prediction right"; detail opened twice → "anything wrong in the instructions".',
    '<b>Live transcript</b> so Alex knows he has been heard. It is tagged automatically to R-07 / J4 / WI-J4-LUB.',
    '<b>Upcoming questions</b> shown so he knows how long it will take.',
    '<b>SKIP</b> is allowed: the debrief is valuable but not required for safety.'],
  ix: ['🎙 Free speech for each answer, then "Next".', 'Safe to do while walking because the panel stays in the lower band.'],
  next: 'S20 after question 3'
});
SCREENS.push({
  ph: '', id: 'S20', title: 'Job complete · what happens next',
  trig: '🎙 "Finish debrief"',
  fov: sc('aisle') + mic() +
    `<div class="glass panel" style="width:74%"><div class="col">
      <div class="h1"><span class="okc">✓</span> Done in 39 min · inside the window</div>
      <div class="row"><span>Work order</span><span class="okc">logged automatically ✓ <span class="src">steps · photos · 12 Nm · 48 ml</span></span></div>
      <div class="row"><span>Prediction #PM-2291</span><span class="okc">confirmed (grease dark) → model updated</span></div>
      <div class="row"><span>Your tip (cable guide)</span><span class="aic">sent to Reliability for review</span></div>
      <div class="row" style="border:0"><span>Skill: J4 grease change</span><span><b>Assisted 1/2 ✓</b> · Wei to sign off</span></div>
      <div class="sm">Next time: <b>Prompt mode</b> (less guidance), if Wei signs off</div>
    </div><div class="cmdcol">${say('FINISH', 'pri')}</div></div>` +
    co(11, 64, 1) + co(11, 70, 2) + co(11, 75.5, 3) + co(11, 81, 4) + co(11, 86.5, 5),
  purpose: 'Show Alex that his work went somewhere: the record, the model, the knowledge base and his own growth. This closes all three loops.',
  layers: ['Panel'],
  els: ['<b>Time + window</b>: the planner gets an accurate time for this job from now on.',
    '<b>Work order logged automatically</b> from the session, with no typing. This answers the "paperwork" pain point.',
    '<b>Prediction loop</b>: the finding confirms the alert, so the model learns.',
    '<b>Knowledge loop</b>: the tip goes through review and then becomes a hint on S12 for the next person.',
    '<b>Learning loop</b>: skill passport progress and the next guidance mode, with sign-off by a person.'],
  ix: ['🎙 "Finish" → the glasses return to the idle home screen.'],
  next: 'End · loops back into planning for the next job'
});

// ===== EXCEPTIONS =====
EXC.push({
  id: 'X1', title: 'Safety interrupt · unexpected motion',
  trig: '⚙ J4 encoder movement while LOTO is on · or Alex enters the hazard zone · or 🎙 "STOP"',
  fov: sc('cell') + `<div class="vignette"></div>` + pill('danger', '✕ DANGER') +
    `<div class="banner">STOP · J4 MOVEMENT DETECTED</div>` + ring(76, 37, 8) +
    strip('DANGER', 'Step back from the robot now', say('waits for 10 s with no motion', 'wait'), 'danger') +
    co(6, 10, 1) + co(27, 6, 2) + co(88, 89, 3),
  purpose: 'Get attention instantly without taking away Alex\'s view of the hazard.',
  layers: ['Edge glow', 'Banner', 'Sound + vibration'],
  els: ['<b>Red edge glow</b>: grabs attention at the edges while the middle stays see-through.',
    '<b>Banner</b>: what happened, in 4 words. Wei and Maya are alerted automatically.',
    '<b>No dismiss button</b>: "All clear" only appears after 10 s with no motion, and it returns to S08 (prove zero energy again).'],
  ix: ['"STOP" works at any time, with no wake word and offline.'],
  next: 'Back to S08 · re-check'
});
EXC.push({
  id: 'X2', title: 'Mismatch · wrong part or consumable',
  trig: '⚙ cartridge scanned: RG-1 (needs RG-2)',
  fov: sc('joint') + sc('gun') + pill('ok', '✓ SAFE · LOTO ON') + backup(WEI) + mic() +
    tagw(16, 62, '✕ RG-1 scanned · this job needs <b>RG-2</b>') + leader(30, 68, 12) +
    strip('CHECK', 'Wrong grease. Swap to RG-2', say('SWAP', 'pri') + say('OVERRIDE'), 'gate') +
    co(14, 58, 1) + co(88, 89, 2),
  purpose: 'Catch the mistake before it happens, at the moment of action.',
  layers: ['Object tag', 'Gate strip'],
  els: ['<b>Tag on the item in hand</b>: what was scanned vs what is needed.',
    '<b>SWAP</b> shows the bin location. <b>OVERRIDE</b> needs a spoken reason and Wei\'s approval, and is logged.'],
  ix: ['The same pattern is used for the wrong machine (S03) and the wrong tool size.'],
  next: 'Back to S15'
});
EXC.push({
  id: 'X3', title: 'Voice not understood / offline',
  trig: '⚙ speech not recognised twice · or network lost',
  fov: sc('joint') + pill('ok', '✓ SAFE · LOTO ON') + backup('👤 Wei · reconnecting…') +
    `<div class="chip" style="left:3%;top:14%">⚡ Offline · procedure saved on device · syncs later</div>` +
    `<div class="mic" style="color:var(--warn)">❓ say again</div>` +
    strip('ACCESS · 2/8', 'Say "Done" or tap the temple', say('DONE', 'pri') + say('REPEAT')) +
    co(3, 12, 1) + co(3, 84, 2) + co(88, 89, 3),
  purpose: 'The job never depends on the network or on perfect speech recognition.',
  layers: ['Status chip', 'Mic', 'Strip'],
  els: ['<b>Offline chip</b>: the procedure, gates and safety logic run on the device. Only expert help and syncing pause.',
    '<b>Mic state</b> is honest: it repeats the valid commands rather than guessing.',
    '<b>Tap fallback</b>: tap = main command, double tap = back. Gates still need a photo or sensor check.'],
  ix: ['After 2 failed tries the strip shows the tap hint automatically.'],
  next: 'Resume the current screen'
});

/* Full scripted Voyager path test: every beat has an exit and every interactive action resolves. */
const fs=require('node:fs');
const assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const dom=new JSDOM('<!doctype html><html><body><div id="game"></div></body></html>',{url:'https://mira-quest2.test/',runScripts:'outside-only',pretendToBeVisual:true});
const w=dom.window;
w.HTMLMediaElement.prototype.pause=function(){};
w.HTMLMediaElement.prototype.play=function(){return Promise.resolve()};
for(const name of ['src/voyager-score.js','src/voyager-rebuilt.js'])w.eval(fs.readFileSync(name,'utf8'));
const nodes=w.MIRA_VOYAGER_SCORE.flatMap(s=>s.beats);
assert.ok(nodes.length>330);
w.MIRA_VOYAGER.enter(w.document.querySelector('#game'),{name:'Explorer',reduced:true,onExit(){}});
const html=()=>w.document.getElementById('game').innerHTML;
const state=()=>JSON.parse(w.localStorage.getItem('mira-quest-voyager-rebuilt')||'{"i":0}');
function click(q){const b=w.document.querySelector(q);assert.ok(b,'Expected clickable '+q+' at '+state().i);b.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));}
let walked=0,transitions=0,stayed=0,seen=new Set();
for(let loop=0;loop<1800;loop++){
 if(html().includes('Their stories continue.'))break;
 const i=state().i,b=nodes[i];
 assert.ok(b,'Story node missing '+i);
 if(b.type==='line'){assert.ok(w.document.querySelector('#mv-dialogue:not([hidden])'),'Dialogue missing at '+i);const a=w.document.querySelector('#mv-picture');click('[data-v="next"]');if(state().i===i)click('[data-v="next"]');if(state().i>i&&b.scene===nodes[state().i]?.scene&&nodes[state().i]?.type==='line')assert.strictEqual(a,w.document.querySelector('#mv-picture'),'Backdrop remounted between dialogue lines');}
 else if(b.type==='hold'){click('[data-v="skipHold"]');}
 else if(b.type==='action'){
   seen.add(b.id);
   if(b.id==='powerChoice')click('[data-v="choosePower:science"]');
   let target=w.document.querySelector('[data-v="found:'+b.id+'"]')||
     w.document.querySelector('[data-v="powerDone"]')||
     w.document.querySelector('[data-v="complete"]');
   assert.ok(target,'Cannot resolve action '+b.id+' at '+i);
   target.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
 }else if(b.type==='choice'){
   click('[data-v="choose:0"]');
   click('[data-v="choiceNext"]');
   if(state().i===i)click('[data-v="choiceNext"]');
 }else if(b.type==='frame'){
   assert.fail('Frame should auto-advance: '+i);
 }
 if(state().i===i){stayed++;assert.fail('Beat stranded after interaction '+i+' '+b.type);}
 transitions++;walked=Math.max(walked,state().i);
}
assert.match(html(),/Their stories continue/);
assert.equal(walked,nodes.length);
assert.ok(seen.size>=25,'Not all interactions encountered');
assert.ok(!html().includes('v-progress'));
console.log('PASS: full Voyager playthrough, '+nodes.length+' authored beats, '+seen.size+' interactions, persistent dialogue scenes, ending reached');

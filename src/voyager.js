/* MIRA Quest 2 — Voyager visual novel. Fictional dialogue grounded in NASA mission archives. */
(function(){
'use strict';
const rootId='game', base='assets/voyager/';
const assets={
voyager:['voyager-space.jpg','NASA/JPL-Caltech · PIA17049 · Artist concept','https://science.nasa.gov/photojournal/voyager-in-space-artist-concept/'],
jupiter:['jupiter.jpg','NASA/JPL-Caltech · PIA01384 · Voyager Jupiter image','https://science.nasa.gov/photojournal/jupiters-great-red-spot-3/'],
io:['io.jpg','NASA/JPL · PIA00379 · Voyager 1 Io volcano photograph','https://science.nasa.gov/photojournal/volcanic-eruptions-on-io/'],
saturn:['saturn.jpg','NASA/JPL-Caltech · PIA02225 · Voyager 1 Saturn photograph','https://science.nasa.gov/photojournal/saturn-approach-full-disk/'],
titan:['titan.jpg','NASA/JPL-Caltech · Voyager 1 image of Titan','https://science.nasa.gov/mission/voyager/images-voyager-took/'],
pale:['pale-blue-dot.jpg','NASA/JPL-Caltech · PIA23645 · Pale Blue Dot reprocessed image','https://science.nasa.gov/resource/voyager-pale-blue-dot-download/'],
gold:['golden-record.jpg','NASA · Voyager Golden Record cover','https://science.nasa.gov/mission/voyager/golden-record-contents/']
};
let root=null,onExit=null,name='Explorer',reduce=false;
const KEY='mira-quest2-voyager-progress';
let state={chapter:0,line:0,reply:null,inspect:false,archive:false,unlocked:['voyager'],complete:false};
try{let saved=JSON.parse(localStorage.getItem(KEY)||'{}');if(Number.isInteger(saved.chapter))state={...state,...saved,reply:null,inspect:false,archive:false};}catch(e){}
function esc(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function save(){try{localStorage.setItem(KEY,JSON.stringify({chapter:state.chapter,line:state.line,unlocked:state.unlocked,complete:state.complete}))}catch(e){}}
function chapters(){return window.MIRA_VOYAGER_STORY||[];}
function chapter(){return chapters()[state.chapter];}
function beat(){return chapter()?.beats[state.line];}
function visual(){return beat()?.image||chapter()?.image||'voyager';}
function picture(k){if(k==='heliopause')return '<div class="v-helio"><div class="v-helio-sun">☀</div><div class="v-helio-bubble"></div><span class="v-helio-label">HELIOSPHERE</span><div class="v-helio-probe">✦<small>VOYAGER 1</small></div><p>SCHEMATIC — NOT TO SCALE</p></div>';return '<img src="'+base+(assets[k]||assets.voyager)[0]+'" alt="'+esc(k)+'" onerror="this.style.opacity=0">';}
function render(){
 if(!root||!chapter()||!beat())return;
 let c=chapter(),bt=beat(),vis=visual(),a=assets[vis]||assets.voyager;
 if(state.archive){root.innerHTML='<main class="v-screen v-archive"><header class="v-header"><strong>MIRA QUEST</strong><span>VOYAGER / PHOTO ARCHIVE</span><button data-vact="archive">CLOSE ×</button></header><section class="v-archive-body"><span class="v-kicker">IMAGES FROM NASA</span><h1>Memories worth keeping.</h1><p>Explore the real photographs and archive images discovered during Voyager’s story. Artist concepts are identified separately.</p><div class="v-archive-grid">'+state.unlocked.filter(k=>assets[k]).map(k=>'<button data-vact="inspectItem:'+k+'">'+picture(k)+'<b>'+esc(k==='pale'?'Pale Blue Dot':k==='gold'?'Golden Record':k==='voyager'?'Voyager 1':k.toUpperCase())+'</b></button>').join('')+'</div><button data-vact="archive" class="v-btn">RETURN TO STORY →</button></section></main>';return;}
 if(state.inspect){root.innerHTML='<main class="v-screen v-inspection"><header class="v-header"><strong>MIRA QUEST</strong><span>NASA IMAGE ARCHIVE</span><button data-vact="inspect">CLOSE ×</button></header><div class="v-inspection-image">'+picture(vis)+'</div><footer class="v-inspection-caption"><p>'+esc(a[1])+'</p><a href="'+esc(a[2])+'" target="_blank" rel="noopener noreferrer">View NASA source ↗</a><button class="v-btn" data-vact="inspect">RETURN TO STORY →</button></footer></main>';return;}
 let who=bt.who==='PLAYER'?name:bt.who==='NARRATOR'?'SCENE':'VOYAGER 1';
 let choices=bt.choices&&!state.reply?'<div class="v-choices">'+bt.choices.map((x,i)=>'<button data-vact="choice:'+i+'">'+esc(x[0])+'</button>').join('')+'</div>':'';
 let response=state.reply?'<div class="v-response"><b>VOYAGER 1</b><p>'+esc(state.reply)+'</p></div>':'';
 let nextText=state.chapter===chapters().length-1&&state.line===c.beats.length-1?'FINISH CHAPTER →':state.line===c.beats.length-1?'CONTINUE THE JOURNEY →':'CONTINUE →';
 root.innerHTML='<main class="v-screen '+(reduce?'v-reduced':'')+'">'
 +'<div class="v-backdrop '+(vis==='voyager'?'v-drift':'')+(state.chapter===0&&state.line===0?' v-opening-rush':'')+'">'+picture(vis)+'</div><div class="v-vignette"></div>'
 +'<header class="v-header"><strong>MIRA QUEST</strong><span>VOYAGER 1 · '+esc(c.era)+'</span><div><button data-vact="archive">▤ ARCHIVE</button><button data-vact="hub">ALL MISSIONS</button></div></header>'
 +'<div class="v-scene-title"><span class="v-kicker">CHAPTER '+String(state.chapter+1).padStart(2,'0')+' / '+String(chapters().length).padStart(2,'0')+'</span><h1>'+esc(c.title)+'</h1>'+(state.chapter===0?'<div class="v-speed">17 km/s <small>≈ 61,200 km/h relative to the Sun</small></div>':'')+'</div>'
 +'<section class="v-dialogue '+(bt.who==='NARRATOR'?'v-narrator':'')+'"><div class="v-speaker"><span>'+ (bt.who==='PLAYER'?'◇':'✦')+'</span><b>'+esc(who)+'</b></div><p>'+esc(bt.text)+'</p>'+response+choices+'<div class="v-controls"><button data-vact="prev" '+(state.chapter===0&&state.line===0?'disabled':'')+'>←</button>'+(vis==='heliopause'?'<span class="v-credit-link">SCHEMATIC</span>':'<button data-vact="inspect">EXAMINE NASA IMAGE ↗</button>')+'<span class="v-fill"></span><button class="v-btn" data-vact="next" '+(bt.choices&&!state.reply?'disabled':'')+'>'+nextText+'</button></div></section>'
 +'<div class="v-credit">'+esc(a[1])+'</div></main>';
}
function step(){if(beat().choices&&!state.reply)return;state.reply=null;if(state.line<chapter().beats.length-1)state.line++;else if(state.chapter<chapters().length-1){state.chapter++;state.line=0;}else{state.complete=true;save();onExit&&onExit();return;}let k=visual();if(!state.unlocked.includes(k))state.unlocked.push(k);save();render();}
function previous(){state.reply=null;if(state.line>0)state.line--;else if(state.chapter>0){state.chapter--;state.line=chapter().beats.length-1;}save();render();}
function click(e){const el=e.target.closest('[data-vact]');if(!el||!root||!root.contains(el)||!root.querySelector('.v-screen'))return;let [action,arg]=el.dataset.vact.split(':');if(action==='next')step();else if(action==='prev')previous();else if(action==='hub')onExit&&onExit();else if(action==='choice'){state.reply=beat().choices[+arg]?.[1]||null;render();}else if(action==='inspect'){state.inspect=!state.inspect;render();}else if(action==='archive'){state.archive=!state.archive;render();}else if(action==='inspectItem'){let index=chapters().findIndex(c=>c.image===arg||c.beats.some(b=>b.image===arg));if(index>=0){state.chapter=index;state.line=Math.max(0,chapters()[index].beats.findIndex(b=>b.image===arg));}state.archive=false;state.inspect=true;render();}}
function keys(e){if(!root||!root.querySelector('.v-screen')||e.repeat||e.altKey||e.ctrlKey||e.metaKey)return;if(['INPUT','TEXTAREA','BUTTON','A'].includes(document.activeElement?.tagName))return;if(e.key==='Enter'||e.key===' '){e.preventDefault();if(state.inspect){state.inspect=false;render();}else if(!state.archive)step();}else if(e.key==='ArrowLeft'&&!state.inspect&&!state.archive){e.preventDefault();previous();}}
window.MIRA_VOYAGER={enter(el,opts){root=el;onExit=opts.onExit;name=opts.name||'Explorer';reduce=!!opts.reduced;if(!root.dataset.voyagerInitialized){root.addEventListener('click',click);document.addEventListener('keydown',keys);root.dataset.voyagerInitialized='1';}state.chapter=Math.max(0,Math.min(state.chapter,chapters().length-1));state.line=Math.max(0,Math.min(state.line,chapter().beats.length-1));render();},restart(){state={chapter:0,line:0,reply:null,inspect:false,archive:false,unlocked:['voyager'],complete:false};save();render();}};
})();
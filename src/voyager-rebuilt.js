/* MIRA Quest Voyager — authored encounter engine.  Persistent media layers; no panel-based slideshow. */
(()=>{"use strict";
const A="assets/voyager/", P="assets/photos/";
const IM={space:A+"voyager-space.jpg",jupiter:A+"jupiter.jpg",io:A+"io.jpg",saturn:A+"saturn.jpg",titan:A+"titan.jpg",earth:A+"pale-blue-dot.jpg",record:A+"golden-record.jpg"};
const SOURCE={space:"https://science.nasa.gov/mission/voyager/",jupiter:"https://science.nasa.gov/mission/voyager/images-voyager-took/",io:"https://science.nasa.gov/photojournal/volcanic-eruptions-on-io/",saturn:"https://science.nasa.gov/mission/voyager/images-voyager-took/",titan:"https://science.nasa.gov/mission/voyager/images-voyager-took/",earth:"https://science.nasa.gov/resource/voyager-pale-blue-dot-download/",record:"https://science.nasa.gov/mission/voyager/golden-record-contents/"};
const GREETING="https://upload.wikimedia.org/wikipedia/commons/6/6f/Voyager_Golden_Record_greeting_in_English.ogg";
const LAUNCH="https://upload.wikimedia.org/wikipedia/commons/1/11/Voyager_1_Launches.webm";
const MUSIC="https://science.nasa.gov/mission/voyager/golden-record-contents/sounds/";
const store="mira-quest-voyager-rebuilt";
let host,exit,player="Explorer",reduced=false,muted=false,ctx=null,loop=null,activeAudio=null,typing=null,wait=null,anim=null;
let score=[],scenes=[],state={i:0,found:{},archive:[],answer:{},identity:false};let showingScene="",showingFrame="",drawn=false;
const $=s=>host?.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clean=()=>{clearInterval(typing);clearTimeout(wait);cancelAnimationFrame(anim);typing=null;wait=null;};
function persist(){try{localStorage.setItem(store,JSON.stringify(state))}catch(e){}}
function getScore(){scenes=window.MIRA_VOYAGER_SCORE||[];score=[];scenes.forEach((s,si)=>s.beats.forEach((b,bi)=>score.push({...b,scene:si,local:bi})))}
function audio(name){
 if(muted)return;
 try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();ctx.resume();const oscillator=ctx.createOscillator(),gain=ctx.createGain();oscillator.type=name==="signal"?"sine":"triangle";oscillator.frequency.value=name==="signal"?520:name==="notice"?680:190;gain.gain.setValueAtTime(.0001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(name==="notice"?.026:.012,ctx.currentTime+.025);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.20);oscillator.connect(gain);gain.connect(ctx.destination);oscillator.start();oscillator.stop(ctx.currentTime+.22);}catch(e){}
}
function soundscape(kind){
 if(muted)return;
 try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();ctx.resume();const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=kind==="ocean"?95:kind==="radio"?420:55;g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.linearRampToValueAtTime(.018,ctx.currentTime+.6);g.gain.linearRampToValueAtTime(.0001,ctx.currentTime+3.6);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+3.7)}catch(e){}
}
function base(){
 if(drawn)return;drawn=true;
 host.innerHTML='<main class="mq-screen mv-screen" aria-label="Voyager interactive story">'+
 '<div class="mv-spacefield" aria-hidden="true"><i></i><i></i><i></i></div>'+
 '<div class="mv-landscape" id="mv-landscape"><img id="mv-picture" alt=""><div class="mv-cinema" id="mv-cinema" aria-hidden="true"></div></div>'+
 '<div class="mv-tint"></div><div class="mv-header"><span class="mv-brand">MIRA QUEST</span><span id="mv-location">DEEP SPACE</span><div><button data-v="archive" aria-label="Open NASA archive">▤ ARCHIVE</button><button data-v="sound" aria-label="Toggle sound">◖))</button><button data-v="hub">MISSIONS</button></div></div>'+
 '<div id="mv-reveal" class="mv-reveal" hidden></div>'+
 '<section class="mq-dialogue mq-card mv-dialogue" id="mv-dialogue" aria-live="polite"><div class="mq-speaker mv-speaker" id="mv-speaker"></div><p class="mq-speech mv-text" id="mv-text"></p><div class="mq-dialogue-actions mv-dialogue-actions"><button class="mq-btn primary" id="mv-next" data-v="next">CONTINUE →</button></div></section>'+
 '<button id="mv-back" class="mv-back" data-v="back" aria-label="Previous dialogue line">←</button>'+
 '<div class="mv-activity" id="mv-activity" hidden></div>'+
 '<div class="mv-modal" id="mv-modal" hidden></div>'+
 '<div class="mv-credit" id="mv-credit"></div>'+
 '</main>';
}
function pic(name){
 if(!IM[name]||!$("#mv-picture"))return;
 const image=$("#mv-picture");if(showingFrame===name)return;
 showingFrame=name;
 image.classList.remove("mv-fadein");image.style.opacity="0";
 image.src=IM[name];image.alt=name==="earth"?"NASA Pale Blue Dot original photograph":name==="record"?"NASA Golden Record engraved cover":name+" — NASA/JPL image";
 image.className=(name==="space"?"mv-spacecraft":"mv-contained")+" mv-fadein";
 requestAnimationFrame(()=>{image.style.opacity="1"});
 $("#mv-landscape").dataset.image=name;
 $("#mv-credit").innerHTML='<a target="_blank" rel="noopener" href="'+SOURCE[name]+'">NASA SOURCE ↗</a> · Fictional conversation / mission reconstruction';
}
function sceneStart(n){
 if(showingScene===n.id)return;
 showingScene=n.id;
 $("#mv-location").textContent=state.identity?"VOYAGER 1 · "+n.year:n.year;
 // No forced header revealing mission locations before the dialogue introduces them.
}
function setVisibility(show){$("#mv-dialogue").hidden=!show;$("#mv-back").hidden=!show||state.i===0;}
function speaker(who){
 const unknown=who==="UNKNOWN SIGNAL"||who==="VOYAGER 1"&&!state.identity;
 const label=who==="PLAYER"?player:unknown?"UNKNOWN SIGNAL":who;
 const avatar=who==="PLAYER"?'<span class="mq-avatar human" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#e8cb9e"/><path d="M8 57q4-16 24-16t24 16" fill="#557987"/><circle cx="32" cy="27" r="15" fill="#b77c55"/><path d="M17 26q0-18 15-18 17 0 15 20l-5-10q-10 7-25 8" fill="#322a2a"/><circle cx="27" cy="29" r="1.6" fill="#312326"/><circle cx="37" cy="29" r="1.6" fill="#312326"/><path d="M28 36q4 3 8 0" fill="none" stroke="#6a403d" stroke-width="1.8" stroke-linecap="round"/></svg></span>':unknown?'<span class="mv-unknown-avatar" aria-hidden="true">✦</span>':'<img class="mv-avatar-pic" src="'+IM.space+'" alt="">';
 $("#mv-speaker").innerHTML=avatar+'<b>'+esc(label)+'</b>';
}
function reveal(){state.identity=true;$("#mv-location").textContent="VOYAGER 1 · INTERSTELLAR SPACE";const el=$("#mv-reveal");el.hidden=false;el.innerHTML='<div class="mv-reveal-inner"><img src="'+IM.space+'" alt="Voyager 1"><span>NASA / JPL · 1977–PRESENT</span><strong>VOYAGER 1</strong><small>THE INTERSTELLAR TRAVELER</small></div>';wait=setTimeout(()=>{el.hidden=true;},2700);persist();}
function typeLine(content,onComplete){
 let target=$("#mv-text");target.textContent="";const words=content.split(/(\s+)/).filter(Boolean);let pos=0;let delay=reduced?0:43;
 $("#mv-next").textContent="CONTINUE →";
 if(!delay){target.textContent=content;if(onComplete)onComplete();return;}
 typing=setInterval(()=>{target.textContent+=words[pos++]||"";if(pos>=words.length){clearInterval(typing);typing=null;if(onComplete)onComplete();}},delay);
}
function showLine(b){
 $("#mv-activity").hidden=true;$("#mv-modal").hidden=true;setVisibility(true);
 speaker(b.who);
 const text=b.text.replaceAll("{name}",player);
 typeLine(text,b.reveal&&!state.identity?reveal:null);
}
function setFrame(name){
 const map={darkness:"space",launch:"space",jupiter:"jupiter",io:"io",saturn:"saturn",titan:"titan",earth:"earth",space:"space"};
 if(map[name])pic(map[name]);
 if(name==="darkness"){$("#mv-picture").style.visibility="hidden";}
 if(name==="launch"){const film=$("#mv-cinema");film.innerHTML='<div class="mv-launch-memory"><span>SEPTEMBER 5, 1977 · CAPE CANAVERAL</span><button data-v="launchFilm">VIEW HISTORICAL LAUNCH FILM ▷</button><small>NASA / JPL archival footage</small></div>';film.classList.add("mv-cinema-on");}
 else{$("#mv-cinema").classList.remove("mv-cinema-on");$("#mv-cinema").innerHTML="";}
}
function hold(b){
 setVisibility(false);$("#mv-activity").hidden=true;
 const c=$("#mv-cinema");c.classList.add("mv-cinema-on");c.innerHTML='<div class="mv-hold mv-hold-'+esc(b.kind)+'"><div class="mv-hold-visual"><span class="mv-hold-orbit"></span><span class="mv-hold-signal"></span></div><button data-v="skipHold" aria-label="Continue cinematic moment">CONTINUE →</button></div>';
 if(b.kind==="ioFilm"){pic("io");c.innerHTML='<div class="mv-plume-visual"><span class="mv-plume"></span><span class="mv-plume-2"></span><small>RECONSTRUCTION · NOT NASA FOOTAGE</small><button data-v="skipHold">CONTINUE →</button></div>';soundscape("ocean");}
 if(b.kind==="approach"){$("#mv-picture").style.visibility="visible";pic("space");}
 if(b.kind==="jupiterApproach")pic("jupiter");
 if(b.kind==="titanReveal")pic("titan");
 if(b.kind==="fadeToEarth")pic("earth");
 if(b.kind==="recordHold")pic("record");
 if(b.kind==="recordReturn")pic("space");
 if(b.kind==="ending"){pic("space");$("#mv-picture").classList.add("mv-ending");}
 let t=reduced?900:(b.duration||2500);wait=setTimeout(()=>{c.classList.remove("mv-cinema-on");c.innerHTML="";advance(true)},t);
}
function completeAction(){state.found[score[state.i].id]=true;persist();$("#mv-activity").hidden=true;setVisibility(true);advance(true)}
function overlay(body){setVisibility(false);const el=$("#mv-activity");el.hidden=false;el.innerHTML=body;el.scrollTop=0;}
function hotspot(x,y,id,title){return '<button class="mv-hotspot" data-v="found:'+id+'" style="left:'+x+'%;top:'+y+'%" aria-label="'+esc(title)+'"><span></span></button>';}
function photoAction(image,hint,hots,cta=""){
 pic(image);
 overlay('<div class="mv-find"><span class="mv-task">'+esc(hint)+'</span><div class="mv-focus" data-image="'+image+'">'+hotspot(hots[0],hots[1],hots[2],hots[3]||"Examine image")+'</div>'+cta+'</div>');
}
function simple(title,body,button="CONTINUE",next="complete"){
 overlay('<div class="mv-single"><div class="mv-single-body"><span class="mv-single-overline">'+title+'</span>'+body+'<button class="mq-btn primary" data-v="'+next+'">'+esc(button)+' →</button></div></div>');
}
function act(b){
 const id=b.id;let html="";
 if(id==="track"){overlay('<div class="mv-aim"><p>There it is. Follow that moving point.</p><button class="mv-glint" data-v="found:track" aria-label="Follow the small moving object"></button></div>');return;}
 if(id==="antenna"||id==="boom"||id==="findRecord"){
 pic("space");const pos=id==="antenna"?[51,44]:id==="boom"?[71,65]:[63,68];
 photoAction("space",b.hint,[...pos,id],'<div class="mv-optical">Move toward the gentle glint on the spacecraft.</div>');return;}
 if(id==="ioPlume"){photoAction("io",b.hint,[55,23,id,"Examine the plume at Io's edge"]);return;}
 if(id==="findEarth"){photoAction("earth",b.hint,[59,47,id,"Locate Earth in the Pale Blue Dot"]);return;}
 if(id==="saveEarth"){pic("earth");overlay('<div class="mv-savephoto"><button data-v="found:saveEarth">KEEP THIS PHOTO IN MY ARCHIVE ♡</button></div>');return;}
 if(id==="rings"){pic("saturn");simple("EXAMINE THE RINGS",'<img src="'+IM.saturn+'" alt="Saturn and its rings" class="mv-study-photo"><p>From far away, these rings look like smooth bands. Move closer to examine the layered structure.</p><input id="mv-zoom" type="range" min="0" max="100" value="0" aria-label="Magnify the rings"><p id="mv-range-label">Distant view</p>','RETURN TO VOYAGER');return;}
 if(id==="twins"){simple("TWO TRAJECTORIES",'<div class="mv-twins"><div><b>VOYAGER 1</b><span>JUPITER → SATURN / TITAN → OUT OF PLANETARY PLANE</span></div><div><b>VOYAGER 2</b><span>JUPITER → SATURN → URANUS → NEPTUNE</span></div></div><p>The routes were different by design. This is a schematic, not to scale.</p>','BACK TO THE CONVERSATION');return;}
 if(id==="pulsar"||id==="playback"){pic("record");const x=id==="pulsar"?34:64,y=id==="pulsar"?73:33;photoAction("record",id==="pulsar"?"Examine the radiating marks near the bottom of the cover.":"Examine the diagram showing how the record could be played.",[x,y,id,"Inspect the engraved "+id+" marks"]);return;}
 if(id==="greeting"){simple("A VOICE FROM EARTH",'<p>Recorded in 1977 by Nick Sagan. The original English greeting is preserved on the Golden Record.</p><audio controls preload="none" src="'+GREETING+'" aria-label="Original Golden Record English greeting"></audio><blockquote>“Hello from the children of planet Earth.”</blockquote><a href="https://commons.wikimedia.org/wiki/File:Voyager_Golden_Record_greeting_in_English.ogg" target="_blank" rel="noopener">Recording and public-domain attribution ↗</a>','I HEARD IT');return;}
 if(id==="greetingExplore"){simple("MANY LANGUAGES",'<p>There are 55 spoken-language greetings on the record. In Arabic, the greeting wishes that we might meet one day. These voices were recorded by real people.</p><p>Listen to the source collection to hear the variety of words and accents—not a synthetic imitation.</p><a target="_blank" rel="noopener" href="https://science.nasa.gov/mission/voyager/golden-record-contents/greetings/">NASA original greeting archive ↗</a>','CONTINUE');return;}
 if(id==="earthSound"){simple("THE SOUNDS OF EARTH",'<div class="mv-ocean"><span class="mv-wave one"></span><span class="mv-wave two"></span><span class="mv-wave three"></span></div><p>Imagine waves against a shore, birds overhead, and wind across the water. This is an original sound-design interpretation, not a recording taken from the Golden Record.</p><button data-v="ocean" class="mv-small-control">PLAY SHORT EARTH SOUNDSCAPE ▷</button><a target="_blank" rel="noopener" href="'+MUSIC+'">NASA inventory of the original sounds ↗</a><details class="mv-official-sounds"><summary>LISTEN TO NASA’S ORIGINAL SOUNDS OF EARTH COLLECTION</summary><iframe loading="lazy" title="NASA Golden Record Sounds of Earth via SoundCloud" src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F129030648&amp;color=%23bca06c&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false" allow="autoplay" referrerpolicy="no-referrer" height="166"></iframe></details>','RETURN TO VOYAGER');return;}
 if(id==="recordImages"){simple("IMAGES OF HOME",'<div class="mv-record-images"><div class="mv-record-card"><img src="'+IM.earth+'" alt="Pale Blue Dot, a separate Voyager photograph"><span>EARTH · THE WORLD WE KNOW</span></div><div class="mv-record-card"><div class="mv-glyph">◯<small>DNA · LIFE · TIME</small></div><span>SCIENTIFIC IDEAS · ILLUSTRATED INTERPRETATION</span></div></div><p>The actual record contains 115 encoded pictures. This sequence visualizes themes; it does not falsely pass other Voyager photographs off as frames from the record.</p><a target="_blank" rel="noopener" href="https://science.nasa.gov/mission/voyager/golden-record-contents/images/">Browse the genuine 115-image inventory ↗</a>','RETURN TO VOYAGER');return;}
 if(id==="recordMusic"){simple("MUSIC CHOSEN FOR THE RECORD",'<div class="mv-music-list"><p><b>Bach</b> · Brandenburg Concerto No. 2 <small>Germany</small></p><p><b>Goro Yamaguchi</b> · “Tsuru No Sugomori” <small>Japan</small></p><p><b>Valya Balkanska</b> · “Izlel je Delyo Hagdutin” <small>Bulgaria</small></p><p><b>Blind Willie Johnson</b> · “Dark Was the Night” <small>United States</small></p></div><p>These are titles of actual selections. Original performances have not been embedded without cleared playback rights.</p><a target="_blank" rel="noopener" href="'+MUSIC+'">View NASA’s complete track list ↗</a>','RETURN TO VOYAGER');return;}
 if(["particles","cosmic","plasma"].includes(id)){
 const prompts={particles:["SOLAR-ORIGIN PARTICLES","The particles associated with the solar wind dropped markedly around the boundary."],cosmic:["GALACTIC COSMIC RAYS","Higher-energy particles from beyond the heliosphere increased."],plasma:["PLASMA DENSITY","Later plasma-wave measurements supported an interstellar plasma environment."]};
 const t=prompts[id];simple("READ THE INSTRUMENTS",'<div class="mv-data"><span>MEASUREMENT FROM VOYAGER</span><strong>'+t[0]+'</strong><div class="mv-datawave"></div><p>'+t[1]+'</p></div><small>Illustrative pattern, not a plot of raw NASA telemetry.</small>','REPORT THE CHANGE');return;}
 if(id==="heliosphere"){simple("THE HELIOSPHERE",'<div class="mv-helio"><div class="mv-helio-outer"><div class="mv-helio-inner"><span>☀</span><small>THE PLANETS</small></div></div><div class="mv-helio-traveler">✦ VOYAGER 1</div></div><p>The heliopause is the outer boundary of the Sun’s solar-wind bubble. This schematic is not to scale; the original NASA chart is preserved as a production reference.</p><a href="https://science.nasa.gov/mission/voyager/" target="_blank" rel="noopener">Voyager science source ↗</a>','RETURN TO VOYAGER');return;}
 if(id==="binary"){simple("ENCODE A TINY MESSAGE",'<p>Binary uses two symbols: 0 and 1. We will turn the letters <strong>H</strong> and <strong>I</strong> into two eight-bit numbers.</p><div class="mv-binary"><span>H = <code>01001000</code></span><span>I = <code>01001001</code></span></div><button class="mv-small-control" data-v="beep">HEAR THE FICTIONAL SIGNAL ▷</button><p class="mv-subnote">This is a simple teaching example, not Voyager’s actual command format.</p>','SEND OUR DEMONSTRATION');return;}
 if(id==="uplink"||id==="downlink"){simple(id==="uplink"?"THE OUTBOUND SIGNAL":"THE RETURN SIGNAL",'<div class="mv-transmission"><span>EARTH</span><div><b class="mv-packet"></b></div><span>VOYAGER 1</span></div><p>Travel time in this animation is compressed. The real one-way signal delay is approximately 24 hours at one light-day distance.</p><button class="mv-small-control" data-v="beep">PLAY A FICTIONAL RADIO PULSE ▷</button>','RETURN TO VOYAGER');return;}
 if(id==="powerChoice"){simple("KEEPING SCIENCE ALIVE",'<p>The energy supply is declining. Engineers have to preserve valuable measurements without placing spacecraft safety at risk.</p><div class="mv-power-options"><button data-v="choosePower:science">KEEP SCIENCE INSTRUMENTS OPERATING</button><button data-v="choosePower:heat">PROTECT HEAT AND COMMUNICATIONS</button><button data-v="choosePower:cameras">RESTART THE CAMERAS</button></div><p id="mv-power-feedback">What would you prioritize?</p>','CONTINUE', "powerDone");return;}
 if(id==="switches"){simple("A VERY LONG MISSION",'<div class="mv-switches"><p><b>1977</b> · Launch and planetary instruments active</p><p><b>1990</b> · Cameras retired after the final planetary portrait</p><p><b>2012</b> · Interstellar measurements continue</p><p><b>2024</b> · Engineers recover readable data</p><p><b>2026</b> · Low-energy charged particle instrument switched off to conserve power</p></div><p>These are selected documented milestones, not a complete hardware-status report.</p>','CONTINUE');return;}
 simple("A QUESTION",'<p>'+esc(b.hint)+'</p>','RETURN');
}
function choose(b){
 const answers=b.options;
 setVisibility(false);
 $("#mv-activity").hidden=false;
 $("#mv-activity").innerHTML='<div class="mv-choice"><p>'+esc(b.question)+'</p>'+answers.map((a,i)=>'<button data-v="choose:'+i+'">'+esc(a.label)+'</button>').join("")+'</div>';
}
function process(){
 clean();
 if(state.i<0||state.i>=score.length){finish();return;}
 const b=score[state.i],scene=scenes[b.scene];sceneStart(scene);
 if(!showingFrame)pic(scene.image);
 if(b.type==="frame"){setFrame(b.name);advance(true);return;}
 if(b.type==="line"){showLine(b);return;}
 if(b.type==="hold"){hold(b);return;}
 if(b.type==="action"){if(state.found[b.id]){advance(true);return;}act(b);return;}
 if(b.type==="choice"){choose(b);return;}
 advance(true);
}
function advance(force=false){
 if(!force&&typing){clearInterval(typing);typing=null;$("#mv-text").textContent=score[state.i]?.text?.replaceAll("{name}",player)||"";if(score[state.i]?.reveal&&!state.identity)reveal();return;}
 clearInterval(typing);typing=null;state.i++;persist();process();
}
function back(){
 clean();if(state.i===0)return;state.i--;while(state.i>0&&["frame","hold"].includes(score[state.i]?.type))state.i--;persist();process();
}
function finish(){
 clean();stopExternal();
 $("#mv-dialogue").hidden=true;$("#mv-activity").hidden=true;
 $("#mv-modal").hidden=false;$("#mv-modal").innerHTML='<div class="mv-finale"><span>MIRA QUEST</span><h2>Their stories continue.</h2><p>The spacecraft is still traveling. The record is still aboard.</p><button data-v="replay">REVISIT VOYAGER →</button><button data-v="hub">EXPLORE OTHER STORIES</button></div>';
}
function stopExternal(){try{activeAudio?.pause()}catch(e){}activeAudio=null;}
function archive(){
 const cards=state.archive.length?state.archive:["space"];$("#mv-modal").hidden=false;
 $("#mv-modal").innerHTML='<div class="mv-archive"><h2>Memories worth keeping</h2><p>Original NASA images and artist concepts, with their sources.</p><div>'+cards.filter(x=>IM[x]).map(x=>'<a target="_blank" rel="noopener" href="'+SOURCE[x]+'"><img src="'+IM[x]+'" alt="'+esc(x)+'"><b>'+esc(x==="earth"?"Pale Blue Dot":x==="record"?"Golden Record":x.toUpperCase())+'</b></a>').join("")+'</div><button data-v="closeModal">RETURN TO THE JOURNEY →</button></div>';
}
function showFilm(){
 $("#mv-modal").hidden=false;$("#mv-modal").innerHTML='<div class="mv-film"><button class="mv-close" data-v="closeModal">CLOSE ×</button><h2>Voyager 1 launches · September 5, 1977</h2><video controls playsinline preload="none" poster="'+IM.space+'" src="'+LAUNCH+'"></video><p>Authentic NASA/JPL launch footage, provided through Wikimedia Commons. Playback requires internet access.</p></div>';
}
function click(e){
 const b=e.target.closest("[data-v]");if(!b||!host?.contains(b))return;const [act,val]=b.dataset.v.split(":");
 if(act==="next"){advance();return;}
 if(act==="back"){back();return;}
 if(act==="skipHold"){clearTimeout(wait);$("#mv-cinema").innerHTML="";$("#mv-cinema").classList.remove("mv-cinema-on");advance(true);return;}
 if(act==="found"){audio("notice");if(val==="saveEarth"){if(!state.archive.includes("earth"))state.archive.push("earth");}
 if(val==="findRecord"||val==="pulsar"||val==="playback"){if(!state.archive.includes("record"))state.archive.push("record");}
 if(val==="ioPlume"&&!state.archive.includes("io"))state.archive.push("io");
 completeAction();return;}
 if(act==="complete"){completeAction();return;}
 if(act==="powerDone"){if(!state.answer.power){$("#mv-power-feedback").textContent="Choose one priority first, then return to Voyager.";return;}completeAction();return;}
 if(act==="choosePower"){
 state.answer.power=val;const response=val==="cameras"?"The imaging system was retired for good reasons. Bringing it back consumes power without providing useful planetary science.":val==="heat"?"A good instinct. Without sufficient heat, power and a reliable radio, science data may never return to Earth.":"Scientific measurements are invaluable. But the spacecraft must remain stable enough to transmit them.";$("#mv-power-feedback").textContent=response;persist();return;}
 if(act==="choose"){
 const o=score[state.i]?.options?.[Number(val)];if(!o)return;state.answer[score[state.i].scene]=o.flag||o.branch||val;
 const text=o.reply;$("#mv-activity").hidden=true;setVisibility(true);speaker("VOYAGER 1");typeLine(text);
 $("#mv-next").dataset.v="choiceNext";persist();return;}
 if(act==="choiceNext"){if(typing){clearInterval(typing);typing=null;$("#mv-text").textContent=score[state.i]?.options?.find(o=>o.flag===state.answer[score[state.i].scene]||o.branch===state.answer[score[state.i].scene])?.reply||$("#mv-text").textContent;return;}$("#mv-next").dataset.v="next";advance(true);return;}
 if(act==="beep"){audio("signal");return;}
 if(act==="ocean"){soundscape("ocean");return;}
 if(act==="launchFilm"){showFilm();return;}
 if(act==="archive"){archive();return;}
 if(act==="closeModal"){stopExternal();$("#mv-modal").hidden=true;return;}
 if(act==="hub"){clean();stopExternal();exit&&exit();return;}
 if(act==="sound"){muted=!muted;$("#mv-header");b.textContent=muted?"SOUND OFF":"◖))";return;}
 if(act==="replay"){state={i:0,found:{},archive:[],answer:{},identity:false};showingScene="";showingFrame="";persist();$("#mv-modal").hidden=true;process();return;}
}
function onChange(e){
 if(e.target.id==="mv-zoom"){const img=$(".mv-study-photo");if(img)img.style.transform="scale("+(1+(+e.target.value)/130)+")";$("#mv-range-label").textContent=(+e.target.value>55?"Closer view: bands, gaps and ringlets":"Distant view: smooth-looking rings");}
}
function keys(e){if(!host||!$(".mv-screen")||e.repeat||e.altKey||e.ctrlKey||e.metaKey||["BUTTON","A","INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;if(e.key==="Enter"||e.key===" "){e.preventDefault();const b=score[state.i];if(b?.type==="line")advance();}}
function init(el,opts){
 host=el;exit=opts.onExit;player=opts.name||"Explorer";reduced=!!opts.reduced;
 getScore();if(!score.length){host.textContent="Voyager story unavailable.";return;}
 if(!host.dataset.mvBound){host.addEventListener("click",click);host.addEventListener("input",onChange);document.addEventListener("keydown",keys);host.dataset.mvBound="1";}
 try{let d=JSON.parse(localStorage.getItem(store)||"null");if(d&&Number.isInteger(d.i)&&d.i>=0&&d.i<score.length)state={...state,...d};}catch(e){}
 drawn=false;showingFrame="";showingScene="";base();
 process();
}
window.MIRA_VOYAGER={enter:init,restart(){state={i:0,found:{},archive:[],answer:{},identity:false};persist();if(host){showingFrame="";showingScene="";process();}}};
})();

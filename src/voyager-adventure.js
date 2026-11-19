/* MIRA Quest 2 · Voyager Adventure. Historical facts grounded in NASA. Fictional conversations. */
(function(){
'use strict';
const rootId='game', B='assets/voyager/';
const photo={ship:'voyager-space.jpg',jupiter:'jupiter.jpg',io:'io.jpg',saturn:'saturn.jpg',titan:'titan.jpg',earth:'pale-blue-dot.jpg',record:'golden-record.jpg'};
const sources={ship:'https://science.nasa.gov/mission/voyager/',jupiter:'https://science.nasa.gov/mission/voyager/images-voyager-took/',io:'https://science.nasa.gov/photojournal/volcanic-eruptions-on-io/',saturn:'https://science.nasa.gov/mission/voyager/images-voyager-took/',titan:'https://science.nasa.gov/mission/voyager/images-voyager-took/',earth:'https://science.nasa.gov/resource/voyager-pale-blue-dot-download/',record:'https://science.nasa.gov/mission/voyager/golden-record-contents/'};
const Q=(who,text)=>({who,text});
const V=t=>Q('VOYAGER 1',t),P=t=>Q('PLAYER',t),N=t=>Q('SCENE',t);
const chapters=[
{id:'encounter',title:'A glint in the dark',era:'2026 · INTERSTELLAR SPACE',image:'ship',intro:[
N('Darkness. A thin reflection crosses the field of view. Something metallic is moving through it.'),
P('Wait. Did something just pass us?'),
V('Your observation was accurate. I am traveling outward at roughly seventeen kilometers per second relative to the Sun.'),
P('You said that awfully calmly for something moving sixty-one thousand kilometers an hour. Who are you?'),
V('I was launched from Earth on September 5, 1977. My designation is Voyager 1.'),
P('1977? You are almost fifty years old? How are you still here?'),
V('My engineers planned a mission to Jupiter and Saturn. They built substantial redundancy into my systems. The work on Earth has continued far beyond the original encounters.'),
P('And what exactly do you do all the way out here?'),
V('That depends on which part of my history you would like to examine. First, can you identify what you are looking at?')
],kind:'ship',prompt:'Examine the spacecraft',after:[
P('That enormous dish is how you speak to Earth. And that long structure is for instruments, not steering.'),
V('Correct. My high-gain antenna is still essential. My motion does not require my engines to run continuously.'),
P('So no steering wheel, and no need to keep accelerating. That is somehow even stranger.'),
V('Would you like to see what this hardware was originally built to investigate?')
],questions:[['How do you keep moving without fuel?','In space, my trajectory continues without constant thrust. Planetary gravity changed my speed and direction during the flybys; small thrusters can adjust orientation.'],['Do you ever stop for maintenance?','No one can visit for repairs. Engineers diagnose faults remotely, adjust software, and find ways to work around aging hardware.']]},
{id:'jupiter',title:'The unexpected discovery',era:'1979 · JUPITER & IO',image:'jupiter',intro:[
N('A real Voyager-era view of Jupiter fills the screen. The Great Red Spot turns into view.'),
P('That looks unreal. I know it is a planet, but the clouds look like liquid paint.'),
V('Jupiter is a gas giant. My cameras recorded storms and details of atmospheric circulation that could not be seen nearly as clearly from Earth.'),
P('Did you fly through that enormous red storm?'),
V('No. My trajectory kept me safely above the atmosphere. An unexpected discovery arrived from one of Jupiter’s moons instead.'),
P('A moon outshone Jupiter? I have to see this.'),
V('Look closely at the edge of Io. Do not assume everything beyond the limb is background.')
],kind:'io',prompt:'Inspect the actual Voyager photograph of Io',after:[
P('Is that a plume? Material is coming off the moon!'),
V('Active volcanism. Voyager 1 returned the first direct observations of an erupting volcano beyond Earth.'),
P('But that far from the Sun? How is there enough heat?'),
V('Jupiter’s gravity, together with orbital interactions involving neighboring moons, repeatedly flexes Io. Tidal heating can generate extraordinary internal energy.'),
P('We traveled to a giant planet and discovered a volcanic moon. That is the kind of surprise I want from space exploration.'),
V('It changed how scientists considered the possible activity of distant worlds. And Jupiter provided the gravity assist that carried me toward Saturn.')
],questions:[['Could other moons have internal oceans?','Some icy moons experience tidal heating too. It can help maintain liquid water below icy surfaces, even far from the Sun.'],['Was the eruption predicted?','Strong tidal heating was predicted shortly before the flyby. The photographs made the physical process unmistakably real.']]},
{id:'saturn',title:'The questions left behind',era:'1980 · SATURN & TITAN',image:'saturn',intro:[
N('A real spacecraft image of Saturn emerges from black. Thin rings stretch across the screen.'),
P('All those rings. I keep expecting them to look like a solid sheet.'),
V('They consist of countless particles of ice and rock. My images showed narrow ringlets, gaps, and elaborate structure.'),
P('And after seeing this, you were going to Neptune?'),
V('Not I. My trajectory included a close encounter with Titan. That choice sent me away from the plane of the planets.'),
P('You had to give up the other planets?'),
V('There were different objectives. My twin, Voyager 2, continued on to Uranus and Neptune.'),
P('You have a twin?! You really buried the lead there.'),
V('Voyager 2 launched sixteen days before me. Different trajectories made complementary discoveries possible.'),
P('What did Titan show you?'),
V('Inspect the image. See if its surface reveals itself.')
],kind:'titan',prompt:'Investigate Titan’s veil',after:[
P('It is all haze. I cannot see a thing underneath.'),
V('Neither could my cameras. That was not a failed encounter. Measurements of Titan’s dense atmosphere were valuable, and they left questions for later spacecraft.'),
P('So the last planet you ever visited left you wanting more.'),
V('Scientific encounters often do. Cassini–Huygens returned decades later with the instruments needed to investigate Titan in greater detail.'),
P('And your twin kept traveling toward planets you would never see.'),
V('Yes. We took different paths. Neither story ended with our last planetary encounter.')
],questions:[['Did you ever communicate directly with Voyager 2?','No conversation between us. Earth’s Deep Space Network communicates with each spacecraft separately.'],['Why choose Titan instead of Neptune?','The close Titan flyby was a major scientific objective. The trajectory made a later Uranus or Neptune encounter impossible for me.']]},
{id:'portrait',title:'Find home',era:'FEBRUARY 14, 1990 · 6 BILLION KM',image:'earth',intro:[
N('A very dark archival frame. Scattered sunlight cuts diagonally across it.'),
P('Are you sure this is the picture? I can hardly see anything.'),
V('The imaging team instructed me to take a final family portrait of the planets. Earth is inside this photograph.'),
P('You want me to find Earth? Where?'),
V('Look carefully. At that distance, it occupies less than a pixel. The photograph is real, not a reconstruction.')
],kind:'earth',prompt:'Search the original Pale Blue Dot photograph',after:[
P('That tiny point is Earth? All of us?'),
V('Yes. At the time of the photograph, every person on Earth lived on that point.'),
P('I cannot stop looking at it. Jupiter had storms bigger than our world. Saturn had rings that filled the sky. And this... is home.'),
V('You know that place in ways my camera cannot. I saw only reflected light.'),
P('Do you remember what it looks like now?'),
V('My cameras were switched off after the 1990 imaging campaign. There are no new pictures from me.'),
P('I am glad they turned you around once before the cameras went quiet.')
],questions:[['Why shut off the cameras?','With the planetary flybys over, imaging no longer provided useful close-range science. Keeping other instruments operating became the higher priority.'],['Did you know which dot was us?','The camera orientation and planned imaging sequence identified Earth’s location. An image by itself does not reveal everything about the world it records.']]},
{id:'record',title:'A message from that dot',era:'THE GOLDEN RECORD · ABOARD SINCE 1977',image:'record',intro:[
N('A golden disc catches the light against the spacecraft’s dark body. Its cover bears strange engraved diagrams.'),
P('Hold on. Was that attached to you the whole time?'),
V('A gold-plated copper phonograph record. Each Voyager spacecraft carries one.'),
P('A record? You went to Jupiter carrying an LP?'),
V('Its purpose is not to help me navigate or gather data. The creators hoped it might tell a possible finder something about Earth.'),
P('Someone who is not human?'),
V('Possibly. There is no evidence anyone will find it. A team led by Carl Sagan assembled the contents knowing that uncertainty.'),
P('Then why include it?'),
V('Perhaps the question is not only whether it will be found. Examine the cover and the message it protects.')
],kind:'record',prompt:'Explore the record and decipher its cover',after:[
P('A pulsar map. A way to locate our Sun. Instructions for playing it. They really tried to explain Earth from scratch.'),
V('The record carries 115 images, greetings in 55 languages, natural sounds, music, and messages representing a small selection of life on Earth.'),
P('They put directions home on something they knew might never be found.'),
V('It was intended for a possible future audience, but it also records what some humans chose to say about their own world.'),
P('You spent decades looking outward, and you were carrying something about us the whole time.'),
V('It has been aboard since launch. It does not depend on my remaining electrical power to keep existing.')
],questions:[['Could it outlast humanity?','It might survive for an exceptionally long time in space, potentially far longer than the civilization that made it. Its eventual preservation and discovery are uncertain.'],['How would anyone play it?','The engraved cover includes a stylus-position diagram and instructions encoded with physical units, intended for a sufficiently knowledgeable finder.']]},
{id:'boundary',title:'Crossing the invisible',era:'AUGUST 25, 2012 · THE HELIOPAUSE',image:'ship',intro:[
N('The camera pulls back from the planets. No surface, no line in the dark. Only instrument readings.'),
P('So which picture shows the moment you left the Solar System?'),
V('There is no picture. I crossed the heliopause in August 2012. Scientists established the crossing from particle and plasma measurements.'),
P('An invisible border? I thought you would see something different.'),
V('The boundary separates the region dominated by the solar wind from the surrounding interstellar environment.'),
P('How do you tell which side you are on?'),
V('Compare the measurements. Look for a change the cameras could never record.')
],kind:'boundary',prompt:'Compare the instrument measurements',after:[
P('The particle readings changed. The boundary was in the data, not in a photo.'),
V('Correct. It was the first time a spacecraft directly sampled the environment beyond the heliopause.'),
P('So you are completely beyond the Solar System?'),
V('Beyond the heliosphere, yes. The Sun’s gravitational influence and the distant Oort Cloud extend much farther. “Outside” depends on the boundary you are using.'),
P('The universe keeps refusing to have convenient edges.')
],questions:[['Is interstellar space empty?','No. It contains particles, plasma, magnetic fields, dust and radiation, although the average density is extremely low.'],['Is Voyager 2 out there as well?','Yes. Voyager 2 crossed the heliopause in November 2018, and its instruments offer valuable measurements along a different trajectory.']]},
{id:'signal',title:'The long conversation',era:'NOVEMBER 2026 · DEEP SPACE NETWORK',image:'ship',intro:[
N('A huge radio antenna on Earth turns toward a point no human eye can see. A faint carrier tone follows.'),
P('If you are so far away, how can anyone still talk to you?'),
V('Through the Deep Space Network: large radio antennas in California, Spain, and Australia.'),
P('How long does a message take?'),
V('On November 18, 2026, my distance reached one light-day from Earth. A radio signal needs roughly twenty-four hours in either direction.'),
P('Two days for a question and an answer. That makes our conversation a rather unrealistic luxury.'),
V('It is an imagined conversation. Real commands must be prepared carefully and carried out after transmission.'),
P('Can I try sending one?'),
V('Encode a short message. The demonstration will compress the waiting time, but show you why engineers cannot simply ask for an instant reply.')
],kind:'signal',prompt:'Encode a message and send it across one light-day',after:[
P('That message traveled across an outrageous amount of nothing before reaching you.'),
V('And the return signal requires the same travel time. Low data rates, power limits, distance and spacecraft health all constrain communication.'),
P('Has Earth ever lost your signal?'),
V('There have been communication interruptions and faults. Engineers have recovered contact and data by investigating systems designed many decades earlier.'),
P('What about right now?'),
V('As of November 18, 2026, NASA reported an issue affecting engineering and science data. The carrier signal and trajectory remain useful while engineers investigate.'),
P('That feels very different from just reading “still active” on a mission page.'),
V('A spacecraft can continue traveling while a team on Earth works to understand what it can and cannot send.')
],questions:[['Why not send a stronger signal?','Available spacecraft electrical power is limited, and the radio hardware and antenna were designed decades ago. Sensitive receiving antennas on Earth do much of the work.'],['Can you fix yourself if nobody hears you?','Autonomous fault-protection routines can respond to some conditions. Other faults require commands from Earth, sometimes after painstaking diagnosis.']]},
{id:'power',title:'What stays on',era:'ENGINEERING · DECISIONS OVER DECADES',image:'ship',intro:[
N('An engineering diagram replaces the stars. Small components illuminate one after another.'),
P('It is amazing that any of this is still working. You do not have solar panels, do you?'),
V('Sunlight is too weak at these distances for my spacecraft design. I receive electrical power from radioisotope thermoelectric generators, using heat from the decay of plutonium-238.'),
P('So the source keeps producing heat, but less electricity every year?'),
V('Yes. Engineers have progressively turned off instruments and equipment to conserve power and preserve useful science.'),
P('That sounds like a series of increasingly difficult choices.'),
V('Try one of those decisions. There is no magical repair button.')
],kind:'power',prompt:'Balance power against scientific observations',after:[
P('We cannot keep everything on. Every choice preserves something and gives up something else.'),
V('Exactly. Instruments and supporting systems have been managed over many years. Decisions weigh scientific value, safety, thermal conditions and available electricity.'),
P('What happens when there is not enough power left to talk to Earth?'),
V('My radio and instruments will eventually stop. My trajectory will not.'),
P('That is a strange kind of goodbye.'),
V('The observations already transmitted will remain available to study.')
],questions:[['Does the spacecraft need oiling?','Some mechanisms were built with lubricants and materials suitable for space and long service lives. But no periodic servicing is possible.'],['Will the record stop working when power ends?','It is a passive physical object. Its continued existence does not require spacecraft power, although nothing guarantees its indefinite survival.']]},
{id:'future',title:'The long way onward',era:'FUTURE · BEYOND ANY HUMAN LIFETIME',image:'ship',intro:[
N('A single spacecraft crosses a field of faint stars. The camera slowly loses it in the darkness.'),
P('Where are you actually going? Surely there must be something ahead.'),
V('My present trajectory does not aim to enter orbit around a star. In roughly forty thousand years, I will pass comparatively near Gliese 445.'),
P('How near?'),
V('Approximately 1.6 to 1.7 light-years, according to the trajectory estimates. It is not a close planetary flyby.'),
P('Forty thousand years for the next star encounter, and even then you are still more than a light-year away?'),
V('Space between stars is immense. It will take far longer than the expected operational life of my instruments.'),
P('So eventually Earth will stop hearing from you, but you keep going with that record.'),
V('Yes. The spacecraft’s movement is not maintained by its transmitter.'),
P('Can I ask you one last thing?'),
V('Of course. But I would like to ask you something first.'),
V('I have been away from Earth since 1977. You know the world I left much better than I do. What would you want me to know about it today?')
],kind:'future',prompt:'Choose what you would tell a traveler from Earth',after:[
P('I came here wondering how a little machine could travel so fast. Now I cannot stop thinking about the people who decided to send it at all.'),
V('The encounter images, scientific measurements and records of the mission will remain on Earth. The disc will continue with the spacecraft as long as it survives.'),
P('Two different kinds of memory. One stays home. The other keeps going.'),
V('That is a fair description.'),
P('Good journey, Voyager.'),
V('My trajectory continues.'),
N('The spacecraft disappears into the starfield. No percentage. No countdown. Just distance.')
],questions:[['If humans catch up someday, what would they find?','The spacecraft itself, perhaps its record, and hardware shaped by a very long journey. Its condition would depend on events impossible to predict now.'],['What would you ask a person from the future?','What have you learned about the worlds I once passed? And what do you know now about the place that sent me?']]}
];
let root,onExit,player='Explorer',reduce=false;let lastFx=0;function playFx(file){try{const sound=new Audio('assets/audio/'+file+'.mp3');sound.volume=.25;sound.play().catch(()=>{});}catch(e){}}
const KEY='mira-quest2-voyager-adventure';
let state={chapter:0,phase:'intro',line:0,done:{},seen:{},reply:'',archive:false,inspected:false,focus:0};
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&Number.isInteger(v.chapter)&&v.chapter<chapters.length)state={...state,...v,archive:false,inspected:false,reply:''};}catch(e){}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ch=()=>chapters[state.chapter],key=()=>ch().id,seen=()=>state.seen[key()]||[];
const remember=v=>{let arr=seen();if(!arr.includes(v))state.seen[key()]=[...arr,v];save();};
function save(){try{localStorage.setItem(KEY,JSON.stringify({chapter:state.chapter,phase:state.phase,line:state.line,done:state.done,seen:state.seen}))}catch(e){}}
function img(k,cls=''){return '<img class="'+cls+'" src="'+B+photo[k]+'" alt="'+esc(k)+'" draggable="false">'}
function media(name,description,kind='VIDEO'){
return '<div class="va-media"><span>MEDIA SLOT · '+esc(kind)+'</span><b>'+esc(name)+'</b><p>'+esc(description)+'</p><small>Storyboard placeholder — replace with licensed NASA media or original production</small></div>';
}
function header(c){return '<header class="va-header"><span class="va-brand">MIRA QUEST</span><span>'+esc(c.era)+'</span><div><button data-va="archive">ARCHIVE</button><button data-va="exit">ALL MISSIONS</button></div></header>';}
function dialogue(){
 const c=ch(),set=state.phase==='intro'?c.intro:c.after,item=set[state.line],isLast=state.line===set.length-1;
 const label=item.who==='PLAYER'?player:item.who;
 const choice=state.chapter===chapters.length-1&&state.phase==='after'&&state.line===0?(seen().includes('life')?'We have sent new spacecraft to worlds you never reached. We are still discovering how much we do not know.':seen().includes('earth')?'Earth is still filled with oceans, cities, living things, and people looking up. It is complicated and beautiful.':seen().includes('record')?'I would tell a future finder that Earth held people who wanted to understand the universe, even when they did not know if anyone else was listening.':null):null;
 const box='<section class="mq-dialogue mq-card va-dialogue"><div class="mq-speaker"><b>'+esc(label)+'</b></div><p class="mq-speech">'+esc(choice||item.text)+'</p>'+(state.reply?'<p class="va-reply">'+esc(state.reply)+'</p>':'')+
 '<div class="mq-dialogue-actions va-dialogue-actions"><button class="mq-btn subtle" data-va="back" '+(state.line===0?'disabled':'')+'>← BACK</button><button class="mq-btn primary" data-va="next">'+(isLast?(state.phase==='intro'?'INVESTIGATE →':state.chapter===chapters.length-1?'COMPLETE JOURNEY →':'CONTINUE JOURNEY →'):'CONTINUE →')+'</button></div></section>';
 return box;
}
function tool(title,body,button='CONTINUE',disabled=false){
 return '<section class="va-tool"><span class="va-overline">INTERACTIVE INVESTIGATION</span><h2>'+title+'</h2>'+body+'<div class="va-tool-actions"><button data-va="done" class="v-btn" '+(disabled?'disabled':'')+'>'+button+' →</button></div></section>';
}
function select(id,title,desc){return '<button class="va-select '+(seen().includes(id)?'va-done':'')+'" data-va="select:'+id+'"><strong>'+esc(title)+'</strong><small>'+esc(desc)+'</small></button>'}
function inspectTool(){
 const c=ch(),k=c.kind,S=seen(),has=n=>S.includes(n);
 if(k==='ship'){
 return tool('Investigate the unfamiliar spacecraft',img('ship','va-side-image')+'<div class="va-choices">'+select('dish','High-gain antenna','A narrow radio link back to Earth')+select('power','Radioisotope generators','Electricity from radioactive decay')+select('instruments','Scientific instruments','Measurements beyond visible light')+'</div>'+media('Voyager flypast and launch flashback','1977 launch footage, camera movement past antenna and instrument booms, spacecraft signal sound.','VIDEO / SOUND')+'<p class="va-feedback">'+(S.length?'Examined '+S.length+' of 3 systems. Each has a different role.':'Choose at least two components to identify what Voyager needs for a journey with no repair visits.')+'</p>','ESTABLISH CONTACT',S.length<2);
 }
 if(k==='io'){
 return tool('Find what was happening on Io',img('io','va-feature-image')+'<div class="va-choices">'+select('surface','Inspect the orange surface','Sulfur compounds create striking colors')+select('plume','Inspect the plume at the moon’s edge','Volcanic material rising above the surface')+select('heating','Investigate the source of heat','Jupiter’s gravity repeatedly flexes Io')+'</div>'+media('Io eruption reconstruction','Plume animation aligned to authentic Voyager image. Accompany with quiet instrument scan sounds.','VIDEO / SOUND')+(has('plume')?'<p class="va-feedback">A plume rises beyond the horizon. This is evidence of an active eruption.</p>':'<p class="va-feedback">The critical observation is not the color. Look beyond the moon’s edge.</p>'),'REVEAL THE DISCOVERY',!has('plume'));
 }
 if(k==='titan'){
 return tool('What did the last encounter reveal?',img('titan','va-feature-image')+'<div class="va-choices">'+select('atmosphere','Study the atmosphere','Dense, hazy atmosphere measured by Voyager')+select('surface','Try to inspect the surface','The camera cannot see through the haze')+select('trajectory','Examine the mission decision','The close Titan encounter redirects Voyager 1')+'</div>'+media('Saturn approach and Titan flyby','Saturn ring approach animation; cut from rings to Titan haze. Actual Voyager imagery remains separately labeled.','VIDEO')+'<p class="va-feedback">'+(has('surface')?'The lack of a surface photograph is part of the discovery. A future mission must answer the question.':'The visible surface may not be the most useful result.')+'</p>','CONTINUE WITH THE EVIDENCE',!has('atmosphere')||!has('surface'));
 }
 if(k==='earth'){
 return tool('Search the Pale Blue Dot',img('earth','va-feature-image va-pale')+'<div class="va-pale-overlay"><button class="va-earthspot" data-va="select:earthfound" aria-label="Examine small bright dot">⌖</button></div><p class="va-feedback">'+(has('earthfound')?'FOUND: Earth. The original planet occupies less than one pixel. You can examine the source in the archive.':'Locate the tiny point in the bright band. The target is intentionally small.')+'</p>','SAVE THE IMAGE',!has('earthfound'));
 }
 if(k==='record'){
 return tool('Explore the Golden Record',img('record','va-record-image')+'<div class="va-choices">'+select('pulsars','The radial lines','Pulsar map: a route back toward the Sun')+select('playback','The diagrams','Instructions intended to explain playback')+select('images','115 images','Life, people, science, landscapes and organisms')+select('greetings','55 spoken languages','Voices greeting an unknown listener')+select('sounds','Sounds of Earth','Surf, wind, thunder, birds and whales')+select('music','Music from Earth','Curated selections from multiple cultures and eras')+'</div>'+media('Golden Record interactive player','Reserved for individual tracks, waveform, original NASA source attribution, and play/pause controls. No copyrighted track embedded yet.','AUDIO')+'<p class="va-feedback">Explore at least four areas. Each item contributes a different piece of Earth.</p>','CLOSE THE RECORD',S.length<4);
 }
 if(k==='boundary'){
 return tool('Read what the camera cannot see','<div class="va-readings"><div><small>BEFORE THE BOUNDARY</small><strong>Solar-origin particles</strong><span>More abundant</span></div><div><small>BEYOND THE BOUNDARY</small><strong>Interstellar particles</strong><span>More abundant</span></div></div><div class="va-choices">'+select('solar','Compare solar particles','Sharp change in particles from the Sun')+select('cosmic','Compare interstellar particles','Increase in galactic cosmic rays')+select('plasma','Read plasma measurements','Evidence for a denser interstellar plasma')+'</div>'+media('Heliosphere animation','Use supplied NASA heliosphere diagram with interactive labels and boundary transition.','ANIMATION'),'CONFIRM THE CROSSING',S.length<2);
 }
 if(k==='signal'){
 const bits=(S.includes('send')?'01001000 01001001':'01001000 01001001');
 return tool('Send a message across deep space','<div class="va-radio"><span>EARTH → VOYAGER 1</span><strong>HI</strong><code>'+bits+'</code><span>SIMULATED UPLINK · BINARY ENCODING</span></div><div class="va-choices">'+select('encode','1 · Encode','Characters represented as eight-bit binary values')+select('send','2 · Transmit','24 hours outward · dramatized instantly')+select('reply','3 · Receive reply','Approximately 24 more hours for a return signal')+'</div><p class="va-feedback">'+(has('reply')?'A round-trip exchange takes roughly 48 hours, before processing or scheduling delays.':'This is a simulation; no real command is being transmitted.')+'</p>'+media('Deep Space Network scene','Show dish rotation, radio modulation, two-way delay and sound design.','CINEMATIC'),'RETURN TO VOYAGER',!has('encode')||!has('send')||!has('reply'));
 }
 if(k==='power'){
 return tool('Make a difficult engineering choice','<div class="va-readings"><div><small>ENERGY SOURCE</small><strong>RTGs</strong><span>Decay heat → electricity</span></div><div><small>POWER BUDGET</small><strong>Declining</strong><span>No repair visits</span></div></div><div class="va-choices">'+select('science','Preserve a useful science instrument','Prioritize unique measurements while safe')+select('camera','Restore old cameras','Poor science return; additional power burden')+select('heat','Protect thermal survival','Keep critical systems warm and functional')+'</div><p class="va-feedback">'+(has('camera')?'Reactivating cameras is not the practical solution: their planetary imaging mission ended decades ago.':has('science')?'The goal is useful science without jeopardizing spacecraft survival.':'Every choice has a scientific and engineering cost.')+'</p>'+media('The systems shutting down over decades','Reserved for archival photographs of hardware, animated cutaways and a chronology of instrument decisions.','PHOTO SEQUENCE'),'ACCEPT THE TRADE-OFF',!has('science')&&!has('heat'));
 }
 return tool('A question for the future','<div class="va-choices">'+select('life','What has humanity discovered since I left?','Tell Voyager about new scientific exploration')+select('earth','What is Earth like today?','Describe the world behind the Pale Blue Dot')+select('record','What should the record say about us?','Choose what future finders might understand')+'</div>'+media('Voyager travels on','Cinematic pullback until the spacecraft is lost among the stars. Original ambient sound only.','ENDING VIDEO')+'<p class="va-feedback">NASA estimates Voyager 1 will approach Gliese 445 in about 40,000 years, still roughly 1.6–1.7 light-years away.</p>','FINISH THE CONVERSATION',S.length<1);
}
function archive(){
 const unlocked=chapters.slice(0,state.chapter+1);
 return '<main class="v-screen va-adventure va-archive">'+header(ch())+'<section class="va-archive-inner"><span class="va-overline">MISSION ARCHIVE</span><h1>What you have uncovered</h1><p>Authentic NASA images are distinguished from artist concepts and future media placeholders.</p><div class="va-archive-grid">'+unlocked.map(c=>'<button data-va="view:'+c.image+'">'+(photo[c.image]?img(c.image):'')+'<b>'+esc(c.title)+'</b><span>'+esc(c.era)+'</span></button>').join('')+'</div><button data-va="archive" class="v-btn">RETURN TO THE JOURNEY →</button></section></main>';
}
function render(){
 if(!root)return;
 if(state.inspected){const k=state.inspected;root.innerHTML='<main class="v-screen va-adventure va-archive">'+header(ch())+'<section class="va-archive-inner"><span class="va-overline">NASA MISSION ARCHIVE</span><h1>'+esc(k.toUpperCase())+'</h1>'+img(k,'va-archive-detail')+'<p>Image or artist concept preserved in the project archive. Check the linked NASA source for its original context.</p><p><a href="'+esc(sources[k]||sources.ship)+'" target="_blank" rel="noopener">VIEW ORIGINAL NASA SOURCE ↗</a></p><button class="v-btn" data-va="closeView">BACK TO ARCHIVE →</button></section></main>';return;}
 if(state.archive){root.innerHTML=archive();return;}
 const c=ch(),stage=state.phase==='activity',vis=img(c.image);
 root.innerHTML='<main class="v-screen va-adventure '+(reduce?'v-reduced':'')+'"><div class="v-backdrop va-backdrop">'+vis+'</div><div class="v-vignette"></div>'+header(c)+
 '<div class="va-scene-heading"><span class="va-overline">'+esc(c.era)+'</span><h1>'+esc(c.title)+'</h1></div>'+
 (stage?'<div class="va-investigation">'+inspectTool()+'</div>':dialogue())+
 (state.phase==='after'?'<div class="va-questions"><span>ASK VOYAGER</span>'+c.questions.map((q,i)=>'<button data-va="ask:'+i+'">'+esc(q[0])+'</button>').join('')+'</div>':'')+
 '<footer class="va-credit"><a href="'+esc(sources[c.image])+'" target="_blank" rel="noopener">NASA IMAGE / SOURCE ↗</a><span>Fictional dialogue · Historical mission records</span></footer></main>';
}
function next(){
 const c=ch(),arr=state.phase==='intro'?c.intro:c.after;
 state.reply='';
 if(state.line<arr.length-1)state.line++;
 else if(state.phase==='intro'){state.phase='activity';state.line=0;}
 else if(state.chapter<chapters.length-1){state.chapter++;state.phase='intro';state.line=0;}
 else{state.chapter=0;state.phase='intro';state.line=0;state.done={};state.seen={};save();onExit&&onExit();return;}
 save();render();
}
function click(e){
 const el=e.target.closest('[data-va]');if(!el||!root||!root.contains(el))return;
 const [act,arg]=el.dataset.va.split(':');
 if(act==='next'){playFx('dialogue');next();}
 if(act==='back'&&state.line>0){state.line--;state.reply='';render();}
 if(act==='select'){playFx('scan');remember(arg);render();}
 if(act==='done'){playFx('correct');state.phase='after';state.line=0;state.done[key()]=true;save();render();}
 if(act==='ask'){playFx('dialogue');state.reply=ch().questions[Number(arg)]?.[1]||'';render();}
 if(act==='archive'){state.inspected=false;state.archive=!state.archive;render();}
 if(act==='view'){state.archive=false;state.inspected=arg;render();}
 if(act==='closeView'){state.inspected=false;state.archive=true;render();}
 if(act==='exit'){onExit&&onExit();}
}
function keys(e){if(!root||!root.querySelector('.va-adventure')||e.repeat||e.metaKey||e.altKey||e.ctrlKey||['INPUT','TEXTAREA','BUTTON','A'].includes(document.activeElement?.tagName))return;if((e.key==='Enter'||e.key===' ')&&state.phase!=='activity'&&!state.archive){e.preventDefault();next();}}
window.MIRA_VOYAGER={enter(el,opts){root=el;onExit=opts.onExit;player=opts.name||'Explorer';reduce=!!opts.reduced;if(!root.dataset.vaInit){root.addEventListener('click',click);document.addEventListener('keydown',keys);root.dataset.vaInit='1';}render();},restart(){state={chapter:0,phase:'intro',line:0,done:{},seen:{},reply:'',archive:false,inspected:false,focus:0};save();render();}};
})();
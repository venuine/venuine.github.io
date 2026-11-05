const data=window.PortfolioContent;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const escapeHTML=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const glyphs={star:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z',person:'M7 21v-3a5 5 0 0 1 10 0v3M9 6a3 3 0 1 0 6 0a3 3 0 1 0-6 0',project:'M3 6h18v15H3zM8 6V3h8v3M3 12h18',trophy:'M7 3h10v6a5 5 0 0 1-10 0V3zM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 14v7M7 21h10',mail:'M3 5h18v14H3zM3 5l9 8 9-8',photo:'M3 4h18v16H3zM3 16l5-5 5 5 3-3 5 5M15 8h.01',pause:'M8 4v16M16 4v16',play:'m8 4 12 8-12 8z',code:'m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18',shield:'m12 2 9 4v7c0 4-9 9-9 9s-9-5-9-9V6zM8 12l3 3 5-6'};
const svg=(name,extra='')=>`<svg ${extra} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${glyphs[name]||glyphs.star}"/></svg>`;
const main=document.querySelector('main');
const sections=[...main.querySelectorAll(':scope>section')];
const names=['Home','Profile','Projects','Tech Stack','Contact'];
const nav=document.querySelector('.top-navigation');
nav.innerHTML=sections.map((s,i)=>`<a href="#${s.id}">${names[i]}</a>`).join('');
let active=0;
function move(index,{historyMode='push',focus=true}={}){
 index=Math.max(0,Math.min(sections.length-1,index));const changed=index!==active;const previousSection=sections[active],direction=index>active?1:-1;active=index;
 sections.forEach((s,i)=>{s.hidden=i!==index;s.inert=i!==index;});
 nav.querySelectorAll('a').forEach((a,i)=>{if(i===index)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const currentLink=nav.querySelector('[aria-current]');if(nav.scrollWidth>nav.clientWidth)nav.scrollTo({left:Math.max(0,currentLink.offsetLeft-nav.offsetLeft-(nav.clientWidth-currentLink.offsetWidth)/2),behavior:reduced.matches?'instant':'smooth'});
 document.querySelector('.page-position').textContent=names[index].toUpperCase()+'  ✦  '+String(index+1).padStart(2,'0')+' / '+String(sections.length).padStart(2,'0');
 document.querySelector('.page-previous').disabled=index===0;document.querySelector('.page-next').disabled=index===sections.length-1;
 if(changed){sections[index].scrollTop=0;if(!reduced.matches&&!document.body.classList.contains('paused'))window.PortfolioMotion.navigate(previousSection,sections[index],direction);}
 if(focus){const heading=sections[index].querySelector('h1,h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}
 if(historyMode!=='none'&&location.hash!=='#'+sections[index].id)history[historyMode==='replace'?'replaceState':'pushState'](null,'','#'+sections[index].id);
 document.title='Vien ✦ '+names[index];
}
function routeHash(){const aliases={about:'profile',stack:'skills',current:'projects',summary:'profile'};const id=location.hash.slice(1);const target=aliases[id]||id;const index=sections.findIndex(s=>s.id===target);move(index<0?0:index,{historyMode:'none',focus:false});}
document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(!a)return;const target=a.getAttribute('href').slice(1);if(target==='main'){event.preventDefault();main.focus();return;}const index=sections.findIndex(s=>s.id===target);if(index<0)return;event.preventDefault();move(index);});
document.querySelector('.page-previous').addEventListener('click',()=>move(active-1));document.querySelector('.page-next').addEventListener('click',()=>move(active+1));
window.addEventListener('popstate',routeHash);window.addEventListener('hashchange',routeHash);
let wheelSum=0,lock=0,wheelTimer;
function nestedCanScroll(target,section,direction){for(let node=target instanceof Element?target:null;node&&node!==section;node=node.parentElement){if(node.scrollHeight-node.clientHeight<5||!/(auto|scroll)/.test(getComputedStyle(node).overflowY))continue;if(direction>0&&node.scrollHeight-node.clientHeight-node.scrollTop>4||direction<0&&node.scrollTop>4)return true;}return false;}
main.addEventListener('wheel',event=>{if(event.ctrlKey||event.metaKey)return;const section=sections[active];const amount=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?section.clientHeight:1);if(Math.abs(amount)<1)return;const direction=Math.sign(amount);if(nestedCanScroll(event.target,section,direction)||direction>0&&section.scrollHeight-section.clientHeight-section.scrollTop>4||direction<0&&section.scrollTop>4)return;event.preventDefault();const now=performance.now();if(now<lock){lock=Math.max(lock,now+180);return;}wheelSum+=amount;clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>wheelSum=0,180);if(Math.abs(wheelSum)<55)return;wheelSum=0;lock=now+800;move(active+direction);},{passive:false});
document.addEventListener('keydown',event=>{if(event.target.closest('button,input,textarea,select,[role=tab]'))return;const keys={PageDown:1,PageUp:-1};if(event.key in keys){event.preventDefault();move(active+keys[event.key]);}});
let touch;main.addEventListener('touchstart',event=>{const s=sections[active];touch={y:event.touches[0].clientY,top:s.scrollTop,bottom:s.scrollHeight-s.clientHeight-s.scrollTop};},{passive:true});main.addEventListener('touchend',event=>{if(!touch)return;const delta=touch.y-event.changedTouches[0].clientY;if(Math.abs(delta)>100&&(delta>0&&touch.bottom<4||delta<0&&touch.top<4))move(active+Math.sign(delta));touch=null;},{passive:true});

// Podcast-style profile: a permanent category strip and an ivory record surface.
const profile=document.querySelector('#profile-menu');
profile.innerHTML=`<div class="broadcast-shell"><div class="broadcast-tabs" role="tablist" aria-orientation="vertical" aria-label="Profile topics">${data.profile.map((item,i)=>`<button id="broadcast-tab-${i}" role="tab" aria-selected="${i===0}" aria-controls="broadcast-panel" tabindex="${i===0?0:-1}" data-profile="${i}"><span>${escapeHTML(item.name)}</span><small>${escapeHTML(item.subtitle)}</small><i aria-hidden="true"></i></button>`).join('')}</div><article id="broadcast-panel" role="tabpanel" aria-labelledby="broadcast-tab-0" tabindex="0"></article></div>`;
function paintProfile(index){const record=data.profile[index];profile.querySelectorAll('[role=tab]').forEach((b,i)=>{b.setAttribute('aria-selected',String(index===i));b.tabIndex=index===i?0:-1;});const panel=profile.querySelector('[role=tabpanel]');panel.setAttribute('aria-labelledby','broadcast-tab-'+index);panel.innerHTML=`<h2>${escapeHTML(record.title)}</h2><div class="broadcast-rows">${record.rows.map(([title,text],i)=>`<section class="broadcast-row"><div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p></div><span class="broadcast-stamp" aria-hidden="true">${svg(i===0?'person':i===1?'code':'star')}</span></section>`).join('')}</div>`;}
function chooseProfile(index){profile.querySelectorAll('[role=tab]').forEach((b,i)=>{b.setAttribute('aria-selected',String(index===i));b.tabIndex=index===i?0:-1;});window.PortfolioMotion.swap(profile,[profile.querySelector('[role=tabpanel]')],()=>paintProfile(index),'profile');}
profile.addEventListener('click',event=>{const b=event.target.closest('[data-profile]');if(b)chooseProfile(Number(b.dataset.profile));});
profile.addEventListener('keydown',event=>{const b=event.target.closest('[data-profile]');if(!b||!['ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();const i=Number(b.dataset.profile);const next=event.key==='Home'?0:event.key==='End'?data.profile.length-1:(i+(event.key==='ArrowDown'?1:-1)+data.profile.length)%data.profile.length;chooseProfile(next);profile.querySelector(`[data-profile="${next}"]`).focus();});chooseProfile(0);

// One project collection. Its visual stage always uses real screenshots when supplied.
let selectedProject=0,galleryIndex=0;
const localImages=new Map();
const exhibit=document.querySelector('#project-exhibit');
exhibit.innerHTML=`<article class="project-description" aria-live="polite"></article><div class="project-visual"><div class="visual-top"><span>PROJECT GALLERY</span><span class="gallery-position"></span></div><div class="screenshot-stage"></div><div class="gallery-controls"><button type="button" class="image-prev" aria-label="Previous screenshot">←</button><span class="gallery-caption"></span><button type="button" class="image-next" aria-label="Next screenshot">→</button></div><p class="image-note" role="status"></p></div><div class="project-selection"><div class="project-filter" role="group" aria-label="Filter projects"><button type="button" data-filter="all" aria-pressed="true">All</button><button type="button" data-filter="ongoing" aria-pressed="false">Ongoing</button></div><div class="project-boxes" role="group" aria-label="Choose project">${data.projects.map((p,i)=>`<button type="button" data-project="${i}" aria-pressed="${i===0}"><span class="project-mini">${svg(i>2?'shield':'project')}<b>${escapeHTML(p.short)}</b></span><span>${escapeHTML(p.name)}</span><small>${escapeHTML(p.status)}</small></button>`).join('')}</div></div>`;
function projectImages(){const p=data.projects[selectedProject];return localImages.get(p.id)||p.images;}
function paintGallery(){const p=data.projects[selectedProject],images=projectImages();galleryIndex=Math.max(0,Math.min(galleryIndex,images.length-1));const stage=exhibit.querySelector('.screenshot-stage');stage.innerHTML=images.length?`<img src="${escapeHTML(images[galleryIndex])}" alt="${escapeHTML(p.name)} project screenshot ${galleryIndex+1}" decoding="async">`:`<div class="missing-screenshot"><div class="empty-image-frame">${svg('photo')}</div><strong>${escapeHTML(p.name)}</strong><p>Your project screenshots belong here.</p><span>NO SCREENSHOT ADDED</span></div>`;const img=stage.querySelector('img');if(img)img.addEventListener('error',()=>{stage.innerHTML='<div class="missing-screenshot"><strong>Image could not be loaded.</strong><p>Check the image path in content.js or choose a local image.</p></div>';});exhibit.querySelector('.gallery-position').textContent=images.length?`${galleryIndex+1} / ${images.length}`:'— / —';exhibit.querySelector('.gallery-caption').textContent=images.length?'Project screenshots':'Ready for your real screenshots';exhibit.querySelector('.image-prev').disabled=galleryIndex<=0;exhibit.querySelector('.image-next').disabled=galleryIndex>=images.length-1;}
function paintProject(index,{focus=false}={}){selectedProject=index;galleryIndex=0;const p=data.projects[index];exhibit.querySelectorAll('[data-project]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));exhibit.querySelector('.project-description').innerHTML=`<div class="project-affinity">${svg(index>2?'shield':'project')}<span>${escapeHTML(p.category)}</span></div><h2>${escapeHTML(p.name)}</h2><span class="project-status ${p.status==='Selected work'?'selected-work':''}"><i></i>${escapeHTML(p.status)}</span><div class="fine-rule"></div><h3>Project brief</h3><p>${escapeHTML(p.description)}</p><dl><div><dt>Focus</dt><dd>${escapeHTML(p.focus)}</dd></div></dl><div class="project-tags">${p.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div><p class="project-disclaimer">A project overview. Detailed case studies and verified outcomes can be added as they become available.</p>`;exhibit.querySelector('.image-note').textContent=p.images.length?'Click the image to explore the full screenshot.':'';paintGallery();if(focus){const heading=exhibit.querySelector('.project-description h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}}
function renderGallery(){window.PortfolioMotion.swap(exhibit,[exhibit.querySelector('.screenshot-stage')],paintGallery,'gallery');}
function chooseProject(index,options={}){exhibit.querySelectorAll('[data-project]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));window.PortfolioMotion.swap(exhibit,[exhibit.querySelector('.project-description'),exhibit.querySelector('.screenshot-stage')],()=>paintProject(index,options),'project');}
exhibit.addEventListener('click',event=>{const p=event.target.closest('[data-project]');if(p)chooseProject(Number(p.dataset.project));const filter=event.target.closest('[data-filter]');if(filter){const ongoing=filter.dataset.filter==='ongoing';exhibit.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===filter)));exhibit.querySelectorAll('[data-project]').forEach((b,i)=>b.hidden=ongoing&&data.projects[i].status==='Selected work');if(ongoing&&data.projects[selectedProject].status==='Selected work')chooseProject(3);}});
exhibit.querySelector('.image-prev').addEventListener('click',()=>{galleryIndex--;renderGallery();});exhibit.querySelector('.image-next').addEventListener('click',()=>{galleryIndex++;renderGallery();});
chooseProject(0);

// Trophy-style categories reveal actual tools rather than fictional achievement scores.
const skills=document.querySelector('#skills-showcase');
skills.innerHTML=`<aside class="skill-ledger"><div class="skill-ledger-heading">${svg('trophy')}<div><span>DEVELOPER TOOLKIT</span><strong>Built through practice.</strong></div></div><p class="skill-introduction"></p><h2>In this discipline</h2><div class="skill-list" aria-live="polite"></div></aside><div class="discipline-panels" role="group" aria-label="Choose a skill discipline">${data.skills.map((s,i)=>`<button type="button" class="discipline-panel ${s.theme}" data-skill="${i}" aria-pressed="${i===0}"><div class="discipline-art" aria-hidden="true"><span class="art-orbit-a"></span><span class="art-orbit-b"></span><span class="art-path"></span>${svg(i===0?'code':i===1?'shield':i===2?'project':'star')}</div><div class="discipline-title"><h2>${escapeHTML(s.name)}</h2><p>${escapeHTML(s.subtitle)}</p><span>${s.items.length} TOOLS</span></div></button>`).join('')}</div>`;
function paintSkill(index){const s=data.skills[index];skills.querySelectorAll('[data-skill]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));skills.querySelector('.skill-introduction').textContent=s.description;skills.querySelector('.skill-list').innerHTML=s.items.map(([name,purpose])=>`<div class="skill-record"><span class="technology-mark">${window.TechnologyIcons[name]||svg('code')}</span><div><strong>${escapeHTML(name)}</strong><small>${escapeHTML(purpose)}</small></div>${svg('star')}</div>`).join('');}
function chooseSkill(index){skills.querySelectorAll('[data-skill]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));window.PortfolioMotion.swap(skills,[skills.querySelector('.skill-list')],()=>paintSkill(index),'skills');}
skills.addEventListener('click',event=>{const b=event.target.closest('[data-skill]');if(b)chooseSkill(Number(b.dataset.skill));});chooseSkill(0);

document.querySelector('.ticket-actions a[href^="mailto:"]').href='mailto:'+data.person.email;
document.querySelector('.copy-profile').addEventListener('click',async()=>{const feedback=document.querySelector('.copy-feedback');try{await navigator.clipboard.writeText('https://github.com/venuine');feedback.textContent='Profile link copied.';}catch{feedback.textContent='Copy this link: https://github.com/venuine';}});
const pause=document.querySelector('.pause-motion');
function syncPause(){const paused=document.body.classList.contains('paused');pause.innerHTML=svg(paused?'play':'pause');pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Resume atmosphere':'Pause atmosphere');}
pause.addEventListener('click',()=>{document.body.classList.toggle('paused');syncPause();});syncPause();document.addEventListener('visibilitychange',()=>document.body.classList.toggle('page-inactive',document.hidden));
const opening=document.querySelector('.opening');let openingTimer;
let openingClosing=false;
function closeOpening(){
 if(openingClosing)return;openingClosing=true;clearTimeout(openingTimer);
 const finish=()=>{document.body.classList.remove('intro-pending');opening.remove();main.inert=false;document.querySelector('.app-header').inert=false;document.querySelector('.page-footer').inert=false;};
 if(reduced.matches){finish();return;}
 const sourceNodes=[opening,...opening.querySelectorAll('*')];
 const frozen=sourceNodes.map(node=>{const s=getComputedStyle(node);return {transform:s.transform,opacity:s.opacity,filter:s.filter};});
 const shards=[0,1].map(index=>{
  const shard=opening.cloneNode(true);shard.className='intro-shard shard-'+index;shard.setAttribute('aria-hidden','true');shard.removeAttribute('role');shard.inert=true;
  [shard,...shard.querySelectorAll('*')].forEach((node,i)=>{node.removeAttribute('id');node.style.animation='none';Object.assign(node.style,frozen[i]);});
  shard.querySelector('.skip-opening')?.remove();return shard;
 });
 [...opening.children].forEach(node=>node.style.visibility='hidden');opening.classList.add('split-opening');
 shards.forEach(shard=>{shard.style.visibility='visible';shard.querySelectorAll('*').forEach(n=>n.style.visibility='visible');opening.append(shard);});
 const seam=document.createElement('div');seam.className='intro-cut-seam';seam.innerHTML='<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 75L100 25"/></svg>';opening.append(seam);
 // Start Home while the diagonal halves clear, 1 second earlier than V17.
 setTimeout(()=>document.body.classList.remove('intro-pending'),250);
 const timing={duration:1250,easing:'cubic-bezier(.65,0,.25,1)',fill:'forwards'};
 const animations=shards.map((shard,i)=>shard.animate([{transform:'translate3d(0,0,0)'},{transform:i===0?'translate3d(-12vw,-105vh,0)':'translate3d(12vw,105vh,0)'}],timing));
 seam.animate([{opacity:0},{opacity:.8,offset:.12},{opacity:0,offset:.65},{opacity:0}],timing);
 Promise.all(animations.map(animation=>animation.finished.catch(()=>{}))).then(finish);
}
document.querySelector('.skip-opening').addEventListener('click',closeOpening);
routeHash();if(reduced.matches)closeOpening();else{main.inert=true;document.querySelector('.app-header').inert=true;document.querySelector('.page-footer').inert=true;openingTimer=setTimeout(closeOpening,3700);}
window.addEventListener('pagehide',()=>{localImages.forEach(images=>images.forEach(url=>URL.revokeObjectURL(url)));});

const homeArtwork=document.createElement('div');homeArtwork.className='hero-art-window';homeArtwork.setAttribute('aria-hidden','true');document.querySelectorAll('.frequency-glyph,.hero-compass,.hero-diagonal').forEach(node=>homeArtwork.append(node));document.querySelector('#hero-panel').prepend(homeArtwork);

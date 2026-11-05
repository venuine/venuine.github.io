(()=>{
 const roster=document.querySelector('.project-boxes');
 roster.setAttribute('aria-label','Project playlist');
 const listLabel=document.createElement('div');listLabel.className='playlist-label';listLabel.innerHTML='<span>PROJECT SELECTION</span><span>SCROLL TO EXPLORE ↕</span>';roster.before(listLabel);
 const listFooter=document.createElement('div');listFooter.className='playlist-footer';listFooter.setAttribute('aria-live','polite');roster.after(listFooter);
 roster.querySelectorAll('[data-project]').forEach((button,index)=>{
  const p=data.projects[index];button.classList.add('map-entry');
  button.setAttribute('aria-label',p.name+' — '+p.status);
  button.innerHTML=`<span class="map-preview" aria-hidden="true"></span><span class="map-number" aria-hidden="true">${String(index+1).padStart(2,'0')}</span><span class="map-copy"><strong>${escapeHTML(p.name)}</strong><span>${escapeHTML(p.category)}</span><small>${escapeHTML(p.status)}</small></span><span class="map-selected-mark" aria-hidden="true">✦</span>`;
 });
 function previewSource(index){const p=data.projects[index];return p.preview||(localImages.get(p.id)||p.images)[0]||'';}
 function refreshPreviews(){roster.querySelectorAll('[data-project]').forEach((button,index)=>{
  const image=previewSource(index),surface=button.querySelector('.map-preview');
  if(surface.dataset.source===image&&surface.childElementCount)return;
  surface.dataset.source=image;
  if(image){const img=document.createElement('img');img.src=image;img.alt='';img.decoding='async';img.loading='lazy';img.addEventListener('error',()=>{surface.innerHTML=`<b>${escapeHTML(data.projects[index].short)}</b>`;},{once:true});surface.replaceChildren(img);}
  else surface.innerHTML=`<b>${escapeHTML(data.projects[index].short)}</b>`;
 });}
 function selectedButton(){return roster.querySelector('[data-project][aria-pressed="true"]');}
 function centerSelected(){if(document.querySelector('#projects').hidden)return;const button=selectedButton();if(!button||button.hidden)return;const listRect=roster.getBoundingClientRect(),buttonRect=button.getBoundingClientRect();const target=roster.scrollTop+buttonRect.top-listRect.top-(roster.clientHeight-buttonRect.height)/2;roster.scrollTo({top:Math.max(0,target),behavior:reduced.matches?'instant':'smooth'});}
 function syncSelection(){const current=selectedButton(),visible=[...roster.querySelectorAll('[data-project]')].filter(button=>!button.hidden);const index=visible.indexOf(current);visible.forEach((button,i)=>button.style.setProperty('--map-shift',Math.min(Math.abs(i-index)*5,16)+'px'));listFooter.textContent=visible.length+' PROJECTS  ✦  '+(current?data.projects[Number(current.dataset.project)].name:'');centerSelected();}
 function sizePlaylist(){if(!roster.clientHeight)return;const button=selectedButton();const height=button?.getBoundingClientRect().height||106;roster.style.setProperty('--playlist-endcap',12+'px');centerSelected();}
 new ResizeObserver(sizePlaylist).observe(roster);
 new MutationObserver(syncSelection).observe(roster,{subtree:true,attributes:true,attributeFilter:['aria-pressed','hidden']});
 new MutationObserver(centerSelected).observe(document.querySelector('#projects'),{attributes:true,attributeFilter:['hidden']});
 new MutationObserver(refreshPreviews).observe(document.querySelector('.screenshot-stage'),{childList:true});
 roster.addEventListener('wheel',event=>event.stopPropagation(),{passive:true});
 roster.addEventListener('touchstart',event=>event.stopPropagation(),{passive:true});roster.addEventListener('touchend',event=>event.stopPropagation(),{passive:true});
 roster.addEventListener('keydown',event=>{
  if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
  const buttons=[...roster.querySelectorAll('[data-project]')].filter(button=>!button.hidden);if(!buttons.length)return;
  event.preventDefault();event.stopPropagation();const index=Math.max(0,buttons.indexOf(event.target.closest('[data-project]')));
  const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:Math.max(0,Math.min(buttons.length-1,index+(event.key==='ArrowDown'?1:-1)));
  buttons[next].click();buttons[next].focus({preventScroll:true});
 });
 refreshPreviews();syncSelection();

 // A compact Home-style upper panel, with a rotating disc instead of a second full hero.
 const radio=document.createElement('div');radio.className='profile-radio';
 radio.innerHTML=`<div class="radio-frame-corner" aria-hidden="true"></div><div class="radio-copy"><span>PERSONAL FREQUENCY ✦ VIEN</span><h2>More <em>about me.</em></h2><p>Thoughtful interfaces. Practical applications. Connected systems.</p><div class="radio-signal-bars" aria-hidden="true">${Array.from({length:14},(_,i)=>`<i style="--bar:${i}"></i>`).join('')}</div></div><div class="radio-platter" aria-hidden="true"><div class="radio-disc"><i></i><b></b><span></span></div><div class="radio-center">✦</div><div class="radio-tonearm"></div></div><span class="radio-signature">Journey Well.</span>`;
 document.querySelector('#profile-menu').prepend(radio);
 const orbit=document.querySelector('.ambient-orbit');
 const companion=document.createElement('div');companion.className='ambient-orbit-runner orbit-companion';companion.innerHTML='<span></span>';orbit.append(companion);
 for(const [trackClass,runnerClass] of [['ambient-inner-track','orbit-inner'],['ambient-outer-track','orbit-fast']]){
  const track=document.createElement('div');track.className=trackClass;track.innerHTML=`<div class="ambient-orbit-runner ${runnerClass}"><span></span></div>`;orbit.append(track);
 }
})();

(()=>{
 const description=document.querySelector('.project-description'),stage=document.querySelector('.screenshot-stage');
 function projectActions(){
  if(description.querySelector('.project-actions'))return;
  const p=data.projects[selectedProject];const row=document.createElement('div');row.className='project-actions';
  for(const [url,label,missing] of [[p.source,p.id==='edi'?'Demo source ↗':'Source code ↗',p.id==='royal'?'Private source':'Source unavailable'],[p.demo,'Live demo ↗','Demo unavailable']]){
   const control=document.createElement(url?'a':'button');control.className='metal-button';control.textContent=url?label:missing;
   if(url){control.href=url;control.target='_blank';control.rel='noopener noreferrer';}else{control.type='button';control.disabled=true;}
   row.append(control);
  }
  description.querySelector('.project-tags').after(row);
 }
 new MutationObserver(projectActions).observe(description,{childList:true});projectActions();
 const viewer=document.createElement('dialog');viewer.className='image-viewer';viewer.setAttribute('aria-label','Project image viewer');
 viewer.innerHTML='<div class="viewer-toolbar"><strong></strong><button type="button" data-zoom="out" aria-label="Zoom out">−</button><output aria-live="polite">100%</output><button type="button" data-zoom="in" aria-label="Zoom in">+</button><button type="button" data-zoom="reset" aria-label="Reset zoom">Fit</button><button type="button" data-zoom="close" aria-label="Close image viewer">×</button></div><div class="viewer-canvas"><img alt="" draggable="false"></div><div class="viewer-hint">Scroll or pinch to zoom · Drag to explore · Esc to close</div>';
 document.body.append(viewer);const canvas=viewer.querySelector('.viewer-canvas'),picture=canvas.querySelector('img'),output=viewer.querySelector('output');
 let scale=1,x=0,y=0,drag=null,opener=null;const pointers=new Map();let pinchDistance=0;
 function draw(){picture.style.transform=`translate(${x}px,${y}px) scale(${scale})`;output.textContent=Math.round(scale*100)+'%';viewer.querySelector('[data-zoom=out]').disabled=scale<=1;viewer.querySelector('[data-zoom=in]').disabled=scale>=5;}
 function zoom(value){scale=Math.max(1,Math.min(5,value));if(scale===1)x=y=0;draw();}
 function open(){const image=stage.querySelector('img');if(!image)return;opener=document.activeElement;picture.src=image.src;picture.alt=image.alt;viewer.querySelector('strong').textContent=data.projects[selectedProject].name;scale=1;x=y=0;draw();viewer.showModal();viewer.querySelector('[data-zoom=close]').focus();}
 function galleryAffordance(){if(!stage.querySelector('img')||stage.querySelector('.gallery-open'))return;const button=document.createElement('button');button.type='button';button.className='gallery-open';button.textContent='Expand image ↗';button.addEventListener('click',open);stage.append(button);stage.querySelector('img').addEventListener('click',open);}
 new MutationObserver(galleryAffordance).observe(stage,{childList:true});galleryAffordance();
 viewer.addEventListener('click',event=>{const action=event.target.closest('[data-zoom]')?.dataset.zoom;if(action==='close')viewer.close();if(action==='in')zoom(scale+.5);if(action==='out')zoom(scale-.5);if(action==='reset')zoom(1);});
 viewer.addEventListener('close',()=>{pointers.clear();opener?.focus({preventScroll:true});});
 viewer.addEventListener('keydown',event=>{event.stopPropagation();if(event.key==='+'||event.key==='=')zoom(scale+.5);if(event.key==='-')zoom(scale-.5);if(event.key==='0')zoom(1);});
 canvas.addEventListener('wheel',event=>{event.preventDefault();event.stopPropagation();zoom(scale+(event.deltaY<0?.2:-.2));},{passive:false});
 canvas.addEventListener('pointerdown',event=>{pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});canvas.setPointerCapture(event.pointerId);drag={x:event.clientX,y:event.clientY};if(pointers.size===2){const [a,b]=[...pointers.values()];pinchDistance=Math.hypot(a.x-b.x,a.y-b.y);}});
 canvas.addEventListener('pointermove',event=>{if(!pointers.has(event.pointerId))return;const old=pointers.get(event.pointerId);pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);if(pinchDistance)zoom(scale*distance/pinchDistance);pinchDistance=distance;}else if(scale>1){x+=event.clientX-old.x;y+=event.clientY-old.y;draw();}});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,event=>{pointers.delete(event.pointerId);pinchDistance=0;drag=null;});
 canvas.addEventListener('dblclick',()=>zoom(scale>1?1:2));
 // A dedicated achievements-style ledger opens from the four discipline covers.
 const showcase=document.querySelector('#skills-showcase'),covers=showcase.querySelector('.discipline-panels'),detail=document.createElement('div');detail.className='skills-detail';detail.hidden=true;
 detail.innerHTML='<div class="skills-detail-top"><button type="button" class="metal-button skills-back">← Return</button><h2>Interface</h2></div><div class="skills-detail-body"><nav class="skill-categories" aria-label="Skill categories"></nav><div class="skill-records" aria-live="polite"></div></div>';
 showcase.append(detail);const categoryNav=detail.querySelector('.skill-categories'),records=detail.querySelector('.skill-records');
 data.skills.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.dataset.category=i;b.innerHTML=`${escapeHTML(s.name)}<small>${escapeHTML(s.subtitle)} · ${s.items.length} tools</small>`;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>select(i));categoryNav.append(b);});
 function paint(index){const s=data.skills[index];detail.querySelector('h2').textContent=s.name;records.innerHTML=`<p class="skill-detail-description">${escapeHTML(s.description)}</p>`+s.items.map(([name,purpose])=>`<div class="skill-record"><span class="technology-mark">${window.TechnologyIcons[name]||svg('code')}</span><div><strong>${escapeHTML(name)}</strong><small>${escapeHTML(purpose)}</small></div>${svg('star')}</div>`).join('');records.scrollTop=0;}
 function select(index){categoryNav.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));window.PortfolioMotion.swap(detail,[records],()=>paint(index),'skills');}
 covers.addEventListener('click',event=>{const button=event.target.closest('[data-skill]');if(!button)return;covers.hidden=true;detail.hidden=false;showcase.classList.add('ledger-open');select(Number(button.dataset.skill));detail.querySelector('.skills-back').focus({preventScroll:true});if(!reduced.matches&&!document.body.classList.contains('paused'))detail.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.25,.1,.25,1)'});});
 detail.querySelector('.skills-back').addEventListener('click',()=>{detail.hidden=true;covers.hidden=false;showcase.classList.remove('ledger-open');covers.querySelector('[aria-pressed=true]').focus({preventScroll:true});if(!reduced.matches&&!document.body.classList.contains('paused'))covers.animate([{opacity:0},{opacity:1}],{duration:650,easing:'cubic-bezier(.25,.1,.25,1)'});});
})();

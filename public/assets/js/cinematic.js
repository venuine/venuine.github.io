(()=>{
 const intro=document.querySelector('.opening');
 if(intro){const instrument=document.createElement('div');instrument.className='entrance-instrument';instrument.setAttribute('aria-hidden','true');instrument.innerHTML='<div class="entrance-meridian"></div><div class="entrance-dial">'+Array.from({length:48},(_,i)=>'<i style="--tick:'+i+'"></i>').join('')+'<span></span></div><div class="entrance-axis"></div><div class="entrance-hands"><i></i><b></b></div><div class="entrance-slit"></div>';intro.prepend(instrument);intro.querySelector('.opening-orbit')?.remove();}
 const fine=matchMedia('(hover:hover) and (pointer:fine)');if(!fine.matches||reduced.matches)return;
 const light=document.createElement('div');light.className='pointer-light';light.setAttribute('aria-hidden','true');document.body.append(light);let frame=0,px=0,py=0;
 document.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;px=event.clientX;py=event.clientY;if(frame)return;frame=requestAnimationFrame(()=>{frame=0;light.style.transform=`translate3d(${px}px,${py}px,0)`;light.classList.add('is-visible');});},{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>light.classList.remove('is-visible'));
 document.addEventListener('pointerdown',()=>{if(document.body.classList.contains('paused'))return;light.animate([{opacity:.75},{opacity:.2},{opacity:.75}],{duration:650,easing:'ease-out'});});
})();

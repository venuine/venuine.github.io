/* Each surface moves like a different instrument; frames remain anchored. */
(()=>{
 const states=new WeakMap(),preference=matchMedia('(prefers-reduced-motion: reduce)');
 const enabled=regions=>!preference.matches&&!document.body.classList.contains('paused')&&!document.hidden&&regions.some(r=>!r.closest('section[hidden]'));
 const parts=regions=>regions.flatMap(r=>r.matches('[role=tabpanel]')?[...r.querySelectorAll(':scope>h2,.broadcast-row')]:[...r.children]);
 const ease='cubic-bezier(.25,.1,.25,1)';
 function frames(kind,index,exit){
  return exit?[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-3px)'}]:[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}];
 }
 function swap(key,regions,render,kind='profile'){
  const previous=states.get(key);previous?.animations.forEach(a=>a.cancel());previous?.regions.forEach(r=>r.setAttribute?.('data-motion-phase','idle'));
  const state={animations:[],regions};states.set(key,state);
  if(!enabled(regions)){render();regions.forEach(r=>r.setAttribute?.('data-motion-phase','idle'));return Promise.resolve();}
  regions.forEach(r=>r.setAttribute?.('data-motion-phase','leaving'));
  state.animations=parts(regions).map((node,i)=>node.animate(frames(kind,i,true),{duration:230,easing:ease,fill:'forwards'}));
  return Promise.all(state.animations.map(a=>a.finished.catch(()=>{}))).then(()=>{
   if(states.get(key)!==state)return;
   const old=state.animations;render();old.forEach(a=>a.cancel());
   if(!enabled(regions)){regions.forEach(r=>r.setAttribute?.('data-motion-phase','idle'));state.animations=[];return;}
   regions.forEach(r=>r.setAttribute?.('data-motion-phase','entering'));
   state.animations=parts(regions).map((node,i)=>node.animate(frames(kind,i,false),{duration:560,delay:Math.min(i*28,84),easing:ease,fill:'backwards'}));
   return Promise.all(state.animations.map(a=>a.finished.catch(()=>{}))).then(()=>{if(states.get(key)===state){state.animations=[];regions.forEach(r=>r.setAttribute?.('data-motion-phase','idle'));}});
  });
 }
 function enter(section){
  section.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:720,easing:ease});
 }
 let pageAnimation=null;
 function navigate(previous,next,direction){
  pageAnimation?.cancel();
  // Animate the live page in its original layout context; no detached page clones.
  pageAnimation=next.animate([{opacity:.3,transform:'translateY('+(direction*48)+'px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,easing:'cubic-bezier(.2,.65,.3,1)'});
 }
 window.PortfolioMotion={swap,enter,navigate};
})();

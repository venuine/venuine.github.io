// Optional synthesized UI cues. No audio starts before the visitor enables it.
(()=>{
 let context=null,enabled=false,last=0;
 const button=document.createElement('button');button.className='audio-toggle';button.type='button';button.setAttribute('aria-pressed','false');
 const status=document.createElement('span');status.className='sound-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 document.querySelector('.header-actions').insertBefore(button,document.querySelector('.header-actions>a'));button.after(status);
 function display(){button.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/>${enabled?'<path d="M17 8a6 6 0 0 1 0 8M20 5a10 10 0 0 1 0 14"/>':'<path d="m17 9 5 6M22 9l-5 6"/>'}</svg><span>Sound ${enabled?'on':'off'}</span>`;button.setAttribute('aria-label',enabled?'Mute interface sounds':'Enable interface sounds');button.setAttribute('aria-pressed',String(enabled));document.body.dataset.soundEnabled=String(enabled);}
 function cue(kind){
  if(!enabled||!context||context.state!=='running'||document.hidden)return;
  const time=performance.now();if(time-last<65)return;last=time;
  const now=context.currentTime,osc=context.createOscillator(),gain=context.createGain();
  const hover=kind==='hover',nav=kind==='navigation';const start=hover?920:nav?440:620,end=hover?780:nav?660:1040,duration=hover?.035:nav?.11:.085;
  osc.type=hover?'sine':'triangle';osc.frequency.setValueAtTime(start,now);osc.frequency.exponentialRampToValueAtTime(end,now+duration);
  gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(hover?.009:.022,now+.008);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(gain);gain.connect(context.destination);osc.start(now);osc.stop(now+duration+.015);osc.onended=()=>{osc.disconnect();gain.disconnect();};
 }
 button.addEventListener('click',async()=>{
  if(enabled){enabled=false;display();if(context?.state==='running')await context.suspend().catch(()=>{});status.textContent='Interface sounds muted.';return;}
  try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw Error('Unavailable');if(!context)context=new Audio();await context.resume();enabled=context.state==='running';if(!enabled)throw Error('Unavailable');display();button.dataset.audioState=context.state;status.textContent='Interface sounds enabled.';cue('select');}
  catch{enabled=false;display();button.disabled=true;button.dataset.audioState='unavailable';status.textContent='Audio is unavailable in this browser. The portfolio remains fully usable.';}
 });
 document.addEventListener('click',event=>{const target=event.target.closest('button,a');if(!target||target.closest('.audio-toggle'))return;cue(target.closest('.top-navigation,.page-arrows')?'navigation':'select');});
 document.addEventListener('pointerover',event=>{if(event.pointerType==='touch')return;const target=event.target.closest('.map-entry,[role=tab],.discipline-panel,.top-navigation a');if(target&&!target.contains(event.relatedTarget))cue('hover');});
 document.addEventListener('visibilitychange',()=>{if(!context)return;if(document.hidden)context.suspend().catch(()=>{});else if(enabled)context.resume().catch(()=>{});});
 display();
})();

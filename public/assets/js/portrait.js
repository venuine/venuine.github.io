(()=>{
 const frame=document.createElement('figure');frame.className='home-portrait';
 if(data.person.portrait){const img=document.createElement('img');img.src=data.person.portrait;img.alt='Vien';img.decoding='async';frame.append(img);}
 else{frame.innerHTML='<div class="portrait-slot"><svg viewBox="0 0 140 180" fill="none" aria-hidden="true"><circle cx="70" cy="56" r="25" stroke="currentColor" stroke-width="1"/><path d="M22 160v-19a48 48 0 0 1 96 0v19M13 12h17M13 12v17M127 12h-17M127 12v17M13 168h17M13 168v-17M127 168h-17M127 168v-17" stroke="currentColor" stroke-width="1"/></svg><span>Your portrait here</span></div>';}
 const caption=document.createElement('figcaption');caption.textContent='VIEN';frame.append(caption);document.querySelector('#hero-panel').append(frame);
})();

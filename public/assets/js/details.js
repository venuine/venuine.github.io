// Small, original technical illustrations for the four stack disciplines.
(()=>{
 const drawings=[
  `<rect x="19" y="33" width="162" height="123" rx="7" fill="#cdc3a5" fill-opacity=".07"/><path d="M19 56h162"/><circle cx="30" cy="45" r="2" fill="#cbb47d"/><circle cx="39" cy="45" r="2"/><circle cx="48" cy="45" r="2"/><rect x="31" y="69" width="30" height="74" rx="2" fill="#c6ad7b" fill-opacity=".12"/><rect x="72" y="69" width="97" height="22" rx="2"/><rect x="72" y="102" width="43" height="41" rx="2" fill="#c6ad7b" fill-opacity=".1"/><rect x="126" y="102" width="43" height="41" rx="2"/><path d="M38 80h16M38 90h12M80 79h60M82 113h21M82 122h14M135 113h21M135 122h14"/>`,
  `<path d="M55 55h35v35M145 55h-35v35M55 145h35v-35M145 145h-35v-35" stroke-dasharray="4 5"/><rect x="29" y="30" width="48" height="48" rx="5" fill="#d1bd85" fill-opacity=".08"/><rect x="123" y="30" width="48" height="48" rx="5"/><rect x="29" y="123" width="48" height="48" rx="5"/><rect x="123" y="123" width="48" height="48" rx="5" fill="#d1bd85" fill-opacity=".08"/><path d="m100 74 26 26-26 26-26-26z" fill="#d1bd85" fill-opacity=".12"/><path d="m44 49-6 6 6 6M60 49l6 6-6 6M137 47h20M137 55h20M137 63h12M42 138h22M42 146h16M137 138l7 7 13-13"/>`,
  `<ellipse cx="100" cy="46" rx="52" ry="19" fill="#d1bd85" fill-opacity=".1"/><path d="M48 46v88c0 25 104 25 104 0V46M48 76c0 25 104 25 104 0M48 105c0 25 104 25 104 0"/><ellipse cx="100" cy="46" rx="35" ry="10" stroke-opacity=".35"/><circle cx="137" cy="83" r="3" fill="#d1bd85"/><circle cx="137" cy="112" r="3"/><path d="M75 164h50M100 154v20M63 175h74"/><path d="m23 95 11 6-11 6M177 95l-11 6 11 6" stroke-opacity=".5"/>`,
  `<rect x="20" y="32" width="123" height="104" rx="6" fill="#d1bd85" fill-opacity=".06"/><path d="M20 55h123M35 45h3M44 45h3M53 45h3M36 74l9 7-9 7M54 89h32M36 107h46"/><path d="M126 83v66c0 13 13 16 26 16M152 165h12M155 93v29c0 15-29 13-29 25" stroke-width="2"/><circle cx="126" cy="82" r="7" fill="#d1bd85" fill-opacity=".18"/><circle cx="155" cy="86" r="7"/><circle cx="172" cy="165" r="7" fill="#d1bd85" fill-opacity=".18"/>`
 ];
 document.querySelectorAll('.discipline-art').forEach((art,index)=>{
  const illustration=document.createElementNS('http://www.w3.org/2000/svg','svg');
  illustration.setAttribute('viewBox','0 0 200 200');illustration.setAttribute('class','stack-illustration');illustration.setAttribute('fill','none');illustration.setAttribute('stroke','currentColor');illustration.setAttribute('stroke-width','1.5');illustration.setAttribute('stroke-linecap','round');illustration.setAttribute('stroke-linejoin','round');illustration.setAttribute('aria-hidden','true');illustration.innerHTML=drawings[index];art.append(illustration);
 });
 const orbit=document.querySelector('.ambient-orbit');
 const runner=document.createElement('div');runner.className='ambient-orbit-runner';runner.innerHTML='<span></span>';orbit.append(runner);
 const markers=document.createElement('div');markers.className='hero-art-markers';markers.setAttribute('aria-hidden','true');markers.innerHTML='<span>RESONANCE / 007</span><span>DESIGN ✦ BUILD ✦ CONNECT</span>';document.querySelector('.hero-art-window').append(markers);
})();

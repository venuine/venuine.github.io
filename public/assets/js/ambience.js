(()=>{
 const svgNS='http://www.w3.org/2000/svg';
 function threads(){
  const svg=document.createElementNS(svgNS,'svg');svg.classList.add('woven-threads');svg.setAttribute('viewBox','0 0 1000 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
  for(let i=0;i<4;i++){const path=document.createElementNS(svgNS,'path');const y=18+i*20;path.setAttribute('d',`M-100 ${y} C100 ${y-28},180 ${y+30},350 ${y} S570 ${y-28},740 ${y} S950 ${y+25},1100 ${y}`);path.style.setProperty('--thread',i);svg.append(path);}
  return svg;
 }
 function decorateSkills(){document.querySelectorAll('.skill-records .skill-record').forEach((row,i)=>{if(row.querySelector('.woven-threads'))return;row.style.setProperty('--row-phase',(-i*1.7)+'s');row.prepend(threads());});}
 new MutationObserver(decorateSkills).observe(document.querySelector('.skill-records'),{childList:true});decorateSkills();
 const learning=document.createElement('section');learning.className='learning-ledger';learning.setAttribute('aria-labelledby','learning-heading');
 learning.innerHTML='<h2 id="learning-heading">Currently learning</h2><ul>'+data.learning.map(item=>'<li><span class="learning-emblem">'+svg(item.icon)+'</span><div><strong>'+escapeHTML(item.name)+'</strong><small>Exploring</small></div><span class="learning-signal" aria-hidden="true"></span></li>').join('')+'</ul>';
 document.querySelector('.skill-ledger').append(learning);
 const signal=document.createElement('div');signal.className='archive-background-signal';signal.setAttribute('aria-hidden','true');signal.innerHTML='<div class="archive-signal-orbit"><i></i><b></b></div><div class="archive-wave-bars">'+Array.from({length:24},(_,i)=>'<i style="--bar:'+i+'"></i>').join('')+'</div>';document.querySelector('.ambient-world').append(signal);
 function syncArchive(){signal.hidden=document.querySelector('#projects').hidden;}
 new MutationObserver(syncArchive).observe(document.querySelector('#projects'),{attributes:true,attributeFilter:['hidden']});syncArchive();
})();

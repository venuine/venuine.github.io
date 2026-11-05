(()=>{
 const strip=document.querySelector('.hero-under'),wave=strip.querySelector('.hero-under-segments');strip.querySelector('a')?.remove();wave.replaceChildren();
 for(let i=0;i<22;i++){const bar=document.createElement('i');bar.style.setProperty('--wave-index',i);bar.style.height=(5+Math.round(Math.sin(i*.73)**2*9))+'px';wave.append(bar);}wave.setAttribute('aria-hidden','true');strip.prepend(wave);
 const orbit=document.querySelector('.ambient-orbit'),inner=document.querySelector('.ambient-inner-track'),outer=document.querySelector('.ambient-outer-track');
 for(const [parent,duration,phase,size,reverse] of [[orbit,47,-7,7,false],[orbit,58,-29,9,true],[inner,39,-18,6,false],[inner,61,-43,8,true],[outer,31,-13,7,false],[outer,42,-32,9,true]]){const runner=document.createElement('div');runner.className='ambient-orbit-runner extra-sphere';runner.style.animationDuration=duration+'s';runner.style.animationDelay=phase+'s';runner.style.animationDirection=reverse?'reverse':'normal';runner.style.setProperty('--sphere-size',size+'px');runner.innerHTML='<span></span>';parent.append(runner);}
 const stars=document.createElement('div');stars.className='breathing-stars';stars.setAttribute('aria-hidden','true');
 [[8,19,3],[22,58,4],[43,12,3],[65,72,4],[84,24,3],[15,84,3],[91,81,4],[54,42,2]].forEach(([x,y,size],i)=>{const star=document.createElement('i');star.style.cssText=`left:${x}%;top:${y}%;--star-size:${size}px;--star-delay:${-i*1.3}s;--star-duration:${6+i%3}s`;stars.append(star);});document.querySelector('.ambient-world').append(stars);
})();

import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../public/assets/js/interaction-motion.js',import.meta.url),'utf8');
function harness({reduced=false,paused=false,hidden=false}={}){
 const animations=[],commits=[];
 const child={animate(frames,options){let finish;const finished=new Promise(resolve=>finish=resolve);const animation={frames,options,finished,finish,cancel(){this.cancelled=true;finish();}};animations.push(animation);return animation;}};
 const region={children:[child],matches:()=>false,closest:()=>null};
 const context={window:{},matchMedia:()=>({matches:reduced}),document:{hidden,body:{classList:{contains:()=>paused}}}};
 vm.runInNewContext(source,context);
 return{swap:context.window.PortfolioMotion.swap,region,animations,commits};
}
for(const options of [{reduced:true},{paused:true},{hidden:true}]){
 const h=harness(options);await h.swap(h.region,[h.region],()=>h.commits.push('visible'));
 assert.deepEqual(h.commits,['visible']);assert.equal(h.animations.length,0);
}
const h=harness();
const first=h.swap(h.region,[h.region],()=>h.commits.push('obsolete'));
const last=h.swap(h.region,[h.region],()=>h.commits.push('latest'));
assert.equal(h.animations[0].cancelled,true);
h.animations.forEach(animation=>animation.finish());
for(let i=0;i<8;i++)await Promise.resolve();
h.animations.forEach(animation=>animation.finish());
await Promise.all([first,last]);
assert.deepEqual(h.commits,['latest']);
assert(h.animations.some(animation=>animation.options.duration>=300));
console.log('Passed: reduced motion, pause, hidden-tab behavior, interrupted selection, latest selection wins.');

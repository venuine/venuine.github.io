import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile(new URL('../public/assets/js/sound.js',import.meta.url),'utf8');
function harness(supported=true){
 const nodes=[],listeners={},contexts=[];let clock=100,tones=0;
 function node(){const x={attrs:{},dataset:{},events:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,v){this.events[k]=v;},after(){}};nodes.push(x);return x;}
 const header={insertBefore(){}};
 class Audio{constructor(){this.state='suspended';this.currentTime=0;this.destination={};contexts.push(this);}async resume(){this.state='running';}async suspend(){this.state='suspended';}createOscillator(){tones++;return{frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){},start(){},stop(){}};}createGain(){return{gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}}
 const document={hidden:false,body:{dataset:{}},createElement:node,querySelector:s=>s==='.header-actions'?header:{},addEventListener(k,v){listeners[k]=v;}};
 const context={window:{AudioContext:supported?Audio:null},document,performance:{now:()=>clock}};vm.runInNewContext(source,context);
 return{button:nodes[0],document,contexts,get tones(){return tones;},clickControl(){clock+=100;listeners.click({target:{closest:()=>({closest:()=>null})}});}};
}
const h=harness();assert.equal(h.contexts.length,0);assert.equal(h.document.body.dataset.soundEnabled,'false');h.clickControl();assert.equal(h.tones,0);
await h.button.events.click();assert.equal(h.contexts.length,1);assert.equal(h.document.body.dataset.soundEnabled,'true');assert.equal(h.tones,1);
h.clickControl();assert.equal(h.tones,2);
await h.button.events.click();h.clickControl();assert.equal(h.document.body.dataset.soundEnabled,'false');assert.equal(h.tones,2);assert.equal(h.contexts[0].state,'suspended');
const unavailable=harness(false);await unavailable.button.events.click();assert.equal(unavailable.button.disabled,true);assert.equal(unavailable.document.body.dataset.soundEnabled,'false');
console.log('Passed: silent default, explicit opt-in, selection cue, mute, unavailable-audio fallback.');

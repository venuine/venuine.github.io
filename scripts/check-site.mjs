import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../public/',import.meta.url));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [,reference] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  if(/^(https?:|mailto:|tel:)/.test(reference))continue;
  if(!fs.existsSync(path.join(root,reference)))throw Error('Missing asset: '+reference);
}
const scripts=path.join(root,'assets/js');
for(const name of fs.readdirSync(scripts))new vm.Script(fs.readFileSync(path.join(scripts,name),'utf8'),{filename:name});
const sandbox={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(scripts,'content.js'),'utf8'),sandbox);
for(const project of sandbox.window.PortfolioContent.projects){
  for(const image of project.images)if(!fs.existsSync(path.join(root,image)))throw Error('Missing project image: '+image);
}
console.log('Site assets and JavaScript verified.');

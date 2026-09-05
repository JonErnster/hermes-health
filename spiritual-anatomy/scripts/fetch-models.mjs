import {readFile,mkdir,writeFile,rename,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('model-manifest.json',root),'utf8'));
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
await mkdir(new URL('public/models/',root),{recursive:true});
let cursor=0,downloaded=0;
await Promise.all(Array.from({length:3},async()=>{while(cursor<manifest.files.length){const entry=manifest.files[cursor++],path=new URL('public/models/'+entry.name,root);try{const data=await readFile(path);if(digest(data)===entry.sha256)continue;}catch{}
 const response=await fetch(`https://raw.githubusercontent.com/ashemag/human-atlas/${manifest.commit}/public/models/${entry.name}`);if(!response.ok)throw Error(`Model download failed (${response.status}): ${entry.name}`);const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length!==entry.bytes||digest(bytes)!==entry.sha256)throw Error(`Model integrity check failed: ${entry.name}`);const temp=fileURLToPath(path)+'.download';try{await writeFile(temp,bytes);await rename(temp,path);}finally{await rm(temp,{force:true});}downloaded++;
}}));
console.log(`Verified ${manifest.files.length} pinned anatomy assets (${downloaded} downloaded).`);

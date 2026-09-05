export type Profile={geneKeys:Record<string,number>;definedCenters:string[];planets:{name:string;longitude:number}[];notes:Record<string,string>};
export const EMPTY_PROFILE:Profile={geneKeys:{},definedCenters:[],planets:[],notes:{}};
export function parseProfile(text:string):Profile{const p=JSON.parse(text);if(!p||typeof p!=='object'||Array.isArray(p))throw new Error('Profile must be an object.');const geneKeys=p.geneKeys??{},definedCenters=p.definedCenters??[],planets=p.planets??[],notes=p.notes??{};
 if(typeof geneKeys!=='object'||Array.isArray(geneKeys)||Object.values(geneKeys).some(v=>!Number.isInteger(v)||Number(v)<1||Number(v)>64))throw new Error('Gene Keys must be integers from 1 through 64.');
 if(!Array.isArray(definedCenters)||definedCenters.some(v=>typeof v!=='string'||!/^hd-[0-8]$/.test(v)))throw new Error('Defined center IDs must be hd-0 through hd-8.');
 if(!Array.isArray(planets)||planets.some(v=>!v||typeof v.name!=='string'||!Number.isFinite(v.longitude)||v.longitude<0||v.longitude>=360))throw new Error('Planetary longitudes must be numbers from 0 to below 360.');
 if(typeof notes!=='object'||Array.isArray(notes)||Object.values(notes).some(v=>typeof v!=='string'))throw new Error('Notes must contain text.');return{geneKeys,definedCenters,planets,notes};}
export function downloadJSON(name:string,data:unknown){const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}

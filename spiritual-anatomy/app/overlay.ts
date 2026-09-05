import * as T from 'three';
export type Landmark={id:string;name:string;position:[number,number,number];color:string;radius?:number;description:string;source?:string;kind?:string};
export type Route={id:string;points:[number,number,number][];color:string;closed?:boolean};
export type Overlay={points:Landmark[];routes:Route[];selected?:string;opacity:number;labels:boolean;dark:boolean};
export function makeOverlay(data:Overlay,select:(id:string)=>void){
 const group=new T.Group();const labels:{node:HTMLButtonElement;position:T.Vector3}[]=[];
 for(const p of data.points){
  const sphere=new T.Mesh(new T.SphereGeometry(p.radius??.022,24,16),new T.MeshBasicMaterial({color:p.color,transparent:true,opacity:p.id===data.selected?.95:.6,depthTest:false,depthWrite:false}));
  sphere.userData.landmarkId=p.id;sphere.position.fromArray(p.position);sphere.renderOrder=30;group.add(sphere);
  const halo=new T.Mesh(new T.SphereGeometry((p.radius??.022)*1.5,20,12),new T.MeshBasicMaterial({color:p.color,transparent:true,opacity:.12,depthWrite:false,depthTest:false}));halo.position.copy(sphere.position);halo.renderOrder=29;group.add(halo);
  const node=document.createElement('button');node.className='atlas-marker';node.textContent=p.name;node.style.setProperty('--marker',p.color);node.setAttribute('aria-label',`Inspect ${p.name}`);node.setAttribute('aria-pressed',String(p.id===data.selected));node.onclick=()=>select(p.id);labels.push({node,position:sphere.position.clone()});
 }
 for(const route of data.routes){const curve=new T.CatmullRomCurve3(route.points.map(p=>new T.Vector3(...p)),route.closed??false);const mesh=new T.Mesh(new T.TubeGeometry(curve,120,.003,6,route.closed??false),new T.MeshBasicMaterial({color:route.color,transparent:true,opacity:.7,depthTest:false,depthWrite:false}));mesh.renderOrder=28;group.add(mesh);}
 return {group,labels,dispose(){group.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();(o.material as T.Material).dispose();}});labels.forEach(l=>l.node.remove());}};
}

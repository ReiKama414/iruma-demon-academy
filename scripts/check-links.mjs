import { writeFileSync } from 'node:fs';
import { sources, platforms, seasons, unconfirmedPlatforms } from '../src/data/content.ts';
const links = [...new Set([...sources.map(s=>s.url),...seasons.map(s=>s.source),...platforms.flatMap(p=>Object.values(p.links)),...unconfirmedPlatforms.map(p=>p.url)])];
const results=[];
for(let index=0;index<links.length;index+=5){
  results.push(...await Promise.all(links.slice(index,index+5).map(async url=>{
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(18000),headers:{'User-Agent':'Mozilla/5.0 IrumaFanSite-LinkCheck/1.0'}});
      const html=await response.text();
      return {url,status:response.status,finalUrl:response.url,title:html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g,' ').trim()||null,result:response.ok?'HTTP reachable; playback not verified':'Automated request blocked or unsuccessful; verify manually'};
    }catch(error){return {url,status:null,result:`Request could not be verified: ${error.message}`};}
  })));
}
writeFileSync('docs/link-audit.json',JSON.stringify({checkedAt:'2026-10-16',note:'HTTP transport validation only. Source search independently confirms titles; no login, payment, or playback assertion.',results},null,2));
console.log(JSON.stringify({checked:results.length,reachable:results.filter(r=>r.status>=200&&r.status<300).length,blockedOrUnverified:results.filter(r=>!r.status||r.status>=400).map(r=>({url:r.url,status:r.status}))},null,2));

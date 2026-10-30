'use client';

import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import type { Character } from '@/data/content';
import { characterCategories, categoryPath, classificationSource, isInCategory } from '@/data/taxonomy';

export default function CategoryBrowser({characters,selected,onSelect}:{characters:Character[];selected:string;onSelect:(id:string)=>void}) {
  const [query,setQuery] = useState('');
  const term=query.trim();
  const nodes=characterCategories.filter(node=>!term||categoryPath(node.id).some(parent=>parent.label.includes(term)));
  return <div className="category-browser">
    <span className="eyebrow">CHARACTER CLASSIFICATION</span>
    <h2>從學園，到整個魔界</h2>
    <p>{characterCategories.length} 個階層分類。數字為本站已收錄的角色／組織條目，上層會包含子分類的人物</p>
    <label className="classification-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} aria-label="搜尋角色分類" placeholder="找師團、家系或組織…"/></label>
    <nav aria-label="完整角色分類目錄" className="classification-tree">
      {!term&&<button className="classification-root" aria-current={selected==='all'?'true':undefined} onClick={()=>onSelect('all')}><span>全部角色</span><small>{characters.length}</small></button>}
      {nodes.map(node=>{
        const path=categoryPath(node.id),count=characters.filter(character=>isInCategory(character,node.id)).length;
        return <button key={node.id} className={node.parent?'classification-child':'classification-root'} style={{paddingLeft:14+(path.length-1)*22}} aria-current={selected===node.id?'true':undefined} onClick={()=>onSelect(node.id)}><span>{node.parent&&<i aria-hidden="true">└</i>}{node.label}</span><small>{count}</small></button>;
      })}
      {!nodes.length&&<p>沒有符合的分類，試試「家」或「師團」</p>}
    </nav>
    <a className="classification-source" href={classificationSource} target="_blank" rel="noopener noreferrer">分類依據：維基百科・登場角色 <ArrowUpRight size={14}/></a>
  </div>;
}

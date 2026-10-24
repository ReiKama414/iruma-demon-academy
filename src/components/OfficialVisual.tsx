'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import { videos, youtubeLogo } from '@/data/media';

type Preview={title:string;author:string;thumbnailUrl:string;width:number;height:number};
const previewCache=new Map<string,Promise<Preview>>();
function usePreview(id:string,enabled:boolean) {
  const [preview,setPreview]=useState<Preview|null>(null);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    let alive=true;setPreview(null);setFailed(false);
    if(!enabled)return;
    let pending=previewCache.get(id);
    if(!pending){
      pending=fetch(`/api/media?id=${encodeURIComponent(id)}`).then(async response=>{if(!response.ok)throw new Error('Preview unavailable');return response.json() as Promise<Preview>;});
      previewCache.set(id,pending);
    }
    pending.then(value=>{if(alive)setPreview(value);}).catch(()=>{previewCache.delete(id);if(alive)setFailed(true);});
    return()=>{alive=false;};
  },[id,enabled]);
  return {preview,failed,onImageError:()=>setFailed(true)};
}

export function OfficialThumbnail({id,enabled}:{id:string;enabled:boolean}) {
  const {preview,failed,onImageError}=usePreview(id,enabled);
  return <span className="official-thumbnail">{preview&&!failed?<Image src={preview.thumbnailUrl} width={preview.width} height={preview.height} alt={preview.title} onError={onImageError} unoptimized/>:<span className="preview-loading">官方宣傳畫面</span>}<span className="youtube-attribution"><Image src={youtubeLogo} width={50} height={12} alt="YouTube" unoptimized/></span></span>;
}

export default function OfficialVisual({id,enabled,onPlay,className=''}:{id:string;enabled:boolean;onPlay:(id:string)=>void;className?:string}) {
  const {preview,failed,onImageError}=usePreview(id,enabled);
  const video=videos[id];
  return <figure className={`official-visual ${className}`}>
    <button className="official-preview-button" onClick={()=>onPlay(id)} aria-label={`觀看${video.label}`}>
      {preview&&!failed?<Image src={preview.thumbnailUrl} width={preview.width} height={preview.height} alt={preview.title} onError={onImageError} unoptimized/>:<span className="preview-loading">{failed?'官方預覽暫時無法載入，仍可點擊觀看影片。':'正在載入官方宣傳畫面…'}</span>}
    </button>
    <figcaption><div><Image src={youtubeLogo} width={62} height={15} alt="YouTube" unoptimized/><span>{video.label}</span></div><button onClick={()=>onPlay(id)} aria-label={`播放${video.label}`}><Play size={12}/>播放</button><a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" aria-label={`${video.label}（另開 YouTube）`}><ArrowUpRight size={16}/></a></figcaption>
    <p className="official-preview-credit">{preview?.author||video.organization} · 官方影片預覽圖，非人物立繪</p>
  </figure>;
}

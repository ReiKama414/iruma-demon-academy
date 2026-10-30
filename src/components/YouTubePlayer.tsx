'use client';

import { useMemo, useState } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({id, title, autoPlay=false, muted=false}: {id: string; title: string; autoPlay?: boolean; muted?: boolean}) {
  const [failed, setFailed] = useState(false);
  const opts = useMemo(()=>({
    width: '100%', height: '100%', host: 'https://www.youtube-nocookie.com',
    playerVars: {autoplay: autoPlay?1:0, mute: muted?1:0, playsinline: 1, rel: 0},
  }),[autoPlay,muted]);
  return <>
    <div className="video-wrapper">
      <YouTube videoId={id} title={title} className="youtube-player" opts={opts} onReady={({target})=>{
        if(muted)target.mute();
        if(autoPlay)target.playVideo();
      }} onError={() => setFailed(true)}/>
    </div>
    {failed && <p role="status">此影片目前無法在站內播放，請使用下方 YouTube 連結觀看</p>}
  </>;
}

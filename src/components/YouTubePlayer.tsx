'use client';

import { useState } from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer({id, title}: {id: string; title: string}) {
  const [failed, setFailed] = useState(false);
  return <>
    <div className="video-wrapper">
      <YouTube videoId={id} title={title} className="youtube-player" opts={{
        width: '100%', height: '100%', host: 'https://www.youtube-nocookie.com',
        playerVars: {autoplay: 0, playsinline: 1, rel: 0},
      }} onError={() => setFailed(true)}/>
    </div>
    {failed && <p role="status">此影片目前無法在站內播放，請使用下方 YouTube 連結觀看。</p>}
  </>;
}

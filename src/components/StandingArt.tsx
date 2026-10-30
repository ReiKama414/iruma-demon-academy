'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getPortrait } from '@/data/portraits';
import type { Character } from '@/data/content';
import { Symbol } from './Magic';

export default function StandingArt({ character, enabled, className = '', sizes = '40vw', eager = false, decorative = false, variant }: {
  character: Character;
  enabled: boolean;
  className?: string;
  sizes?: string;
  eager?: boolean;
  decorative?: boolean;
  variant?: string;
}) {
  const portrait = getPortrait(character.id, variant);
  const source = portrait?.url;
  const [failedSource, setFailedSource] = useState<string>();
  const [loaded, setLoaded] = useState(false);
  const available = source && failedSource !== source;
  const showImage = available && (enabled || loaded || eager);

  return <span className={`standing-art standing-art--${portrait?.kind || 'missing'} ${className}`}>
    {showImage ? <Image
      src={source}
      alt={decorative ? '' : `${character.name}・${portrait.label}`}
      fill
      unoptimized
      sizes={sizes}
      draggable={false}
      loading={eager ? 'eager' : 'lazy'}
      onLoad={() => setLoaded(true)}
      onError={() => setFailedSource(source)}
      style={{ objectFit: 'contain' }}
    /> : <span className="standing-fallback" aria-hidden={decorative || !enabled}>
      <Symbol name={character.symbol} size={64}/>
      <span>{!source ? '尚無官方立繪來源' : failedSource === source ? '立繪暫無法載入' : '載入角色立繪'}</span>
    </span>}
  </span>;
}

'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Menu, Music2, Play, Search, Volume2, VolumeX, X } from 'lucide-react';
import { acts, chapters, characters, checkedAt, official, platforms, seasons, sources, unconfirmedPlatforms, worldPages, Character } from '@/data/content';
import { assets } from '@/data/assets';
import { MagicCircle, MusicTrail, Symbol } from './Magic';
import OfficialVisual, { OfficialThumbnail } from './OfficialVisual';
import { getPortrait, getPortraits, portraitCatalog } from '@/data/portraits';
import StandingArt from './StandingArt';
import CategoryBrowser from './CategoryBrowser';
import { characterCategories, characterMemberships, categoryPath, categoryNotes, categorySource, getCategory, isInCategory, quickCategories } from '@/data/taxonomy';
import { pressArchive, seasonVideos, videos, stageFeatures, stageShots, StageShot, idolVariants, idolAliases } from '@/data/media';
const YouTubePlayer = dynamic(()=>import('./YouTubePlayer'),{ssr:false,loading:()=> <div className="player-loading">正在載入 YouTube 播放器…</div>});

gsap.registerPlugin(Observer, ScrollTrigger);
type Modal = 'video'|'image'|'sources'|'assets'|'categories'|null;
const styleColor = (color:string) => ({'--accent':color}) as CSSProperties;
const two = (n:number) => String(n).padStart(2,'0');
const portraitCount = Object.values(portraitCatalog).reduce((sum,images)=>sum+images.length,0);
function Out({href,children,className=''}:{href:string;children:React.ReactNode;className?:string}) {return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={15}/><span className="sr-only">（另開視窗）</span></a>;}

export default function Academy() {
  const root = useRef<HTMLDivElement>(null);
  const sceneIndex = useRef(0);
  const lock = useRef(false);
  const gestureReady = useRef(true);
  const context = useRef<gsap.Context|null>(null);
  const introTimeline = useRef<gsap.core.Timeline|null>(null);
  const activeTimeline = useRef<gsap.core.Timeline|null>(null);
  const characterTransition = useRef<gsap.core.Tween|null>(null);
  const reduced = useRef(false);
  const audio = useRef<AudioContext|null>(null);
  const mutedRef = useRef(true);
  const menuRef = useRef(false);
  const modalRef = useRef<Modal>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogReturnFocus = useRef<HTMLElement|null>(null);
  const [scene,setScene] = useState(0);
  const [menu,setMenu] = useState(false);
  const [muted,setMuted] = useState(true);
  const [intro,setIntro] = useState(true);
  const [modal,setModal] = useState<Modal>(null);
  const [videoId,setVideoId] = useState('S2p07wVUiB8');
  const [book,setBook] = useState(0);
  const [season,setSeason] = useState(4);
  const [watchSeason,setWatchSeason] = useState(4);
  const [characterId,setCharacterId] = useState('iruma');
  const [category,setCategory] = useState('all');
  const [query,setQuery] = useState('');
  const [stageId,setStageId] = useState('soi');
  const [act,setAct] = useState(0);
  const [outfits,setOutfits] = useState<Record<string,string>>({});
  const [selectedShot,setSelectedShot] = useState<StageShot|null>(null);
  const [spoilers,setSpoilers] = useState(false);
  const filtered = characters.filter(c=>isInCategory(c,category)&&`${c.name} ${c.jp} ${c.en} ${idolAliases[c.id]||''}`.toLowerCase().includes(query.toLowerCase()));
  const character = filtered.find(c=>c.id===characterId)||filtered[0]||characters.find(c=>c.id===characterId)!;
  const stageCharacter = characters.find(c=>c.id===stageId)!;
  const characterOutfits = getPortraits(character.id);
  const outfitKey = outfits[character.id] || (category==='idol'?idolVariants[character.id]:undefined);
  const portrait = getPortrait(character.id,outfitKey);
  const feature = stageFeatures[act];
  const stageCast = feature.cast.map(id=>characters.find(c=>c.id===id)!);
  const stagePortrait = getPortrait(stageId,feature.variants[stageId]);
  const selectAct = (next:number)=>{setAct(next);setStageId(stageFeatures[next].selected);chime();};
  const selectedCategory = getCategory(category);
  const classificationPath = categoryPath(category);

  const chime = useCallback(()=>{
    if(mutedRef.current) return;
    try {
      audio.current ??= new AudioContext();
      const a=audio.current;
      void a.resume();
      [523.25,783.99,1046.5].forEach((frequency,i)=>{
        const o=a.createOscillator(), g=a.createGain(), t=a.currentTime+i*.075;
        o.type='sine';o.frequency.value=frequency;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.025,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.35);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.4);
      });
    } catch { mutedRef.current=true;setMuted(true); }
  },[]);
  const finishIntro = useCallback(()=>{
    introTimeline.current?.kill();setIntro(false);lock.current=false;
  },[]);

  const go = useCallback((next:number)=>{
    if(!root.current || lock.current || next<0 || next>6 || next===sceneIndex.current || modalRef.current) return;
    const prev=sceneIndex.current, direction=next>prev?1:-1;
    const panels=root.current.querySelectorAll<HTMLElement>('.scene');
    lock.current=true;setMenu(false);menuRef.current=false;
    sceneIndex.current=next;setScene(next);chime();
    context.current?.add(()=>{
      const duration=reduced.current?.01:.9;
      const tl=gsap.timeline({onComplete:()=>{ lock.current=false;panels[next].querySelector<HTMLElement>('h1,h2')?.focus({preventScroll:true}); }});
      activeTimeline.current=tl;
      tl.set(panels[next],{visibility:'visible',opacity:1,zIndex:3,xPercent:0,yPercent:0,scale:1,rotation:0})
        .fromTo(panels[next],{clipPath:direction>0?'polygon(0 100%,100% 75%,100% 100%,0 100%)':'polygon(0 0,100% 0,100% 0,0 25%)'},{clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)',duration,ease:'power3.inOut'},0)
        .to(panels[prev],{scale:reduced.current?1:.91,yPercent:reduced.current?0:-direction*5,opacity:0,duration:duration*.9},0)
        .fromTo(panels[next].querySelectorAll('[data-reveal]'),{y:reduced.current?0:45,opacity:0,rotation:next===2?-3:0},{y:0,opacity:1,rotation:0,stagger:.06,duration:duration*.7,ease:'power3.out'},duration*.25)
        .set(panels[prev],{visibility:'hidden',zIndex:1})
        .set(panels[next],{zIndex:2});
      if(next===4 && !reduced.current) tl.fromTo('.curtain-left',{xPercent:0},{xPercent:-100,duration:1.2,ease:'power2.inOut'},.25).fromTo('.curtain-right',{xPercent:0},{xPercent:100,duration:1.2,ease:'power2.inOut'},.25);
      if(next===6 && !reduced.current) tl.fromTo('.farewell-school',{scale:1.2},{scale:1,duration:3,ease:'power2.out'},.15);
    });
  },[chime]);

  useLayoutEffect(()=>{
    reduced.current=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    lock.current=true;
    const ctx=gsap.context(()=>{
      const panels=root.current?.querySelectorAll<HTMLElement>('.scene');
      if(panels){
        gsap.set(panels,{autoAlpha:0,zIndex:1});
        gsap.set(panels[sceneIndex.current],{autoAlpha:1,zIndex:2,scale:1,xPercent:0,yPercent:0,clipPath:'polygon(0 0,100% 0,100% 100%,0 100%)'});
      }
      const tl=gsap.timeline({onComplete:finishIntro});introTimeline.current=tl;
      if(reduced.current) {finishIntro();return;}
      if(!root.current?.querySelector('.intro-screen'))finishIntro();
      else tl.fromTo('.intro-ring',{scale:.5,opacity:0,rotation:-45},{scale:1,opacity:1,rotation:0,duration:.8,ease:'power2.out'})
        .fromTo('.intro-label',{opacity:0,y:14},{opacity:1,y:0,duration:.4},.3)
        .to('.intro-ring',{rotation:50,scale:1.15,duration:.7},.8)
        .to('.intro-ring',{scale:8,opacity:0,duration:.7,ease:'power3.in'},1.5)
        .to('.intro-screen',{opacity:0,duration:.5},1.7);
      gsap.to('.slow-ring',{rotation:360,duration:90,repeat:-1,ease:'none'});
      gsap.to('.spark',{y:-18,opacity:.25,stagger:.13,duration:2.4,yoyo:true,repeat:-1,ease:'sine.inOut'});
      gsap.fromTo('.music-trail path',{strokeDasharray:1600,strokeDashoffset:1600},{strokeDashoffset:0,stagger:.13,duration:3,repeat:-1,repeatDelay:3,ease:'power1.inOut'});
      gsap.to('.spotlight',{rotation:8,transformOrigin:'50% 0',duration:5,repeat:-1,yoyo:true,ease:'sine.inOut',stagger:1.2});
      gsap.to('.world-read-progress',{scaleX:1,transformOrigin:'left',ease:'none',scrollTrigger:{trigger:'.world-book',scroller:'.world-scroll',start:'top top',end:'bottom bottom',scrub:true}});
    },root);
    context.current=ctx;
    const gesture=(direction:number)=>{
      if(menuRef.current||modalRef.current||lock.current||!gestureReady.current)return;
      gestureReady.current=false;go(sceneIndex.current+direction);
    };
    const obs=Observer.create({target:window,type:'wheel,touch',tolerance:55,wheelSpeed:1,onStopDelay:.25,onStop:()=>{gestureReady.current=true;},onRelease:()=>{gestureReady.current=true;},ignore:'.local-scroll, .local-scroll *, .modal, .modal *, .chapter-menu, .chapter-menu *, input, select, iframe',onDown:self=>gesture(self.event.type==='wheel'?1:-1),onUp:self=>gesture(self.event.type==='wheel'?-1:1)});
    // Let reading panels scroll naturally; hand chapter navigation back at their edges.
    let wheelIdle: ReturnType<typeof setTimeout>;
    let wheelDistance=0;
    const readingPanel=(target:HTMLElement)=>{
      let panel=target.closest<HTMLElement>('.local-scroll');
      while(panel&&!['auto','scroll'].includes(getComputedStyle(panel).overflowY))panel=panel.parentElement?.closest<HTMLElement>('.local-scroll')||null;
      return panel;
    };
    const localWheel=(e:WheelEvent)=>{
      const panel=readingPanel(e.target as HTMLElement);
      if(!panel||modalRef.current||menuRef.current||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
      clearTimeout(wheelIdle);
      wheelIdle=setTimeout(()=>{gestureReady.current=true;wheelDistance=0;},250);
      if(panel.matches('.character-strip,.category-tabs,.ensemble,.stage-shot-strip')){panel.scrollLeft+=e.deltaY;e.preventDefault();return;}
      const down=e.deltaY>0;
      if((down&&panel.scrollTop+panel.clientHeight<panel.scrollHeight-2)||(!down&&panel.scrollTop>2))return;
      wheelDistance+=e.deltaY;
      if(Math.abs(wheelDistance)>55){e.preventDefault();gesture(down?1:-1);}
    };
    let touchStart:{x:number;y:number;panel:HTMLElement}|null=null;
    const localTouchStart=(e:TouchEvent)=>{
      const panel=readingPanel(e.target as HTMLElement);
      const touch=e.touches[0];
      touchStart=panel&&touch?{x:touch.clientX,y:touch.clientY,panel}:null;
      gestureReady.current=true;
    };
    const localTouchEnd=(e:TouchEvent)=>{
      const touch=e.changedTouches[0];if(!touchStart||!touch)return;
      const dx=touch.clientX-touchStart.x,dy=touch.clientY-touchStart.y,panel=touchStart.panel;touchStart=null;
      if(Math.abs(dy)<65||Math.abs(dx)>Math.abs(dy)||panel.matches('.character-strip,.category-tabs,.ensemble,.stage-shot-strip'))return;
      if((dy<0&&panel.scrollTop+panel.clientHeight>=panel.scrollHeight-2)||(dy>0&&panel.scrollTop<=2))gesture(dy<0?1:-1);
    };
    const keyboard=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){if(!modalRef.current){setMenu(false);menuRef.current=false;finishIntro();}return;}
      if(modalRef.current || (e.target as HTMLElement).closest('input,select,textarea,[role="tablist"],.local-scroll'))return;
      if(e.key===' '&&(e.target as HTMLElement).closest('button,a'))return;
      if(e.key==='Escape'){setMenu(false);menuRef.current=false;finishIntro();}
      if(menuRef.current)return;
      if(['ArrowDown','PageDown','ArrowRight',' '].includes(e.key)){e.preventDefault();go(sceneIndex.current+1);}
      if(['ArrowUp','PageUp','ArrowLeft'].includes(e.key)){e.preventDefault();go(sceneIndex.current-1);}
      if(e.key==='Home'){e.preventDefault();go(0);}
      if(e.key==='End'){e.preventDefault();go(6);}
    };
    const pointer=(e:PointerEvent)=>{
      if(reduced.current||e.pointerType==='touch')return;
      const px=e.clientX/window.innerWidth-.5, py=e.clientY/window.innerHeight-.5;
      gsap.set('.cursor',{x:e.clientX,y:e.clientY});
      const layers=panelsAtCurrent();
      if(layers.length)gsap.to(layers,{x:px*14,y:py*10,duration:1,ease:'power2.out',overwrite:'auto'});
      function panelsAtCurrent(){return root.current?.querySelectorAll(`.scene:nth-of-type(${sceneIndex.current+1}) [data-depth]`)||[];}
    };
    const resize=()=>ScrollTrigger.refresh();
    const host=root.current;
    host?.addEventListener('wheel',localWheel,{passive:false});host?.addEventListener('touchstart',localTouchStart,{passive:true});host?.addEventListener('touchend',localTouchEnd,{passive:true});
    window.addEventListener('keydown',keyboard);window.addEventListener('pointermove',pointer);window.addEventListener('resize',resize);
    return ()=>{obs.kill();ctx.revert();characterTransition.current?.kill();clearTimeout(wheelIdle);host?.removeEventListener('wheel',localWheel);host?.removeEventListener('touchstart',localTouchStart);host?.removeEventListener('touchend',localTouchEnd);window.removeEventListener('keydown',keyboard);window.removeEventListener('pointermove',pointer);window.removeEventListener('resize',resize);void audio.current?.close();};
  },[finishIntro,go]);

  useLayoutEffect(()=>{
    if(!root.current?.querySelector('.character-passport'))return;
    const ctx=gsap.context(()=>{
      gsap.fromTo('.character-passport',{x:reduced.current?0:characterId==='clara'?60:characterId==='alice'?-60:0,y:reduced.current?0:characterId==='iruma'?35:0,rotation:reduced.current?0:characterId==='clara'?5:-2,opacity:0},{x:0,y:0,rotation:0,opacity:1,duration:reduced.current?.01:.55,ease:characterId==='clara'?'back.out(1.7)':'power3.out'});
    },root);return()=>ctx.revert();
  },[character.id]);
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{gsap.fromTo('.book-page',{rotationY:reduced.current?0:-30,opacity:0},{rotationY:0,opacity:1,duration:reduced.current?.01:.5,transformOrigin:'left center',ease:'power2.out'});},root);return()=>ctx.revert();
  },[book]);
  useEffect(()=>{
    if(modal){dialogReturnFocus.current=document.activeElement as HTMLElement;dialog.current?.showModal();}
    else {dialog.current?.close();dialogReturnFocus.current?.focus();}
    modalRef.current=modal;
  },[modal]);
  const openModal=(value:Modal)=>{modalRef.current=value;setModal(value);};
  const showVideo=(id='S2p07wVUiB8')=>{setVideoId(id);openModal('video');};
  const chooseCharacter=(c:Character)=>{
    if(c.id===character.id)return;
    characterTransition.current?.kill();chime();
    if(reduced.current||!root.current?.querySelector('.character-passport')){setCharacterId(c.id);return;}
    characterTransition.current=gsap.to('.character-passport',{x:-20,opacity:0,duration:.16,ease:'power2.in',onComplete:()=>setCharacterId(c.id)});
  };
  const moveCharacter=(direction:number)=>{
    if(!filtered.length)return;
    const i=filtered.findIndex(c=>c.id===character.id);chooseCharacter(filtered[(i+direction+filtered.length)%filtered.length]);
  };

  const selectCategory = (id:string)=>{
    setCategory(id);setQuery('');
    if(id==='idol')setOutfits(value=>({...value,...idolVariants}));
    const first=characters.find(c=>isInCategory(c,id));
    if(first)chooseCharacter(first);
  };

  return <div ref={root} className={`academy ${[2,4].includes(scene)?'theme-dark':''}`}>
    <a className="skip-link" href="#scene-navigation">跳至章節導覽</a>
    <header className="site-header">
      <button className="brand" onClick={()=>go(0)} aria-label="返回開場"><span className="brand-mark">B<span>✦</span></span><span>魔界學園<span className="brand-sub">BABYLS · FAN EXPERIENCE</span></span></button>
      <nav className="desktop-nav" aria-label="主要導覽"><button onClick={()=>go(1)} className={scene===1?'selected':''}>世界觀</button><button onClick={()=>go(2)} className={scene===2?'selected':''}>四季物語</button><button onClick={()=>go(3)} className={scene===3?'selected':''}>角色圖鑑</button><button className={`nav-season ${scene===4?'selected':''}`} onClick={()=>go(4)}>第四季特別舞台 <span>IV</span></button><button onClick={()=>go(5)}>在哪裡看 <ArrowUpRight size={14}/></button></nav>
      <div className="header-tools"><button className="sound-button" onClick={()=>{const next=!muted;mutedRef.current=next;setMuted(next);if(!next)chime();}} aria-label={muted?'開啟原創魔法音效':'關閉音效'} aria-pressed={!muted}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}<span>SOUND {muted?'OFF':'ON'}</span></button><button className="menu-button" aria-label={menu?'關閉章節選單':'開啟章節選單'} aria-expanded={menu} aria-controls="chapter-menu" onClick={()=>{menuRef.current=!menu;setMenu(!menu);}}>{menu?<X size={22}/>:<Menu size={22}/>}</button></div>
    </header>

    <main id="main-content" className="scene-container" inert={menu}>
      <section className="scene invitation" aria-label="魔界入學邀請" aria-hidden={scene!==0} inert={scene!==0}>
        <div className="hero-grain"/><div className="hero-orbit"/><span className="hero-number" aria-hidden="true">04</span>
        <div className="hero-scroll local-scroll"><div className="hero-copy"><p className="eyebrow" data-reveal><span/> AN UNOFFICIAL JOURNEY TO THE NETHERWORLD</p><div className="hero-jp" data-reveal>魔入りました！入間くん</div><h1 tabIndex={-1} data-reveal aria-label="入間同學入魔了！">入間同學<br/><span className="hero-title-second">入魔了<span className="title-star" aria-hidden="true">✦</span><span className="title-exclaim">！</span></span></h1><p className="hero-english" data-reveal>WELCOME TO <em>BABYLS.</em></p><p className="hero-description" data-reveal>一不小心，就成了惡魔的孫子。<br/>這一次，和十三位問題兒童一起，站上最耀眼的舞台。</p><div className="hero-actions" data-reveal><button className="primary-button" onClick={()=>go(4)}>第四季・大幕升起 <ArrowUpRight size={20}/></button><button className="text-button" onClick={()=>showVideo()}><span className="play-ring"><Play size={12} fill="currentColor"/></span>觀看官方 PV</button></div><p className="hero-fine" data-reveal>SEASON IV · 全 24 話 <span>2026.04.04 — 09.26</span></p></div>
        <div className="hero-art" data-depth><div className="arch-label">悪魔学校 バビルス</div><div className="hero-cast" aria-label="入間、艾利斯與庫菈菈官方立繪">{['alice','clara','iruma'].map(id=><StandingArt key={id} character={characters.find(c=>c.id===id)!} enabled={scene===0} eager className={`hero-cast-${id}`} sizes="(max-width:760px) 50vw, 28vw"/>)}</div><div className="hero-art-credit"><Out href={`${official}character`}>官方角色立繪</Out><span>© 西修（秋田書店）／第4シリーズ製作委員会</span></div><div className="school-arch"><Image src="/art/academy.svg" alt="本專案原創魔界學園夜景插畫，非官方場景" fill priority sizes="(max-width: 700px) 100vw, 56vw"/></div><div className="arch-outline"/><div className="ticket-seal"><span>THE MUSIC FESTIVAL</span><strong>13<span>人の</span></strong><b>挑戦。</b><Music2 size={20}/></div><span className="art-note">ORIGINAL FAN-CREATED SCENERY</span><span className="floating-star star-one">✧</span><span className="floating-star star-two">✦</span><span className="floating-star star-three">✧</span><span className="orbit-word">FRIENDSHIP · AMBITION · A LITTLE MAGIC ·</span></div>
        <div className="hero-news"><span className="news-label">LATEST NEWS</span><span className="news-date">2026.09.27</span><button onClick={()=>{go(6);}}>新的魔界故事，即將開始。劇場版企劃正式啟動！ <ArrowUpRight size={17}/></button><span className="news-no">01 / 01</span></div></div>
      </section>

      <section className="scene world" aria-label="歡迎來到惡魔學校" aria-hidden={scene!==1} inert={scene!==1}>
        <div className="world-school" data-depth><Image src="/art/academy.svg" fill alt="原創幻想學園插畫" sizes="60vw"/></div><div className="section-label">01 — THE WORLD</div><div className="world-layout"><div className="world-heading" data-reveal><p className="eyebrow">YOUR SCHOOL LIFE STARTS HERE</p><h2 tabIndex={-1}>魔界的日常，<br/>有點<span>不尋常。</span></h2><p>人類 × 惡魔 × 無法預測的青春。<br/>翻開這本書，認識巴比路斯。</p><MagicCircle className="world-magic slow-ring"/></div><div className="world-scroll local-scroll" tabIndex={0} aria-label="世界觀魔法書，可捲動"><div className="world-book" data-reveal><div className="book-spine"/><div className="book-page" key={book}><span className="book-kicker">{worldPages[book].kicker}</span><Image src="/art/crest.svg" width={50} height={60} alt="原創裝飾校徽"/><h3>{worldPages[book].title}</h3><p>{worldPages[book].body}</p><div className="book-rule">✦</div><p className="book-foot">{worldPages[book].foot}</p><div className="book-pages"><button aria-label="上一頁世界觀" disabled={book===0} onClick={()=>setBook(v=>v-1)}><ChevronLeft size={21}/></button><span>{two(book+1)} <i>/ 04</i></span><button aria-label="下一頁世界觀" disabled={book===3} onClick={()=>setBook(v=>v+1)}><ChevronRight size={21}/></button></div><div className="world-read-progress"/></div></div><figure className="press-archive"><span className="small-label">OFFICIAL ART ARCHIVE · 2022</span><h3>當魔界，走進東京遊樂園。</h3><p>2022 年 JOYPOLIS 合作活動回顧。活動已結束；這是當年的官方宣傳視覺，不是第四季主視覺。</p><Image src={pressArchive.image} width={pressArchive.width} height={pressArchive.height} alt="2022 入間同學入魔了 in JOYPOLIS 官方活動宣傳圖，七名角色完整合影" sizes="(max-width:760px) 86vw, 40vw"/><figcaption>{pressArchive.credit}<Out href={pressArchive.source}>官方活動新聞稿</Out></figcaption></figure></div></div>
      </section>

      <section className="scene seasons" aria-label="四季魔法之門" aria-hidden={scene!==2} inert={scene!==2} style={styleColor(seasons[season-1].color)}>
        <div className="section-label">02 — FOUR SEASONS</div><div className="seasons-top" data-reveal><p className="eyebrow">EVERY DOOR IS A NEW ADVENTURE</p><h2 tabIndex={-1}>每一扇門，<span>都是新的冒險。</span></h2><p>從最初的入學日，到十三人的聚光燈。</p></div><div className="season-scroll local-scroll"><div className="season-doors" role="tablist" aria-label="選擇動畫季度">{seasons.map(s=><button key={s.id} id={`season-tab-${s.id}`} role="tab" aria-selected={season===s.id} aria-controls="season-detail" onClick={()=>{setSeason(s.id);chime();}} className={`season-door ${season===s.id?'door-selected':''} ${s.id===4?'door-four':''}`} style={styleColor(s.color)}><span className="door-kicker">SEASON {two(s.id)}</span><div className="door-art"><MagicCircle/><OfficialThumbnail id={seasonVideos[s.id-1]} enabled={scene===2}/><strong>{s.roman}</strong></div><span className="door-year">{s.year}</span><span className="door-arc">{s.arc}</span>{s.id===4&&<span className="door-new">SPECIAL STAGE</span>}</button>)}</div><div id="season-detail" className="season-detail" role="tabpanel" aria-labelledby={`season-tab-${season}`} key={season}><div><span className="small-label">SEASON {two(season)} · {seasons[season-1].episodes} EPISODES</span><h3>{seasons[season-1].title}</h3></div><p>{seasons[season-1].description}<small>代表角色：{seasons[season-1].cast}</small></p><div className="season-meta"><span>首播 {seasons[season-1].date}</span><Out href={seasons[season-1].source}>核對來源</Out><button className="text-button" onClick={()=>{setWatchSeason(season);go(5);}}>前往觀看 <ArrowRight size={17}/></button></div></div><p className="material-note">各季畫面為 YouTube 官方 PV 預覽圖；非主視覺轉載。<button onClick={()=>openModal('assets')}>素材來源紀錄 ↗</button></p></div>
      </section>

      <section className="scene characters" aria-label="魔界角色圖鑑" aria-hidden={scene!==3} inert={scene!==3} style={styleColor(character.color)}>
        <div className="section-label">03 — MEET YOUR CLASSMATES</div><div className="character-header" data-reveal><div><p className="eyebrow">{characters.length} PROFILES · {portraitCount} IMAGES · A LOT TO LOVE.</p><h2 tabIndex={-1}>很高興，<span>與你入魔。</span></h2></div><label className="character-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜尋姓名 / NAME" aria-label="搜尋角色"/></label></div>
        <div className="category-navigation"><div className="category-tabs local-scroll" role="tablist" aria-label="角色快速分類">{quickCategories.map(([id,label])=><button key={id} role="tab" aria-selected={category===id} onClick={()=>selectCategory(id)}>{label}</button>)}</div><button className="category-directory-button" onClick={()=>openModal('categories')}><Menu size={15}/>分類目錄 <span>{characterCategories.length}</span></button></div><div className="category-breadcrumb" aria-label="目前角色分類"><button onClick={()=>selectCategory('all')}>全部</button>{classificationPath.map(node=><span key={node.id}>／ <button aria-current={node.id===category?'true':undefined} onClick={()=>selectCategory(node.id)}>{node.label}</button></span>)}<small>{filtered.length} 個已收錄條目</small></div>
        <div className="character-layout local-scroll">{filtered.length>0?<><div className="character-passport" key={`${character.id}-${portrait.key}`}><div className="passport-corner">BABYLS / CHARACTER ARCHIVE <span>{two(characters.indexOf(character)+1)}</span></div><MagicCircle className="portrait-ring slow-ring"/><div className="passport-name" aria-hidden="true">{character.en.split(' ')[0]}</div><StandingArt character={character} variant={outfitKey} enabled={scene===3} className="portrait-full" sizes="(max-width:760px) 85vw, 38vw"/><div className="portrait-caption"><span>{portrait.label} · {characterOutfits.length} 張圖片</span><Out href={portrait.source}>圖片來源</Out></div><p className="portrait-credit">{portrait.credit}</p></div><div className="character-info local-scroll" tabIndex={0} aria-label="選中角色資料" aria-live="polite"><span className="small-label">{character.en}</span><h3>{category==='idol'&&idolAliases[character.id]?idolAliases[character.id]:character.id==='keroli'&&['ch2','ch3'].includes(portrait.key)?'克蘿姆／凱洛莉':character.name}</h3><p className="jp-name" lang="ja">{character.jp}</p><span className="role-label">{character.role}</span>{characterOutfits.length>1&&<div className="outfit-picker" role="group" aria-label={`${character.name}造型切換`}><span className="small-label">CHARACTER LOOKS · {characterOutfits.length} 種造型</span><div>{characterOutfits.map(p=><button key={p.id} onClick={()=>setOutfits(value=>({...value,[character.id]:p.key}))} aria-pressed={portrait.key===p.key} aria-label={`切換${character.name}${p.label}`}><StandingArt character={character} variant={p.key} enabled={scene===3} className="outfit-thumb" sizes="60px" decorative/><span>{p.label}</span></button>)}</div></div>}<p className="character-trait">{character.trait}</p>{categoryNotes[category]&&<p className="membership-note">{categoryNotes[category]}</p>}<dl><div><dt>特徵與能力</dt><dd>{character.ability}</dd></div><div><dt>魔界的羈絆</dt><dd>{character.relation}</dd></div><div><dt>日本聲優</dt><dd>{character.cv}</dd></div><div><dt>動畫登場</dt><dd>{character.debut}</dd></div><div><dt>第四季</dt><dd>{character.s4}</dd></div></dl><div className="profile-taxonomy-tags" aria-label="角色所屬分類">{(characterMemberships[character.id]||[]).map(id=><button key={id} aria-label={`篩選${getCategory(id)?.label}`} onClick={()=>selectCategory(id)}>{getCategory(id)?.label}</button>)}</div><Out href={portrait.source}>角色圖片與資料來源</Out><p className="material-note">姓名譯法依台灣平台可能不同。立繪、劇照及出版社角色圖分別標示來源，皆可查看原圖。</p></div></>:<div className="classification-overview"><span className="small-label">CHARACTER INDEX</span><h3>{selectedCategory?.label||'搜尋結果'}</h3><p>{query?'找不到符合搜尋條件的角色。':`本分類尚未收錄完整人物檔案，可從下方來源查看登場人物。`}</p>{categoryNotes[category]&&<p>{categoryNotes[category]}</p>}{selectedCategory?.referenceNames&&<div className="classification-reference-names">{selectedCategory.referenceNames.map(name=><Out key={name} href={categorySource(category)}>{name}</Out>)}</div>}<div className="classification-children">{characterCategories.filter(node=>node.parent===category).map(node=><button key={node.id} onClick={()=>selectCategory(node.id)}>{node.label}<ArrowRight size={14}/></button>)}</div><Out href={categorySource(category)}>查看本分類的原作人物索引</Out><button className="text-button" onClick={()=>{selectCategory('all');}}>返回全部角色 <ArrowRight size={15}/></button></div>}</div>
        <div className="character-selector"><button className="round-button" onClick={()=>moveCharacter(-1)} aria-label="上一位角色" disabled={!filtered.length}><ArrowLeft size={18}/></button><div className="character-strip local-scroll" tabIndex={0} aria-label="角色清單">{filtered.map(c=><button key={c.id} onClick={()=>chooseCharacter(c)} aria-pressed={character.id===c.id} className={character.id===c.id?'active':''} style={styleColor(c.color)}><StandingArt character={c} variant={category==='idol'?idolVariants[c.id]:undefined} enabled={scene===3} className="strip-portrait" sizes="65px" decorative/><span>{c.name.split('・').at(-1)}</span></button>)}{!filtered.length&&<p className="empty-search">找不到角色，試試日文姓名或清除搜尋。</p>}</div><button className="round-button" onClick={()=>moveCharacter(1)} aria-label="下一位角色" disabled={!filtered.length}><ArrowRight size={18}/></button></div>
      </section>

      <section className="scene stage" aria-label="第四季特別舞台" aria-hidden={scene!==4} inert={scene!==4}>
        <div className="section-label">04 — THE SPECIAL STAGE</div><div className="stage-glow"/><div className="spotlight spot-one"/><div className="spotlight spot-two"/><MusicTrail/><div className="curtain curtain-left"/><div className="curtain curtain-right"/>
        <div className="stage-body local-scroll"><div className="stage-header local-scroll" data-reveal><span className="stage-kicker">SEASON IV · {acts[act].label}</span><h2 tabIndex={-1}>{feature.heading[0]}<br/><em>{feature.heading[1]}</em></h2><span className="stage-tag">{feature.tag}</span><div className="stage-media" key={act}><span className="media-number">{feature.number}</span><OfficialVisual id={feature.videoId} enabled={scene===4} onPlay={showVideo} className="stage-feature-video"/><p className="stage-media-note">{feature.note} · 點擊播放</p></div></div><div className="stage-content local-scroll" tabIndex={0} aria-label="第四季故事與互動舞台"><div className="act-tabs" role="tablist" aria-label="第四季篇章">{acts.map((a,i)=><button key={a.label} role="tab" aria-selected={act===i} onClick={()=>selectAct(i)}>{a.label}<span>{i===0?'音樂祭':i===1?'魔界社交':'魔偶像'}</span></button>)}</div><div className="act-copy" key={act}><span className="small-label">{acts[act].subtitle}</span><h3>{acts[act].title}</h3><p>{acts[act].body}</p></div><label className="spoiler-toggle"><input type="checkbox" aria-label="顯示劇透" checked={spoilers} onChange={e=>setSpoilers(e.target.checked)}/><span className="toggle-track"/><span>{spoilers?'劇透已開啟':'顯示劇透'}</span><small>預設不揭露結果</small></label>{spoilers&&<p className="spoiler-copy">{acts[act].spoiler}</p>}<div className="stage-gallery" aria-label={`${acts[act].subtitle}官方劇照`}><div className="gallery-heading"><span>SCENE ARCHIVE</span><small>{stageShots[act]?.length || 0} IMAGES · 點擊放大</small></div><div className="stage-shot-strip local-scroll">{stageShots[act]?.map(shot=><button key={shot.id} onClick={()=>{setSelectedShot(shot);openModal('image');}} aria-label={`放大${shot.caption}`}><Image src={shot.url} width={320} height={180} alt={shot.caption} unoptimized loading="lazy"/><span>{shot.caption}</span></button>)}</div></div><div className="stage-character-description" aria-live="polite"><Symbol name={stageCharacter.symbol} size={34}/><div><span>{feature.aliases[stageId]||stageCharacter.name}</span><p><span className="stage-costume-label">{stagePortrait.label}</span>{stageCharacter.ability}</p></div><button aria-label={`查看${stageCharacter.name}完整資料`} onClick={()=>{setCharacterId(stageId);setCategory(act===2?'idol':'all');setQuery('');setOutfits(value=>({...value,[stageId]:feature.variants[stageId]}));go(3);}}><ArrowUpRight size={22}/></button></div><div className={`ensemble local-scroll ${act===0?'':'ensemble-featured'}`} aria-label={act===0?'十三名問題兒童班成員':`${acts[act].subtitle}相關角色`}>{stageCast.map((c,i)=><button key={c.id} aria-label={`${two(i+1)} ${feature.aliases[c.id]||c.name}`} onFocus={()=>setStageId(c.id)} onClick={()=>{setStageId(c.id);chime();}} aria-pressed={stageId===c.id} style={{...styleColor(c.color),'--i':i} as CSSProperties} className={stageId===c.id?'in-spotlight':''}><span className="ensemble-number">{two(i+1)}</span><StandingArt character={c} variant={feature.variants[c.id]} enabled={scene===4} className="ensemble-portrait" sizes="(max-width:760px) 90px, 9vw" decorative/><span className="ensemble-name">{feature.aliases[c.id]?.split('／')[0]||c.name.split('・').at(-1)}</span></button>)}</div><p className="ensemble-note">點選角色，可查看篇章中的相關人物。<span>官方劇照可能包含演出畫面。© 西修（秋田書店）／第4シリーズ製作委員会</span></p></div></div><div className="stage-floor"/><span className="stage-year" aria-hidden="true">2026</span>
      </section>

      <section className="scene watch" aria-label="正版觀看指南" aria-hidden={scene!==5} inert={scene!==5}>
        <div className="section-label">05 — WATCH THE ANIME</div><div className="watch-heading" data-reveal><div><p className="eyebrow">YOUR NEXT ADVENTURE IS ONE CLICK AWAY</p><h2 tabIndex={-1}>準備好，<span>一起入魔了嗎？</span></h2><p>給台灣觀眾的正版觀看指南。</p></div><div className="verification-stamp"><Check size={21}/><span>來源核對日期<strong>2026.10.16</strong></span></div></div><div className="watch-season-tabs" role="tablist" aria-label="選擇觀看季度">{seasons.map(s=><button key={s.id} role="tab" aria-selected={watchSeason===s.id} onClick={()=>setWatchSeason(s.id)}><span>SEASON {s.roman}</span><strong>第{s.id}季</strong><small>{s.year} / {s.episodes}話</small></button>)}</div><div className="watch-scroll local-scroll" tabIndex={0} aria-label="串流平台清單"><div className="platforms">{platforms.filter(p=>p.links[watchSeason]).map(p=><Out key={p.name} className="platform-row" href={p.links[watchSeason]!}><span className="platform-logo" style={{color:p.color}}>{p.mark}</span><span className="platform-name"><strong>{p.name}</strong><small>{p.note}</small></span><span className="platform-status"><Check size={13}/>已找到作品頁</span><span className="platform-go">前往觀看</span></Out>)}</div><p className="watch-caveat">已找到頁面不保證每一集目前皆可播放。地區、字幕、廣告、訂閱及授權期限請以平台頁面為準。本站未進行付費或登入後播放驗證。</p><details className="pending-platforms"><summary>其他平台與待確認紀錄</summary><div>{unconfirmedPlatforms.map(p=><Out key={p.name} href={p.url}><strong>{p.name}</strong><span>{p.note}</span></Out>)}<Out href="https://www.youtube.com/@MuseTW/search?query=%E5%85%A5%E9%96%93%E5%90%8C%E5%AD%B8">木棉花台灣頻道搜尋入口<span>非逐季作品連結；請在頻道確認</span></Out></div></details><p className="material-note">核對日期 {checkedAt} · 台灣正版入口 · 不列日本專區為台灣可觀看平台</p></div>
      </section>

      <section className="scene farewell" aria-label="魔界未完待續" aria-hidden={scene!==6} inert={scene!==6}>
        <div className="section-label">06 — UNTIL WE MEET AGAIN</div><div className="farewell-school" data-depth><Image src="/art/academy.svg" alt="原創魔界學園，燈光映照晚霞" fill sizes="100vw"/></div><div className="farewell-copy local-scroll" data-reveal><span className="eyebrow">THE STORY DOESN’T END HERE.</span><h2 tabIndex={-1}>魔界的明天，<br/>也請多多指教<span>。</span></h2><p className="farewell-en">THANK YOU FOR VISITING BABYLS</p><div className="official-links"><Out href={official}>第四季官方網站</Out><Out href={`${official}onair`}>NHK 播出資訊</Out><Out href={`${official}news`}>官方動畫消息</Out><button onClick={()=>go(5)}>台灣正版觀看入口 <ArrowUpRight size={15}/></button></div><Out href={`${official}news/movieproject.html`} className="movie-announcement"><span>✦</span><div><small>MOVIE PROJECT ANNOUNCED — 2026</small><strong>下一場冒險，前往大銀幕。</strong><p>2026.09.27 劇場版企劃公布・上映日期未公布</p></div></Out><button className="return-button" onClick={()=>go(0)}>再一次，走進巴比路斯 <ArrowRight size={19}/></button><footer><p>This is an unofficial fan-made website.<br/>Not affiliated with NHK, the publishers, or the animation production committee.</p><p>非官方粉絲製作網站，與原作出版社、動畫製作公司及官方單位無關。<br/>作品及角色權利歸各權利人所有。場景、魔法陣與主題徽記為本專案原創。</p><div><button onClick={()=>openModal('sources')}>資料來源</button><button onClick={()=>openModal('assets')}>素材與授權紀錄</button><span>DATA AS OF 2026.10.16</span></div></footer></div>
      </section>
    </main>

    <nav id="scene-navigation" className="scene-navigation" aria-label="章節導航">{chapters.map((c,i)=><button key={c.en} aria-label={`第${i+1}章 ${c.zh}`} aria-current={scene===i?'step':undefined} className={scene===i?'current':''} onClick={()=>go(i)}><span className="dot-label">{c.zh}</span><span className="dot"/></button>)}<span className="rail-line"/></nav>
    <div className="bottom-bar"><span className="bottom-chapter">{two(scene+1)}<i>/ 07</i><span>{chapters[scene].en}</span></span><button className="scroll-invitation" onClick={()=>go(scene===6?0:scene+1)}>{scene===6?'BACK TO THE BEGINNING':scene===0?'SCROLL TO ENTER BABYLS':'SCROLL TO EXPLORE'}<ArrowDown size={15}/></button><button className="sources-button" onClick={()=>openModal('sources')}>UNOFFICIAL FAN EXPERIENCE <span>↗</span></button></div>
    <div className="scene-progress" style={{transform:`scaleX(${(scene+1)/7})`}}/>
    <div className="cursor" aria-hidden="true">✦</div>
    <div className="ambient-sparks" aria-hidden="true">{Array.from({length:8},(_,i)=><span className="spark" key={i} style={{left:`${9+i*12}%`,top:`${20+(i*17)%60}%`}}>✧</span>)}</div>
    {menu&&<div className="chapter-menu" id="chapter-menu"><span className="eyebrow">CHOOSE YOUR CHAPTER</span><nav aria-label="章節選單">{chapters.map((c,i)=><button key={c.en} onClick={()=>go(i)} aria-current={scene===i?'page':undefined}><span>{two(i+1)}</span><strong>{c.zh}</strong><small>{c.en}</small><ArrowUpRight size={22}/></button>)}</nav><p>↑ ↓ 鍵盤・滾輪・手機上下滑動皆可切換章節</p></div>}
    {intro&&<div className="intro-screen"><MagicCircle className="intro-ring"/><div className="intro-label"><span>YOU ARE INVITED</span><p>巴比路斯，等待你的到來。</p></div><button onClick={finishIntro}>跳過開場 <ArrowRight size={17}/></button></div>}
    <dialog ref={dialog} className={`modal ${modal==='video'?'video-modal':modal==='categories'?'category-modal':''}`} onCancel={()=>openModal(null)} onClick={e=>{if(e.target===e.currentTarget)openModal(null);}}><div className="modal-inner"><button className="modal-close" onClick={()=>openModal(null)} aria-label="關閉視窗"><X/></button>{modal==='video'?<><span className="eyebrow">OFFICIAL VIDEO · YOUTUBE</span><h2>{videos[videoId].label}</h2><YouTubePlayer key={videoId} id={videoId} title={videos[videoId].label}/><p>由官方發布者控制的 YouTube 播放器。正片與演出影片包含完整劇情。</p><Out href={`https://www.youtube.com/watch?v=${videoId}`}>若嵌入受限，前往 YouTube 觀看</Out><Out href={videos[videoId].source}>官方影片來源頁</Out></>:modal==='image'&&selectedShot?<><span className="eyebrow">OFFICIAL SCENE ARCHIVE</span><h2>{selectedShot.caption}</h2><Image className="scene-lightbox-image" src={selectedShot.url} width={1280} height={720} alt={selectedShot.caption} unoptimized/><p>{selectedShot.credit}</p><Out href={selectedShot.source}>官方集數與圖片來源</Out></>:modal==='categories'?<CategoryBrowser characters={characters} selected={category} onSelect={id=>{selectCategory(id);openModal(null);}}/>:modal==='sources'?<><span className="eyebrow">SOURCE NOTES / {checkedAt}</span><h2>每個故事，都有出處。</h2><p>動畫已公開內容為界。未確認的資料不以確定口吻呈現；串流頁面存在與實際播放權限分別標示。</p><div className="source-list">{sources.map(s=><Out key={s.url} href={s.url}><strong>{s.title}</strong><span>{s.note}</span></Out>)}</div><p>第1～3季的首播與集數依各季巴哈姆特動畫瘋作品頁；第4季完結日期另交叉核對 <a href="https://youranimes.tw/animes/5571/onair" target="_blank" rel="noopener noreferrer">YourAnimes 播出紀錄 ↗</a>。平台快取可能保留播出中的舊集數，總集數以官方24話為準。</p><button className="text-button" onClick={()=>openModal('assets')}>查看素材授權紀錄 <ArrowRight size={17}/></button></>:modal==='assets'?<><span className="eyebrow">ASSET MANIFEST</span><h2>尊重創作，也是喜歡的一部分。</h2><p>角色圖鑑收錄官方立繪、動畫劇照、角色設定圖與出版社圖片，分別標示來源並保留比例。圖片及角色權利歸原權利人所有；原創學園場景與裝飾另列紀錄。</p><Out href="/asset-review.html">瀏覽完整角色與篇章圖庫</Out><div className="asset-list">{assets.map(a=><article key={a.id}><span className={a.active?'asset-active':'asset-pending'}>{a.origin==='fan-created'?'本專案原創':a.active?'官方來源・已展示':'未使用'}</span><h3>{a.character?characters.find(c=>c.id===a.character)?.name:a.id}</h3><p>{a.permission}</p><small>{a.attribution}</small>{a.sourceUrl.startsWith('https')?<Out href={a.sourceUrl}>原始來源</Out>:<span className="small-label">{a.filename}</span>}</article>)}</div></>:null}</div></dialog>
    <div className="sr-only" aria-live="polite">目前章節：{chapters[scene].zh}</div>
  </div>;
}

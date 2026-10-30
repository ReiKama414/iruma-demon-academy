// Video IDs are copied from Muse's official pages, never inferred from image URLs.
export const videos: Record<string, { label:string; organization:string; source:string; season:number; character?:string }> = {
  '-9ZG8M__BxY': {label:'第一季・木棉花官方 PV',organization:'Muse 木棉花-TW',source:'https://www.e-muse.com/zh/animation/201910-welcome-to-demon-school-iruma-kun/',season:1},
  '-KRFNndD_BI': {label:'第二季・木棉花官方 PV',organization:'Muse 木棉花-TW',source:'https://www.e-muse.com/zh/animation/202104-welcome-to-demon-school-iruma-kun-s02/',season:2},
  'gWU5KyoJq6g': {label:'第三季・木棉花官方 PV',organization:'Muse 木棉花-TW',source:'https://www.youtube.com/watch?v=gWU5KyoJq6g',season:3},
  'S2p07wVUiB8': {label:'第四季・木棉花官方 PV',organization:'Muse 木棉花-TW',source:'https://www.e-muse.com/zh/animation/%E5%85%A5%E9%96%93%E5%90%8C%E5%AD%B8%E5%85%A5%E9%AD%94%E4%BA%86%EF%BC%81s4/',season:4},
  'BKXgWJQy0BQ': {label:'普爾森・索伊・官方角色 PV',organization:'Muse 木棉花-TW',source:'https://www.e-muse.com/zh/animation/%E5%85%A5%E9%96%93%E5%90%8C%E5%AD%B8%E5%85%A5%E9%AD%94%E4%BA%86%EF%BC%81s4/',season:4,character:'soi'},
  'c5reKzlMeGI': {label:'VIDEO 01・第7話〈莉莉絲之毯〉',organization:'Muse 木棉花-TW',source:'https://www.youtube.com/watch?v=c5reKzlMeGI',season:4},
  'zbMjKB2DuJ0': {label:'VIDEO 02・第22話〈傲慢的歌姬〉',organization:'Muse 木棉花-TW',source:'https://www.youtube.com/watch?v=zbMjKB2DuJ0',season:4},
  'oCaNQYaSEr4': {label:'第四季・後半篇官方 PV',organization:'NHK Enterprises',source:'https://www.nhk-character.com/chara/iruma/movie',season:4},
};
export const seasonVideos = ['-9ZG8M__BxY','-KRFNndD_BI','gWU5KyoJq6g','S2p07wVUiB8'];
export const youtubeLogo = 'https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg';
export const pressArchive = {
  image:'/press/joypolis-2022.png',width:1200,height:848,
  source:'https://www.pr-today.net/category/a00307/37082/',
  original:'https://www.pr-today.net/a00307/wp-content/uploads/sites/157/2022/09/01_%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%93%E3%82%B8%E3%83%A5%E3%82%A2%E3%83%AB-2.png',
  credit:'©西修（秋田書店）／NHK・NEP',
  permission:'發行者新聞稿明示：本件の画像をご紹介いただく際は以下の著作権表記をお願いいたします。僅在該活動回顧中完整呈現，不去背、拆分或當成第四季主視覺',
};

export type StageFeature = {heading:string[];tag:string;videoId:string;number:string;note:string;cast:string[];selected:string;variants:Record<string,string>;aliases:Record<string,string>};
export const idolVariants:Record<string,string> = {keroli:'ch2',iruma:'ch3',lied:'ch2',ameri:'ch2'};
export const idolAliases:Record<string,string> = {keroli:'克蘿姆／凱洛莉',iruma:'入美／入間',lied:'琳蒂／利德',ameri:'梅莉／艾梅莉'};
export const stageFeatures:StageFeature[] = [
  {heading:['THE MUSIC','FESTIVAL.'],tag:'13 人の挑戦。 · 音樂祭篇',videoId:'c5reKzlMeGI',number:'VIDEO 01',note:'第7話完整正片・包含音樂祭演出',cast:['iruma','alice','clara','sabro','lied','jazz','keroli','elizabetta','kamui','picero','goemon','schneider','soi'],selected:'soi',variants:Object.fromEntries(['iruma','alice','clara','sabro','lied','jazz','keroli','elizabetta','kamui','picero','goemon','schneider','soi'].map(id=>[id,'ch'])),aliases:{}},
  {heading:['BEYOND','BABYLS.'],tag:'走出教室。 · 魔界社交篇',videoId:'oCaNQYaSEr4',number:'OFFICIAL PV',note:'第四季後半篇官方宣傳影片',cast:['iruma','ameri','sullivan','opera','leidzi','razberry'],selected:'ameri',variants:{iruma:'ch2',ameri:'ch',sullivan:'ch',opera:'ch',leidzi:'default',razberry:'default'},aliases:{}},
  {heading:['AKUDOL','SHOWTIME.'],tag:'可愛 × 搖滾。 · 魔偶像篇',videoId:'zbMjKB2DuJ0',number:'VIDEO 02',note:'第22話完整正片・包含魔偶像演出',cast:['keroli','iruma','lied','ameri','gyari'],selected:'keroli',variants:{...idolVariants,gyari:'default'},aliases:idolAliases},
];
export type StageShot = {id:string;url:string;source:string;caption:string;credit:string};
const stillBase='https://www.nhk-character.com/chara/iruma/wp/wp-content/uploads/';
const stillCredit='© 西修（秋田書店）／魔入りました！入間くん第4シリーズ製作委員会';
const shot=(id:string,path:string,episode:number,caption:string):StageShot=>({id,url:stillBase+path,source:`https://www.nhk-character.com/chara/iruma/episode/ep${episode}.html`,caption,credit:stillCredit});
export const stageShots:StageShot[][] = [
  [shot('music-judges','2026/04/img02-6.jpg',6,'音樂祭開幕・面對審查員'),shot('music-class','2026/04/img04-6.jpg',6,'十三名同學，一起迎向舞台'),shot('music-soi','2026/05/img08-1.jpg',6,'第十三名同學・普爾森索伊'),shot('music-performance','2026/05/img01-2.jpg',8,'音樂祭篇・音樂組的演出')],
  [shot('social-ameri','2026/06/img01-2.jpg',12,'大貴族會・艾梅莉的禮服'),shot('social-iruma','2026/06/img03-3.jpg',12,'走進學園以外的魔界'),shot('social-dance','2026/06/img08-3.jpg',12,'舞會中的入間與艾梅莉'),shot('social-opera','2026/06/img07-3.jpg',12,'歐佩菈與魔界的禮儀')],
  [shot('idol-voice','2026/09/img01-1.jpg',22,'克蘿姆・舞台上的歌聲'),shot('idol-duet','2026/09/img06.jpg',22,'魔偶像篇・同台的默契'),shot('idol-dress','2026/09/img07.jpg',22,'克蘿姆・禮服造型'),shot('idol-rivals','2026/09/img09-1.jpg',22,'克蘿姆與賈莉・可愛與搖滾')],
];

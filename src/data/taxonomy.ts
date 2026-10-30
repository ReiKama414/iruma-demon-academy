import type { Character } from './content';

export const classificationSource = 'https://zh.wikipedia.org/zh-tw/%E5%85%A5%E9%96%93%E5%90%8C%E5%AD%B8%E5%85%A5%E9%AD%94%E4%BA%86%EF%BC%81';
export type CharacterCategory = {id:string; label:string; parent?:string; referenceNames?:string[]};
export const characterCategories:CharacterCategory[] = [
  {id:'main',label:'主要人物'},
  {id:'school',label:'惡魔學校「巴比路斯」'},
  {id:'abnormal',label:'問題兒童班（阿布諾瑪）',parent:'school'},
  {id:'clubs',label:'師團',parent:'school'},
  {id:'council',label:'學生會',parent:'clubs'},
  {id:'magic-tools',label:'魔具研究師團',parent:'clubs'},
  {id:'broadcast',label:'廣播師團',parent:'clubs',referenceNames:['巴迪恩・巴羅奇','華盧布']},
  {id:'magic-development',label:'魔術開發師團',parent:'clubs'},
  {id:'magic-plants',label:'魔植物師團',parent:'clubs',referenceNames:['索拉斯・博博']},
  {id:'discipline',label:'風紀師團',parent:'clubs'},
  {id:'art-club',label:'美術師團',parent:'clubs',referenceNames:['維涅・瑪妮','畢穆・R・朱達因']},
  {id:'gaming',label:'遊戲師團',parent:'clubs'},
  {id:'same-year',label:'入間的同年級同學',parent:'school',referenceNames:['艾可','嘎子','歐羅巴斯・柯克']},
  {id:'younger-students',label:'入間的低年級同學',parent:'school',referenceNames:['瑛太','斯伯諾克・希爾薇亞','克羅凱爾・琪瑪']},
  {id:'other-students',label:'其他學生',parent:'school'},
  {id:'staff',label:'教職員',parent:'school'},
  {id:'special-instructors',label:'特別講師',parent:'staff'},
  {id:'high-demons',label:'高位惡魔'},
  {id:'demon-king',label:'魔王',parent:'high-demons',referenceNames:['迪爾奇拉']},
  {id:'king-candidates',label:'魔王候補',parent:'high-demons'},
  {id:'crowns',label:'十三冠',parent:'high-demons'},
  {id:'crown-related',label:'十三冠相關',parent:'high-demons'},
  {id:'families',label:'家系'},
  {id:'hero-families',label:'三大英雄家系',parent:'families'},
  {id:'family-furfur',label:'佛爾佛爾家',parent:'hero-families'},
  {id:'family-zepar',label:'桀派家',parent:'hero-families'},
  {id:'family-barbatos',label:'巴巴托斯家',parent:'hero-families'},
  {id:'noble-families',label:'名門家系',parent:'families'},
  {id:'family-asmodeus',label:'阿斯莫德家',parent:'noble-families'},
  {id:'family-sabnock',label:'斯伯諾克家',parent:'noble-families'},
  {id:'family-azazel',label:'阿薩茲勒家',parent:'noble-families'},
  {id:'family-crocell',label:'克羅凱爾家',parent:'noble-families'},
  {id:'family-naberius',label:'那貝流斯家',parent:'noble-families'},
  {id:'family-dantalion',label:'但達林家',parent:'noble-families'},
  {id:'family-ronove',label:'羅諾威家',parent:'noble-families'},
  {id:'family-purson',label:'普爾森家',parent:'noble-families'},
  {id:'other-families',label:'其他家系',parent:'families'},
  {id:'family-valac',label:'瓦拉克家',parent:'other-families'},
  {id:'family-andro',label:'安德洛家',parent:'other-families'},
  {id:'family-shax',label:'沙克斯家',parent:'other-families'},
  {id:'family-caim',label:'凱伊姆家',parent:'other-families'},
  {id:'atavists',label:'返祖集團'},
  {id:'six-fingers',label:'六指眾',parent:'atavists'},
  {id:'demon-patrol',label:'魔管署'},
  {id:'medical',label:'醫療班',parent:'demon-patrol'},
  {id:'prison',label:'烏拉波拉斯監獄',parent:'demon-patrol'},
  {id:'idol',label:'惡斗露相關者'},
  {id:'many-ears',label:'多耳族'},
  {id:'other',label:'其他惡魔'},
  {id:'deities',label:'魔神族'},
];

// Memberships describe the supplied character index, independently of stage costumes.
// Parent categories include all descendants; former affiliations are noted separately.
export const characterMemberships:Record<string,string[]> = {
  iruma:['main','abnormal','magic-tools','king-candidates','idol'],
  alice:['main','abnormal','magic-tools','family-asmodeus'],
  clara:['main','abnormal','magic-tools','family-valac'],
  sabro:['main','abnormal','clubs','family-sabnock'],
  lied:['abnormal','gaming','family-shax','idol'],
  jazz:['abnormal','magic-development','family-andro'],
  keroli:['main','abnormal','idol','family-crocell'],
  elizabetta:['abnormal','clubs'],
  kamui:['abnormal','clubs','family-caim'],
  picero:['abnormal'],goemon:['abnormal'],schneider:['abnormal','clubs'],
  soi:['abnormal','family-purson'],
  ameri:['main','council','family-azazel','idol'],
  kalego:['main','staff','family-naberius'],
  sullivan:['main','staff','crowns'],
  opera:['main','other'],
  poro:['crown-related'],leidzi:['king-candidates','crown-related'],razberry:['king-candidates','crown-related'],
  gyari:['idol'],balam:['staff'],bachiko:['special-instructors','family-barbatos'],
  robin:['staff','family-barbatos'],kiriwo:['magic-tools','atavists'],
  baal:['crowns','atavists','magic-tools'],ronove:['council','discipline','family-ronove'],
  'six-fingers':['six-fingers'],
};
export const categoryNotes:Record<string,string> = {
  discipline:'包含曾任風紀師團團長的羅諾威',
  'magic-tools':'包含現任成員與曾參與師團的相關人物',
  'crown-related':'包含前十三冠，以及與十三冠相關的人物',
  'family-barbatos':'包含巴巴托斯本家與相關分家人物',
};
const byId = new Map(characterCategories.map(category=>[category.id,category]));
export function getCategory(id:string) { return byId.get(id); }
export function categoryPath(id:string):CharacterCategory[] {
  const node=byId.get(id);
  return node?[...(node.parent?categoryPath(node.parent):[]),node]:[];
}
export function isInCategory(character:Character,categoryId:string) {
  if(categoryId==='all')return true;
  if(categoryId==='s4')return character.groups.includes('s4');
  return (characterMemberships[character.id]||[]).some(id=>categoryPath(id).some(node=>node.id===categoryId));
}
export function categorySource(id:string) {
  return `${classificationSource}#${encodeURIComponent(getCategory(id)?.label||'登場角色')}`;
}
export const quickCategories = [
  ['all','全部角色'],['main','主要人物'],['school','巴比路斯'],['abnormal','問題兒童班'],
  ['staff','教職員'],['idol','惡斗露相關者'],['high-demons','高位惡魔'],['families','家系'],
] as const;

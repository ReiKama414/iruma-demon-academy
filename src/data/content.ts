export const checkedAt = '2026-10-16';
export const official = 'https://www.nhk-character.com/chara/iruma/';
export const characterSource = `${official}character`;
export const sources = [
  {title:'維基百科・原作角色分類',url:'https://zh.wikipedia.org/zh-tw/%E5%85%A5%E9%96%93%E5%90%8C%E5%AD%B8%E5%85%A5%E9%AD%94%E4%BA%86%EF%BC%81',note:'依使用者提供的分類目錄整理，包含原作家系及組織；已收錄角色提供篩選，未收錄分類連回人物索引'},
  { title: '第四季動畫官方網站', url: official, note: '季數、世界觀與第四季後半故事' },
  { title: '官方角色與日本聲優', url: characterSource, note: '角色身分、性格與聲優；繁中譯名另參考台灣正版平台' },
  { title: 'Official character guide · English', url: `${official}en/character`, note: '日英角色資料交叉核對' },
  { title: '第四季最終話', url: `${official}episode/ep24.html`, note: '第24話「一番豪華な餞を」' },
  { title: '木棉花台灣・第四季最終話', url: 'https://www.youtube.com/watch?v=dfC1KCzXep4', note: '2026.09.26 第24話上架的一手紀錄' },
  { title: '劇場版企劃公告', url: `${official}news/movieproject.html`, note: '2026.09.27 公布；未公布上映日期' },
  { title: '官方宣傳影片', url: `${official}movie`, note: '以 YouTube 原生播放器嵌入，不下載或修改影片' },
  { title: 'NHK 播出資訊', url: `${official}onair`, note: '日本播出資訊，不代表台灣觀看授權' },
  { title: '台灣第四季代理資訊', url: 'https://www.e-muse.com/zh/animation/%E5%85%A5%E9%96%93%E5%90%8C%E5%AD%B8%E5%85%A5%E9%AD%94%E4%BA%86%EF%BC%81s4/', note: '木棉花國際' },
  { title: '巴拉姆聲優・經紀公司履歷', url: 'https://kenproduction.co.jp/talent/32', note: '小西克幸的角色出演紀錄' },
  { title: '芭琪可聲優・經紀公司履歷', url: 'https://www.oginext.com/women/takeuchi/', note: '竹內順子的角色出演紀錄' },
  { title: '奇里歐聲優・經紀公司履歷', url: 'https://www.earlywing.co.jp/actordb/catea/talent_osakaryota', note: '逢坂良太的角色出演紀錄' },
  { title: '六指眾・官方用語', url: `${official}special/words/%E5%85%AD%E6%8C%87%E8%A1%86.html`, note: '動畫已公開的組織簡介' },
];
export const chapters = [
  { en: 'INVITATION', zh: '魔界入學邀請', color: '#f3eddf' },
  { en: 'THE WORLD', zh: '歡迎來到惡魔學校', color: '#dae6de' },
  { en: 'FOUR SEASONS', zh: '四季魔法之門', color: '#24152f' },
  { en: 'CHARACTERS', zh: '魔界角色圖鑑', color: '#ede6f4' },
  { en: 'SEASON IV', zh: '第四季特別舞台', color: '#30121f' },
  { en: 'ON AIR', zh: '正版觀看指南', color: '#e7ecf0' },
  { en: 'SEE YOU, BABYLS', zh: '魔界未完待續', color: '#eacfc0' },
];
export const seasons = [
  { id: 1, roman: 'I', year: '2019', date: '2019.10.05', episodes: 23, title: '初次見面，魔界！', arc: '入學・師團派對', color: '#55b8ea', icon: 'star', cast: '入間、艾利斯、庫菈菈', description: '一個不懂拒絕的人類少年，一場意想不到的入學。從使魔召喚到師團活動，每一天都離「低調生活」更遠一點。', source: 'https://ani.gamer.com.tw/animeVideo.php?sn=14907', pv: 'https://www.nhk-character.com/chara/iruma/' },
  { id: 2, roman: 'II', year: '2021', date: '2021.04.17', episodes: 21, title: '把野心，變成現實。', arc: '惡週期・王者的教室・華特公園', color: '#df6880', icon: 'flame', cast: '入間、艾梅莉、卡爾耶格', description: '當溫柔的入間展現強勢的一面，問題兒童班有了新的目標。王者的教室與華特公園，讓夥伴一起成長。', source: 'https://ani.gamer.com.tw/animeVideo.php?sn=22248', pv: 'https://www.nhk-character.com/chara/iruma/' },
  { id: 3, roman: 'III', year: '2022—23', date: '2022.10.08', episodes: 21, title: '在森林裡，找到答案。', arc: '特訓・收穫祭', color: '#8dc79a', icon: 'leaf', cast: '入間、利德、芭琪可', description: '為保住王者的教室，全班投入特訓。在魔界叢林收集食材、較量智慧與勇氣，入間也開始尋找自己的武器。', source: 'https://ani.gamer.com.tw/animeVideo.php?sn=32301', pv: 'https://www.youtube.com/watch?v=gWU5KyoJq6g' },
  { id: 4, roman: 'IV', year: '2026', date: '2026.04.04', episodes: 24, title: '十三個人，一個舞台。', arc: '音樂祭・魔界社交・魔偶像大武鬥會', color: '#e7c16d', icon: 'music', cast: '問題兒童班13人、波羅、賈莉', description: '全員晉升位階4的最後機會。從音樂祭的合奏，到校園之外的魔界社交與魔偶像舞台，入間繼續面對自己的欲望。', source: `${official}episode/ep24.html`, pv: `${official}movie` },
];
export const worldPages = [
  { title: '人類少年，魔界報到。', kicker: '01 / A VERY UNEXPECTED FAMILY', body: '被父母賣給大惡魔薩利班的鈴木入間，竟然成了對方疼愛的孫子。一封入學邀請，將他帶往惡魔學校巴比路斯。', foot: '一個奇妙的新家，是所有冒險的起點。' },
  { title: '絕對不能說的祕密。', kicker: '02 / KEEP IT A SECRET', body: '在人類只存在於傳聞的魔界，入間必須隱藏自己的身分。原本只想低調度日，善良的他卻總在意外中成為眾人目光的焦點。', foot: '沒有翅膀，也能找到屬於自己的天空。' },
  { title: '位階，是欲望的形狀。', kicker: '03 / FIND YOUR AMBITION', body: '惡魔的位階由1至10。學園中的考試與活動是晉升的機會；對問題兒童班而言，全員達到位階4，更是保住王者的教室的條件。', foot: '從阿雷夫，到自己的下一個目標。' },
  { title: '最吵鬧，也最可靠。', kicker: '04 / THE ABNORMAL CLASS', body: '性格迥異的十三名學生，組成問題兒童班。競爭、特訓、冒險與胡鬧，將原本的「問題兒童」慢慢連成一個團隊。', foot: '不是孤身一人，所以敢做更大的夢。' },
];
export type Character = {
  id: string; name: string; jp: string; en: string; groups: string[];
  cv: string; debut: string; role: string; trait: string; ability: string;
  relation: string; color: string; symbol: string; s4: string; officialId?: number;
};
const abnormal = ['abnormal', 's4'];
export const characters: Character[] = [
  { id:'iruma',name:'鈴木入間',jp:'鈴木入間',en:'IRUMA SUZUKI',groups:['main',...abnormal,'idol'],cv:'村瀨步',debut:'第1季',role:'人類少年／問題兒童班',trait:'溫柔、無法拒絕他人的請託。',ability:'危機迴避、弓術；沒有天生的惡魔魔力。',relation:'薩利班的孫子；艾利斯與庫菈菈的摯友。',color:'#55b8ea',symbol:'bow',s4:'與十三名同學一起挑戰音樂祭。',officialId:1 },
  { id:'alice',name:'阿斯莫德・艾利斯',jp:'アスモデウス・アリス',en:'ALICE ASMODEUS',groups:['main',...abnormal],cv:'木村良平',debut:'第1季',role:'入學首席／問題兒童班',trait:'重視禮節，對入間非常忠誠。',ability:'擅長火焰魔術。',relation:'入間最初的惡魔朋友。',color:'#ec9fbb',symbol:'flame',s4:'將優等生的實力帶進全班的演出。',officialId:2 },
  { id:'clara',name:'瓦拉克・庫菈菈',jp:'ウァラク・クララ',en:'CLARA VALAC',groups:['main',...abnormal],cv:'朝井彩加',debut:'第1季',role:'活力十足的同學／問題兒童班',trait:'天真、吵鬧，總有用不完的精力。',ability:'從口袋取出曾見過的物品。',relation:'與入間、艾利斯一起行動。',color:'#7bd88c',symbol:'star',s4:'讓練習也充滿遊戲般的歡樂。',officialId:3 },
  { id:'sabro',name:'沙布諾克・薩布洛',jp:'サブノック・サブロ',en:'SABRO SABNOCK',groups:abnormal,cv:'佐藤拓也',debut:'第1季',role:'立志成為魔王／問題兒童班',trait:'熱血、直率，胸懷遠大野心。',ability:'擅長製造武器。',relation:'把救過自己的入間視為勁敵。',color:'#dfb26a',symbol:'crown',s4:'帶著魔王的志向，成為團隊的一員。',officialId:4 },
  { id:'lied',name:'夏克斯・利德',jp:'シャックス・リード',en:'LIED SHAX',groups:[...abnormal,'idol'],cv:'山谷祥生',debut:'第1季',role:'遊戲愛好者／問題兒童班',trait:'隨和、愛玩，喜歡刺激的比賽。',ability:'擅長奪取對手的感官。',relation:'在收穫祭與入間搭檔。',color:'#edbe65',symbol:'eye',s4:'把默契從收穫祭延伸到音樂祭。',officialId:5 },
  { id:'jazz',name:'安德魯・M・賈茲',jp:'アンドロ・Ｍ・ジャズ',en:'JAZZ ANDRO M.',groups:abnormal,cv:'柿原徹也',debut:'第1季',role:'可靠的兄長型同學／問題兒童班',trait:'會照顧人，也有狡黠的一面。',ability:'靈巧的手指與取物技巧。',relation:'問題兒童班值得依靠的夥伴。',color:'#9c8dd3',symbol:'hand',s4:'在班級合作中發揮觀察與協調能力。',officialId:6 },
  { id:'keroli',name:'克羅凱爾・凱洛莉',jp:'クロケル・ケロリ',en:'KEROLI CROCELL',groups:[...abnormal,'idol'],cv:'東山奈央',debut:'第1季',role:'魔偶像克蘿姆／問題兒童班',trait:'平時安靜，站上舞台便充滿自信。',ability:'冰系魔術、舞台演出。',relation:'與賈莉同為魔界人氣魔偶像。',color:'#9edbea',symbol:'snow',s4:'從全班演出走向魔偶像大武鬥會。',officialId:7 },
  { id:'elizabetta',name:'伊克斯・艾莉莎貝塔',jp:'イクス・エリザベッタ',en:'ELIZABETTA IX',groups:abnormal,cv:'本渡楓',debut:'第1季',role:'溫柔的「大姊」／問題兒童班',trait:'從容、體貼，深受同學喜愛。',ability:'具有魅惑他人的家系能力。',relation:'被同學們親暱地稱為大姊。',color:'#e690a9',symbol:'rose',s4:'肩負在音樂祭提升兩個位階的挑戰。',officialId:8 },
  { id:'kamui',name:'卡伊姆・卡姆依',jp:'カイム・カムイ',en:'KAMUI CAIM',groups:abnormal,cv:'梶原岳人',debut:'第1季',role:'自稱紳士／問題兒童班',trait:'講究禮節，對異性非常熱情。',ability:'與各種生物溝通。',relation:'與凱洛莉接受過召喚相關訓練。',color:'#bc9670',symbol:'feather',s4:'十三人合奏中不可缺少的一員。',officialId:9 },
  { id:'picero',name:'阿加雷斯・皮克羅',jp:'アガレス・ピケロ',en:'PICERO AGARES',groups:abnormal,cv:'吉永拓斗',debut:'第1季',role:'愛睡覺的同學／問題兒童班',trait:'慵懶怕麻煩，卻也不肯輕易認輸。',ability:'操控大地。',relation:'經常與五右衛門一起行動。',color:'#94c8a9',symbol:'cloud',s4:'在共同目標前，展現意外的幹勁。',officialId:10 },
  { id:'goemon',name:'加普・五右衛門',jp:'ガープ・ゴエモン',en:'GOEMON GAAP',groups:abnormal,cv:'大河元氣',debut:'第1季',role:'劍術修行者／問題兒童班',trait:'熱心助人，想交到一百位朋友。',ability:'擅長劍術與風。',relation:'常照顧皮克羅。',color:'#87bfae',symbol:'sword',s4:'以同伴為重，投入全班的舞台。',officialId:11 },
  { id:'schneider',name:'阿洛凱爾・修奈德',jp:'アロケル・シュナイダー',en:'SCHNEIDER ALLOCER',groups:abnormal,cv:'土岐隼一',debut:'第1季',role:'百識之王／問題兒童班',trait:'沉穩寡言，學識出眾。',ability:'優秀的學科成績與知識。',relation:'與賈茲一同接受特訓。',color:'#bc966b',symbol:'book',s4:'以冷靜的頭腦支援同學。',officialId:12 },
  { id:'soi',name:'普爾森・索伊',jp:'プルソン・ソイ',en:'SOI PURSON',groups:abnormal,cv:'伊藤節生',debut:'第1季已有身影；第4季成為焦點',role:'第十三名同學／問題兒童班',trait:'習慣隱藏存在，擁有自己的心聲。',ability:'認識阻礙、出色的小號演奏。',relation:'必須在家族信條與同學之間找到答案。',color:'#a48cdd',symbol:'music',s4:'不能引人注目的他，能否站上舞台？',officialId:17 },
  { id:'ameri',name:'阿薩茲勒・艾梅莉',jp:'アザゼル・アメリ',en:'AMERI AZAZEL',groups:['council','s4','idol'],cv:'早見沙織',debut:'第1季',role:'巴比路斯學生會長',trait:'凜然、自律，對少女漫畫有特別興趣。',ability:'強大的實力與堅定的自信。',relation:'透過《初戀回憶》與入間拉近距離。',color:'#cd715d',symbol:'rose',s4:'在學園之外，也與入間產生新的交集。',officialId:13 },
  { id:'kalego',name:'納貝流士・卡爾耶格',jp:'ナベリウス・カルエゴ',en:'KALEGO NABERIUS',groups:['teachers','s4'],cv:'小野大輔',debut:'第1季',role:'問題兒童班導師',trait:'嚴格、重視秩序與責任。',ability:'高位階教師；意外成為入間的使魔。',relation:'對薩利班的作風十分頭痛。',color:'#8071b9',symbol:'feather',s4:'訂下全班位階4的課題，見證學生挑戰。',officialId:14 },
  { id:'sullivan',name:'薩利班',jp:'サリバン',en:'SULLIVAN',groups:['teachers','other','s4'],cv:'黑田崇矢',debut:'第1季',role:'學園理事長／三傑之一',trait:'對孫子疼愛有加，深藏強大力量。',ability:'魔界上位惡魔。',relation:'將入間迎接為自己的孫子。',color:'#d0ad68',symbol:'crown',s4:'陪伴入間接觸更廣闊的魔界。',officialId:15 },
  { id:'opera',name:'歐佩菈',jp:'オペラ',en:'OPERA',groups:['other','s4'],cv:'齋賀光希',debut:'第1季',role:'薩利班家的管家',trait:'冷靜、可靠，偶爾展現促狹的一面。',ability:'家事與護衛樣樣精通。',relation:'為入間提供精準又誠實的建議。',color:'#bb5f67',symbol:'bell',s4:'在生活與魔界禮儀上持續支持入間。',officialId:16 },
  { id:'poro',name:'安度西亞斯・波羅',jp:'アムドゥスキアス・ポロ',en:'PORO AMDUSCIAS',groups:['other','s4'],cv:'子安武人',debut:'第4季',role:'音魔／前十三冠',trait:'對音樂與德爾奇拉抱持深切情感。',ability:'魔王專屬音樂家的非凡音樂造詣。',relation:'以審查員身分面對問題兒童班。',color:'#bc8bc8',symbol:'music',s4:'音樂祭的重要審查員。',officialId:18 },
  { id:'leidzi',name:'利維坦・雷治',jp:'レヴィアタン・レイヂ',en:'LEIDZI LEVIATHAN',groups:['other','s4'],cv:'內田雄馬',debut:'第4季主要登場',role:'魔海學園二年級／三傑之孫',trait:'以自己的規律行動，態度強勢。',ability:'被稱為「總司令」的學生艦長。',relation:'蕾蒂・利維的孫子。',color:'#6d9fc6',symbol:'crown',s4:'讓入間看見巴比路斯之外的同齡惡魔。',officialId:19 },
  { id:'razberry',name:'貝利亞・貝利・拉茲貝利',jp:'ベリアール・ベリィ・ラズベリィ',en:'RAZBERRY BELIAL',groups:['other','s4'],cv:'松岡禎丞',debut:'第4季主要登場',role:'地帝學院一年級／三傑之孫',trait:'隨和而大膽，自有自己的步調。',ability:'擁有眾多部下的學院勢力人物。',relation:'貝利亞的孫子。',color:'#d6876e',symbol:'star',s4:'三傑之孫的聚會迎來新的交鋒。',officialId:20 },
  { id:'gyari',name:'賈莉',jp:'ギャリー',en:'GYARI',groups:['other','s4','idol'],cv:'松岡美里',debut:'第4季',role:'人氣魔偶像',trait:'自由奔放、充滿搖滾精神。',ability:'天生的舞台魅力，被稱為強欲歌姬。',relation:'與克蘿姆並肩的明星。',color:'#a7bf77',symbol:'music',s4:'魔偶像大武鬥會的重要人物。',officialId:21 },
  { id:'balam',name:'巴拉姆・希奇洛',jp:'バラム・シチロウ',en:'SHICHIRO BALAM',groups:['teachers'],cv:'小西克幸',debut:'第2季',role:'空想生物學教師',trait:'外表威猛，內心溫柔，喜愛生物。',ability:'擅長生物學與繪本教學。',relation:'卡爾耶格的舊識，也是入間信賴的老師。',color:'#b6cfb0',symbol:'leaf',s4:'教師群像；具體戲份不作量化。' },
  { id:'bachiko',name:'巴巴托斯・芭琪可',jp:'バルバトス・バチコ',en:'BACHIKO BARBATOS',groups:['teachers'],cv:'竹內順子',debut:'第3季',role:'入間的弓術師父／特別講師',trait:'嚴厲又有個性的指導者。',ability:'巴巴托斯家的弓術。',relation:'在收穫祭前教導入間。',color:'#e288ad',symbol:'bow',s4:'入間成長旅程的重要恩師。' },
  { id:'robin',name:'巴魯斯・羅賓',jp:'バルス・ロビン',en:'ROBIN BARS',groups:['teachers'],cv:'吉永拓斗',debut:'第1季',role:'巴比路斯教師',trait:'開朗熱情，行事很有自己的步調。',ability:'弓術。',relation:'參與問題兒童班的特訓。',color:'#8bc58c',symbol:'bow',s4:'教師群像；具體戲份未另作判定。' },
  { id:'kiriwo',name:'艾米・奇里歐',jp:'アミィ・キリヲ',en:'KIRIWO AMY',groups:['other','villains'],cv:'逢坂良太',debut:'第1季',role:'魔具研究師團的前輩',trait:'看似柔弱溫和，隱藏危險的欲望。',ability:'結界魔術。',relation:'與入間在師團活動中相識。',color:'#9cb9be',symbol:'eye',s4:'反派線索；避免揭露重大劇情。' },
  { id:'baal',name:'巴力',jp:'バール',en:'BAAL',groups:['other','villains'],cv:'諏訪部順一',debut:'第1季',role:'魔界上位惡魔',trait:'擅長謀劃，抱持自己的野心。',ability:'具體能力於此不展開。',relation:'與奇里歐及魔界的陰謀相關。',color:'#b38b67',symbol:'crown',s4:'魔界暗流的背景人物。' },
  { id:'ronove',name:'羅諾威・羅米耶爾',jp:'ロノウェ・ロミエール',en:'ROMIERE RONOVE',groups:['council','other','s4'],cv:'鈴木達央',debut:'第2季',role:'學生會相關學生',trait:'極度自信，喜愛成為目光焦點。',ability:'善於吸引注意。',relation:'與艾梅莉有學生會選舉的交集。',color:'#d9a168',symbol:'star',s4:'熱鬧的學園生活與舞台氣氛。' },
  { id:'six-fingers',name:'六指眾',jp:'六指衆',en:'THE SIX FINGERS',groups:['other','villains'],cv:'群體角色；個別聲優另核對',debut:'第2季',role:'魔界的祕密組織',trait:'以不同身分活動，牽動魔界的暗流。',ability:'六名成員各自擁有不同能力，未核實部分不展開。',relation:'與華特公園的事件及奇里歐相關。',color:'#9f789b',symbol:'hand',s4:'此處只介紹動畫已公開的組織背景。' },
];
export type Platform = { name: string; mark: string; color: string; links: Partial<Record<number,string>>; status: 'verified'|'search'; note: string };
export const platforms: Platform[] = [
  {name:'巴哈姆特動畫瘋',mark:'動畫瘋',color:'#058d98',status:'verified',note:'已找到各季第1話；廣告與付費方案以平台為準。',links:{1:'https://ani.gamer.com.tw/animeVideo.php?sn=13809',2:'https://ani.gamer.com.tw/animeVideo.php?sn=22248',3:'https://ani.gamer.com.tw/animeVideo.php?sn=31658',4:'https://ani.gamer.com.tw/animeVideo.php?sn=48407'}},
  {name:'MyVideo',mark:'myVideo',color:'#d94938',status:'verified',note:'已找到各季作品頁；可看集數與方案請在平台確認。',links:{1:'https://www.myvideo.net.tw/details/3/6954',2:'https://www.myvideo.net.tw/details/3/15837',3:'https://www.myvideo.net.tw/details/3/21656',4:'https://www.myvideo.net.tw/details/3/33007'}},
  {name:'LiTV 立視線上影視',mark:'LiTV',color:'#cc3a71',status:'verified',note:'已找到對應季度的單集作品頁。',links:{1:'https://www.litv.tv/comic/watch/VOD00160833',2:'https://www.litv.tv/comic/watch/VOD00207810',3:'https://www.litv.tv/comic/watch/VOD00269335',4:'https://www.litv.tv/drama/watch/VOD00398005'}},
  {name:'Hami Video',mark:'Hami',color:'#e77e25',status:'verified',note:'已找到各季作品頁；方案與播放權限以平台為準。',links:{1:'https://hamivideo.hinet.net/product/93892.do?cs=2',2:'https://hamivideo.hinet.net/product/148900.do?cs=2',3:'https://hamivideo.hinet.net/product/202852.do?cs=2',4:'https://hamivideo.hinet.net/product/322241.do?cs=2'}},
  {name:'friDay 影音',mark:'friDay',color:'#8c3f9f',status:'verified',note:'已找到第2～4季作品頁；第1季原連結回傳錯誤，不列為已核實。',links:{2:'https://video.friday.tw/anime/detail/1855',3:'https://video.friday.tw/anime/detail/2619',4:'https://video.friday.tw/anime/detail/4839'}},
  {name:'LINE TV',mark:'LINE TV',color:'#158b60',status:'verified',note:'已找到各季作品頁；字幕、廣告與會員方案以平台為準。',links:{1:'https://www.linetv.tw/drama/10842/eps/1',2:'https://www.linetv.tw/drama/12120/eps/1',3:'https://www.linetv.tw/drama/13892/eps/1',4:'https://www.linetv.tw/drama/22360'}},
  {name:'Muse 木棉花 YouTube',mark:'MUSE',color:'#cf3737',status:'verified',note:'台灣官方頻道的季度播放清單；可看狀態由木棉花控制。',links:{2:'https://www.youtube.com/playlist?list=PL12UaAf_xzfr4xPjCCJlO-lYORZj0C018',4:'https://www.youtube.com/playlist?list=PL12UaAf_xzfqN3eyl6PIwUzG-6OLz7wRK'}},
];
export const unconfirmedPlatforms = [
  {name:'CATCHPLAY+',url:'https://www.catchplay.com/tw',note:'逐季上架狀態待確認；平台首頁入口'},
  {name:'friDay 第1季',url:'https://video.friday.tw/',note:'舊作品頁回傳資料錯誤，改列待確認；平台首頁入口'},
];
export const acts = [
  { label:'ACT I',title:'不能少了任何一個人。',subtitle:'音樂祭・十三人的挑戰',body:'全員晉升位階4，是保住王者的教室的條件。最後一次升級機會就在音樂祭，而一直隱藏存在的第十三名同學——普爾森・索伊，也必須站到聚光燈下。',spoiler:'問題兒童班在音樂祭獲得優勝，全員達成位階4的課題。入間則晉升至位階5。' },
  { label:'ACT II',title:'走出教室，世界更大。',subtitle:'大貴族會・降魔之儀・十三冠聚會',body:'一年級的學校活動告一段落，魔界的生活卻遠未結束。入間開始接觸學園之外的禮儀、家族與上位惡魔，也看見更多不同的欲望。',spoiler:'本段以官方後半季故事介紹為範圍；三傑之孫雷治與拉茲貝利成為新的關係人物。' },
  { label:'ACT III',title:'可愛與搖滾，都閃閃發光。',subtitle:'魔偶像大武鬥會・第四季後半',body:'以克蘿姆與賈莉為焦點，魔界最耀眼的另一種舞台開幕。第四季從全班合奏，走向「可愛」與「帥氣」的競演。',spoiler:'最終第24話日文標題為〈一番豪華な餞を〉。具體賽事結果與告別情節，留給正片揭曉。' },
];

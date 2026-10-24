# 資料、素材與驗證紀錄

查核日期：2026-10-16（Asia/Taipei）。不採用尚未動畫化的漫畫劇情；資料不確定時省略細節或註記。

## 動畫資料

- S1：2019-10-05 開始、23話。NHK首話：https://www.nhk-ondemand.jp/goods/G2026154919SA000/ ；末話：https://www.nhk-ondemand.jp/goods/G2026154941SA000/ 。台灣正版作品頁：https://ani.gamer.com.tw/animeVideo.php?sn=13809 。
- S2：2021-04-17 開始、21話。台灣正版首集與集數列表：https://ani.gamer.com.tw/animeVideo.php?sn=22248 。
- S3：2022-10-08 開始、21話，跨2022～2023。台灣首集：https://ani.gamer.com.tw/animeVideo.php?sn=31658 ；NHK末集：https://www.nhk-ondemand.jp/goods/G2026156740SA000/ 。
- S4：2026-04-04 開始、全24話，官網：https://www.nhk-character.com/chara/iruma/onair 。末話：https://www.nhk-character.com/chara/iruma/episode/ep24.html 。木棉花台灣第24話 https://www.youtube.com/watch?v=dfC1KCzXep4 的發布資料為2026-09-26（台灣時間20:00），與播出紀錄交叉核對。快取串流頁可能仍顯示播出中的舊集數，不能當成總話數。
- 劇場版：2026-09-27企劃公布，未公布上映日期。https://www.nhk-character.com/chara/iruma/news/movieproject.html 。沒有將其當作第五季。
- 第四季後半的社交活動及魔偶像篇依官方首頁故事介紹；不將全季簡化為音樂祭。音樂祭結果另存於spoiler欄位，預設不展示。

## 角色

主要依日文、英文官方角色頁核對：

- https://www.nhk-character.com/chara/iruma/character
- https://www.nhk-character.com/chara/iruma/en/character
- 台灣譯名交叉參考MyVideo、LiTV、動畫瘋的正式集數與介紹文案；不將所有譯名宣稱為唯一官方定名。
- 巴拉姆聲優：https://kenproduction.co.jp/talent/32 ；動畫登場S2，第10話教學篇：https://www.nhk-ondemand.jp/goods/G2026155839SA000/ 。
- 芭琪可聲優：https://www.oginext.com/women/takeuchi/ 。
- 奇里歐聲優：https://www.earlywing.co.jp/actordb/catea/talent_osakaryota 。
- 羅賓聲優名錄：https://seigura.com/directory/1369/ （專業名錄，非動畫官方一手頁）。
- 六指眾官方用語：https://www.nhk-character.com/chara/iruma/special/words/%E5%85%AD%E6%8C%87%E8%A1%86.html ；NHK S2第15話：https://www.nhk-ondemand.jp/goods/G2026155844SA000/index.html 。目前提供組織條目，未冒充六位成員的完整個人資料。

人物資料不填未核實的生日、身高、私密設定或漫畫後續。非第四季官方角色頁的配角，具體第四季戲份不作量化判定。巴拉姆初登場已修正為第二季。

## 圖片與影片

官方公開展示不構成轉載許可；未找到能允許本粉絲網站重製或編輯角色立繪的明確條款。`src/data/assets.ts` 記錄21位角色的實際官方圖來源與待確認狀態，全部停用。索伊官方ID是17，而非排列順序的13；艾梅莉13、卡爾耶格14、薩利班15、歐佩菈16，已按原始HTML核對。

四季之門採自製魔法圖形。舊季主視覺原始檔與許可未確認，不使用猜測路徑。第四季主視覺僅記錄已找到的來源，不下載。建築、校徽、魔法陣、音符與徽記都是原創裝飾，不冒充官方。

官方PV https://www.youtube.com/watch?v=jMhzqfi9aPw 的ID直接取自官方影片頁 https://www.nhk-character.com/chara/iruma/movie 的 `data-youtube-id`，以YouTube原生播放器嵌入。第三方平台可能禁止特定地區、來源或嵌入，旁邊保留原始連結。沒有自動播放或下載影片。

## 台灣串流

逐季連結集中於 `src/data/content.ts`，HTTP狀態與標題見 `link-audit.json`。目前提供巴哈、MyVideo、LiTV、Hami、LINE TV的四季直接頁，friDay第2～4季，木棉花第2／4季清單。

friDay第1季原始連結 `/anime/detail/1037` 曾回傳400及「資料錯誤」，已從已確認清單移除，改用清楚標示的平台首頁入口。CATCHPLAY+未確認逐季作品頁。沒有登入、付費、播放或地區權限驗證，不宣稱每集隨時可看。

## 程式驗證

執行 `npm run typecheck`、`npm test`（5組資料不變條件）、`npm run build`。瀏覽器檢查使用本機實際Next.js服務與Codex in-app browser；詳細操作結果另見 `qa.md`。

這份紀錄保留未完成的權利與資料查證，不代表已滿足「官方人物立繪組合舞台」的素材條件。

## 圖片補強（2026-10-16）

首頁、四季之門、角色區與第四季舞台新增YouTube oEmbed回傳的官方PV預覽圖片。來源是YouTube提供的thumbnail_url，每日重新取得中繼資料，不猜測maxres圖片路徑，不下載縮圖、不裁切人物，不以全班預覽假充角色獨照；顯示官方YouTube品牌與原影片連結。參考 https://developers.google.com/youtube/terms/developer-policies 與 https://oembed.com/ 。原日本PV在in-app browser出現無法播放，主要播放器改用木棉花台灣PV S2p07wVUiB8；索伊使用官方角色PV BKXgWJQy0BQ。

另新增2022 JOYPOLIS活動的完整官方宣傳圖，用途限定該活動回顧。發行者 https://www.pr-today.net/category/a00307/37082/ 明示刊登圖片須標示版權，圖下保留©西修（秋田書店）／NHK・NEP，未去背或拆分角色。活動時間2022-10-04～2022-12-04，已結束，非第四季主視覺。原圖來源與許可說明記錄在media.ts及assets.ts。


## 2026-10-16 官方角色立繪啟用

依使用者「角色立繪 請使用」的明確指示，啟用已核對的21位官方角色來源。首頁展示入間、艾利斯、庫菈菈，角色圖鑑顯示對應全身立繪與縮圖，第四季舞台展示全13名同學並可連動切換大圖。維持官方原圖比例，直接引用遠端原始網址；沒有另存本地或改繪。來源、權利人及未取得獨立轉載許可的狀態保留於素材清單。沒有已確認圖片的角色使用明確替代提示。


## 2026-10-16 圖鑑與三篇章素材擴充

共28個角色／組織條目、51張圖片：44張官方角色立繪（含官方角色頁的全部換裝），7張替代圖片。巴拉姆、奇里歐、巴力、羅諾威及六指眾使用官方劇照；芭琪可採Comic Natalie公布的第三季官方角色設定圖；羅賓採秋田書店50卷紀念網站教師介紹圖片。圖片未改繪、保留原始來源與權利人。全部51個圖片網址的HEAD回應為200且Content-Type為image/*，結果存portrait-audit.json。

三個篇章各4張可點擊放大的劇照，標題、影片與相關角色同步切換。VIDEO 01／02依使用者指定，分別是木棉花第7話〈莉莉絲之毯〉與第22話〈傲慢的歌姬〉；oEmbed確認發布者Muse木棉花-TW。魔界社交篇使用第四季官方後半篇PV。影片改以react-youtube 10.1.0按需載入，沒有自動播放，提供直接YouTube入口，視窗關閉時卸載。


## 2026-10-16 階層分類與服裝對應修正

按使用者提供的維基百科目錄新增完整50類，分成主要人物、學園、師團、高位惡魔、家系、組織及種族等父子結構。28個既有角色／組織均有明確歸屬，上層會彙總子分類，目錄顯示已收錄數並支援搜尋。未收錄人物的分類顯示來源索引；分類完整不等於已匯入維基全部人物。主要來源為使用者提供的繁中維基角色目錄；沒有搬入長篇劇情敘述。

實際檢視官方素材總覽後修正服裝：音樂祭13名學生皆選ch；魔界社交的入間ch2、艾梅莉ch、薩利班ch、歐佩菈ch，其他兩人保留官方唯一造型；惡斗露使用凱洛莉ch2、入間ch3、利德ch2、艾梅莉ch2、賈莉default。介面顯示入美、琳蒂、梅莉等演出名稱與造型名稱，人物詳情保留舞台所選造型。桌面確認全部對應圖片已載入，阿斯莫德家可篩選出艾利斯，上層家系路徑正確；多耳族顯示原作索引而非無關角色。

7項測試通過，新增父子分類、成員歸屬與篇章服裝資料完整性檢查。正式建置成功。

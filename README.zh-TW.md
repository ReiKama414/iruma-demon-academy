# WELCOME TO BABYLS

[English](./README.md) · **繁體中文**

> 《入間同學入魔了！》非官方**粉絲印象網站** — 台灣繁體中文，一頁七章，以第四季音樂祭為核心。資料截止：**2026-10-16**

<p align="center">
  <img src="./public/art/academy.svg" alt="原創學園校徽示意" width="280" />
</p>

<p align="center">
  <a href="https://github.com/ReiKama414/iruma-demon-academy">Star</a>
  ·
  <a href="https://reikama414.vercel.app/">個人網站</a>
  ·
  <a href="#快速開始">快速開始</a>
  ·
  <a href="#license--權限">授權</a>
</p>

---

## 為什麼做

非商業粉絲頁，用單一舞台串起四季、角色與第四季篇章 — 非官方產品，亦與權利人無隸屬關係

## 亮點

- **七章切換** — 滾輪、觸控板、方向鍵、Page Up/Down、Home/End、導覽圓點與章節選單
- **第四季舞台** — 音樂祭、魔界社交、魔偶像大武鬥會：主題標題、影片、劇照與相關角色
- **角色圖鑑** — 階層分類、姓名搜尋、造型切換與立繪互動舞台
- **台灣正版觀看** — 分季篩選與官方 PV 播放；劇透預設關閉
- **無障礙** — 支援 `prefers-reduced-motion`；未選中場景使用 `inert`；原生 dialog，Esc 可關閉

## 技術棧

| 範圍 | 選用 |
| --- | --- |
| 應用 | Next.js · React · TypeScript |
| 動效 | GSAP · Observer · ScrollTrigger |
| 媒體 | react-youtube · Web Audio（原創短音） |
| 圖示／字型 | Lucide · Google Fonts 載入 Noto |

## 快速開始

建議 Node.js 24 LTS（資料測試使用 Node 原生 TypeScript 載入）

```bash
npm install
npm run dev
```

若 3000 已被使用：

```bash
npm run dev -- --port 3109
```

正式模式：

```bash
npm run build
npm run start
```

檢查：

```bash
npm run typecheck
npm test
npm run check:links
```

`check:links` 會更新 `docs/link-audit.json`。HTTP 正常回應只代表作品頁存在，不代表已登入、購買或驗證每一集播放權限

## 專案結構

| 路徑 | 用途 |
| --- | --- |
| `src/components/Academy.tsx` | 場景控制器、Observer、ScrollTrigger、GSAP Context、Web Audio 與介面 |
| `src/components/Magic.tsx` | 原創魔法陣、音符路徑、Lucide 主題徽記 |
| `src/components/YouTubePlayer.tsx` | 點擊後載入 react-youtube；關閉視窗即卸載播放器 |
| `src/data/content.ts` | 動畫、角色、章節、來源與台灣平台資料 |
| `src/data/portraits.json` / `assets.ts` | 角色圖清單、權利欄位與啟用狀態 |
| `src/data/taxonomy.ts` | 50 個階層分類 |
| `public/art/` | 原創 SVG，不是官方巴比路斯建築或校徽的復刻 |
| `docs/research.md` | 資料查證與已知限制 |

## 粉絲聲明／第三方 IP

本站為**非官方、非營利粉絲向作品**，與 NHK、出版社、動畫製作委員會或相關公司**無隸屬、無代言、無合作關係**

- 《入間同學入魔了！》（《魔入りました！入間くん》）及其角色、名稱、設定、官方立繪、劇照、標誌與商標，權利歸各自權利人（含原作者與相關出版／製作單位）
- **MIT 僅涵蓋本倉庫的原創程式碼與原創素材**（例如 `public/art/` 的 SVG 與站內 UI 程式）。**不**授權官方立繪、劇照、影片、音樂或其他第三方素材
- 官方立繪與劇照採遠端載入，來源與權利人保留於介面及 manifest；公開可瀏覽 ≠ 已取得轉載或再散布許可
- YouTube 以點擊後載入的隱私強化播放器嵌入；能否播放依地區與平台政策而定
- 角色名依台灣平台與常見譯法整理；各代理字幕可能不同

詳見 `docs/research.md` 與站內來源／素材紀錄

## 連結

| | |
| --- | --- |
| 倉庫 | [iruma-demon-academy](https://github.com/ReiKama414/iruma-demon-academy) |
| 作者 | [ReiKama414](https://github.com/ReiKama414) |
| 作品集 | [個人網站](https://reikama414.vercel.app/) |
| 授權全文 | [LICENSE](./LICENSE) |

## License / 權限

**明確例外於預設 All Rights Reserved 政策：** 本倉庫原創原始碼採 **MIT License**

Copyright (c) 2026 ReiKama414 — 僅適用於原創程式碼與原創素材

動畫／漫畫等第三方 IP **不屬於** ReiKama414，亦**不受** MIT 授權。粉絲展示不主張擁有或轉讓該等權利

- [GitHub](https://github.com/ReiKama414/iruma-demon-academy)
- [個人網站](https://reikama414.vercel.app/)
- [MIT 全文](./LICENSE)

---

<sub>非官方粉絲專案 · ReiKama414 · 2026</sub>

---
name: xhs-ai-notes
description: 制作小红书 AI 类图文投稿（3:4 卡片组 + 投稿文案 + 置顶评论），杂志/UI 风格，有浅色与深色两套模板，适用于 AI 编程、提示词、工具测评对比等主题。Create Xiaohongshu (RED) photo posts on AI topics — a set of 3:4 cards plus post copy and a pinned comment — in a magazine/UI style with light and dark themes. Use for AI coding, prompt-writing, and tool or skill review topics.
---

# 小红书 AI 图文投稿（模板：AI Notes 杂志风）

把一个 AI 相关主题做成一组小红书图文：1 张封面 + 内页（3–9 张），并写好投稿标题、正文和置顶评论。内页有三种：

- **提示词页**：标题 + BEFORE / AFTER 插图 + 提示词（例：第 1 期）。
- **截图测评页**：标题 + 一张整宽截图（上方一行关键词说明）+ 优点 / 不足（例：第 2 期）。
- **纯文字页**：标题 + 多段要点，可用 01 / 02 / 03 编号（适合测试条件、结论、步骤）。

推荐单个工具 / Skill 时用「推荐结构」（例：第 3 期）：推荐版封面 → 01 功能（原图 / 成品竖版对比）→ 02 如何安装及使用（命令卡片图）→ 03 效果（五图拼图）。

## 工作流程

1. **确认输入**：主题、页数、每页内容，以及用户提供的截图。选模板：默认浅色（`theme` 不填）；用户的截图或配色与浅蓝太接近时，用深色（`theme:'dark'`）。用户只给主题时，先列出要点和文案请用户确认，再做图。
2. **整理文案**（规则见「文案规则」），每个要点写：中文栏目名（2 字）、英文栏目名、标题、1–2 段提示词。
3. **画对比图**：每页一组 BEFORE / AFTER 小界面插图，用下方「插图积木」拼，表现「改了什么」。主题不适合对比时可省略（不传 before/after）。
4. **写入 `content.js`**（字段见「content.js 字段」），按「模板文件」建好 `card.html` / `render.js` / `composite.py`（如果技能目录里已有 `template/` 文件夹，直接复制使用）。截图放在 `img/` 下，用相对路径引用。
   - 用户给的文案太长时，卡片上只保留结论性的短句，比如截图上方用一行关键词概括，下方只写优点和不足；完整叙述放进正文或置顶评论。这样做要告诉用户。
5. **渲染**：`node render.js out && python3 composite.py out`。需要 Node + Playwright（Chromium）、Python + numpy + Pillow，以及 Inter、思源黑体 / Noto Sans CJK SC 字体；大编号和封面目录编号（浅色、深色都用）另需 Fraunces 斜体可变字体（Google Fonts 下载，OFL 开源协议），放在 card.html 旁边的 `fonts/FrauncesItalic.ttf`，系统里已安装 Fraunces 时可省略；两者都没有时，请用户提供字体文件，不要用别的字体顶替。
6. **质检**：render.js 会逐页打印检查结果，必须全部为 `OK`。
   - `CONTENT_TOO_LONG`：精简提示词。
   - `MOCK_OVERFLOW`：压缩插图内容。
   - `TITLE_WRAPS`：缩短标题。
   然后亲眼看每一张图：对齐、留白、有无溢出或截断。
7. **交付**：图片 `card_01.png …`（2172×2896，即 3:4 的 2 倍图）+ 投稿标题 + 正文 + 置顶评论（提示词文字版）。

## 设计规范（不要改动；新风格请新建模板）

- **画布**：1086×1448 CSS px，2 倍导出。页边距左右 96，顶部 48，底部 80。
- **字体**：只用 2 种：Inter（英文、数字）+ 思源黑体 / Noto Sans CJK SC（中文）。例外：大编号和封面目录编号用 Fraunces 斜体（衬线）做反差，浅色、深色模板一致；封面标题里的高亮数字仍用 Inter。
- **字号**：只有 4 档，另加封面标题专用的 96。
  - 20：标签、页眉、页码、品牌名
  - 32：正文，行高 56
  - 80：内页标题，行高 96
  - 200：大编号
- **文字颜色**：4 种。墨色 #14181F（标题、强调）、正文灰 #4A5160、辅助灰 #959CAA、点缀蓝 #2F6BFF。
- **间距**：只用 8 / 16 / 24 / 32 / 48，全部是 4 的倍数。
  - 标题到 BEFORE：32
  - 对比图到「修改提示词」：48（两者视觉距离相等）
  - 段落上下留白：24
- **线条**：统一 1px rgba(20,24,31,.12)，不让两条线挨得很近。
- **背景**：底色 #F7F8FA，右上和左下各一团浅蓝光晕。右下角是 12 层切片球体（灰线 6.5%，第 5 层蓝色 32%）。纸感噪点只加在背景层（composite.py 完成），文字和白卡保持干净。
- **页眉**：左「■ AI CODING / UI NOTES」。右上角所有页面统一放页码，封面为「01 / 10」，内页「02 / 10」…（当前页高亮，不使用期号，避免被「系列」绑住）。不设页脚线。底部放极淡的品牌名（50% 透明度）：「FUTURE SLICE」靠左、「未来切片」靠右，与页边距对齐、基线对齐（content.js 的 `brand` 用「·」分隔左右两段）。不放四角星等装饰图标。
- **内页结构**：大编号（Fraunces 斜体，规格见「大编号」）+ 右侧栏目名（中文 + 英文）→ 一行标题 → BEFORE / AFTER（只写英文，AFTER 用蓝色）→「修改提示词 / PROMPT」→ 每段前一个蓝色「/」。正文与「提」字左对齐（48px 栏），「/」与「修」对齐。
- **封面结构**：两行大标题（96，字重 500；不要为了缩略图加粗或放大，深浅两套保持一致），关键数字用点缀蓝、同字号 → 「/ 副标题」→ 目录（编号 32 点缀色 Fraunces 斜体 + 标题 + 右侧栏目名，每行 96 高，视觉居中）。标准封面默认不放插图；需要时可用 `cover.imgs` 在目录下方放一排 3:4 作品图。推荐单个工具 / Skill 时改用「推荐版封面」。
- **大编号**（两套模板通用）：Fraunces 斜体、300 字重（可变轴 opsz 144、SOFT 0、WONK 1），216px、行高 200。填充与描边是同一层文字（不要两层叠加，会产生重影）：
  - 填充：点缀色从顶部渐隐，在数字约 70% 高度处完全透明。
  - 描边：1px 点缀色，贯穿整个数字。
  - 整体亮度（mask）：浅色从顶部 100% 降到底部 16%（浅底上太淡会看不清）；深色从顶部 70% 降到底部 8%。
  - 数字顶部与页眉线约 48 空隙，底部与标题约 24；以 0 的左缘与标题左缘光学对齐（模板按斜体字形测量）。
- **对齐**：大字和标题按字形做光学左对齐，目录按字形中心垂直对齐（模板已自动处理）。

## 文案规则

- **内页标题**：≤ 8 个汉字，必须一行。写成「AI 的毛病」，而不是「解决方法」，例如「什么都要解释一遍」。
- **提示词**：每页 1–2 段，每段约 20–70 字，可直接复制给 AI 使用。每段用 `<b>` 加粗 1 个关键短语（短语不超过约 14 字，加粗部分不会断行）。
- **换行**：中文只在标点处换行（模板已设置 keep-all）。避免一段里出现超过 26 字却没有标点的长句。
- **语气**：克制、讲证据、不夸张，不用 emoji。提到工具写「Codex / Claude Code」。
- **投稿标题**：≤ 20 字，与封面一致。
- **投稿正文结构**：
  1. 场景开头（1 句，让人对上号）
  2. 问题（1 句）
  3. 列出要点 ①②③④
  4. 「提示词放在图里，文字版在置顶评论」
  5. 使用提醒（哪些不必执行得太死）
  6. 结尾提问
  7. 话题标签：#AI编程 #AICoding #提示词 #Codex #ClaudeCode，再按主题补充
- **置顶评论**：「N 条提示词文字版，可以直接复制使用：」+ ①②… 每条「栏目名 + 提示词全文」，末尾可加一句使用建议。
- **出处**：内容来自他人时，在正文里注明出处。

## 插图积木（对比图内部，框 435×288，内边距 24，可用高度约 240）

- `<div class="t b">标题</div>`：插图文字 18px。`.b` 为加粗墨色，`.m` 为浅灰。
- `<div class="sk" style="width:60%"></div>`：骨架线，8px 高；`.skd` 为深一点的骨架。
- `<div class="inp"></div>`：输入框。`<div class="btn t">提交</div>`：蓝色按钮。
- 按钮贴底：`style="position:absolute;left:24px;right:24px;bottom:24px"`。
- 修改前可以「故意做错」：多色、阴影、奇数字号、啰嗦文字。修改后要「有秩序」：同一色系的深浅、一致的圆角、统一的字号和间距，不要只是把颜色去掉。
- 插图内部间距也用 8 / 16 / 24。只有插图里允许出现示意性的其他字号和颜色。

## 模板：深色（`theme:'dark'`）

适合截图本身是浅色或浅蓝、需要拉开对比的测评类内容。排版、字号、间距和浅色完全一致，只换配色：

- **底色**：#060808，不加格子（会和分隔线冲突）。右上角和左下角各一团深青色光晕，透明度分别为 30% 和 20%。
- **文字**：标题 #E8EEED，正文 #9AA6A4，辅助 #66726F。
- **点缀色**：偏绿的薄荷青 #2ED8AA，替代浅色模板里的蓝色，用于编号、「/」、标签和高亮。
- **大编号与封面目录编号**：同浅色模板（Fraunces 斜体），换成薄荷青；整体亮度从顶部 70% 降到底部 8%。
- **线条**：rgba(255,255,255,.16)。切片球体用白线，高亮层为青绿（30%）。

## 推荐版封面（`cover.style:'pick'`）

用于推荐单个工具 / Skill 的一期，代替目录式封面：

- **标题**：两行（96，字重 500），`top:128`。标题最高点固定，不随下方内容移动；下面留空没关系。
- **链接输入框**：全宽，高 88，圆角 14，1px 线 rgba(20,24,31,.1)，白底 90%，投影要很淡（0 20px 56px -32px rgba(40,70,140,.16)）。内容：左侧灰色链接图标 → 灰色地址前缀（`url`，如 `github.com/作者/`）+ 深色加粗名称（`skill`），都是 32 → 2px 点缀色细光标 → 最右一个淡灰「↵」键帽。不做蓝色按钮（图片不能点击，按钮会显得假）。
- **作者行**：「/ 作者 xxx，附 xxx 效果」，样式同副标题，距输入框 24。
- **作品图**：作者行下方 64，一排 2–4 张 3:4 图（`imgs`），等宽，圆角 8 + 1px 线。2 张最大气，3 张以上会变小。

## content.js 字段

- 全局：`theme`（不填即浅色，可填 `'dark'`）、`header`、`brand`（用「·」分隔左右两段）、`promptLabel`。不再使用期号 `issue`：封面右上角和内页一样显示页码。
- `cover`：`lines` 为多行标题，每行是片段数组，`{hi:'4'}` 表示点缀色高亮，例如 `[['同一个网页'],['换',{hi:'4'},'个设计 Skill']]`；也可以用旧写法 `line1` 加 `line2:[前,高亮,后]`。另有 `subtitle`，以及 `top`（标题离页眉的距离，默认 192；行数多时用 96）。`imgs`（可选）：目录下方一排 3:4 图。推荐版封面另加 `style:'pick'`、`url`（灰色前缀）、`skill`（名称），见上节。
- `toc`（可选）：自定义封面目录 `[{n:'02',t:'Baseline',m:'稳妥'}]`，默认按内页自动生成。
- `cards[]`：
  - 基本字段：`zh`、`en`、`title`、`n`（大编号，默认按页序；设为 `false` 时不显示编号和栏目名，用于测试条件、结论、建议这类说明页。此时标题与封面大标题同高，标题到正文分隔线的距离与封面副标题到目录第一条线一致）。
  - `en` 写 `zh` 的英文对应词（如 个性 / BOLD、克制 / RESTRAINED），不要写 SKILL A 这类无意义的代号。
  - `label:[中文,英文]`：替换「修改提示词 / PROMPT」。
  - `prompts`：字符串，或 `{k:'01',t:'…'}`（用编号代替「/」）。
  - 插图对比：`before`/`after`（HTML），或 `beforeImg`/`afterImg`（图片），可选 `caps:[左,右]`。
  - 整宽截图：`shot`（图片路径）。`shotCap:[关键词,名称]` 可选，默认不写，截图直接接在标题下方，关键词说明放进置顶评论。
  - 多图对比：`grid:[{cap:'BASELINE',img:'…'}, …]`，3 列网格，标签统一灰色、不加编号，适合结论页把所有版本放在一起对比。
  - `cmpRatio:'3/4'`：把 BEFORE / AFTER 框改成该比例（默认固定高 288），适合「原图 / 成品」竖版对比，配 `caps:['ORIGINAL','MONO-COLOR']` 与 `beforeImg` / `afterImg`。
  - `gridRatio:'3/4'`：改 `grid` 每格的比例（默认 1512/982 横版截图）。
  - `bento:[大图,小图1,小图2,小图3,小图4]`：五图拼图，左侧大图占两行，右侧 2×2 小图（3:4），适合效果展示页。
  - 命令 / 安装说明：做成一张白卡图片放进 `shot`（模板见下方「install-card.html」：TERMINAL、OR · ASK YOUR AI、PROMPT · EXAMPLE 三段，等宽字体写命令），再用 2–3 条 `dense` 要点补充。推荐「直接让 AI 帮你安装」这种通用写法，不写某个工具专属的路径。
  - `dense:1`：段落留白从 24 缩到 16，截图页使用。
- **测评页写法**：标题直接用被测对象的名字（如 Skill 名）；一句话结论放在 `label[0]`；不写 `shotCap`；下方写「优点 / 不足」（或「优点 / 注意」）。大编号只给被测对象（如 01 Baseline 到 06 组合），封面目录的编号与之一致；被测对象以外的页面（测试条件、结论、建议）一律用 `n:false`。
- 截图页容量：一张 3:2 整宽截图加两行 `dense` 要点正好放满。放不下时，先精简文字，不要缩小截图。

## 新增风格

每种新风格是 card.html 里的一个主题（参照 `html.dark` 那一组 CSS），在 content.js 里用 `theme` 切换，再在本文件加一节「模板：xx」，说明配色和适用场景。工作流程、文案规则、渲染和合成脚本都共用。只有当工作流程完全不同时（例如做视频），才另建一个技能。

## 模板文件

### card.html
```html
<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
/* type: 4 sizes · 4 colours · 2 families  |  space: 8 / 16 / 24 / 48 (+ page 80/96) */
:root{--ink:#14181F;--sub:#4A5160;--mute:#959CAA;--line:rgba(20,24,31,.12);--blue:#2F6BFF;--blue-l:#E8EFFF;--sk:#E4E7ED;
 --s1:20px;--s2:32px;--s3:80px;--s4:200px;--g1:8px;--g2:16px;--g3:24px;--g4:48px}
html,body{width:1086px;height:1448px}
body{position:relative;overflow:hidden;background:#F7F8FA;font-family:"Inter","Noto Sans CJK SC",sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
.orb{position:absolute;border-radius:50%;filter:blur(100px)}
.o1{width:820px;height:820px;right:-320px;top:-340px;background:#BCD3FF;opacity:.7}
.o2{width:560px;height:560px;left:-300px;bottom:-120px;background:#DCE6FF;opacity:.6}
.page{position:absolute;inset:0;padding:80px 96px;display:flex;flex-direction:column}
.meta{font-size:var(--s1);line-height:24px;letter-spacing:.2em;color:var(--mute);font-weight:500}
.hd{display:flex;justify-content:space-between;padding-bottom:var(--g3);border-bottom:1px solid var(--line)}
.hd .l{display:flex;align-items:center;gap:var(--g2)}.hd .l i{width:8px;height:8px;background:var(--blue)}
.hd .pg b{color:var(--ink);font-weight:500}
.sec{display:flex;justify-content:space-between;align-items:flex-end;margin-top:var(--g3)}
.num{font-weight:200;font-size:var(--s4);line-height:160px;padding:8px 0;letter-spacing:-.05em;
 background:linear-gradient(180deg,#2F6BFF 8%,rgba(47,107,255,.22) 58%,rgba(47,107,255,.05) 100%);-webkit-background-clip:text;color:transparent}
.cat{text-align:right;padding-bottom:var(--g3)}.cat .zh{font-size:var(--s2);line-height:56px;letter-spacing:.4em;margin-right:-.4em}
h1{font-size:var(--s3);font-weight:500;line-height:96px;letter-spacing:.03em;margin-top:var(--g1)}
h1 span{display:block}
.cmp{margin-top:32px;display:grid;grid-template-columns:1fr 1fr;gap:var(--g3)}
.cmp .cap{margin-bottom:var(--g2)}.cmp .cap.on{color:var(--blue)}
.mk{height:288px;background:rgba(255,255,255,.94);border:1px solid var(--line);border-radius:12px;padding:var(--g3);position:relative;overflow:hidden}
.lab{display:flex;justify-content:space-between;margin-top:var(--g4);padding-bottom:var(--g2);border-bottom:1px solid var(--line)}
.lab .zh{color:var(--blue)}
.p{display:grid;grid-template-columns:48px 1fr;padding:var(--g3) 0}
.p+.p{border-top:1px solid var(--line)}
.p .k{font-size:var(--s2);font-weight:300;color:var(--blue);height:56px;line-height:56px}
.p p{font-size:var(--s2);font-weight:350;line-height:56px;color:var(--sub);letter-spacing:.03em;word-break:keep-all;overflow-wrap:anywhere}
.p p b{font-weight:500;color:var(--ink);white-space:nowrap}
/* mock */
.sk{height:8px;border-radius:4px;background:var(--sk)}.skd{background:#C9CFDA}
.t{font-family:"Noto Sans CJK SC";font-size:18px;line-height:24px;color:var(--sub)}
.t.b{font-weight:500;color:var(--ink)}.t.m{color:var(--mute)}
.inp{height:36px;border:1px solid #D5DAE2;border-radius:8px;background:#fff}
.btn{height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;background:var(--blue)}
.row{display:flex;justify-content:space-between;align-items:baseline;font-family:"Noto Sans CJK SC"}
.row .meta{letter-spacing:.08em;font-size:16px;line-height:1}
/* cover */
.note{margin-top:var(--g3);display:grid;grid-template-columns:72px 1fr;font-size:var(--s2);line-height:56px;font-weight:350;color:var(--sub);letter-spacing:.06em}
.toc{margin-top:var(--g4)}
.toc .r{display:grid;grid-template-columns:72px 1fr auto;align-items:center;height:72px;border-top:1px solid var(--line)}
.toc .n{font-size:var(--s1);font-weight:600;color:var(--blue)}
.toc .tt{font-size:var(--s2);font-weight:400;letter-spacing:.03em}

.cv-t{font-size:96px;font-weight:500;letter-spacing:.03em;margin-top:var(--g3)}
.cv-t .l1{line-height:112px}
.cv-t .l2{line-height:112px;display:flex;align-items:baseline;white-space:nowrap}
.cv-t .big{font-family:Inter;font-weight:400;font-size:96px;line-height:112px;margin:0 16px;color:var(--blue)}
.cv .toc{margin-top:96px}
.cv .toc .r{height:96px;align-items:center}.toc .r>span{line-height:1}
.cv .toc .n{font-size:var(--s2);font-weight:400;font-family:Inter}
.cv .toc .n{font-family:FrI,serif;font-style:italic;font-variation-settings:"SOFT" 0,"WONK" 1}
html.bg .page,html.bg .brand{visibility:hidden}
html.fg body{background:transparent!important}html.fg .orb,html.fg .gfx{display:none}
.brand{position:absolute;left:96px;right:96px;bottom:48px;z-index:5;opacity:.5;letter-spacing:.24em;display:flex;justify-content:space-between;align-items:baseline}.brand span+span{margin-right:-.24em}
.note .k{color:var(--blue);font-family:Inter;font-weight:300}

/* ---------- extensions (shared) ---------- */
.shot{margin-top:32px}.shot .cap{display:flex;justify-content:space-between;margin-bottom:var(--g2)}.shot .cap .on{color:var(--blue)}
.shot .im{border:1px solid var(--line);border-radius:12px;overflow:hidden;line-height:0}.shot img{width:100%;display:block}
.mk.img{padding:0}.mk.img img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
.dense .p{padding:var(--g2) 0}
.p .k.n{font-family:Inter;font-size:var(--s1);font-weight:600;letter-spacing:.1em}
.cv-t .ln{line-height:112px;display:flex;align-items:baseline;white-space:nowrap}
/* ---------- theme: dark (teal accent, faint grid) ---------- */
html.dark{--ink:#E8EEED;--sub:#9AA6A4;--mute:#66726F;--line:rgba(255,255,255,.16);--blue:#2ED8AA;--blue-l:#0F2E26}
html.dark body{background:#060808}
html.dark .o1{background:#0D3D33;opacity:.3}html.dark .o2{background:#0A2A26;opacity:.2}
html.dark .num{font-family:FrI,serif;font-style:italic;font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 1;letter-spacing:-.01em;font-size:216px;line-height:200px;margin-bottom:-40px;position:relative;top:-25px;padding-right:16px;background:linear-gradient(180deg,#2ED8AA 8%,rgba(46,216,170,.74) 36%,rgba(46,216,170,0) 70%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:1px #2ED8AA;-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,.7) 8%,rgba(0,0,0,.08) 96%)}
html.dark .shot .im,html.dark .mk{border-color:rgba(255,255,255,.12)}
html:not(.dark) .num{font-family:FrI,serif;font-style:italic;font-weight:300;font-variation-settings:"opsz" 144,"SOFT" 0,"WONK" 1;letter-spacing:-.01em;font-size:216px;line-height:200px;margin-bottom:-40px;position:relative;top:-25px;padding-right:16px;background:linear-gradient(180deg,#2F6BFF 8%,rgba(47,107,255,.74) 36%,rgba(47,107,255,0) 70%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-stroke:1px #2F6BFF;-webkit-mask-image:linear-gradient(180deg,rgba(0,0,0,1) 8%,rgba(0,0,0,.16) 96%)}
.cv-im{margin-top:48px;display:grid;gap:16px}.cv-im .im{aspect-ratio:3/4;border:1px solid var(--line);border-radius:8px;overflow:hidden;line-height:0}.cv-im img{width:100%;height:100%;object-fit:cover}

/* ---------- v2 refinements ---------- */
.page{padding-top:48px}
.num{padding:8px 0 0}.sec+h1{margin-top:0}
.shot .cap span:first-child{color:var(--blue)}
.shot .cap .on{color:var(--mute)}
.grid6{margin-top:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px 16px}
.grid6 .cap{margin-bottom:var(--g1);letter-spacing:.12em;white-space:nowrap}.grid6 .cap b{font-weight:600;color:var(--sub);margin-right:8px}
.grid6 .hi .cap,.grid6 .hi .cap b{color:var(--blue)}
.grid6 .im{border:1px solid var(--line);border-radius:8px;overflow:hidden;aspect-ratio:var(--ar,1512/982);line-height:0}.grid6 img{width:100%;height:100%;object-fit:cover;object-position:top}
.pk-in{margin-top:48px;height:88px;border:1px solid rgba(20,24,31,.1);background:rgba(255,255,255,.9);border-radius:14px;display:flex;align-items:center;gap:16px;padding:0 24px;box-shadow:0 20px 56px -32px rgba(40,70,140,.16)}
.pk-in svg{flex:none}.pk-in .u{font-family:Inter;font-size:32px;line-height:1;letter-spacing:.01em;white-space:nowrap}.pk-in .u span{color:var(--mute);font-weight:400}.pk-in .u b{color:var(--ink);font-weight:500}
.pk-in .cr{width:2px;height:36px;background:var(--blue);margin-left:-12px}
.pk-in .kb{margin-left:auto;font-family:Inter;font-size:20px;line-height:1;color:var(--mute);border:1px solid rgba(20,24,31,.12);border-radius:6px;padding:6px 8px}
.pk-im{margin-top:64px;display:grid;gap:16px}.pk-im .im{aspect-ratio:3/4;border:1px solid var(--line);border-radius:8px;overflow:hidden;line-height:0}.pk-im img{width:100%;height:100%;object-fit:cover}
.bento{margin-top:32px;display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px}.bento .im{border:1px solid var(--line);border-radius:8px;overflow:hidden;line-height:0;aspect-ratio:3/4}.bento .im:first-child{grid-row:span 2;aspect-ratio:auto}.bento img{width:100%;height:100%;object-fit:cover}
@font-face{font-family:FrI;src:url(fonts/FrauncesItalic.ttf),local("Fraunces Italic"),local("Fraunces 144pt Italic");font-weight:100 900;font-style:italic}
</style></head><body>
<div class="orb o1"></div><div class="orb o2"></div>
<div class="gfx" id="gfx"></div>
<div class="page" id="pg"></div><div class="brand meta" id="brand"></div>
<script src="content.js"></script>
<script>
/* renderer: window.CONTENT · ?p=0 cover, ?p=1..n cards · ?layer=bg|fg */
const C=window.CONTENT, Q=new URLSearchParams(location.search), P=+Q.get('p'), L=Q.get('layer');
if(L)document.documentElement.classList.add(L);
if(C.theme)document.documentElement.classList.add(C.theme);
const N=C.cards.length+1, pad=n=>String(n).padStart(2,'0');
document.getElementById('brand').innerHTML=(C.brand||'').split('·').map(t=>`<span>${t.trim()}</span>`).join('');
const seg=s=>typeof s==='string'?`<span>${s}</span>`:`<span class="big">${s.hi}</span>`;
let h;
if(P===0&&C.cover.style==='pick'){const v=C.cover;
 h=`<div class="hd meta"><div class="l"><i></i>${C.header}</div><div class="pg"><b>01</b> / ${pad(N)}</div></div>
 <div class="cv-t" style="margin-top:${v.top||192}px">${v.lines.map(l=>`<div class="ln">${l.map((s,i)=>i===0&&typeof s==='string'?`<span data-opt>${s}</span>`:seg(s)).join('')}</div>`).join('')}</div>
 <div class="pk-in"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#959CAA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg><span class="u"><span>${v.url||''}</span><b>${v.skill}</b></span><i class="cr"></i><span class="kb">↵</span></div>
 <div class="note"><span class="k">/</span><span>${v.subtitle}</span></div>
 <div class="pk-im" style="grid-template-columns:repeat(${v.imgs.length},1fr)">${v.imgs.map(s=>`<div class="im"><img src="${s}"></div>`).join('')}</div>`;}
else if(P===0){const v=C.cover;
 const lines=v.lines||[[v.line1],[v.line2[0],...(v.line2[1]?[{hi:v.line2[1]},v.line2[2]||'']:[])]];
 const toc=C.toc||C.cards.map((x,i)=>({n:pad(i+1),t:x.title,m:x.zh}));
 h=`<div class="hd meta"><div class="l"><i></i>${C.header}</div><div class="pg"><b>01</b> / ${pad(N)}</div></div>
 <div class="cv-t" style="margin-top:${v.top||192}px">${lines.map(l=>`<div class="ln">${l.map((s,i)=>i===0&&typeof s==='string'?`<span data-opt>${s}</span>`:seg(s)).join('')}</div>`).join('')}</div>
 <div class="note"><span class="k">/</span><span>${v.subtitle}</span></div>
 <div class="toc">${toc.map(x=>`<div class="r"><span class="n">${x.n}</span><span class="tt">${x.t}</span><span class="meta">${x.m}</span></div>`).join('')}</div>${v.imgs?`<div class="cv-im" style="grid-template-columns:repeat(${v.imgs.length},1fr)">${v.imgs.map(s=>`<div class="im"><img src="${s}"></div>`).join('')}</div>`:''}`;
 document.getElementById('pg').classList.add('cv');}
else{const d=C.cards[P-1];
 const cmp=d.before||d.beforeImg?`<div class="cmp"><div><div class="cap meta">${d.caps?d.caps[0]:'BEFORE'}</div><div class="mk${d.beforeImg?' img':''}"${d.cmpRatio?` style="height:auto;aspect-ratio:${d.cmpRatio}"`:''}>${d.beforeImg?`<img src="${d.beforeImg}">`:d.before}</div></div><div><div class="cap meta on">${d.caps?d.caps[1]:'AFTER'}</div><div class="mk${d.afterImg?' img':''}"${d.cmpRatio?` style="height:auto;aspect-ratio:${d.cmpRatio}"`:''}>${d.afterImg?`<img src="${d.afterImg}">`:d.after}</div></div></div>`:'';
 const shot=d.shot?`<div class="shot">${d.shotCap?`<div class="cap meta"><span>${d.shotCap[0]}</span><span class="on">${d.shotCap[1]}</span></div>`:''}<div class="im"><img src="${d.shot}"></div></div>`:'';
 const lab=d.label||[C.promptLabel||'修改提示词','PROMPT'];
 h=`<div class="hd meta"><div class="l"><i></i>${C.header}</div><div class="pg"><b>${pad(P+1)}</b> / ${pad(N)}</div></div>
 ${d.n===false?'':`<div class="sec"><div class="num" data-opt>${d.n||pad(P)}</div><div class="cat"><div class="zh">${d.zh}</div><div class="meta">${d.en}</div></div></div>`}
 <h1${d.n===false?' style="margin-top:96px"':''}><span data-opt>${d.title}</span></h1>${cmp}${shot}${d.bento?`<div class="bento">${d.bento.map(s=>`<div class="im"><img src="${s}"></div>`).join('')}</div>`:''}${d.grid?`<div class="grid6"${d.gridRatio?` style="--ar:${d.gridRatio}"`:''}>${d.grid.map(g=>`<div class="gi${g.hi?' hi':''}"><div class="cap meta">${g.n?`<b>${g.n}</b>`:''}${g.cap}</div><div class="im"><img src="${g.img}"></div></div>`).join('')}</div>`:''}
 <div class="lab meta"${d.n===false&&!cmp&&!shot&&!d.grid?' style="margin-top:104px"':''}><span class="zh">${lab[0]}</span><span>${lab[1]}</span></div>
 <div class="${d.dense?'dense':''}">${d.prompts.map(x=>{const o=typeof x==='string'?{t:x}:x;return `<div class="p"><span class="k${o.k?' n':''}">${o.k||'/'}</span><p>${o.t}</p></div>`}).join('')}</div>`;}
document.getElementById('pg').innerHTML=h;
const ready=Promise.all([...document.images].map(i=>i.complete?1:new Promise(r=>{i.onload=i.onerror=r})));
ready.then(()=>{
/* optical left alignment */
document.querySelectorAll('[data-opt]').forEach(el=>{const cs=getComputedStyle(el),c=document.createElement('canvas').getContext('2d');
 c.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;el.style.marginLeft=c.measureText([...el.textContent.trim()][0]).actualBoundingBoxLeft+'px';});
/* optical vertical centring of cover menu */
const c=document.createElement('canvas').getContext('2d');
const f=e=>{const cs=getComputedStyle(e);return `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`};
const mid=e=>{c.font=f(e);const m=c.measureText(e.textContent);return (m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2};
/* each span: move its ink centre onto its em-box centre (rows are align-items:center, line-height:1) */
document.querySelectorAll('.toc .r>span').forEach(e=>{c.font=f(e);const m=c.measureText(e.textContent);
 e.style.transform=`translateY(${((m.fontBoundingBoxDescent-m.fontBoundingBoxAscent)-(m.actualBoundingBoxDescent-m.actualBoundingBoxAscent))/2}px)`;});
/* background graphic: sliced sphere, bottom-right, very light */
(()=>{const dk=document.documentElement.classList.contains('dark');const cx=960,cy=1330,r=340,B=dk?'#2ED8AA':'#2F6BFF',K=dk?'#FFFFFF':'#14181F',S=12,HI=5;let o='';
 for(let i=1;i<=S;i++){const t=-Math.PI/2+Math.PI*i/(S+1),y=cy+r*Math.sin(t),rx=r*Math.cos(t),hi=i==HI;
  o+=`<ellipse cx="${cx}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(rx*.22).toFixed(1)}" fill="none" stroke="${hi?B:K}" stroke-opacity="${hi?(dk?.3:.2):(dk?.07:.065)}"/>`;}
 o+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${K}" stroke-opacity=".05"/>`;
 document.getElementById('gfx').innerHTML=`<svg width="1086" height="1448" style="position:absolute;inset:0"><g transform="rotate(-16 ${cx} ${cy})">${o}</g></svg>`;})();
/* QA */
const issues=[];const last=document.getElementById('pg').lastElementChild.getBoundingClientRect().bottom;
if(last>1448-80)issues.push('CONTENT_TOO_LONG:'+Math.round(last));
document.querySelectorAll('.mk').forEach((m,i)=>{if(m.scrollHeight>m.clientHeight+1)issues.push('MOCK_OVERFLOW:'+i)});
document.querySelectorAll('h1 span,.cv-t .ln').forEach(s=>{if(s.getBoundingClientRect().height>120||s.scrollWidth>s.clientWidth+1)issues.push('TITLE_WRAPS')});
if(document.getElementById('pg').scrollWidth>1086)issues.push('TOO_WIDE');
document.title=(issues.length?issues.join(' '):'OK')+' |bottom:'+Math.round(last);
});
</script></body></html>
```

### content.js（示例 1：浅色，第 1 期「AI 写 UI，总爱犯这 4 个毛病」，提示词页 + 插图）
```js
// 内容文件：只改这里。HTML 片段可用 <b> 加粗强调；before/after 为对比图插图（可省略，省略则不显示对比图）。
const M={
1:[`<div class="t b">创建账户</div><div class="t m">请在下方填写信息来创建你的账户</div>
 <div class="t b" style="margin-top:8px">邮箱 <span class="m" style="font-weight:400">· 在这里输入你的邮箱</span></div>
 <div class="inp" style="margin-top:8px"></div><div class="t m" style="margin-top:8px">我们会使用这个邮箱联系你</div>
 <div class="t m" style="margin-top:8px">点击下方按钮即可提交信息</div>
 <div class="btn t" style="margin-top:8px;color:#fff">点击这里提交</div>`,
 `<div class="t b">创建账户</div>
 <div class="t b" style="margin-top:24px">邮箱</div>
 <div class="inp" style="margin-top:8px;border-color:#E5484D"></div><div class="t" style="color:#E5484D;margin-top:8px">邮箱格式不正确</div>
 <div class="btn t" style="position:absolute;left:24px;right:24px;bottom:24px;color:#fff">提交</div>`],
2:[`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${['#F2A2B6','#9FD8B8','#F6C98B'].map(x=>`<div style="height:80px;border-radius:8px;background:${x};padding:16px"><div class="sk" style="width:60%;background:rgba(255,255,255,.7)"></div><div class="sk" style="width:40%;height:16px;margin-top:16px;background:rgba(255,255,255,.9)"></div></div>`).join('')}</div>
 <div style="display:flex;gap:8px;margin-top:24px">${['#B7A6F2','#7FD3E0','#F6C98B','#F2A2B6'].map(x=>`<div style="width:56px;height:24px;border-radius:12px;background:${x}"></div>`).join('')}</div>
 <div class="sk" style="width:90%;margin-top:24px"></div><div class="sk" style="width:70%;margin-top:8px"></div>
 <div class="btn t" style="position:absolute;left:24px;right:24px;bottom:24px;color:#fff;background:linear-gradient(90deg,#8E6CF0,#F06C9B)">提交</div>`,
 `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">${[['#2F6BFF','rgba(255,255,255,.55)','#fff'],['#E8EFFF','#C8D8FF','#2F6BFF'],['#F1F5FF','#D6E2FF','#7FA4FF']].map(([bg,l1,l2])=>`<div style="height:80px;border-radius:8px;background:${bg};padding:16px"><div class="sk" style="width:60%;background:${l1}"></div><div class="sk" style="width:40%;height:16px;margin-top:16px;background:${l2}"></div></div>`).join('')}</div>
 <div style="display:flex;gap:8px;margin-top:24px">${['#D6E2FF','#E8EFFF','#E8EFFF','#EEF0F4'].map(x=>`<div style="width:56px;height:24px;border-radius:12px;background:${x}"></div>`).join('')}</div>
 <div class="sk" style="width:90%;margin-top:24px;background:#DDE5F5"></div><div class="sk" style="width:70%;margin-top:8px"></div>
 <div class="btn t" style="position:absolute;left:24px;right:24px;bottom:24px;color:#fff">提交</div>`],
3:[[[33,0],[27,6],[23,2],[19,9],[17,3],[15,7],[13,1],[11,5]].map(([s,m])=>`<div class="row" style="margin-top:${m}px;line-height:1.2"><span style="font-size:${s}px;color:var(--sub)">界面文字</span><span class="meta">${s}px</span></div>`).join(''),
 [[28,500,'var(--ink)','页面标题'],[18,500,'var(--ink)','小节标题'],[18,400,'var(--sub)','正文内容'],[18,400,'var(--sub)','正文内容'],[14,400,'var(--mute)','辅助说明']].map(([s,w,c,x],k)=>`<div class="row" style="height:40px;align-items:center;${k?'border-top:1px dashed var(--line)':''}"><span style="font-size:${s}px;font-weight:${w};color:${c}">${x}</span><span class="meta">${s}px</span></div>`).join('')+
 `<div class="meta" style="position:absolute;left:24px;right:24px;bottom:24px;display:flex;justify-content:space-between;letter-spacing:.08em;color:var(--blue)"><span>3 SIZES</span><span>8 · 16 · 24</span></div>`],
4:[['#9FD8B8','#F6C98B','#B7A6F2'].map(c=>`<div style="height:64px;border-radius:20px;background:#fff;box-shadow:0 12px 24px -10px rgba(40,70,140,.3);margin-bottom:12px;display:flex;overflow:hidden"><div style="width:6px;background:${c}"></div><div style="padding:16px 20px;flex:1"><div class="sk skd" style="width:50%"></div><div class="sk" style="width:80%;margin-top:16px"></div></div></div>`).join(''),
 `<div style="border:1px solid var(--line);border-radius:8px;background:#fff">${[1,0,0].map((x,k)=>`<div style="height:72px;padding:20px;${k?'border-top:1px solid var(--line);':''}display:flex;gap:16px"><div style="flex:1"><div class="sk skd" style="width:50%"></div><div class="sk" style="width:76%;margin-top:16px"></div></div><div style="width:8px;height:8px;border-radius:50%;background:${x?'#E5484D':'#C9CFDA'}"></div></div>`).join('')}</div>
 <div style="position:absolute;right:48px;bottom:24px;width:168px;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 12px 32px -8px rgba(40,70,140,.28);padding:8px 0">${[1,0,0].map(x=>`<div style="padding:8px 16px;${x?'background:var(--blue-l)':''}"><div class="sk" style="width:${x?70:56}%;${x?'background:#C8D8FF':''}"></div></div>`).join('')}</div>`]};

window.CONTENT={
 header:'AI CODING / UI NOTES',
 brand:'FUTURE SLICE · 未来切片',
 promptLabel:'修改提示词',
 cover:{line1:'AI 写 UI',line2:['总爱犯这','4','个毛病'],subtitle:'附对应修改提示词'},
 cards:[
  {zh:'文案',en:'COPYWRITING',title:'什么都要解释一遍',before:M[1][0],after:M[1][1],prompts:['检查页面中的说明文字，删掉对标题、按钮和明显操作的<b>重复解释</b>。','保留必要的填写要求、错误提示、费用说明等信息，<b>尽量写得简短</b>。']},
  {zh:'配色',en:'COLOR',title:'颜色用得太杂',before:M[2][0],after:M[2][1],prompts:['整理页面中使用的颜色，<b>优先沿用已有品牌色</b>和配色规范。','如果还没有完整的配色方案，可以参考 Radix Colors，按背景、文字、边框和交互状态选择对应颜色。<b>同类元素尽量使用一致的配色。</b>']},
  {zh:'字号',en:'TYPE SCALE',title:'字号越写越多',before:M[3][0],after:M[3][1],prompts:['页面的主要字号尽量控制在 <b>3–4 种</b>，同一级内容使用相同字号。','需要区分主次时，可以调整<b>字重、文字颜色和间距</b>。正文要保证清楚好读，不要为了塞下更多内容把字缩得太小。']},
  {zh:'装饰',en:'DECORATION',title:'到处加圆角和阴影',before:M[4][0],after:M[4][1],prompts:['检查页面里的圆角、阴影，尤其是卡片左侧的彩色线条，<b>减少没有明确用途的装饰</b>。','同类组件使用<b>一致的圆角</b>。阴影可以用来区分弹窗、下拉菜单等浮层，不必给每张卡片都加。色条如果用于表示状态或分类，可以保留。']}
 ]};

```

### content.js（示例 2：深色，第 2 期「同一个网页，换 4 个设计 Skill」，截图测评页 + 纯文字页）
```js
window.CONTENT={
 theme:'dark',
 header:'AI CODING / UI NOTES', brand:'FUTURE SLICE · 未来切片',
 cover:{top:96,lines:[['同一个网页'],['换',{hi:'4'},'个设计 Skill'],['差别有多大？']],subtitle:'5 个版本 + 1 次组合，同一份需求'},
 toc:[{n:'01',t:'Baseline',m:'稳妥'},{n:'02',t:'Taste',m:'个性'},{n:'03',t:'Frontend Design',m:'克制'},{n:'04',t:'UI UX Pro Max',m:'精致'},{n:'05',t:'Impeccable',m:'创意'},{n:'06',t:'三个 Skill 组合',m:'组合'}],
 cards:[
  {n:false,zh:'测试',en:'SETUP',title:'同一份 Prompt',label:['测试条件','SETUP'],prompts:[
   '虚构 SaaS 产品 <b>KIVO</b>，制作官网首屏。',
   'React + Tailwind CSS，蓝色为主色调。',
   '固定标题、副标题和按钮，展示 AI、任务管理和团队协作。',
   '<b>不指定布局和风格</b>，让 Skill 自己发挥。',
   '对比的不只是好不好看，<b>还有设计思路</b>。']},
  {n:'01',zh:'稳妥',en:'SAFE',title:'Baseline',dense:1,shot:'img/baseline.png',label:['不使用任何 Skill','REVIEW'],prompts:[
   '<b>优点：</b>结构完整，信息清楚，比较稳妥。','<b>不足：</b>模板感明显，缺少自己的特点。']},
  {n:'02',zh:'个性',en:'BOLD',title:'Taste',dense:1,shot:'img/taste.png',label:['让 AI 跳出默认布局','REVIEW'],prompts:[
   '<b>优点：</b>视觉个性很强，不再是熟悉的 SaaS 模板。','<b>不足：</b>产品展示偏少，留白也比较激进。']},
  {n:'03',zh:'克制',en:'RESTRAINED',title:'Frontend Design',dense:1,shot:'img/frontend.png',label:['更克制，也更实用','REVIEW'],prompts:[
   '<b>优点：</b>易读、克制，适合实际商业项目。','<b>不足：</b>视觉记忆点相对弱一些。']},
  {n:'04',zh:'精致',en:'POLISHED',title:'UI UX Pro Max',dense:1,shot:'img/promax.png',label:['完成度很高，但有点眼熟','REVIEW'],prompts:[
   '<b>优点：</b>视觉统一，组件细节比较完整。','<b>不足：</b>依然没有跳出常见的 SaaS 模板。']},
  {n:'05',zh:'创意',en:'CONCEPTUAL',title:'Impeccable',dense:1,shot:'img/impeccable.png',label:['换一种表达方式','REVIEW'],prompts:[
   '<b>优点：</b>创意突出，和产品概念有联系。','<b>不足：</b>需要花点时间才能理解产品。']},
  {n:'06',zh:'组合',en:'COMBINED',title:'三个 Skill 组合',dense:1,shot:'img/combo.png',label:['分阶段：方向 → 规范 → 检查','REVIEW'],prompts:[
   '<b>优点：</b>既有 Taste 的个性，<b>也讲清了产品</b>。','<b>注意：</b>含人工调整，不能全归功于 Skill。']},
  {n:false,zh:'结论',en:'FINDINGS',title:'思路比细节更重要',grid:[
   {cap:'BASELINE',img:'img/baseline.png'},{cap:'TASTE',img:'img/taste.png'},{cap:'FRONTEND',img:'img/frontend.png'},
   {cap:'PRO MAX',img:'img/promax.png'},{cap:'IMPECCABLE',img:'img/impeccable.png'},{cap:'COMBINED',img:'img/combo.png'}],
   label:['对比之后','FINDINGS'],prompts:[
   'Baseline 和 UI UX Pro Max <b>结构几乎一样</b>；<br>Taste 和 Impeccable 改变的是 <b>AI 组织页面的方式</b>。',
   '只是一轮测试，但<b>设计思路的差异，比视觉细节更值得关注</b>。']},
  {n:false,zh:'建议',en:'WORKFLOW',title:'Skill 怎么组合？',label:['分阶段使用','WORKFLOW'],prompts:[
   '没必要全部装上，<b>更没必要一起调用</b>。',
   {k:'01',t:'<b>先确定方向：</b>用 Taste 探索布局，或让 Impeccable 提出视觉概念。'},
   {k:'02',t:'<b>再完善规范：</b>用 UI UX Pro Max 补充组件、交互和响应式。'},
   {k:'03',t:'<b>最后统一检查：</b>用 Impeccable 审查细节，不再推翻方向。'},
   '<b>Skill 不是越多越好，用对地方更重要。</b>']}
 ]};
```

### content.js（示例 3：浅色，第 3 期「让 AI 出图也有杂志感的 Skill」，推荐结构）
```js
window.CONTENT={
 header:'AI CODING / UI NOTES', brand:'FUTURE SLICE · 未来切片',
 cover:{style:'pick',top:128,lines:[['让 AI 出图也有'],['杂志感的 Skill']],url:'github.com/yanliudesign/',skill:'mono-color',
  subtitle:'作者 Dreameryanyan，附 Codex 直出效果',
  imgs:['img/bike.png','img/orange.png']},
 cards:[
  {zh:'功能',en:'WHAT IT DOES',title:'照片变成双色海报',cmpRatio:'3/4',caps:['ORIGINAL','MONO-COLOR'],
   beforeImg:'img/stairs_src.png',afterImg:'img/stairs.png',dense:1,
   label:['给它一张照片或一句话','OUTPUT'],prompts:[
   '<b>交付三样</b>：成品图、最终提示词、配色排版配方。',
   '<b>固定配方</b>：8 种单色、9 组双色、3 种纸。']},
  {zh:'安装',en:'INSTALL',title:'如何安装及使用',dense:1,shot:'img/install.png',label:['命令行，或者直接交给 AI','INSTALL'],prompts:[
   '<b>命令行</b>：克隆到你所用 Agent 的 skills 目录，重启生效。',
   '<b>更省事</b>：把仓库链接发给 AI，让它帮你装好。',
   '<b>需要能生图</b>：比如 Codex，装好就能直接出图。']},
  {zh:'实测',en:'RESULTS',title:'Codex 直出效果',dense:1,bento:['img/bike.png','img/stairs.png','img/orange.png','img/fern.png','img/coffee.png'],
   label:['同样 5 张照片，装上 Skill 直接出图','CODEX'],prompts:[
   '<b>优点：</b>敢放大、敢裁切，标题压在主体上，海报感很强。',
   '<b>注意：</b>主体会被重画，想保真要在提示词里写明。']}
 ]};
```

### install-card.html（命令卡片图，894×484，用 2 倍截图生成 `img/install.png`）
```html
<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:894px;height:484px;background:#fff;-webkit-font-smoothing:antialiased}
.w{padding:40px 40px}
.h{display:flex;justify-content:space-between;font:500 14px Inter;letter-spacing:.18em;color:#959CAA}
pre{margin-top:16px;font:400 23px/40px "DejaVu Sans Mono",monospace;color:#14181F;letter-spacing:-.01em}
pre .d{color:#2F6BFF}pre .c{color:#959CAA}
.ln{height:1px;background:rgba(20,24,31,.12);margin:28px 0 24px}
.p{margin-top:14px;font:400 25px/40px "Noto Sans CJK SC";color:#4A5160;letter-spacing:.02em}
.p b{color:#14181F;font-weight:500}
</style></head><body><div class="w">
<div class="h"><span>TERMINAL</span><span>01</span></div>
<pre><span class="d">$</span> git clone \
    https://github.com/yanliudesign/mono-color-skill.git
<span class="c"># 放进你所用 Agent 的 skills 目录</span></pre>
<div class="ln"></div>
<div class="h"><span>OR · ASK YOUR AI</span><span>02</span></div>
<div class="p">帮我安装这个 Skill：<b>github.com/yanliudesign/mono-color-skill</b></div>
<div class="ln"></div>
<div class="h"><span>PROMPT · EXAMPLE</span><span>03</span></div>
<div class="p">用 <b>mono-color</b> 把这张照片做成双色网点海报，保留主体和构图。</div>
</div></body></html>
```

### render.js
```js
// 用法: node render.js <输出目录>   (需要 playwright；在 card.html 同目录运行)
// 每张卡片渲染两层：bg（背景+图形）与 fg（文字与卡片，透明底），再由 composite.py 合成并只给背景加纸感噪点。
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const out=process.argv[2]||'out';fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1086,height:1448},deviceScaleFactor:2});
 const url=q=>'file://'+path.resolve(__dirname,'card.html')+'?'+q;
 await p.goto(url('p=0'));const n=await p.evaluate(()=>window.CONTENT.cards.length+1);
 for(let i=0;i<n;i++){
  await p.goto(url('p='+i));await p.waitForTimeout(600);console.log('card',i+1,await p.title());
  for(const L of ['bg','fg']){await p.goto(url(`p=${i}&layer=${L}`));await p.waitForTimeout(300);
   await p.screenshot({path:path.join(out,`_L${i}_${L}.png`),omitBackground:L==='fg'});}}
 await b.close();})();

```

### composite.py
```python
# 用法: python3 composite.py <输出目录>  —— 合成两层，噪点只加在背景上（零均值，不会让画面变暗）
import sys,glob,os,numpy as np
from PIL import Image
out=sys.argv[1] if len(sys.argv)>1 else 'out';rng=np.random.default_rng(1)
n=len(glob.glob(os.path.join(out,'_L*_bg.png')))
for i in range(n):
    bg=np.asarray(Image.open(f'{out}/_L{i}_bg.png').convert('RGB')).astype(np.float32)
    bg=np.clip(bg+rng.normal(0,5,bg.shape[:2])[...,None],0,255)
    fg=np.asarray(Image.open(f'{out}/_L{i}_fg.png').convert('RGBA')).astype(np.float32)
    a=fg[...,3:]/255;img=fg[...,:3]*a+bg*(1-a)
    Image.fromarray(img.round().astype(np.uint8)).save(f'{out}/card_{i+1:02d}.png')
    os.remove(f'{out}/_L{i}_bg.png');os.remove(f'{out}/_L{i}_fg.png')
print('done',n)

```

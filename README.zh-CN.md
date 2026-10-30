# xhs-ai-notes

[English](README.md) | **简体中文**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Type](https://img.shields.io/badge/type-Agent%20Skill-blueviolet)](https://agentskills.io/specification)
![Hosts](https://img.shields.io/badge/hosts-Codex%20%7C%20Claude%20Code-black)

一个把 AI 相关主题做成**可直接发布的小红书图文投稿**的 Agent Skill：1 张封面 + 3–9 张 3:4 内页、投稿标题与正文、置顶评论（全部提示词的文字版）。

杂志 / UI 笔记风——克制的排版、讲证据的文案、切片球体纹样，**浅色与深色两套完整模板**。由「未来切片 FUTURE SLICE」制作并在日常投稿中使用。

## 每期产出什么

| 页面类型 | 版式 | 典型用途 |
| --- | --- | --- |
| **提示词页** | 大编号 + 标题 + BEFORE / AFTER 插图 + 1–2 段可直接复制的提示词 | 「AI 写 UI，总爱犯这 4 个毛病」 |
| **截图测评页** | 整宽截图 + 一行关键词说明 + 优点 / 不足 | 同一任务下对比工具或 Skill |
| **纯文字页** | 01 / 02 / 03 编号段落，无插图 | 测试条件、结论、工作流 |
| **推荐版封面** | 链接输入框主视觉 + 2–4 张 3:4 作品图 | 推荐单个工具 / Skill |

每次运行同时写好**投稿标题（≤ 20 字）**、结构化的**投稿正文**和带完整提示词的**置顶评论**——图片和文案一起交付。

## 一期的工作流

1. 确认主题、页数和你提供的截图；选择浅色或深色模板（截图偏浅、需要拉开对比时用深色）。
2. Skill 按严格文案规则起草各页内容（内页标题 ≤ 8 字且必须一行、提示词每段 20–70 字、不用 emoji、语气克制），先请你确认再画图。
3. BEFORE / AFTER 对比图用一组「UI 积木」拼装，只表现**改了什么**，不做无来由的装饰。
4. 全部内容写入一个 `content.js` 数据文件；模板（`card.html` / `render.js` / `composite.py`）从 `template/` 复制。
5. 渲染、合成、交付。

```bash
cd xhs-ai-notes/template
node render.js out && python3 composite.py out
```

产出：`card_01.png …`（**2172 × 2896**，即 3:4 的 2 倍图）+ 投稿文案。

## 内建质检

`render.js` 逐页打印检查结果，全部为 `OK` 才放行：

| 代码 | 含义 | 处理 |
| --- | --- | --- |
| `CONTENT_TOO_LONG` | 内容超出下边距 | 精简提示词 |
| `MOCK_OVERFLOW` | 插图内容溢出画框 | 压缩插图 |
| `TITLE_WRAPS` | 标题没排进一行 | 缩短标题 |
| `TOO_WIDE` | 出现横向溢出 | 收窄内容 |

自动检查之后，Skill 还被要求**亲眼看每一张图**（对齐、留白、有无截断）再交付。

## 仓库结构

```
xhs-ai-notes/            ← 技能本体（复制这个文件夹）
├── SKILL.md              设计规范、文案规则、content.js 字段、完整模板源码
├── template/             card.html · render.js · composite.py · content.js · fonts/
└── examples/             深色测评期 · 推荐结构期 · 安装卡片模板
```

## 安装

- **最省事**——对 AI 说：*帮我安装这个 Skill：`github.com/ghosthlh/xhs-ai-notes`*
- **Claude Code**——把 `xhs-ai-notes/` 文件夹放进 `~/.claude/skills/`
- **其他 Agent**——加载 `xhs-ai-notes/SKILL.md`

## 渲染环境

- **Node.js** + Playwright（Chromium）
- **Python 3** + numpy + Pillow
- **字体**：Inter 与思源黑体 / Noto Sans CJK SC；大编号另需 *Fraunces Italic*（可变字体，[SIL OFL 1.1](https://fonts.google.com/specimen/Fraunces/license)）——放到 `template/fonts/FrauncesItalic.ttf`，系统已装 Fraunces 时可省略。字体缺失时 Skill 会向你索要字体文件，不用别的字体顶替。

## 设计规范（摘要）

- 画布 1086 × 1448 CSS px，2 倍导出；页边距 96 / 48 / 80。
- 只用 **2 种字体**（Inter + Noto Sans CJK SC）、**4 档字号**（20 / 32 / 80 / 200）外加 96 的封面标题、**4 种文字颜色**（墨 / 正文灰 / 辅助灰 / 点缀蓝 #2F6BFF；深色模板换成薄荷青 #2ED8AA）。
- 间距限定 8 / 16 / 24 / 32 / 48；线条统一 1 px、12% 不透明度。
- 大编号与封面目录编号用 Fraunces 斜体，渐隐填充 + 1 px 描边在同一层文字上完成，不做两层叠加。
- 纸感噪点只加在背景层（`composite.py` 合成时处理），文字与白卡保持干净。

完整规范——含 `content.js` 字段参考、插图积木和整套模板源码——见 [`xhs-ai-notes/SKILL.md`](xhs-ai-notes/SKILL.md)。

## 新增风格

新风格是 `card.html` 里的一个主题（参照 `html.dark` 那组 CSS 写法），在 `content.js` 用 `theme` 切换，并在 SKILL.md 增加一节「模板：××」说明配色与适用场景。工作流、文案规则和脚本全部共用。只有工作流完全不同时（例如做视频）才另建技能。

## 许可

- 代码与文档：**MIT**，见 [`LICENSE`](LICENSE)
- Fraunces 字体：**SIL Open Font License 1.1**，见 `xhs-ai-notes/template/fonts/OFL.txt`
- 「FUTURE SLICE / 未来切片」是作者品牌，仅作示例数据——自用时请在 `content.js` 的 `brand` 换成你自己的名字。

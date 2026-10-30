# xhs-ai-notes

把 AI 相关主题做成一组小红书图文（3:4 卡片 + 投稿文案 + 置顶评论）的 Skill。杂志 / UI 风格，有浅色与深色两套模板，适合 AI 编程、提示词、工具测评和 Skill 推荐。

由「未来切片 FUTURE SLICE」制作并在日常投稿中使用。

## 目录

- `xhs-ai-notes/SKILL.md`：技能说明（设计规范、文案规则、content.js 字段、完整模板代码）
- `xhs-ai-notes/template/`：card.html、content.js、render.js、composite.py、fonts/
- `xhs-ai-notes/examples/`：深色测评、推荐结构、安装卡片模板

## 安装

- 直接对你的 AI 说：帮我安装这个 Skill：`github.com/ghosthlh/xhs-ai-notes`
- Claude Code：把 `xhs-ai-notes/` 文件夹放到 `~/.claude/skills/`
- 其他 Agent：加载 `xhs-ai-notes/SKILL.md`

## 渲染

需要 Node + Playwright（Chromium）、Python + numpy + Pillow，以及 Inter、思源黑体 / Noto Sans CJK SC 字体。

```bash
cd xhs-ai-notes/template
node render.js out && python3 composite.py out
```

## 许可

- 代码与文档：MIT，见 `LICENSE`
- 字体 Fraunces：SIL Open Font License 1.1，见 `xhs-ai-notes/template/fonts/OFL.txt`
- 「未来切片 / FUTURE SLICE」品牌名仅作示例，自用时请在 `content.js` 的 `brand` 换成你自己的

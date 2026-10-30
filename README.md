# xhs-ai-notes

小红书 AI 图文投稿 Skill（未来切片 / FUTURE SLICE 私用）。

- `xhs-ai-notes/SKILL.md`：技能说明（设计规范、文案规则、content.js 字段、完整模板代码）
- `xhs-ai-notes/template/`：card.html、content.js、render.js、composite.py、fonts/
- `xhs-ai-notes/examples/`：第 2 期深色测评、第 3 期推荐结构、安装卡片模板

## 使用
- Claude Code：把 `xhs-ai-notes/` 放到 `~/.claude/skills/`
- 其他 Agent：加载 `xhs-ai-notes/SKILL.md`
- 渲染：在 template 目录 `node render.js out && python3 composite.py out`

字体 Fraunces 为 SIL OFL 开源协议。

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

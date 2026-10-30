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

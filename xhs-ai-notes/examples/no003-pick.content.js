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

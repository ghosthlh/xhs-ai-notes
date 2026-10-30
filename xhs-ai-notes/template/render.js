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

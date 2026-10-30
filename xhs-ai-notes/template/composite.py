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

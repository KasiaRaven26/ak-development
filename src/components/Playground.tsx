import { playgroundMessages } from './playgroundMessages';
import { useEffect, useRef, useState } from 'react';

const palettes = [
 { name: 'Stardust', colors: ['#a6b8ff', '#f7f5ef', '#d6a6ff'] },
 { name: 'Candy', colors: ['#b5daf5', '#f5a9cb', '#c9b6ff'] },
 { name: 'Sunset', colors: ['#ffb56b', '#ff7869', '#ffe6ac'] },
];
const random = (i:number) => {const n=Math.sin(i*127.1+311.7)*43758.5453;return n-Math.floor(n)};

export default function Playground({paused}:{paused:boolean}) {
 const canvas=useRef<HTMLCanvasElement>(null);
 const energy=4;
 const [palette,setPalette]=useState(0);
 const clock=useRef(0);
 const [touchMessage,setTouchMessage]=useState(-1);
 const [touchPosition,setTouchPosition]=useState({x:50,y:50});
 useEffect(()=>{
  const el=canvas.current!,ctx=el.getContext('2d');if(!ctx)return;
  let w=1,h=1,last=0,raf=0;
  let pointer:{x:number;y:number}|null=null;
  const colors=palettes[palette].colors;
  const draw=(dt:number)=>{
   clock.current+=dt*.000025*energy;
   const time=clock.current;
   const shiftX=Math.sin(time*.35)*.6;
   const shiftY=Math.cos(time*.3)*.4;
   el.parentElement?.style.setProperty('--nebula-x',`${shiftX}%`);
   el.parentElement?.style.setProperty('--nebula-y',`${shiftY}%`);
   el.parentElement?.style.setProperty('--nebula-scale',`${1.08+Math.sin(time*.25)*.008}`);
   ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
   ctx.clearRect(0,0,w,h);
   // The detailed nebula is a static image; only this sparse star layer animates.
   for(let i=0;i<90;i++){
    let x=(random(i+18000)*w+Math.sin(time+i)*16),y=random(i+19000)*h;
    if(pointer){const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy);if(d>0&&d<100){x+=dx/d*(100-d)*.2;y+=dy/d*(100-d)*.2}}
    const alpha=.25+.75*(.5+.5*Math.sin(time*5+i));
    ctx.globalAlpha=alpha;ctx.fillStyle=colors[i%3];
    const size=i%11===0?3:1.5;ctx.fillRect(x,y,size,size);
    if(i%11===0){ctx.globalAlpha=alpha*.4;ctx.fillRect(x-4,y+.5,10,1);ctx.fillRect(x+.5,y-4,1,10)}
   }
   ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  };
  const resize=()=>{const rect=el.getBoundingClientRect();w=rect.width;h=rect.height;const d=Math.min(devicePixelRatio||1,1.5);el.width=w*d;el.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw(0)};
  const observer=new ResizeObserver(resize);observer.observe(el);
  const move=(event:PointerEvent)=>{
   const rect=el.getBoundingClientRect();pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};
   if(paused)draw(0);
  };

  const leave=()=>{pointer=null;if(paused)draw(0)};
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
  let inView=false;
  const frame=(t:number)=>{
   raf=0;
   if(paused||!inView||document.hidden)return;
   if(!last||t-last>=1000/30){const dt=last?Math.min(t-last,80):0;last=t;draw(dt)}
   raf=requestAnimationFrame(frame);
  };
  const sync=()=>{
   cancelAnimationFrame(raf);raf=0;last=0;
   if(!paused&&inView&&!document.hidden)raf=requestAnimationFrame(frame);
  };
  const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync()});
  visibility.observe(el);
  document.addEventListener('visibilitychange',sync);
  return ()=>{cancelAnimationFrame(raf);observer.disconnect();visibility.disconnect();document.removeEventListener('visibilitychange',sync);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave)};
 },[energy,paused,palette]);
 return <section id="play" className="section play">
  <div className="section-top"><h2>A little room to play.</h2><span className="small">03 / Interaction lab</span></div>
  <div className="play-intro"><p>A small universe, at your fingertips.<br/><span className="play-hint-desktop">Hover over the universe. Discover a little inspiration.</span><span className="play-hint-touch">Tap to discover a little inspiration.</span></p></div>
  <div className="play-toolbar"><div className="palette-controls" role="group" aria-label="Galaxy color palette"><span className="palette-label">Palette</span>{palettes.map((p,i)=><button type="button" key={p.name} className={`palette-option${palette===i?' active':''}`} aria-pressed={palette===i} aria-label={`${p.name} palette`} title={p.name} onClick={()=>setPalette(i)}>{p.colors.map(color=><span key={color} style={{backgroundColor:color}}/>)}</button>)}</div></div>
  <div className={`canvas-wrap galaxy-wrap nebula-wrap nebula-palette-${palette}`}><canvas ref={canvas} aria-label="Colorful nebula with twinkling stars. Hover to discover messages, Change the colors using the palette above."/><button type="button" className="nebula-touch-target" aria-label="Discover the next message" onClick={event=>{
   const rect=event.currentTarget.getBoundingClientRect();
   const keyboard=event.detail===0;
   setTouchPosition({x:keyboard?50:Math.min(rect.width-66,Math.max(66,event.clientX-rect.left))/rect.width*100,y:keyboard?50:Math.min(rect.height-76,Math.max(66,event.clientY-rect.top))/rect.height*100});
   setTouchMessage(previous=>(previous+1)%playgroundMessages.length);
  }}>{touchMessage>=0&&<span key={touchMessage} className="nebula-touch-ball" style={{left:`${touchPosition.x}%`,top:`${touchPosition.y}%`}}>{playgroundMessages[touchMessage]}</span>}</button><span className="sr-play-message" role="status">{touchMessage>=0?playgroundMessages[touchMessage]:''}</span><span className="canvas-caption">A LITTLE SPACE. ENDLESS POSSIBILITIES.</span><span className="galaxy-note" aria-hidden="true">EXPLORE THE UNEXPECTED</span></div>
 </section>;
}

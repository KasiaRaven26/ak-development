import { useEffect, useRef, useState } from 'react';
type Mode = 'orbit' | 'wave' | 'scatter';
export default function Playground({paused}:{paused:boolean}) {
 const canvas=useRef<HTMLCanvasElement>(null);
 const [mode,setMode]=useState<Mode>('orbit');
 const [energy,setEnergy]=useState(4);
 useEffect(()=>{
  const el=canvas.current!,ctx=el.getContext('2d');if(!ctx)return;
  let w=1,h=1,time=0,last=0,raf=0;
  let pointer={x:-1000,y:-1000};
  const draw=(dt:number)=>{
   time+=dt*.00015*energy;ctx.clearRect(0,0,w,h);
   for(let i=0;i<70;i++){
    const a=i/70*Math.PI*2,r=80+(i%5)*15;
    let x:number,y:number;
    if(mode==='orbit'){x=w/2+Math.cos(a+time)*r*Math.min(1.8,w/340);y=h/2+Math.sin(a+time)*r*.85}
    else if(mode==='wave'){x=i/69*w;y=h/2+Math.sin(i*.17+time*2)*70+Math.cos(i*.4-time)*20}
    else{x=(Math.sin(i*127.1)*.5+.5)*w+Math.sin(time+i)*18;y=(Math.cos(i*37.7)*.5+.5)*h+Math.cos(time+i)*18}
    const dx=x-pointer.x,dy=y-pointer.y,d=Math.hypot(dx,dy);
    if(d<110&&d>0){x+=dx/d*(110-d)*.6;y+=dy/d*(110-d)*.6}
    ctx.beginPath();ctx.arc(x,y,i%7===0?9:3+i%3,0,Math.PI*2);
    ctx.fillStyle=i%4===0?'#f5bdb5':i%3===0?'#f7f5ef':'#d6fa45';ctx.fill();
   }
  };
  const resize=()=>{const r=el.getBoundingClientRect();w=r.width;h=r.height;const d=Math.min(devicePixelRatio||1,2);el.width=w*d;el.height=h*d;ctx.setTransform(d,0,0,d,0,0);draw(0)};
  const ro=new ResizeObserver(resize);ro.observe(el);
  const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();pointer={x:e.clientX-r.left,y:e.clientY-r.top};if(paused)draw(0)};
  const leave=()=>{pointer={x:-1000,y:-1000};if(paused)draw(0)};
  el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
  const frame=(t:number)=>{const dt=Math.min(t-last,40);last=t;draw(dt);raf=requestAnimationFrame(frame)};
  if(!paused)raf=requestAnimationFrame(frame);
  return ()=>{cancelAnimationFrame(raf);ro.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave)};
 },[mode,energy,paused]);
 return <section id="play" className="section play"><div className="section-top"><h2>A little room to play.</h2><span className="small">03 / Interaction lab</span></div><div className="play-intro"><p>Move your cursor. Change the rhythm.<br/>Because a website should invite you in.</p><div className="play-controls">{(['orbit','wave','scatter'] as Mode[]).map(m=><button key={m} className={m===mode?'active':''} aria-pressed={m===mode} onClick={()=>setMode(m)}>{m[0].toUpperCase()+m.slice(1)}</button>)}<label htmlFor="energy">Energy</label><input id="energy" type="range" min="1" max="10" value={energy} onChange={e=>setEnergy(+e.target.value)}/></div></div><div className="canvas-wrap"><canvas ref={canvas} aria-label="Interactive particle animation controlled by the buttons above"/><span className="canvas-caption">SMALL EXPERIMENTS. ENDLESS POSSIBILITIES.</span></div></section>;
}

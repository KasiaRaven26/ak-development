import { useEffect, useRef, useState } from 'react';

export default function Typewriter({text,delay=0,pace=.09,pauseAfter=Infinity,pauseDuration=0,startOnView=false}:{text:string;delay?:number;pace?:number;pauseAfter?:number;pauseDuration?:number;startOnView?:boolean}) {
 const ref=useRef<HTMLSpanElement>(null);
 const [started,setStarted]=useState(!startOnView);
 const [count,setCount]=useState(0);
 useEffect(()=>{
  if(!startOnView||!ref.current) return;
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){setStarted(true);observer.disconnect();}
  },{threshold:.5});
  observer.observe(ref.current);
  return ()=>observer.disconnect();
 },[startOnView]);
 useEffect(()=>{
  if(!started) return;
  setCount(0);
  let timer:ReturnType<typeof setTimeout>;
  let next=0;
  function type(){
   next++;
   setCount(next);
   if(next<text.length) timer=setTimeout(type,(pace+(next===pauseAfter?pauseDuration:0))*1000);
  }
  timer=setTimeout(type,delay*1000);
  return ()=>clearTimeout(timer);
 },[started,text,delay,pace,pauseAfter,pauseDuration]);
 return <span ref={ref} className="typewriter" aria-label={text}><span className="typewriter-full" aria-hidden="true">{text}</span><span className="typewriter-typed" aria-hidden="true">{text.slice(0,count)}</span></span>;
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import CursorFollower from './components/CursorFollower';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Playground from './components/Playground';
import Contact from './components/Contact';
import Typewriter from './components/Typewriter';
import ProjectDialog from './components/ProjectDialog';
gsap.registerPlugin(ScrollTrigger);
export default function App(){
 const root=useRef<HTMLDivElement>(null);
 const [paused,setPaused]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [selected,setSelected]=useState<'odda'|'indigo'|null>(null);
 useEffect(()=>{
  const query=matchMedia('(prefers-reduced-motion: reduce)');
  const change=()=>setPaused(query.matches);query.addEventListener('change',change);
  return ()=>query.removeEventListener('change',change);
 },[]);
 useEffect(()=>{
  const context=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>('.reveal').forEach(el=>{
    if(paused)gsap.set(el,{opacity:1,y:0});
    else gsap.fromTo(el,{opacity:0,y:30},{opacity:1,y:0,duration:.8,scrollTrigger:{trigger:el,start:'top 93%',once:true}});
   });
  },root);
  return ()=>context.revert();
 },[paused]);
 return <div ref={root} className={paused?'no-motion':''}><div className="intro-screen" aria-hidden="true"><div className="intro-wordmark"><span>AK</span><span><Typewriter text="Development" delay={.4} pace={.13}/></span></div></div><CursorFollower paused={paused}/><Header/><main><Hero/><div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({length:2},(_,i)=><span key={i}>Creative development &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp; Independent thinking &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp; Digital experiences &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp; A little unexpected &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp; Made with care &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp; Hard to ignore &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp; Good code, big feeling &nbsp; <svg className="ticker-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/></svg> &nbsp;</span>)}</div></div><Work onSelect={setSelected}/><About/><Playground paused={paused}/><Contact paused={paused} onToggle={()=>setPaused(p=>!p)}/></main><ProjectDialog selected={selected} onClose={()=>setSelected(null)}/></div>;
}

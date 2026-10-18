import { playgroundMessages } from './playgroundMessages';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function CursorFollower({ paused }: { paused: boolean }) {
 const dot = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const el = dot.current;
  if (!el || paused) return;
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let x = 0, y = 0, targetX = 0, targetY = 0;
  let visible = false, frame = 0, previousTime = 0;
  const draw = (time: number) => {
   const factor = 1 - Math.exp(-Math.min(time - previousTime, 64) / 65);
   previousTime = time;
   x += (targetX - x) * factor;
   y += (targetY - y) * factor;
   el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
   if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1) {
    frame = requestAnimationFrame(draw);
   } else {
    frame = 0;
   }
  };
  const hide = () => {
   visible = false;
   el.classList.remove('is-visible', 'is-interactive', 'is-galaxy');
   cancelAnimationFrame(frame);
   frame = 0;
  };
  const move = (event: PointerEvent) => {
   if (!pointer.matches || event.pointerType !== 'mouse') { hide(); return; }
   targetX = event.clientX;
   targetY = event.clientY;
   if (!visible) {
    x = targetX; y = targetY;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    visible = true;
    el.classList.add('is-visible');
   }
   if (!frame) {
    previousTime = performance.now();
    frame = requestAnimationFrame(draw);
   }
   const galaxy=event.target instanceof Element?event.target.closest('.nebula-wrap'):null;
   el.classList.toggle('is-galaxy',!!galaxy);
   const label=el.querySelector<HTMLElement>('.cursor-message');
   if(label){
    const messages=playgroundMessages;
    const next=galaxy?messages[Math.min(2,Math.max(0,Math.floor((event.clientX-galaxy.getBoundingClientRect().left)/galaxy.getBoundingClientRect().width*3)))]:'';
    if(label.textContent!==next){label.textContent=next;label.getAnimations().forEach(animation=>animation.cancel());if(next)label.animate([{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:220})}
   }
   el.classList.toggle('is-interactive', event.target instanceof Element && !!event.target.closest('a, button, input, select, textarea, [role="button"]'));
  };
  const visibility = () => { if (document.hidden) hide(); };
  document.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
  window.addEventListener('blur', hide);
  document.addEventListener('visibilitychange', visibility);
  pointer.addEventListener('change', hide);
  return () => {
   hide();
   document.removeEventListener('pointermove', move);
   document.documentElement.removeEventListener('pointerleave', hide);
   window.removeEventListener('blur', hide);
   document.removeEventListener('visibilitychange', visibility);
   pointer.removeEventListener('change', hide);
  };
 }, [paused]);
 return createPortal(<div ref={dot} className="cursor-follower" aria-hidden="true"><span className="cursor-ball"><span className="cursor-message" /></span></div>, document.body);
}

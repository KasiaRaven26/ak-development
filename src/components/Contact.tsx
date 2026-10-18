import { useState, type FormEvent } from 'react';

export default function Contact({paused,onToggle}:{paused:boolean;onToggle:()=>void}) {
 const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 async function submit(event:FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if(status==='sending') return;
  const form=event.currentTarget;
  const data=Object.fromEntries(new FormData(form));
  setStatus('sending');
  try {
   const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(15000)});
   if(!response.ok) throw new Error('Send failed');
   setStatus('success');
   form.reset();
  } catch { setStatus('error'); }
 }
 return <section id="contact" className="section contact">
  <div className="eyebrow"><span>04 / What's next?</span><span>Good things start with a conversation</span></div>
  <h2>Let's make<br/>some feeling.</h2>
  <div className="contact-layout">
   <div className="contact-intro"><h3>Have something in mind?</h3><p>Tell me a little about your project.<br/>I'd love to hear what you're thinking.</p><a className="contact-email" href="mailto:hello@akdevelopment.co.uk">hello@akdevelopment.co.uk</a></div>
   <form className="contact-form" onSubmit={submit} aria-busy={status==='sending'}>
    <div className="contact-fields">
     <label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="What should I call you?" /></label>
     <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
    </div>
    <label>What's the idea?<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="A new website, a fresh perspective, or something a little unexpected…" /></label>
    <div className="contact-trap" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className="contact-submit" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send message'}<span aria-hidden="true">↗</span></button>
    <div className="contact-status" role="status" aria-live="polite">{status==='success'&&"Thanks! Your message is on its way. I'll be in touch."}{status==='error'&&"Your message couldn't be sent. Please try again in a moment."}</div>
   </form>
  </div>
  <footer className="footer"><span>© 2026 AK</span><div className="footer-links"><button className="motion" aria-pressed={paused} onClick={onToggle}>{paused?'Resume motion':'Pause motion'}</button><a href="#">Back to top ↑</a></div></footer>
 </section>;
}

export default async function handler(req, res) {
 res.setHeader('Cache-Control', 'no-store');
 if (req.method !== 'POST') {
  res.setHeader('Allow', 'POST');
  return res.status(405).json({error:'Method not allowed'});
 }
 let body;
 try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
 catch { return res.status(400).json({error:'Invalid request'}); }
 if (!body || typeof body !== 'object') return res.status(400).json({error:'Invalid request'});
 if (body.website) return res.status(200).json({ok:true});
 const {name,email,message}=body;
 if (typeof name!=='string'||!name.trim()||name.length>100||typeof email!=='string'||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof message!=='string'||message.trim().length<10||message.length>5000) {
  return res.status(400).json({error:'Please check your details'});
 }
 const {RESEND_API_KEY,CONTACT_FROM}=process.env;
 const CONTACT_TO=process.env.CONTACT_TO||'hello@akdevelopment.co.uk';
 if (!RESEND_API_KEY||!CONTACT_FROM||!CONTACT_TO) return res.status(503).json({error:'Contact service unavailable'});
 try {
  const response=await fetch('https://api.resend.com/emails',{
   method:'POST',
   headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
   body:JSON.stringify({from:CONTACT_FROM,to:[CONTACT_TO],reply_to:email,subject:'New portfolio enquiry',text:`Name: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}`}),
   signal:AbortSignal.timeout(10000)
  });
  if(!response.ok) return res.status(502).json({error:'Unable to send message'});
  return res.status(200).json({ok:true});
 } catch { return res.status(502).json({error:'Unable to send message'}); }
}

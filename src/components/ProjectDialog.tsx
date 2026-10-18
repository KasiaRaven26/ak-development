import Arrow from './Arrow';
import { useEffect, useRef } from 'react';
const projects={
 odda:{title:'Odda Care',description:'A website for a UK care technology startup, bringing together the service, sensor technology, pricing and an assessment booking journey.',tags:'React Router · Responsive development · Booking integration',url:null,link:null},
 indigo:{title:'Indigo',description:'A digital presence for real estate in Greece. A sense of place, clear information and an inviting visual experience.',tags:'Real estate · Greece · Web development',url:'https://indigo-consulting.gr',link:'Visit Indigo'}
};
export default function ProjectDialog({selected,onClose}:{selected:keyof typeof projects|null;onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(selected)ref.current?.showModal();else ref.current?.close()},[selected]);
 const project=selected?projects[selected]:null;
 return <dialog ref={ref} onClose={onClose} aria-labelledby="project-title" onClick={e=>{if(e.target===ref.current)onClose()}}><div className="dialog-body"><button className="close" aria-label="Close project" onClick={onClose}>×</button><span className="small">Selected project</span><h2 id="project-title">{project?.title}</h2><p>{project?.description}</p><p className="dialog-tags">{project?.tags}</p>{project?.url && <a className="dialog-link" href={project.url} target="_blank" rel="noopener noreferrer">{project.link} <Arrow/></a>}</div></dialog>;
}

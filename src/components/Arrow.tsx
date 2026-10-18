export default function Arrow({direction='diagonal'}:{direction?:'diagonal'|'down'|'up'}) {
 const path=direction==='down'?'M12 4v16m-6-6 6 6 6-6':direction==='up'?'M12 20V4m-6 6 6-6 6 6':'M5 19 19 5M5 5h14v14';
 return <svg className="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={path}/></svg>;
}

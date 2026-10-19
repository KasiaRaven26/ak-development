import { useEffect, useRef, useState } from "react";


export default function OddaNotifications() {
  const [started, setStarted] = useState(false);
  const [phoneProgress, setPhoneProgress] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) setImageReady(true);
  }, []);

  useEffect(() => {
    if (!imageReady || started) return;

    let frame: number | undefined;
    const updateProgress = () => {
      frame = undefined;
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewportHeight * 0.9 - top) / (viewportHeight * 0.35)));
      setPhoneProgress(progress);
      if (progress === 1) setStarted(true);
    };
    const scheduleUpdate = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [imageReady, started]);

  return (
    <div className="w-full max-w-[860px]">
      <div ref={containerRef} className="odda-notifications relative" data-started={started}>
        <img ref={imageRef} onLoad={() => setImageReady(true)} src="/images/case-studies/alert1.png" alt="Odda View home screen showing daily activity" loading="lazy" width="1382" height="1138" className="odda-notification-phone block h-auto w-full" style={{ opacity: phoneProgress, transform: `translateY(${18 * (1 - phoneProgress)}px) scale(${0.985 + 0.015 * phoneProgress})` }} />
        <svg aria-hidden="true" viewBox="0 0 1382 1138" className="odda-notification-connectors absolute inset-0 h-full w-full pointer-events-none" fill="none">
          <circle className="odda-phone-nav-pulse" cx="787" cy="960" r="30" stroke="#315F4B" strokeWidth="2" fill="#315F4B" fillOpacity="0.08" opacity="0" />
          <g className="odda-notification-connector odda-notification-connector-routine">
            <path pathLength="1" d="M705 370 H735 Q747 370 747 382 V458 Q747 470 759 470 H805" />
            <circle cx="805" cy="470" r="3" />
          </g>
          <g className="odda-notification-connector odda-notification-connector-door">
            <path pathLength="1" d="M705 672 H735 Q747 672 747 660 V642 Q747 630 759 630 H1165" />
            <circle cx="1165" cy="630" r="3" />
          </g>
        </svg>
        <div className="odda-notification odda-notification-routine">
          <img src="/images/case-studies/odda-logo-transparent.png" alt="" className="odda-notification-icon object-contain" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2"><span className="font-semibold">ODDA</span><span className="odda-notification-time">now</span></div>
            <p className="odda-notification-copy">Mum’s morning routine looks normal.</p>
          </div>
        </div>
        <div className="odda-notification odda-notification-door">
          <span className="odda-notification-icon flex items-center justify-center rounded-full bg-[#FEE2E2] text-[#B42318]"><svg width="50%" height="50%" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM9 20a3 3 0 0 0 6 0Z" /></svg></span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2"><span className="font-semibold">ODDA</span><span className="odda-notification-time">28m ago</span></div>
            <p className="odda-notification-copy">Front door left open for 15 minutes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

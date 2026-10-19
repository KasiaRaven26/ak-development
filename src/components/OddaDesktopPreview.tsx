import { useId } from "react";

const ink = "#000000";
const green = "#315F4B";

export default function OddaDesktopPreview({ image, alt, className }: { image: string; alt: string; className: string }) {
  const clip = useId();
  const text = (x: number, y: number, value: string, size = 17, weight = 400, fill = ink) => <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill}>{value}</text>;
  const card = (x: number, y: number, width: number, height: number) => <rect x={x} y={y} width={width} height={height} rx="14" fill="#FFFFFF" stroke="#E1E7DF" />;
  return (
    <div className={className}>
      <div className="odda-desktop-screen">
        <img src={image} alt={alt} loading="lazy" className="odda-desktop-base" />
        <svg viewBox="0 0 1586 992" aria-hidden="true" className="odda-desktop-interface" preserveAspectRatio="xMidYMid meet">
          <defs><clipPath id={clip}><rect x="163" y="60" width="1260" height="773" rx="8" /></clipPath><clipPath id={`${clip}-avatar`}><circle cx="1342" cy="120" r="35" /></clipPath></defs>
          <g clipPath={`url(#${clip})`}>
            <rect x="163" y="60" width="1260" height="773" fill="#F7F8F3" />
            <path d="M361 60V833" stroke="#E1E7DF" />
            <image href="/images/case-studies/odda-logo-transparent.png" x="213" y="82" width="94" height="69" />
            {["Home", "Activity", "Reports", "Settings"].map((label, index) => <g key={label}>
              {index === 0 && <rect x="179" y="175" width="165" height="45" rx="9" fill="#E6ECE2" />}
              <g transform={`translate(202 ${191 + index * 55})`} stroke={index === 0 ? green : ink} strokeWidth="2" fill="none">
                {index === 0 ? <path d="m0 5 9-7 9 7v14H11v-8H7v8H0Z" /> : index === 1 ? <path d="M0 19V9h4v10M7 19V3h4v16M14 19V-2h4v21" /> : index === 2 ? <path d="M1-2h11l6 6v17H1ZM5 8h9M5 13h9" /> : <><circle cx="9" cy="9" r="9"/><circle cx="9" cy="9" r="3"/></>}
              </g>
              {text(239, 205 + index * 55, label, 17, 500, index === 0 ? green : ink)}
            </g>)}
            <text x="393" y="125" fontFamily="'Times New Roman', Times, serif" fontSize="36" fontWeight="700" fill={ink}>Good morning, Sarah</text>
            {text(395, 161, "Here’s how Mum is doing today.", 21)}
            <g clipPath={`url(#${clip}-avatar)`}>
              <svg x="1307" y="85" width="70" height="70" viewBox="1302 75 90 90">
                <image href={image} width="1586" height="992" />
              </svg>
            </g>
            <circle cx="1342" cy="120" r="35" fill="none" stroke="#E1E7DF" strokeWidth="2" />
            <rect x="395" y="185" width="690" height="70" rx="13" fill="#E6ECE2" />
            <circle className="odda-desktop-status" cx="440" cy="220" r="23" fill="#487454" /><path d="m430 220 7 7 14-15" fill="none" stroke="white" strokeWidth="4" />
            {text(484, 216, "Everything looks normal", 22, 600, green)}
            {text(484, 240, "Mum is following her usual routine and all is well at home.", 16)}
            {card(395, 285, 660, 295)}{text(413, 321, "Daily activity pattern", 22, 600)}
            <circle cx="748" cy="317" r="7" fill="#DCE4D9" />{text(761, 322, "Usual activity", 13)}
            <circle cx="903" cy="317" r="7" fill={green} />{text(916, 322, "Today", 13)}
            {["Kitchen", "Kettle", "Living room", "Front door"].map((label, index) => <g key={label}>
              {text(418, 378 + index * 46, label, 14, 500)}
              <path d={`M557 ${352 + index * 46}H1031`} stroke="#EDF0EB" />
              <rect x={568 + (index % 2) * 35} y={361 + index * 46} width={index === 2 ? 360 : 130} height="15" rx="7" fill="#DCE4D9" />
              <rect x={646 + index * 8} y={361 + index * 46} width={index === 2 ? 70 : 46} height="15" rx="7" fill={green} />
              {index < 2 && <rect x="920" y={361 + index * 46} width="62" height="15" rx="7" fill={green} />}
            </g>)}
            {["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"].map((label, index) => <g key={label}><path d={`M${565 + index * 90} 350V535`} stroke="#EDF0EB" />{text(549 + index * 90, 555, label, 13)}</g>)}
            {card(1071, 285, 324, 295)}{text(1090, 321, "Today at a glance", 22, 600)}
            {[["42", "Movements around the home"], ["3", "Kettle uses"], ["5h 12m", "Time in living room"], ["2", "Front door openings"]].map(([value, label], index) => <g key={label}>
              <circle cx="1111" cy={366 + index * 59} r="20" fill="#E6ECE2" />
              <circle cx="1111" cy={366 + index * 59} r="6" fill={green} />
              {text(1150, 366 + index * 59, value, 23, 600)}{text(1150, 386 + index * 59, label, 12)}
            </g>)}
            {card(395, 597, 334, 221)}{text(413, 632, "Weekly routine", 22, 600)}
            {text(413, 675, "On track", 21, 600, green)}{text(413, 701, "Mum has followed her usual", 15)}{text(413, 724, "routine 6 out of 7 days this week.", 15)}
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, index) => <g key={label}><circle cx={426 + index * 44} cy="760" r="11" fill={index < 6 ? green : "#E1E7DF"}/>{index < 6 && <path d={`m${421 + index * 44} 760 4 4 6-7`} stroke="white" fill="none" strokeWidth="2"/>}{text(413 + index * 44, 793, label, 11)}</g>)}
            {card(744, 597, 310, 221)}{text(760, 632, "Home environment", 21, 600)}
            {[["Temperature", "21°C"], ["Humidity", "48%"]].map(([label, value], index) => <g key={label}>{card(758 + index * 145, 656, 136, 136)}{text(770 + index * 145, 688, label, 13)}{text(770 + index * 145, 733, value, 28, 600)}{text(770 + index * 145, 769, "Normal", 14, 500, green)}</g>)}
            {card(1071, 597, 324, 221)}{text(1088, 632, "Odda devices", 22, 600)}
            {text(1090, 670, "4 connected", 21, 600, green)}{text(1090, 695, "All devices are online.", 15)}
            {["Hub", "Kitchen sensor", "Living room sensor", "Front door sensor"].map((label, index) => <g key={label}><circle cx="1096" cy={728 + index * 23} r="4" fill={green}/>{text(1108, 733 + index * 23, label, 13)}{text(1334, 733 + index * 23, "Online", 12, 500, green)}</g>)}
          </g>
        </svg>
      </div>
    </div>
  );
}

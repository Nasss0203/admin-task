import { cn } from "@/lib/utils"

type TrendChartProps = { variant?: "primary" | "success" }

export function TrendChart({ variant = "primary" }: TrendChartProps) {
  const line = variant === "primary" ? "#4f6fe8" : "#12a47e"
  const fillId = `fill-${variant}`
  return (
    <div className="h-52 w-full" aria-label="Seven day trend chart" role="img">
      <svg className="h-full w-full overflow-visible" viewBox="0 0 640 210" preserveAspectRatio="none">
        <defs><linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={line} stopOpacity="0.22" /><stop offset="100%" stopColor={line} stopOpacity="0" /></linearGradient></defs>
        {[35, 80, 125, 170].map((y) => <line key={y} x1="0" x2="640" y1={y} y2={y} stroke="currentColor" className="text-border" strokeDasharray="4 5" />)}
        <path d="M0,164 C50,152 64,142 106,148 C152,155 170,111 214,118 C256,125 274,93 320,99 C365,106 381,70 426,77 C472,84 490,42 534,55 C579,68 606,35 640,31 L640,210 L0,210 Z" fill={`url(#${fillId})`} />
        <path d="M0,164 C50,152 64,142 106,148 C152,155 170,111 214,118 C256,125 274,93 320,99 C365,106 381,70 426,77 C472,84 490,42 534,55 C579,68 606,35 640,31" fill="none" stroke={line} strokeWidth="3" strokeLinecap="round" />
        {[0, 106, 214, 320, 426, 534, 640].map((x, index) => <circle key={x} cx={x} cy={[164,148,118,99,77,55,31][index]} r="3.5" fill="white" stroke={line} strokeWidth="2" />)}
      </svg>
      <div className={cn("mt-2 grid grid-cols-7 text-center text-[10px] text-muted-foreground")}>
        {['Aug 22','23','24','25','26','27','28'].map((day) => <span key={day}>{day}</span>)}
      </div>
    </div>
  )
}

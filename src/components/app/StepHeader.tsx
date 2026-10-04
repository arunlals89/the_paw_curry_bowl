export function StepHeader({
  step,
  totalSteps,
  title,
  subtitle,
}: {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full ${index < step ? "bg-paw-orange" : "bg-black/10"}`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-wide text-paw-orange-dark">
          Step {step} of {totalSteps}
        </span>
        <h1 className="font-display text-2xl text-bark">{title}</h1>
        {subtitle ? <p className="text-sm text-bark-soft">{subtitle}</p> : null}
      </div>
    </div>
  );
}

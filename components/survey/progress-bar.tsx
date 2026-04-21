interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="progress-shell" aria-label="Progreso del formulario">
      <div className="progress-meta">
        <span>
          Paso {currentStep} de {totalSteps}
        </span>
        <span>{progress}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

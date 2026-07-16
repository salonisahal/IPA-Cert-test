type StepperProps = {
  steps: string[]
  active: number
}

const Stepper = ({ steps, active }: StepperProps) => (
  <div className="flex flex-wrap items-center gap-4">
    {steps.map((step, index) => (
      <div key={step} className="flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
            index <= active ? 'bg-primary text-white' : 'bg-slate-100 text-muted'
          }`}
        >
          {index + 1}
        </div>
        <span className={`text-sm ${index <= active ? 'text-primary' : 'text-muted'}`}>{step}</span>
        {index < steps.length - 1 && <div className="h-px w-8 bg-slate-200" />}
      </div>
    ))}
  </div>
)

export default Stepper

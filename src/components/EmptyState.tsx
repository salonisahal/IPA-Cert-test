import React from 'react'

const EmptyState = ({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
    <h3 className="text-lg font-semibold text-primary">{title}</h3>
    <p className="text-sm text-muted">{description}</p>
    {action}
  </div>
)

export default EmptyState

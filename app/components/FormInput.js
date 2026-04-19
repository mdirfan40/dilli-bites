export default function FormInput({ as: Comp = 'input', hasError = false, className = '', children, ...props }) {
  return (
    <Comp
      className={[
        'w-full px-3 py-2 bg-[#0F0F0F] rounded-input text-text text-sm font-body box-border',
        'border transition-colors focus:outline-none focus:border-brand',
        hasError ? 'border-error-field' : 'border-border',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Comp>
  )
}

export default function FormButton({ children, className = '', style, ...props }) {
  return (
    <button
      {...props}
      style={style}
      className={[
        'w-full py-[13px] bg-brand text-black font-extrabold text-[13px] tracking-[0.12em] uppercase',
        'border-none rounded-input cursor-pointer font-ui transition-colors',
        'hover:bg-brand-hover disabled:opacity-60 disabled:cursor-not-allowed',
        className,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

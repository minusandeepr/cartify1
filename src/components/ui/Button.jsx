export default function Button({ children, variant = 'solid', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    solid: 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-300',
    ghost: 'bg-transparent text-brand-600 hover:bg-brand-50',
    outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
  };
  return (
    <button className={`${base} ${variants[variant] || variants.solid} ${className}`} {...props}>
      {children}
    </button>
  );
}

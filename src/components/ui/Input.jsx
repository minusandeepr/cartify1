export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-200 focus:border-brand-400 outline-none ${className}`}
      {...props}
    />
  );
}

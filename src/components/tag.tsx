const Tag = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <span
    className="border-2 border-amber-400 bg-amber-200 text-amber-600 px-1.5 py-0.5 rounded-md text-xs font-semibold"
  >
    { children }
  </span>
)

export default Tag
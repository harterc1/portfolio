const Tag = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <span
    className="border-2 border-neutral-800 text-neutral-900 bg-neutral-500 px-1.5 py-0.5 rounded-md text-xs font-medium"
  >
    { children }
  </span>
)

export default Tag
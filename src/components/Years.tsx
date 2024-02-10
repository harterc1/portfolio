const Years = ({ years }: { years: number[] }) => (
  <div className="text-xs text-neutral-400 italic my-2">{`${years[0]} - ${years[1]}`}</div>
)

export default Years
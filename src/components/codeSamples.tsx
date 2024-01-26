const CodeSamples = ({
  hrefs
}: {
  hrefs: string[]
}) => {
  return (
    <div className="py-4">
      <span className="font-mono text-xs block mb-3">{`Code sample${hrefs.length > 1 ? 's' : ''}:`}</span>
      {hrefs.map((href) => (
        <div className="mb-4">
          <a
            className="font-mono text-sm font-bold text-gray-800 bg-sky-200 rounded-sm rounded-tr-xl rounded-bl-xl py-2 px-4 border-gray-500 border-1"
            href={href}
            target="_blank"
          >
            {href.split('/').findLast(_ => true)}
          </a>
        </div>
      ))}
    </div>
  )
}

export default CodeSamples
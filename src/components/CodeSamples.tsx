const CodeSamples = ({
  hrefs
}: {
  hrefs: string[]
}) => {
  return (
    <div className="flex flex-col gap-4 mt-6 mb-8">
      <span className="font-mono text-xs block">{`Code sample${hrefs.length > 1 ? 's' : ''}:`}</span>
      {hrefs.map((href) => (
        <div key={href}>
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
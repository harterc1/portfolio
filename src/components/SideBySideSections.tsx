const SideBySideSections = ({ left, right }: { left: React.ReactNode, right: React.ReactNode }) => (
  <div className="sm:flex gap-6 items-start">
    <section className="sm:w-1/2">
      { left }
    </section>
    <section className="sm:w-1/2">
      { right }
    </section>
  </div>
)

export default SideBySideSections
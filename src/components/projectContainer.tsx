'use client'

import useProject from "@/hooks/useProject"
import Error from "next/error"

const ProjectContainer = ({ children }: { children: React.ReactNode }) => {
  const project = useProject()

  if (!project) {
    // TODO: why does error page change nav icon color?
    return <Error title="No project found" statusCode={404} />
  }

  return (
    <main>
      <article>
        { children }
      </article>
    </main>
  )
}

export default ProjectContainer
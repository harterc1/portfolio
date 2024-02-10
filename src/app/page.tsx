import data from '@/data.json'
import Avatar from '@/components/Avatar'
import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  return (
    <>
      <header className="pb-4">
        <div className="flex gap-8">
          <div className="flex-1 flex-shrink">
            <p className="text-2xl sm:text-3xl font-bold mb-1">Hi, I&apos;m Chad.</p>
            <p className="text-sm sm:text-base mt-0">{ data.description }</p>
            <h1 className="mt-8">
              Welcome to my
              <br />
              <span className="uppercase text-4xl sm:text-5xl font-extrabold">portfolio</span>
            </h1>
          </div>
          <div className="hidden xs:block relative w-16 h-16 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <Avatar />
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-1 sm:gap-2 mt-0 sm:mt-4">
        {data.projects.map(project => (
          <ProjectCard
            key={project.slug}
            href={`/${project.slug}`}
            {...project}
          />
        ))}
      </div>
    </>
  )
}

import ProjectPreview from '@/components/ProjectPreview'

import data from '@/data.json'
import Avatar from '@/components/Avatar'

export default function Home() {
  return (
    <main>
      <header className="pb-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <span className="text-2xl sm:text-3xl font-bold leading-normal">Hi, I'm Chad.</span>
            <span className="text-sm sm:text-base block">Engineering lead, experienced in full-stack web and native app development.</span>
            <h1 className="mt-8">
              Welcome to my
              <br />
              <span className="uppercase text-5xl font-extrabold">portfolio</span>
            </h1>
          </div>
          <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <Avatar />
          </div>
        </div>
      </header>

      {data.projects.map(project => (
        <ProjectPreview
          key={project.slug}
          title={project.title}
          src={project.src}
          href={`/${project.slug}`}
          tags={project.tags}
          bulletPoints={project.bulletPoints}
        />
      ))}
    </main>
  )
}

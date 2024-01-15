import Image from 'next/image'
import ProjectPreview from '@/components/projectPreview'

import data from '@/data.json'

export default function Home() {
  return (
    <main className="m-auto p-8 sm:px-16 max-w-screen-lg min-h-screen ">
      <header className="pb-4">
        <div className="flex items-center gap-6">
          <p className="flex-1">
            <span className="text-2xl sm:text-3xl font-bold leading-normal">Hi, I'm Chad.</span>
            <span className="text-sm sm:text-base">Engineering lead, seasoned in full-stack web and native app development.</span>
          </p>
          <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden">
            <Image src="/avatar.jpg" alt="Chad Harter" fill />
          </div>
        </div>

        <h1 className="mt-8">
          Welcome to my
          <br />
          <span className="uppercase text-5xl font-extrabold">portfolio</span>
        </h1>
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

'use client'

import Image from "next/image"
import CodeSamples from "@/components/codeSamples"
import ProjectContainer from "@/components/projectContainer"
import useProject from "@/hooks/useProject"

const Page = () => {
  const project = useProject()!

  return (
    <ProjectContainer>
      <header>
        <h1 className="text-5xl uppercase font-extrabold py-6">{ project.title }</h1>
        <Image className="py-2" src="/backstage-cms/hero-2.png" alt="Backstage CMS edit page example" width={1280} height={864} />
        <p>The Backstage CMS project was a ground-up rebuild of VICE's headless content management system, migrating the frontend from <a href="https://vuejs.org/" target="_blank">Vue.js</a> to <a href="https://nextjs.org/" target="_blank">Next.js</a> while also migrating it's backend integration from VICE's REST API to a new GraphQL API.</p>
        <p>The goal of this project was to modernize VICE's tech stack while also attaining uniform tech stacks across projects within the company.</p>
        <p>I was the engineering manager, acting lead and acting project manager. I also hired two engineers to dedicate to this project.</p>
      </header>

      <div className="flex gap-6">
        <section className="mt-4 w-1/2">
          <h2 className="text-2xl font-bold py-2">Technical Highlights</h2>
          <ul className="list-disc">
            <li>Headless CMS built with <a href="https://nextjs.org/" target="_blank">Next.js</a></li>
            <li><a href="https://final-form.org/react" target="_blank">React Final Form</a> for form state management</li>
            <li><a href="https://www.apollographql.com/docs/react" target="_blank">Apollo Client</a> for GraphQL integration</li>
            <li><a href="https://www.apollographql.com/docs/react/api/link/apollo-link-rest" target="_blank">Apollo REST Link</a> for REST API integration</li>
            <li>Deployed with <a href="https://circleci.com/" target="_blank">CircleCI</a></li>
            <li>Served via <a href="https://aws.amazon.com/" target="_blank">AWS</a></li>
          </ul>
        </section>
        <section className="mt-4 w-1/2">
          <h2 className="text-2xl font-bold py-2">Features</h2>
          <ul className="list-disc">
            <li>Publishing and scheduling a variety of content types</li>
            <li>Currate content for landing pages</li>
            <li>User roles and permissions</li>
            <li>Auto-save</li>
            <li>Real-time view of who is working on what</li>
            <li>Prevent users from overwriting each other</li>
            <li>Prevent users from losing unsaved work</li>
          </ul>
        </section>
      </div>

      <p className="mt-6">The following sections detail areas of the project where I had the most hands-on technical influence.</p>

      <section className="mt-4">
        <h2 className="text-3xl font-bold py-2">Auto-save</h2>
        <p>One requirement for the Backstage CMS project was to auto-save a user's work. Every time a user pauses for more than a couple seconds, their work will automatically save to the server.</p>
        <p>View the video below to observe a user editing an article. Notice how the buttons in the upper-right disable briefly while auto-save is running. The user is also never interrupted while saving. At the end of the video, the article is finally scheduled to go live.</p>
        <video controls className="w-full py-2">
          <source src="/backstage-cms/select-auto-save-schedule.mp4" />
        </video>

        <h3 className="text-xl font-bold pt-2">The Challenge</h3>
        <p>Early in the project we chose <a href="https://final-form.org/react" target="_blank">React Final Form</a> to handle our form state management, primarily for it's <a href="https://redux.js.org/" target="_blank">Redux</a>-inspired performance tuning capability. While React Final Form provides some ways to implement auto-save (i.e. <a href="https://final-form.org/docs/react-final-form/types/FormProps#keepdirtyonreinitialize" target="_blank"><code>keepDirtyOnReinitialize</code></a>), it doesn't handle re-hydrating the form with data from the server while also not interrupting the user.</p>
        <p>So, I created <code>VMForm</code>; a wrapper around React Final Form's <a href="https://final-form.org/docs/react-final-form/api/Form" target="_blank"><code>Form</code></a> component and implemented a custom <code>onSave</code> prop that allows the developer to re-hydrate the form after submission completes.  <code>VMForm</code> also keeps track of any fields that are changed (or "dirtied") while the form submission is in progress so that it knows which fields to not overwrite. <code>VMForm</code> is also designed to be a drop-in replacement for <a href="https://final-form.org/docs/react-final-form/api/Form" target="_blank"><code>Form</code></a> as all capability and hooks native to React Final Form still work.</p>

        <CodeSamples
          hrefs={[
            'https://github.com/harterc1/portfolio/blob/master/public/backstage-cms/VMForm.tsx',
            'https://github.com/harterc1/portfolio/blob/master/public/backstage-cms/VMForm.context.tsx',
            'https://github.com/harterc1/portfolio/blob/master/public/backstage-cms/useVMForm.ts',
          ]}
        />

        <h3 className="text-xl font-bold pt-2">Data Flow / Lifecycle</h3>
        <p>To further illustrate the impact this auto-save design has on how data flows through the app, observe the following sequence diagrams that depict the data flow design proposed by React Final Form vs <code>VMForm</code>.</p>
        <h4 className="text-lg font-bold pt-2">React Final Form (Before)</h4>
        <Image className="py-2" src="/backstage-cms/data-flow-before.png" alt="Backstage CMS data flow before" width={640} height={461} />
        <h4 className="text-lg font-bold pt-2">VMForm (After)</h4>
        <Image className="py-2" src="/backstage-cms/data-flow-after.png" alt="Backstage CMS data flow after" width={640} height={601} />
      </section>

      <section className="mt-4">
        <h2 className="text-3xl font-bold">Strict Types For Form Data</h2>
        <p>Any data-heavy application should use <a href="https://www.typescriptlang.org/tsconfig#strict" target="_blank">strict</a> typing and a CMS is a perfect example of this.  While the types directly conforming to a GraphQL API Schema can be automatically generated via tools like <a href="https://the-guild.dev/graphql/codegen" target="_blank">CodeGen</a>, the data returned from an API are often <b>not</b> in the most convenient structure for UI components, form validation, etc.</p>
        <p>As Backstage CMS is a <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a> application, I implemented patterns for the team to use to restructure this data for ease of use within the UI while preventing hardcoded strings from being sprinkled throughout the codebase.</p>
        <p><i>*Code samples not shown as to not expose sensitive data structures</i></p>
      </section>

      <section className="mt-4">
        <h2 className="text-3xl font-bold">Dirty Warning Modal</h2>
        <p>Backstage CMS provides mechanisms to prevent users from losing their work.  One in particular is the "Dirty Warning Modal".</p>
        
        <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/public/backstage-cms/DirtyWarningModal.tsx']} />

        <p>The tricky part was cancelling native browser navigation and <a href="https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering" target="_blank">Next.js client-side rendering</a> while keeping the browser and the <a href="https://nextjs.org/docs/pages/api-reference/functions/use-router" target="_blank">Next.js router</a> in sync.  The different types of navigation also means that two types of modals need to be used to prompt the user depending on how they leave the page.</p>
        <div className="flex flex-col items-center sm:flex-row py-2 gap-6">
          <Image className="sm:w-1/2" src="/backstage-cms/dirty-modal-custom.png" alt="Backstage CMS custom dirty warning modal" height={212} width={320} />
          <Image className="sm:w-1/2" src="/backstage-cms/dirty-modal-native.png" alt="Backstage CMS native dirty warning modal" height={212} width={320} />
        </div>
        <p>As long as <code>&lt;DirtyWarningModal/&gt;</code> exists as a child of a React Final Form <code>Form</code> component, the user will always be prompted if they attempt to leave the page while the form is dirty.</p>
      </section>
    </ProjectContainer>
  )
}

export default Page
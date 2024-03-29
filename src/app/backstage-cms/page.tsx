import Image from "next/image"
import CodeSamples from "@/components/CodeSamples"
import SideBySideSections from "@/components/SideBySideSections"
import buildMetaTitle from "@/utils/buildMetaTitle"
import { Metadata } from "next"
import getProject from "@/utils/getProject"
import Years from "@/components/Years"

const project = getProject('backstage-cms')

export const metadata: Metadata = {
  title: buildMetaTitle(project.title)
}

const Page = () => (
  <article>
    <header>
      <h1>Backstage CMS</h1>
      <Years years={project.years} />
      <p>The Backstage CMS project was a ground-up rebuild of VICE&apos;s headless content management system, migrating the frontend from <a href="https://vuejs.org/" target="_blank">Vue.js</a> to <a href="https://nextjs.org/" target="_blank">Next.js</a> while also migrating it&apos;s backend integration from a legacy REST API to a new GraphQL API.</p>
      <p>I was the engineering manager, lead and project manager. I also hired two engineers to dedicate to this project.</p>
      <Image src="/backstage-cms/hero-2.png" alt="Backstage CMS edit page example" width={1280} height={864} />
    </header>

    <SideBySideSections
      left={
        <>
          <h2>Technical Highlights</h2>
          <ul>
            <li>Headless CMS built with <a href="https://nextjs.org/" target="_blank">Next.js</a></li>
            <li><a href="https://final-form.org/react" target="_blank">React Final Form</a> for form state management</li>
            <li><a href="https://www.apollographql.com/docs/react" target="_blank">Apollo Client</a> for GraphQL integration</li>
            <li><a href="https://www.apollographql.com/docs/react/api/link/apollo-link-rest" target="_blank">Apollo REST Link</a> for REST API integration</li>
            <li>Deployed with <a href="https://circleci.com/" target="_blank">CircleCI</a></li>
            <li>Served via <a href="https://aws.amazon.com/" target="_blank">AWS</a></li>
          </ul>
        </>
      }
      right={
        <>
          <h2>Features</h2>
          <ul>
            <li>Publish and schedule a variety of content types</li>
            <li>Curate content for landing pages</li>
            <li>User roles and permissions</li>
            <li>Auto-save</li>
            <li>Real-time view of who is working on what</li>
            <li>Safety mechanisms to prevent losing unsaved work or overwriting others</li>
          </ul>
        </>
      }
    />

    <section>
      <h2>Auto-save</h2>
      <p>Backstage CMS auto-saves the user&apos;s work. Every time a user pauses for more than a couple seconds, their work will automatically save to the server.</p>
      <p>View the video below to observe a user editing an article. Notice how the buttons in the upper-right disable briefly while auto-save is running. The user is also never interrupted while saving. At the end of the video, the article is finally scheduled to go live.</p>

      <iframe className="aspect-video w-full my-6" src="https://www.youtube-nocookie.com/embed/_FnAwK93ExE?si=QcqnFndSaDuzvgiI" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

      <h3>The Challenge</h3>
      <p>Early in the project, <a href="https://final-form.org/react" target="_blank">React Final Form</a> was chosen to handle our form state management, primarily for it&apos;s <a href="https://redux.js.org/" target="_blank">Redux</a>-inspired performance tuning capability. While React Final Form provides some ways to implement auto-save (i.e. <a href="https://final-form.org/docs/react-final-form/types/FormProps#keepdirtyonreinitialize" target="_blank"><code>keepDirtyOnReinitialize</code></a>), it doesn&apos;t handle re-hydrating the form with data from the server while also not interrupting the user.</p>
      <p><a href="https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.tsx" target="_blank"><code>VMForm</code></a> was created to address this; a wrapper around React Final Form&apos;s <a href="https://final-form.org/docs/react-final-form/api/Form" target="_blank"><code>Form</code></a> component and implemented a custom <a href="https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.types.ts#L34" target="_blank"><code>onSave</code></a> prop that allows the form to re-hydrate the form after submission completes.  <a href="https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.tsx" target="_blank"><code>VMForm</code></a> also keeps track of any fields that are changed (or &quot;dirtied&quot;) while the form submission is in progress so that it knows which fields to not overwrite. <a href="https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.tsx" target="_blank"><code>VMForm</code></a> is also designed to be a drop-in replacement for <a href="https://final-form.org/docs/react-final-form/api/Form" target="_blank"><code>Form</code></a> as all capability and hooks native to React Final Form still work.</p>

      <CodeSamples
        hrefs={[
          'https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.tsx',
          'https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.types.ts',
          'https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.context.tsx',
          'https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/useVMForm.ts',
        ]}
      />

      <h3>Data Flow / Lifecycle</h3>
      <p>To further illustrate the impact this auto-save design has on how data flows through the app, observe the following sequence diagrams that depict the data flow design proposed by React Final Form vs <a href="https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/VMForm.tsx" target="_blank"><code>VMForm</code></a>.</p>
      <h4>React Final Form (Before)</h4>
      <Image className="my-4" src="/backstage-cms/data-flow-before.png" alt="Backstage CMS data flow before" width={640} height={461} />
      <h4>VMForm (After)</h4>
      <Image className="my-4" src="/backstage-cms/data-flow-after.png" alt="Backstage CMS data flow after" width={640} height={601} />
    </section>

    <section>
      <h2>Strict Types For Form Data</h2>
      <p>Any data-heavy application should use <a href="https://www.typescriptlang.org/tsconfig#strict" target="_blank">strict</a> typing and a CMS is a perfect example of this.  While the types directly conforming to a GraphQL API Schema can be automatically generated via tools like <a href="https://the-guild.dev/graphql/codegen" target="_blank">CodeGen</a>, the data returned from an API are often <b>not</b> in the most convenient structure for UI components, form validation, etc.</p>
      <p>As Backstage CMS is a <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a> application, patterns were implemented for the team to follow in order to restructure this data for ease within the UI while preventing hardcoded strings from being sprinkled throughout the codebase.</p>

      <CodeSamples
        hrefs={[
          'https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/form.types.ts',
          'https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/useArticleFields.ts',
        ]}
      />
    </section>

    <section>
      <h2>Dirty Warning Modal</h2>
      <p>Backstage CMS provides mechanisms to prevent users from losing their work.  One in particular is the &quot;Dirty Warning Modal&quot;.</p>
      
      <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/DirtyWarningModal.tsx']} />

      <p>The tricky part was cancelling native browser navigation and <a href="https://nextjs.org/docs/pages/building-your-application/rendering/client-side-rendering" target="_blank">Next.js client-side rendering</a> while keeping the browser and the <a href="https://nextjs.org/docs/pages/api-reference/functions/use-router" target="_blank">Next.js router</a> in sync.  The different types of navigation also means that two types of modals need to be used to prompt the user depending on how they leave the page.</p>
      <div className="flex flex-col items-center sm:flex-row py-2 gap-6">
        <Image className="sm:w-1/2" src="/backstage-cms/dirty-modal-custom.png" alt="Backstage CMS custom dirty warning modal" height={212} width={320} />
        <Image className="sm:w-1/2" src="/backstage-cms/dirty-modal-native.png" alt="Backstage CMS native dirty warning modal" height={212} width={320} />
      </div>
      <p>As long as <a href="https://github.com/harterc1/portfolio/blob/master/code-samples/backstage-cms/DirtyWarningModal.tsx" target="_blank"><code>DirtyWarningModal</code></a> exists as a child of a React Final Form <a href="https://final-form.org/docs/react-final-form/api/Form" target="_blank"><code>Form</code></a> component, the user will always be prompted if they attempt to leave the page while the form is <a href="https://final-form.org/docs/final-form/types/FormState#dirty" target="_blank">dirty</a>.</p>
    </section>
  </article>
)

export default Page
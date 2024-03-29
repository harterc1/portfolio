import CodeSamples from "@/components/CodeSamples"
import SideBySideSections from "@/components/SideBySideSections"
import VerticalVideo from "@/components/VerticalVideo"
import Years from "@/components/Years"
import buildMetaTitle from "@/utils/buildMetaTitle"
import getProject from "@/utils/getProject"
import { Metadata } from "next"
import Image from "next/image"

const project = getProject('proximity')

export const metadata: Metadata = {
  title: buildMetaTitle(project.title)
}

const Page = () => (
  <article>
    <header>
      <h1>{ project.title }</h1>
      <Years years={project.years} />
      <p>Proximity is a native app for <b>iOS</b> and <b>Android</b> that anonymously connects you with nearby people in real time.  The app continuously monitors GPS location and dynamically opens chat streams with everyone within a 100 meter radius. All chat messages are then combined into a single familiar user interface.</p>
      <p>Proximity is a personal project that I&apos;ve built in my free time. It is not released to Google Play or the App Store (yet). However, It has gone through live testing with friends and family.</p>
      <VerticalVideo src="/proximity/proximity-demo.mp4" />
    </header>
    <div className="clear-both" />

    <SideBySideSections
      left={
        <>
          <h2>Technical Highlights</h2>
          <ul>
            <li>Native app for <b>iOS</b> and <b>Android</b></li>
            <li>Built with <a href="https://reactnative.dev/" target="_blank">React Native</a> and <a href="https://expo.dev/" target="_blank">Expo</a></li>
            <li><a href="https://www.djangoproject.com/" target="_blank">Django</a> web server and admin interface hosted on <a href="https://aws.amazon.com/" target="_blank">AWS</a></li>
            <li>GraphQL API served using <a href="https://ariadnegraphql.org/" target="_blank">Ariadne</a> and consumed using <a href="https://www.apollographql.com/docs/react/" target="_blank">Apollo Client</a></li>
            <li>REST API served using <a href="https://www.django-rest-framework.org/" target="_blank">Django REST Framework</a></li>
            <li><a href="https://socket.io/" target="_blank">Socket.IO</a> for real-time chat features</li>
            <li>Geo-relational data support through <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> / <a href="https://postgis.net/" target="_blank">PostGIS</a></li>
            <li>User authentication and media storage via <a href="https://firebase.google.com/" target="_blank">Firebase</a></li>
            <li>App deployed via <a href="https://expo.dev/eas" target="_blank">Expo EAS</a></li>
          </ul>
        </>
      }
      right={
        <>
          <h2>Features</h2>
          <ul>
            <li>Anonymous, real-time chat with typing indicators and multimedia support</li>
            <li>Dynamically updated feed shows the chat history specific to your location</li>
            <li>Notifies users when they receive messages</li>
            <li>Notifies users when they come near each other</li>
            <li>Map shows your active chat radius</li>
          </ul>
        </>
      }
    />

    <section>
      <h2>Is it a feed or a chat?</h2>
      <p>It&apos;s both. The single chat interface looks simple, but it has a lot going on. Not only is it aggregating real-time chat messages from all nearby users (and any messages you send yourself), but it also acts as an infinitely scrolling feed, showing the chat history prioritized by distance from your location.</p>
      <p>The feed initializes as an array of messages, the first page of chat history. Incoming chat messages come in through a <a href="https://socket.io/" target="_blank">Socket.IO</a> server and are instantly inserted at the beginning of the array. Outgoing chat messages are also sent through the <a href="https://socket.io/" target="_blank">Socket.IO</a> server, but to provide instant feedback to the user, a client-side message object is constructed and inserted at the beginning of the array. Additionally, if the user attempts to scroll to the end of the chat, new pages of chat history are incrementally fetched from the backend using <a href="https://www.apollographql.com/docs/react/" target="_blank">Apollo GraphQL Client</a> and pushed to the end of the message array.</p>
      
      <Image className="sm:w-1/2 bg-white p-4" src="/proximity/proximity-message-array.jpg" alt="Proximity message array" width={356} height={451} />
    
      <p>Since there was quite a bit of logic to manage this message array, all the logic was pulled into a <a href="https://legacy.reactjs.org/docs/hooks-intro.html" target="_blank">React Hook</a>. This allows for rapidly testing a variety of UI designs while keeping the chat logic consistent.</p>
      
      <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/code-samples/proximity/Chat.js']} />
    </section>

    <section>
      <h2>Ordering By Distance</h2>
      <p>The chat is primarily ordered by distance, but the user&apos;s exact distance from each message is not used. Message&apos;s are placed into buckets called <b>sectors</b>, each <b>sector</b> incrementally being an additional 100 meters from the user. This allows for individual messages in each <b>sector</b> to be ordered by their send time and still read like a conversation in the chat history. If ordering was strictly based off of distance, the conversation would most likely appear very random and scrambled.</p>
      <p>Refer to the diagram below. Without the concept of <b>sectors</b>, <b>User B</b>&apos;s message would appear before <b>User A</b>&apos;s message and wouldn&apos;t make sense.</p>
      <Image className="w-full bg-white p-4" src="/proximity/proximity-sectors.jpg" alt="Proximity message array" width={691} height={471} />
      <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/code-samples/proximity/models.py']} />
    </section>

    <section>
      <h2>Media Viewer</h2>
      {/* <FloatingVideo src="/proximity/proximity-media-viewer.mp4" /> */}
      <p>Proximity has a custom modal that implements simultaneous pinch and drag gestures to allow the user to zoom in and out on it&apos;s content.  The user can also swipe vertically in either direction to dismiss the modal.</p>
      <VerticalVideo src="/proximity/proximity-media-viewer.mp4" />
      <p>This <a href="https://github.com/harterc1/portfolio/blob/master/code-samples/proximity/Viewer.js" target="_blank"><code>Viewer</code></a> component is implemented using <a href="https://docs.swmansion.com/react-native-reanimated/" target="_blank">React Native Reanimated</a>.</p>
      <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/code-samples/proximity/Viewer.js']} />
    </section>
    <div className="clear-both" />

    <section>
      <h2>Demo</h2>
      <p>The following video shows a scenario between two users, demonstrating the <b>onboarding flow</b>, <b>push notifications</b>, <b>typing indicators</b> as well as <b>text and media messaging</b>.</p>
      <iframe className="aspect-video w-full" src="https://www.youtube.com/embed/oQ0locGTtuA?si=6Lps4I7VoXDCm3Ce" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </section>
  </article>
)

export default Page
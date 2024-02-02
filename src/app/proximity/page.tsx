import ProjectContainer from "@/components/ProjectContainer"
import SideBySideSections from "@/components/SideBySideSections"
import buildMetaTitle from "@/utils/buildMetaTitle"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: buildMetaTitle('Proximity')
}

const Page = () => {
  return (
    <ProjectContainer>
      <header className="inline-block">
        <h1>Proximity</h1>
        <Image className="w-1/2 sm:w-1/3 sm:float-right sm:ml-6 sm:mb-6 aspect-vertical-video" src='/proximity/hero-scaled.png' alt='Proximity app screenshot' width={334} height={720} />
        <p>Proximity is a native app for <b>iOS</b> and <b>Android</b> that anonymously connects you with the nearby people in real time.  The app continuously monitors GPS location and dynamically opens chat streams with everyone within a 100 meter radius. All chat messages are then combined into a single familiar user interface.</p>
        <p>Proximity is a personal project that I've built in my free time. It is not released to Google Play or the App Store (yet). However, It has gone through live testing with friends and family.</p>
      </header>

      <SideBySideSections
        left={
          <>
            <h2>Technical Highlights</h2>
            <ul>
              <li>Native app for <b>iOS</b> and <b>Android</b></li>
              <li>Built with <a href="https://reactnative.dev/" target="_blank">React Native</a> and <a href="https://expo.dev/" target="_blank">Expo</a></li>
              <li><a href="https://www.djangoproject.com/" target="_blank">Django</a> web server and admin interface hosted on <a href="https://aws.amazon.com/" target="_blank">AWS</a></li>
              <li>GraphQL API served via <a href="https://ariadnegraphql.org/" target="_blank">Ariadne</a> and consumed using <a href="https://www.apollographql.com/docs/react/" target="_blank">Apollo Client</a></li>
              <li>REST API served using <a href="https://www.django-rest-framework.org/" target="_blank">Django REST Framework</a></li>
              <li><a href="https://socket.io/" target="_blank">Socket.IO</a> for real-time chat features</li>
              <li>Geo-relational data support through <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a> / <a href="https://postgis.net/" target="_blank">PostGIS</a></li>
              <li>User authentication and media storage implemented via <a href="https://firebase.google.com/" target="_blank">Firebase</a></li>
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
        <h2>Demo</h2>
        <p>The following video shows a scenario between two users, demonstrating the following features:</p>
        <ul>
          <li>Onboarding</li>
          <li>Push notifications</li>
          <li>Updates of who is nearby</li>
          <li>Typing indicators</li>
          <li>Text and media messaging</li>
        </ul>
        <div className="my-4">
          <iframe className="aspect-video w-full" width="560" height="315" src="https://www.youtube.com/embed/oQ0locGTtuA?si=6Lps4I7VoXDCm3Ce" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
     </section>
    </ProjectContainer>
  )
}

export default Page
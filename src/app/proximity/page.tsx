'use client'

import ProjectContainer from "@/components/projectContainer"
import useProject from "@/hooks/useProject"

const Page = () => {
  const project = useProject()!

  return (
    <ProjectContainer>
      <header>
        <h1 className="text-5xl uppercase font-extrabold py-2">{ project.title }</h1>
        <p>
          Have you ever gone to a new coffee shop and wonder what others are having? Have you ever lost your keys in the gym and wonder if anyone has found them? Well, there is an app for that!
          <br /><br />
          Proximity anonymously connects you with the people around you in real time.  The app continuously monitors your surroundings and dynamically opens chat streams with everyone within a 100 meter radius. All chat messages are then combined into a single familiar user interface.
          <br /><br />
          Proximity is a personal project that I've built outside of my professional life. It is not released to Google Play or the App Store as I don't believe it is feature-rich enough to retain an audience. However, It has gone through live testing with friends and family.
        </p>
      </header>

      <div className="flex gap-6">
        <section className="mt-4 w-1/2">
          <h2 className="text-2xl font-bold py-2">Technical Highlights</h2>
          <ul className="list-disc">
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
        </section>
        <section className="mt-4 w-1/2">
          <h2 className="text-2xl font-bold py-2">Features</h2>
          <ul className="list-disc">
            <li>Anonymous, real-time chat with typing indicators and multimedia support</li>
            <li>Dynamically updated feed shows the chat history specific to your location</li>
            <li>Notifies users when they receive messages</li>
            <li>Notifies users when they come near each other</li>
            <li>Map shows your active chat radius</li>
          </ul>
        </section>
      </div>
    </ProjectContainer>
  )
}

export default Page
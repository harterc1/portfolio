'use client'

import Image from "next/image"
import CodeSamples from "@/components/codeSamples"
import ProjectContainer from "@/components/projectContainer"
import useProject from "@/hooks/useProject"

const Page = () => {
  const project = useProject()!

  return (
    <ProjectContainer>
      <header className="flex gap-6">
        <div className="flex-1">
          <h1 className="text-5xl uppercase font-extrabold py-6">{ project.title }</h1>
          <p>
            The Stories App is a tool to enable journalists to streamline the creation process for video social media content.
            <br /><br />
            The app provides brand-approved templates and video editing capability with 100% offline support. It does this with zero buffering while editing and stores all video projects locally so they can be edited later.
            <br /><br />
            I was the engineering manager and acting lead on the project.
          </p>
        </div>
        <video className="w-1/3 rounded-lg" autoPlay muted loop>
          <source src="/stories-app/stories-app-trimmed.mp4" />
        </video>
      </header>

      <div className="flex gap-6">
        <section className="mt-4 w-1/2">
          <h2 className="text-2xl font-bold py-2">Technical Highlights</h2>
          <ul className="list-disc">
            <li>iOS app built with <a href="https://developer.apple.com/swift/" target="_blank">Swift</a></li>
            <li>UI built with <a href="https://developer.apple.com/xcode/swiftui/" target="_blank">SwiftUI</a></li>
            <li>Video processing with <a href="https://developer.apple.com/av-foundation/" target="_blank">AVFoundation</a> and <a href="https://developer.apple.com/documentation/quartzcore" target="_blank">Core Animation</a></li>
            <li><a href="https://www.apollographql.com/docs/ios/" target="_blank">Apollo Client</a> for GraphQL integration</li>
            <li>Deployed with <a href="https://github.com/features/actions" target="_blank">Github Actions</a> and <a href="https://fastlane.tools/" target="_blank">Fastlane</a></li>
            <li>Early prototype was built with <a href="https://ffmpeg.org/" target="_blank">FFmpeg</a> and <a href="https://kotlinlang.org/docs/multiplatform.html" target="_blank">Kotlin Multiplatform</a></li>
          </ul>
        </section>
        <section className="mt-4 w-1/2">
          <h2 className="text-2xl font-bold py-2">Features</h2>
          <ul className="list-disc">
            <li>Record or import any number of videos</li>
            <li>Trim, split, stitch, mute, and re-order your videos</li>
            <li>A library of editable, responsive and animated templates</li>
            <li>Templates are remotely configured</li>
            <li>Live preview during editing with zero buffering</li>
            <li>Offline support for editing and rendering</li>
            <li>Auto-saves projects locally so they may be edited later</li>
          </ul>
        </section>
      </div>

      <p className="mt-6">The following sections detail technical areas of the project where I directly contributed the most.</p>

      <section className="mt-4">
        <h2 className="text-3xl font-bold py-2">The Camera</h2>
        <div className="">
        <video className="w-1/3 rounded-lg float-right ml-6 mb-6" autoPlay muted loop>
            <source src="/stories-app/camera-scaled.mp4" />
          </video>
          <div>
            The camera functions how most users would expect.
            <br /><br />
            It uses <code>UIViewRepresentable</code> to construct a custom SwiftUI view that ties an <code>AVCaptureSession</code> to an <code>AVCaptureVideoPreviewLayer</code> to present the camera feed.
            
            <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/public/stories-app/CameraPreviewView.swift']} />

            The majority of the controller logic for constructing the <code>AVCaptureSession</code> is based off of Apple's sample <a href="https://developer.apple.com/documentation/avfoundation/capture_setup/avcam_building_a_camera_app" target="_blank">AVCam</a>.

            <br /><br />
            The camera also allows multiple gesture types including tapping to adjust focus as well as simultaneously supporting two methods for adjusting zoom level. This is implemented using custom <a href="https://developer.apple.com/documentation/swiftui/viewmodifier" target="_blank">view modifiers</a> and a custom focus indicator view.
            
            <CodeSamples
              hrefs={[
                'https://github.com/harterc1/portfolio/blob/master/public/stories-app/View+onTapGestureWithLocation.swift',
                'https://github.com/harterc1/portfolio/blob/master/public/stories-app/View+ZoomDragGestureModifier.swift',
                'https://github.com/harterc1/portfolio/blob/master/public/stories-app/View+ZoomPinchGestureModifier.swift',
                'https://github.com/harterc1/portfolio/blob/master/public/stories-app/FocusIndicatorView.swift',
                'https://github.com/harterc1/portfolio/blob/master/public/stories-app/CameraExample.swift',
              ]}
            />

          </div>
          
        </div>
        {/* <h3 className="text-xl font-bold pt-2">Camera UX: Gestures</h3>
        <p>
            The camera also allows multiple gesture types including tapping to adjust focus as well as simultaneously supporting two methods for adjusting zoom level. This is implemented using custom <a href="https://developer.apple.com/documentation/swiftui/viewmodifier" target="_blank">view modifiers</a> and a custom focus indicator view.
            
        </p> */}
        
      </section>

      <section className="mt-4">
        <h2 className="text-3xl font-bold py-2">Template Data Format</h2>
        <p>
          Templates aren't bundled with the app. Instead, we created a system that allows designers to build/edit templates remotely. My influence in this area involved the data structures needed to represent our templates.  This data would later be used to dynamically render templates and the UI needed to edit them.
          <br /><br />
          The data format is XML and is influenced by HTML.
        </p>

        <Image className="w-full" src="/stories-app/xml-to-ui.png" alt="XML to UI Diagram" width={1080} height={512} />

        <p>
          During development, it was common that the engineers would build these templates locally. SwiftUI's <a href="https://developer.apple.com/documentation/swiftui/previews-in-xcode" target="_blank">preview</a> capability made it possible to rig up the entire template parsing and <a href="#template-rendering">rendering</a> process and allow the team to verify that the code was generating visuals identical to our designs.
        </p>
        <Image className="w-full" src="/stories-app/xml-preview.png" alt="SwiftUI preview for template debugging" width={1080} height={578} />
      </section>

      <section className="mt-4">
        <h2 id="live-preview" className="text-3xl font-bold py-2">Live Preview</h2>
        <p>
          A live preview of the user's story is always visible while editing. In other words, the video assets and their corresponding templates are all played back in real-time so the user can see what they're building.
          <br /><br />
          This feature was built by extending <a href="https://developer.apple.com/documentation/quartzcore/calayer" target="_blank"><code>CALayer</code></a>. Since <code>CALayer</code> is what <a href="https://developer.apple.com/documentation/uikit/uiview" target="_blank"><code>UIView</code></a> uses to display content, the app can construct a visual that represents a template in the same way it would build any other UI.
          <br /><br />
          You may be asking, "Why not just use <code>UIView</code> then?". Since <code>CALayer</code> is lower level than <code>UIView</code>, it allows us to re-use our <code>CALayer</code>s in utilities provided by <a href="https://developer.apple.com/av-foundation/" target="_blank">AVFoundation</a> (More on that later).
        </p>
      </section>

      <section className="mt-4">
        <h2 className="text-3xl font-bold py-2">Custom Layout Manager</h2>
        <p>
          The editing capability provided by the template system means that a user can impact the size and position of the elements within the template. For example, adjustments to text, font family and font size all effect the bounding box of the <code>CALayer</code> that is representing that text element.  Futhermore, this has a cascading effect on the expected positions of neighboring elements.
          <br /><br />
          Since <a href="https://developer.apple.com/documentation/quartzcore/calayer/1410749-layoutmanager" target="_blank"><code>CALayer.layoutManager</code></a> doesn't exist on iOS, I extended <code>CALayer</code> to create <code>LayoutLayer</code>; a base class that any template element can inherit from to automatically support alignment, padding, and auto-resizing.
          <br /><br />
          As the user interacts with the app, <a href="https://developer.apple.com/documentation/combine" target="_blank">Combine</a> is used to observe changes to the underlying template data and adjust the properties of <code>LayoutLayer</code> to provide real-time visual updates.
        </p>
        <CodeSamples
          hrefs={[
            'https://github.com/harterc1/portfolio/blob/master/public/stories-app/LayoutLayer.swift',
            'https://github.com/harterc1/portfolio/blob/master/public/stories-app/FilterEngineNodeLayer.swift',
            'https://github.com/harterc1/portfolio/blob/master/public/stories-app/FilterEngine+BlockNodeLayer.swift',
          ]}
        />
      </section>

      <section>
        <h2 id="template-rendering" className="text-3xl font-bold py-2">Template Rendering</h2>
        <p>
          There are benefits to choosing <code>CALayer</code> to display templates. This enables the app to use the same <code>CALayer</code> structure across all applications within the app.
          <br /><br />
          In the following examples, the blue <code>NodeLayer</code> object represents the <code>CALayer</code> structure for any template.  This is to highlight code re-use.
        </p>
        <h3 className="text-xl font-bold pt-2">Displaying a template in a view</h3>
        <p>
          The root <code>CALayer</code> can be simply added as a sublayer to any <code>UIView</code>. Additionally, when a user taps the <code>UIView</code>, <code>CALayer.hitTest</code> is used to determine which <code>CALayer</code> was tapped. This was useful as some template elements are expected to be interactable.
        </p>
        
        <Image className="w-1/2" src="/stories-app/node-layer-view.png" alt="Diagram for displaying a template in a view" width={976} height={684} />
        <CodeSamples hrefs={['https://github.com/harterc1/portfolio/blob/master/public/stories-app/FilterEngine+NodeLayerView.swift']} />
        <h3 className="text-xl font-bold pt-2">Rendering a template during an export</h3>
        <p>
          When the user is finished editing, the app uses an <a href="https://developer.apple.com/documentation/avfoundation/avassetexportsession" target="_blank"><code>AVAssetExportSession</code></a> to export the final product.
          <br /><br />
          The export session has a fairly complicated configuration, but ultimately it allows you to overlay any number of <code>CALayer</code>s over your video using <a href="https://developer.apple.com/documentation/avfoundation/avvideocompositioncoreanimationtool" target="_blank"><code>AVVideoCompositionCoreAnimationTool</code></a>. It even syncs any <a href="https://developer.apple.com/documentation/quartzcore/caanimation" target="_blank"><code>CAAnimation</code></a> animations that are tied in so that they play along with your video(s).  <code>AVVideoCompositionCoreAnimationTool</code> is not shown in the diagram below, but it is what ties the <code>AVMutableVideoComposition</code> to the <code>NodeLayer</code>.
        </p>
        <Image className="w-1/2" src="/stories-app/node-layer-export.png" alt="Diagram for displaying a template in a view" width={1004} height={1012} />
        <h3 className="text-xl font-bold pt-2">Playing a template within a video player</h3>
        <p>
          Since <code>AVPlayer</code> plays <code>AVPlayerItem</code>s and <code>AVPlayerItem</code>s can be given an <code>AVComposition</code>, we can conceptualize the idea of simply re-using most of the same logic to construct an <code>AVMutableComposition</code> that we used for creating an <code>AVAssetExportSession</code>.
          <br /><br />
          However, <code>AVVideoCompositionCoreAnimationTool</code> doesn't work in this context (If I recall correctly, the app will crash), so we need an alternative way to render the user's templates. This is where <code>AVSynchronizedLayer</code> comes in.  <code>AVSynchronizedLayer</code> simply ties a <code>CALayer</code> to an <code>AVPlayerItem</code>. In this case, the <code>CALayer</code>s aren't configured directly in the <code>AVMutableComposition</code>.  Instead, they are played in parallel by <code>AVPlayerItem</code> and the user can't tell the difference.
          <br /><br />
          This is also how the app achieves it's <a href="#live-preview">live preview</a> with zero buffering.
        </p>
        <Image className="w-full" src="/stories-app/node-layer-player.png" alt="Diagram for displaying a template in a view" width={1474} height={1042} />
      </section>


        <p>
           -- swiftui preview
           -- camera gestures
        </p>

    </ProjectContainer>
  )
}

export default Page
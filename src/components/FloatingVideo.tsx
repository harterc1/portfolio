const FloatingVideo = ({ src }: { src: string }) => (
  <video
    className="w-1/2 mt-4 sm:mt-0 sm:w-1/3 sm:float-right sm:ml-6 sm:mb-6 aspect-vertical-video"
    src={src}
    width={592}
    height={1280}
    autoPlay
    muted
    loop
    playsInline
    controls
  />
)

export default FloatingVideo
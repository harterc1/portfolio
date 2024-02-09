
const VerticalVideo = ({ src }: { src: string }) => (
  <video
    className="w-3/4 xs:w-1/2 m-auto rounded-lg aspect-vertical-video my-8"
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

export default VerticalVideo
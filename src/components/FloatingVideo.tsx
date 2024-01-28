
const FloatingVideo = ({ src }: { src: string }) => (
  <video className="w-1/2 sm:w-1/3 sm:float-right sm:ml-6 sm:mb-6" autoPlay muted loop>
    <source src={src} />
  </video>
)

export default FloatingVideo
const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 bg-neutral-900 flex items-center justify-center gap-2 text-xs text-gray-400">
    {`${String.fromCharCode(169)} ${new Date().getFullYear()} Chad Harter`} 
    <span>&bull;</span>
    <address>
      <a href="mailto:harterc912@gmail.com" target="_blank">harterc912@gmail.com</a>
    </address>
  </footer>
)

export default Footer
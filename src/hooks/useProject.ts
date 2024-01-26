import { usePathname } from "next/navigation"
import data from "@/data.json"

const useProject = () => {
  const pathname = usePathname()
  return data.projects.find(project => project.slug === pathname.slice(1))
}

export default useProject
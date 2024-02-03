import data from '../data.json'

const getProject = (slug: string) => data.projects.find(project => project.slug === slug)!

export default getProject
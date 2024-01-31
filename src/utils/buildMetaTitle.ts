import data from '../data.json'

const buildMetaTitle = (pageTitle?: string): string => (
  pageTitle ? `${pageTitle} | ${data.title}` : data.title
)

export default buildMetaTitle;
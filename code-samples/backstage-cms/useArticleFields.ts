/**
 * Types shown here that are associated with content types are simplified
 * to serve as an example and are not the actual data types used in the
 * Backstage CMS to not inadvertently expose sensitive data structures.
 */

import { useField } from 'react-final-form'

import type { ArticleFieldKey, ArticleFieldKeyValues } from 'types.form'

/**
 * Wrapper around `useField` to enforce type checking and
 * that the `name` passed in exists on the `ArticleFieldKeyValues` type
 */
const useArticleField = <Name extends ArticleFieldKey>(name: Name) => useField<ArticleFieldKeyValues[Name]>(name)

/**
 * Hook for components that need field values AND field names while
 * preventing hardcoded field name strings throughout the codebase.
 * 
 * Example:
 * 
 * const { title } = useArticleFields()
 * return <input {...title.input} />
 * 
 * Without this hook, this could look like:
 * 
 * const { values } = useFormState()
 * return <input name="title" value={values.title} />
 * 
 * Which has "title" specified multiple times and isn't type safe.
 */
const useArticleFields = () => ({
  id: useArticleField('id'),
  title: useArticleField('title'),
  imageId: useArticleField('image.id'),
  imageSrc: useArticleField('image.src'),
})

export default useArticleFields
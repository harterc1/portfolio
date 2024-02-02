/**
 * 
 * Types shown here that are associated with content types are simplified
 * to serve as an example and are not the actual data types used in the
 * Backstage CMS to not inadvertently expose sensitive data structures.
 * 
 * Types here conform to the data maintained in the Forms for each of
 * our content types (Products, Articles, etc.)
 *
 * When deciding whether to make a field optional or not:
 *  If a field is explicitly calculated when creating the
 *  "initial values" for a form (via `getInitialValues`,
 * `useInitialValues`, etc.), we can know whether the type should be
 *  optional.  Otherwise, we assume that data is being passed
 *  directly into the form from an API call and we always make them
 *  optional.
 */
type ValueOf<T> = T[keyof T]

type ImageFormValues = {
  id?: string
  src?: string
}

export type ArticleFormValues = {
  id?: string
  title?: string
  image?: ImageFormValues
}

export type ArticleFieldKeyValues = ArticleFormValues & {
  [Property in keyof ImageFormValues as `image.${Property}`]: ImageFormValues[Property]
}

export type ArticleFieldKey = keyof ArticleFieldKeyValues
export type ArticleFieldValue = ValueOf<ArticleFieldKeyValues>
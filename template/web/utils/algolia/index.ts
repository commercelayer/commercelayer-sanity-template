import algoliasearch from 'algoliasearch/lite'

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY as string
)

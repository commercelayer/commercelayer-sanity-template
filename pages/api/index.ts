import sanityClient from '@sanity/client'
import _ from 'lodash'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID as string,
    dataset: process.env.SANITY_DATASET as string,
    token: process.env.SANITY_TOKEN as string, // or leave blank to be anonymous user
    useCdn: false, // `false` if you want to ensure fresh data
  })
  const query = `*[_type == "variant"]`
  const items = await client.fetch<any[]>(query)
  const update = await Promise.all(
    items.map((item) => {
      return client
        .patch(item._id)
        .set({
          size: _.first(item.size),
          //   name: {
          //     en_us: item.name,
          //     it_it: item.name,
          //   },
          //   // label: {
          //   //   en_us: item.label,
          //   //   it_it: item.label,
          //   // },
          //   // slug: {
          //   //   _type: 'localeSlug',
          //   //   en_us: {
          //   //     _type: 'slug',
          //   //     current: item.name.toLowerCase().replaceAll(' ', '-'),
          //   //   },
          //   //   it_it: {
          //   //     _type: 'slug',
          //   //     current: item.name.toLowerCase().replaceAll(' ', '-'),
          //   //   },
          //   // },
        })
        .commit()
    })
  )
  return res.json({
    items: update,
  })
}

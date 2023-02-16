import { createClient, groq } from "next-sanity";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

const querySanity = async (_req: NextApiRequest, res: NextApiResponse) => {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION as string,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN as string, // or leave blank to be anonymous user
    useCdn: false // `false` if you want to ensure fresh data
  });
  const query = groq`*[_type == \"variant\"]`;
  const items = await client.fetch<any[]>(query);
  const update = await Promise.all(
    items.map((item) => {
      return client
        .patch(item._id)
        .set({
          size: _.first(item.size)
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
        .commit();
    })
  );
  return res.json({
    items: update
  });
};

export default querySanity;

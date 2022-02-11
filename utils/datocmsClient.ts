import { GraphQLClient } from "graphql-request";

export function request({ query, variables, preview }:{ query:string, variables:any, preview:boolean }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    }
  });
  
  return client.request(query, variables);
}

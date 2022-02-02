import { GraphQLClient } from "graphql-request";
// export function request({ query, variables, preview }) {
//   const endpoint = preview
//     ? `https://graphql.datocms.com/preview`
//     : `https://graphql.datocms.com/`;
//   const client = new GraphQLClient(endpoint, {
//     headers: {
//       Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
//     }
//   });
//   console.log(client , 'client');
  
//   return client.request(query, variables);
// }

export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
   return fetch(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
        },
        body: JSON.stringify({
          query: query
        }),
      }
    )
      .then(res => res.json())
      .then( data => data.product) 
      .catch((error) => {
        console.log(JSON.stringify(error));
        
      });
  console.log(client , 'client');
  

}

// 'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Authorization': `Bearer ${token}`,


  // fetch(
  //     'https://graphql.datocms.com/',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         query: `{ allProducts {
  //       id
  //       name
  //       slug
  //       reference
  //       images {
  //         name
  //         description
  //         images {
  //           url
  //         }
  //       }
  //         variants {
  //         name
  //         code
  //         description
  //         size{
  //           name
  //         } 
  //         images{
  //           url
  //         }
  //       }
  //     }}`
  //       }),
  //     }
  //   )
  //     .then(res => res.json())
  //     .then((res) => {
  //         setCurrentProducts(res.data || [])
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
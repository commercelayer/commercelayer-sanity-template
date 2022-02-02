import _ from 'lodash'
import React, {useEffect } from 'react'
// import Link from 'next/link'

type Props = {

}

const token = '10954c93458841cc0c2dbabfac5728';

const TestDatoCMS = ({ 

}: Props) => {
  

  useEffect(() => {
    console.log('test datoCMs')
 fetch(
  'https://graphql.datocms.com/',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{ allProducts {
        id
        name

        _status
        _firstPublishedAt
      } }`
    }),
  }
)
.then(res => res.json())
.then((res) => {
  console.log(res.data)
  // setCurrentProducts 
})
.catch((error) => {
  console.log(error);
});

  }, [])

      return (
        <div>
            <p>Hello</p>
        </div>
  )
}

export default TestDatoCMS

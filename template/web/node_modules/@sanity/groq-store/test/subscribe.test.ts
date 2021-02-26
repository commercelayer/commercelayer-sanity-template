import sanityClient, {SanityClient} from '@sanity/client'
import * as config from './config'
import {groqStore, groq, GroqStore} from '../src'

const describeSubscribe = config.token ? describe : describe.skip

describeSubscribe('subscribe', () => {
  jest.setTimeout(15000)

  let client: SanityClient
  let store: GroqStore
  let errStore: GroqStore

  function deleteFixtureDocs() {
    return client
      .transaction()
      .delete('fox')
      .delete('drafts.fox')
      .delete('category-awesome')
      .commit({visibility: 'async'})
  }

  beforeAll(async () => {
    // Make sure we don't have any old fixtures laying around
    client = sanityClient({...config, useCdn: false})
    await deleteFixtureDocs()

    store = groqStore({...config, listen: true, overlayDrafts: true})
    errStore = groqStore({...config, projectId: 'n-o-p-e', listen: true, overlayDrafts: true})
  })

  afterAll(async () => {
    await store.close()
    await errStore.close()
    await deleteFixtureDocs()
  })

  test('integration: callback gets error on listener failure', (done) => {
    errStore.subscribe('*[0]', {}, (err, result) => {
      expect(err).toBeDefined()
      expect(err?.message).toMatch(/dataset.*?not found for project/i)
      expect(result).toBeUndefined()

      errStore.close().then(done)
    })
  })

  test('integration: can subscribe', async () => {
    let done: () => void
    let error: (err: Error) => void
    const waiter = new Promise((resolve, reject) => {
      done = resolve
      error = reject
    })

    const initial = {
      _id: 'fox',
      _type: 'product',
      title: 'Fox',
      slug: {_type: 'slug', current: 'fox'},
    }

    await client.createOrReplace(initial)

    const updates: unknown[] = []
    const sub = store.subscribe(
      groq`*[_type == "product" && slug.current == $slug][0] {
        _id,
        _type,
        title,
        "categories": categories[]->title,
        "slug": slug.current
      }`,
      {slug: 'fox'},
      async (err: Error | undefined, fox: unknown) => {
        if (err) {
          throw err
        }

        const numUpdates = updates.push(fox)
        switch (numUpdates) {
          case 1:
            // Should get an initial flush, since no previous result was present
            expect(fox).toMatchObject({
              ...initial,
              slug: 'fox',
            })

            // Create a draft with a new title
            await client
              .createOrReplace({...initial, _id: 'drafts.fox', title: 'Fox 2-bit'})
              .catch(error)
            break
          case 2:
            // Overlayed draft, with new title
            expect(fox).toMatchObject({
              ...initial,
              slug: 'fox',
              title: 'Fox 2-bit',
            })

            // Create a reference to a new category. This will emit two listener events
            // (one for each document), allowing us to see that the throttling works,
            // as well as the query resolving the reference correctly
            await client
              .transaction()
              .createOrReplace({_id: 'category-awesome', _type: 'category', title: 'Awsome'})
              .patch('drafts.fox', (p) => p.set({categories: [{_ref: 'category-awesome'}]}))
              .commit({visibility: 'async'})
              .catch(error)
            break
          case 3:
            // Overlayed draft, with typoed category
            expect(fox).toMatchObject({
              ...initial,
              slug: 'fox',
              title: 'Fox 2-bit',
              categories: ['Awsome'],
            })

            // Fix a typo in the category, ensuring updates to referenced documents are working
            await client
              .patch('category-awesome')
              .set({title: 'Awesome'})
              .commit({visibility: 'async'})
              .catch(error)
            break
          case 4:
            // Overlayed draft, with fixed category title
            expect(fox).toMatchObject({
              ...initial,
              slug: 'fox',
              title: 'Fox 2-bit',
              categories: ['Awesome'],
            })

            // "Publish" the document, then immediately patch the published with a new title
            await client
              .transaction()
              .createOrReplace({
                ...initial,
                title: 'Fox 2-bit',
                categories: [{_ref: 'category-awesome'}],
              })
              .delete('drafts.fox')
              .commit({visibility: 'async'})
              .catch(error)

            await client.patch('fox').set({title: 'Fox 8-bit'}).commit({visibility: 'async'})
            break
          case 5:
            // Draft deleted, published document updated with new title
            expect(fox).toMatchObject({
              ...initial,
              slug: 'fox',
              title: 'Fox 8-bit',
              categories: ['Awesome'],
            })

            // Done. Close subscription and fire off another mutation,
            // checking that we do not receive results from it
            sub.unsubscribe()

            await client
              .patch('fox')
              .set({title: 'You shouldnt see this'})
              .commit({visibility: 'async'})
              .catch(error)

            // Wait for a bit, make sure throttling isnt whats causing the event not to be delivered
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Run assertions and ensure query subscription updates were what we expected
            runAssertions()
            break
          default:
            throw new Error(`Encountered more updates than expected (${numUpdates})`)
        }
      }
    )

    function runAssertions() {
      expect(updates).toHaveLength(5)
      done()
    }

    return waiter
  })
})

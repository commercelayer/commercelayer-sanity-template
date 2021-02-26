describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Base', ->
    describe '.links()', ->
      it 'returns the correct links', ->
        expect(MyLibrary.Product.links()).toEqual({ related: 'https://example.com/api/v1/products/' })

    describe 'with a different primaryKey', ->
      beforeEach ->
        class MyLibrary.Venue extends MyLibrary.Base
          this.className = 'Venue'
          this.queryName = 'venues'

          this.primaryKey = 'token'

          @hasOne 'owner'

        class MyLibrary.Owner extends MyLibrary.Base
          this.className = 'Owner'
          this.queryName = 'owners'

          @belongsTo 'venue'

      it 'constructs relationships with the primaryKey', ->
        @resource = MyLibrary.Venue.build(token: 'abc123')
        expect(@resource.buildOwner().venueId).toEqual('abc123')

      describe 'when interfacing', ->
        beforeEach ->
          MyLibrary.Venue.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Venue.find.tokenized)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'builds the primaryKey into the resource retrieved', ->
          @promise.then =>
            expect(@resource.token).toEqual('abc123')

        it 'is rendered in a resource document with the primaryKey', ->
          resourceDocument = JSON.stringify({
            data: {
              type: 'venues',
              token: 'abc123',
              attributes: {},
              relationships: {}
            }
          })

          @promise.then =>
            @resource.save()

            moxios.wait =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

    describe '.clone()', ->
      beforeEach ->
        MyLibrary.Order.includes('giftCard', 'orderItems').select('price').find(1)
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)
          .then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

            @resource.assignAttributes({ paymentSource: MyLibrary.PaymentMethod.build() })
            @resource.errors().add('attribute', 'invalid')

            @clone = @resource.clone()

      it 'returns a new resource', ->
        @promise.then =>
          expect(@clone).not.toBe(@resource)

      it 'returns a klass of the same type as this', ->
        @promise.then =>
          expect(@clone.klass()).toBe(@resource.klass())

      it 'clones attributes', ->
        @promise.then =>
          expect(_.omit(@clone.attributes(), 'productId', 'customerId')).toEqual(@resource.attributes())

      it 'clones links', ->
        @promise.then =>
          expect(@clone.links()).toEqual(@resource.links())

      it 'clones errors', ->
        @promise.then =>
          expect(@clone.errors().size()).toEqual(1)

      it 'clones queryParams', ->
        @promise.then =>
          expect(@clone.queryParams()).toEqual({
            fields: { orders: ['price'] },
            include: ['giftCard', 'orderItems']
          })

      it 'sets relationships to clone', ->
        @promise.then =>
          @clone.klass().reflectOnAllAssociations().each (reflection) =>
            name = reflection.name

            expect(@clone.association(name).target).toEqual(@resource.association(name).target)

      it 'sets loaded relationships to loaded', ->
        @promise.then =>
          @clone.klass().reflectOnAllAssociations().each (reflection) =>
            name = reflection.name

            expect(@clone.association(name).loaded()).toEqual(@resource.association(name).loaded())

      it 'clones relationship resources attributes', ->
        @promise.then =>
          @clone.klass().reflectOnAllAssociations().each (reflection) =>
            name = reflection.name

            if reflection.collection()
              i = 0
              @clone.association(name).target.each (t) =>
                expect(t.attributes()).toEqual(@resource.association(name).target.get(i).attributes())
                i += 1
            else if @resource.association(name).target?
              expect(@clone.association(name).target.attributes()).toEqual(@resource.association(name).target.attributes())

      it 'clones relationship links', ->
        @promise.then =>
          @clone.klass().reflectOnAllAssociations().each (reflection) =>
            name = reflection.name

            expect(@clone.association(name).links()).toEqual(@resource.association(name).links())

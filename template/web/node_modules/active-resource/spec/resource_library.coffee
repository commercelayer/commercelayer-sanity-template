describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '.createResourceLibrary', ->
    beforeEach ->
      @myLibrary = ActiveResource.createResourceLibrary(
        'https://www.example.com',
        headers: { Authorization: 'xxx' },
        interface: ActiveResource.Interfaces.JsonApi,
        constantizeScope: window
      )

    it 'adds the baseUrl to the library', ->
      expect(@myLibrary.baseUrl).toEqual('https://www.example.com/')

    it 'adds the headers to the library', ->
      expect(@myLibrary.headers).toEqual({
        Authorization: 'xxx'
      })

    it 'adds the interface to the library', ->
      expect(@myLibrary.interface.constructor).toBe(ActiveResource.Interfaces.JsonApi)

    it 'adds the constantizeScope to the library', ->
      expect(@myLibrary.constantizeScope).toEqual(window)

    describe 'when interface not provided', ->
      beforeEach ->
        @myLibrary = ActiveResource.createResourceLibrary(
          'https://www.example.com',
          headers: { Authorization: 'xxx' }
        )

      it 'uses JsonApi interface', ->
        expect(@myLibrary.interface.constructor).toBe(ActiveResource::Interfaces::JsonApi)

  describe 'ResourceLibrary', ->
    beforeEach ->
      @MyLibrary = ActiveResource.createResourceLibrary(
        'https://www.example2.com',
        headers: { Authorization: 'xxx' }
      )
      moxios.install(@MyLibrary.interface.axios)

      class @MyLibrary.Product extends @MyLibrary.Base
        @className = 'Product'
        @queryName = 'products'

    afterEach ->
      moxios.uninstall(@MyLibrary.interface.axios)

    describe '#constantize', ->
      it 'returns the correct class', ->
        expect(@MyLibrary.constantize('Product')).toEqual(@MyLibrary.Product)

      describe 'when class does not exist', ->
        beforeEach -> @className = 'ClassThatDoesNotExist'

        it 'throws an error', ->
          expect(=> @MyLibrary.constantize(@className)).toThrow()

      describe 'when constantizeScope set', ->
        beforeEach ->
          @MyLibrary.constantizeScope = window

          class window.Product extends @MyLibrary.Base
            @className = 'Product'

        afterEach ->
          @MyLibrary.constantizeScope = null

        it 'uses the scope', ->
          expect(@MyLibrary.constantize('Product')).toEqual(window.Product)

    describe '#createResource', ->
      beforeEach ->
        @Order = @MyLibrary.createResource(
          class Order extends @MyLibrary.Base
            @define: ->
              @attributes('price')

              @belongsTo('product')
              @hasMany('comments')
        )

      it 'creates resource class that inherits from Base', ->
        expect(@Order.build().isA(@MyLibrary.Order)).toBeTruthy()

      it 'sets className', ->
        expect(@Order.className).toEqual('Order')

      it 'sets queryName', ->
        expect(@Order.queryName).toEqual('orders')

      it 'calls define', ->
        expect(@Order.reflections().comments).toBeDefined()

      it 'finds constants for other resources', ->
        expect(@Order.build().buildProduct().isA(@MyLibrary.Product)).toBeTruthy()

      describe 'custom className', ->
        beforeEach ->
          @Comment = @MyLibrary.createResource(
            class Comment extends @MyLibrary.Base
              @className = 'NotComment'
          )

        it 'does not override className', ->
          expect(@Comment.className).toEqual('NotComment')

        it 'derives queryName from className', ->
          expect(@Comment.queryName).toEqual('not_comments')

      describe 'custom library constantizeScope', ->
        beforeEach ->
          @MyLibrary = ActiveResource.createResourceLibrary(
            'https://www.example.com',
            constantizeScope: window
          )

          @GiftCard = @MyLibrary.createResource(
            class GiftCard extends @MyLibrary.Base
          )

        it 'adds klass to constantizeScope', ->
          expect(window.GiftCard).toBeDefined()

    describe 'when making a request', ->
      beforeEach ->
        @MyLibrary.Product.find(1)

        @promise = moxios.wait => true

      it 'uses the baseUrl', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().url).toContain('https://www.example2.com/')

      it 'uses the headers', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().headers['Authorization']).toEqual('xxx')

    describe 'when changing headers', ->
      beforeEach ->
        @MyLibrary.headers = { Authorization: 'Basic XYZ' }
        moxios.install(@MyLibrary.interface.axios)

        @MyLibrary.Product.find(1)

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)

      afterEach ->
        moxios.uninstall(@MyLibrary.interface.axios)

      it 'uses interface content type', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().headers['Content-Type']).toEqual('application/vnd.api+json')

      it 'uses the new headers', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().headers['Authorization']).toEqual('Basic XYZ')

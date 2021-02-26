describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Relation', ->
    describe 'when calling Relation extension methods on Base', ->
      it 'creates a new Relation', ->
        expect(MyLibrary.Product.where(token: 'jshf8e').klass()).toEqual(ActiveResource::Relation)

    describe 'when calling custom method of Base on Relation', ->
      it 'calls method', ->
        expect(MyLibrary.Product.where(token: 'jshf8e').customFind()).toEqual('found');

    describe '#links()', ->
      it 'returns the correct links', ->
        expect(MyLibrary.Product.where(token: 'jshf8e').links()).toEqual({ related: 'https://example.com/api/v1/products/' })

    describe '#all()', ->
      beforeEach ->
        MyLibrary.Product.all()
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
          .then =>
            @result = window.onSuccess.calls.mostRecent().args[0]

      it 'makes a call to retrieve all resources', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().url).toEqual(MyLibrary.Product.links()['related'])

      it 'returns a collection of the type requested', ->
        @promise.then =>
          expect(@result.isA?(ActiveResource::Collection)).toBeTruthy()

    describe '#each()', ->
      beforeEach ->
        @i = 0
        MyLibrary.Product.each (p) =>
          @i += 1

        @promise = moxios.wait =>
          @response = JsonApiResponses.Product.all.success
          moxios.requests.mostRecent().respondWith(@response)

      it 'makes a call to retrieve all resources', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().url).toEqual(MyLibrary.Product.links()['related'])

      it 'iterates over each resource returned', ->
        @promise.then =>
          expect(@i).toEqual(@response.response.data.length)

    describe '#find()', ->
      beforeEach ->
        MyLibrary.Product.find(1)
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)
          .then =>
            @result = window.onSuccess.calls.mostRecent().args[0]

      it 'makes a call to retrieve a resource', ->
        @promise.then =>
          expect(moxios.requests.mostRecent().url).toEqual(MyLibrary.Product.links()['related'] + '1/')

      it 'returns a resource of the type requested', ->
        @promise.then =>
          expect(@result.isA?(MyLibrary.Product)).toBeTruthy()

    describe '#findBy()', ->
      beforeEach ->
        MyLibrary.Product.findBy(token: 'jshf8e')
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
          .then =>
            @result = window.onSuccess.calls.mostRecent().args[0]

      it 'makes a call to retrieve filtered resources', ->
        @promise.then =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('filter[token]=jshf8e')

      it 'returns a resource of the type requested', ->
        @promise.then =>
          expect(@result.isA?(MyLibrary.Product)).toBeTruthy()

    describe '#first()', ->
      beforeEach ->
        MyLibrary.Product.first()
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
          .then =>
            @result = window.onSuccess.calls.mostRecent().args[0]

      it 'makes a call to retrieve a single resource via index', ->
        @promise.then =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('limit=1')

      it 'returns a resource of the type requested', ->
        @promise.then =>
          expect(@result.isA?(MyLibrary.Product)).toBeTruthy()

    describe '#last()', ->
      beforeEach ->
        MyLibrary.Product.last()
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
          .then =>
            @result = window.onSuccess.calls.mostRecent().args[0]

      it 'makes a call to retrieve a single resource starting from the back, via index', ->
        @promise.then =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('limit=1&offset=-1')

      it 'returns a resource of the type requested', ->
        @promise.then =>
          expect(@result.isA?(MyLibrary.Product)).toBeTruthy()

    describe '#where()', ->
      it 'adds filters to a query', ->
        MyLibrary.Product.where(token: 'jshf8e').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('filter[token]=jshf8e')

      it 'merges filters', ->
        MyLibrary.Product.where(token: 'jshf8e').where(another: 'param').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('filter[token]=jshf8e&filter[another]=param')

      describe 'when value is null', ->
        it 'sets filter to null', ->
          MyLibrary.OrderItem.where(order: null).all()

          moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())
            expect(@paramStr).toContain('filter[order]=%00')

      describe 'when value is resource', ->
        it 'adds resource primary key as value', ->
          MyLibrary.OrderItem.where(order: MyLibrary.Order.build(id: '5')).all()

          moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())
            expect(@paramStr).toContain('filter[order]=5')

      describe 'when value is array of resources', ->
        it 'adds resource primary key as value', ->
          MyLibrary.OrderItem.where(order: [
            MyLibrary.Order.build(id: '5'),
            MyLibrary.Order.build(id: '6')
          ]).all()

          moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())
            expect(@paramStr).toContain('filter[order]=5,6')

    describe '#order()', ->
      it 'adds sort params to a query', ->
        MyLibrary.Product.order(createdAt: 'asc').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('sort=created_at')

      it 'merges sorts', ->
        MyLibrary.Product.order(createdAt: 'asc').order(updatedAt: 'desc').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('sort=created_at,-updated_at')

    describe '#select()', ->
      it 'determines the root model to apply fields to', ->
        MyLibrary.Product.select('id', 'createdAt').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('fields[products]=id,created_at')

      it 'determines the model to apply nested fields to', ->
        MyLibrary.Product.select('id', { orders: 'price' }).all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('fields[products]=id&fields[orders]=price')

      it 'underscores class names', ->
        MyLibrary.Product.select(timeSlots: 'startsAt').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('fields[time_slots]=starts_at')

      it 'merges fields', ->
        MyLibrary.Product.select('id', 'createdAt').select(orders: 'price').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('fields[products]=id,created_at&fields[orders]=price')

    describe '#includes()', ->
      it 'adds root level includes', ->
        MyLibrary.Product.includes('merchant', 'attributeValues').all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('include=merchant,attribute_values')

      it 'adds nested includes', ->
        MyLibrary.Product.includes('merchant', { orders: ['attributeValues','giftCards'] }).all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('include=merchant,orders.attribute_values,orders.gift_cards')

    describe '#page()', ->
      beforeEach ->
        MyLibrary.Product.page(2).all()
        .then window.onSuccess

        @promise = moxios.wait => true

      it 'adds a page number to the query', ->
        @promise.then =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('page[number]=2')

      describe 'when no links in response', ->
        beforeEach ->
          @promise2 = @promise.then =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resources = window.onSuccess.calls.mostRecent().args[0]

        it 'hasNextPage returns false', ->
          @promise2.then =>
            expect(@resources.hasNextPage()).toBeFalsy();

        it 'nextPage returns null', ->
          @promise2.then =>
            expect(@resources.nextPage()).toBeUndefined();

        it 'hasPrevPage returns false', ->
          @promise2.then =>
            expect(@resources.hasPrevPage()).toBeFalsy();

        it 'prevPage returns null', ->
          @promise2.then =>
            expect(@resources.prevPage()).toBeUndefined();

      describe 'when next link in response', ->
        beforeEach ->
          @promise2 = @promise.then =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.paginated)
            .then =>
              @resources = window.onSuccess.calls.mostRecent().args[0]

        it 'hasNextPage returns true', ->
          @promise2.then =>
            expect(@resources.hasNextPage()).toBeTruthy();

        describe 'requesting nextPage', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resources.nextPage()
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.paginated)

          it 'nextPage requests next link', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/products?page[number]=3&page[size]=2')

          describe 'requesting same nextPage again', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                @requestCount = moxios.requests.count()
                @resources.nextPage()

            it 'does not request nextPage again', ->
              @promise4.then =>
                expect(@requestCount).toEqual(moxios.requests.count())

      describe 'when prev link in response', ->
        beforeEach ->
          @promise2 = @promise.then =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.paginated)
            .then =>
              @resources = window.onSuccess.calls.mostRecent().args[0]

        it 'hasPrevPage returns true', ->
          @promise2.then =>
            expect(@resources.hasPrevPage()).toBeTruthy();

        describe 'requesting prevPage', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resources.prevPage()
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.paginated)

          it 'prevPage requests prev link', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/products?page[number]=1&page[size]=2')

          describe 'requesting same prevPage again', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                @requestCount = moxios.requests.count()
                @resources.prevPage()

            it 'does not request prevPage again', ->
              @promise4.then =>
                expect(@requestCount).toEqual(moxios.requests.count())

    describe '#perPage()', ->
      it 'adds a page size to the query', ->
        MyLibrary.Product.perPage(2).all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('page[size]=2')

    describe '#limit()', ->
      it 'adds a limit to the query', ->
        MyLibrary.Product.limit(2).all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('limit=2')

    describe '#offset()', ->
      it 'adds an offset to the query', ->
        MyLibrary.Product.offset(2).all()

        moxios.wait =>
          @paramStr = requestParams(moxios.requests.mostRecent())
          expect(@paramStr).toContain('offset=2')

    describe '#build()', ->
      beforeEach ->
        @product = MyLibrary.Product.build(title: 'A product title')

      it 'assigns attributes to the built resource', ->
        expect(@product.title).toEqual('A product title')

      it 'builds a resource of Base\'s type', ->
        expect(@product.isA?(MyLibrary.Product)).toBeTruthy()

      describe 'when called from Relation', ->
        beforeEach ->
          @product = MyLibrary.Product.where(title: 'My title').build()

        it 'builds a resource of Relation\'s base type', ->
          expect(@product.isA?(MyLibrary.Product)).toBeTruthy()

        it 'adds filters to the attributes assigned', ->
          expect(@product.title).toEqual('My title')

    describe '#create()', ->
      describe 'in general', ->
        beforeEach ->
          MyLibrary.Product.create(title: 'Another title', description: 'Another description', window.onCompletion)

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
            .then =>
              @result = window.onCompletion.calls.mostRecent().args[0]

        it 'executes the completion callback', ->
          @promise.then =>
            expect(window.onCompletion).toHaveBeenCalled()

        it 'builds a resource of class\'s type', ->
          @promise.then =>
            expect(@result.isA?(MyLibrary.Product)).toBeTruthy()

        it 'assigns attributes to the created resource', ->
          @promise.then =>
            expect(@result.title).toEqual('Another title')

      describe 'on success', ->
        beforeEach ->
          MyLibrary.Product.create(title: 'Another title', description: 'Another description', window.onCompletion)

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
            .then =>
              @result = window.onCompletion.calls.mostRecent().args[0]

        it 'creates a persisted resource', ->
          @promise.then =>
            expect(@result.persisted( )).toBeTruthy()

      describe 'on failure', ->
        beforeEach ->
          MyLibrary.Product.create(title: '', description: '', window.onCompletion)

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.failure)
            .catch =>
              Promise.reject(@result = window.onCompletion.calls.mostRecent().args[0])

        it 'does not create a persisted resource', ->
          @promise.catch =>
            expect(@result.persisted?()).toBeFalsy()

        it 'adds errors', ->
          @promise.catch =>
            expect(@result.errors().empty?()).toBeFalsy()

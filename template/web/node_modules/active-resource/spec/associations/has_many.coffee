describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Associations', ->
    describe '::HasManyAssociation', ->
      describe 'reading', ->
        beforeEach ->
          MyLibrary.Product.includes('orders').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.includes)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'returns a CollectionProxy', ->
          @promise.then =>
            expect(@resource.orders().klass()).toBe(ActiveResource::Associations::CollectionProxy)

        describe '#all(cached: true)', ->
          it 'returns a collection', ->
            @promise.then =>
              expect(@resource.orders().all(cached: true).klass()).toBe(ActiveResource::Collection)

          it 'returns resources already loaded', ->
            @promise.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(2)

      describe 'loading', ->
        beforeEach ->
          MyLibrary.Product.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'uses relationship data URL', ->
          relationshipLinks = {
            self: 'https://example.com/api/v1/products/1/relationships/orders/',
            related: 'https://example.com/api/v1/products/1/orders/'
          }

          @promise2.then =>
            expect(@resource.orders().links()).toEqual(relationshipLinks)

        describe '#loadTarget()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.association('orders').loadTarget()
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @target = window.onSuccess.calls.mostRecent().args[0]

          it 'returns a collection', ->
            @promise4.then =>
              expect(@target.klass()).toBe(ActiveResource::CollectionResponse)

          it 'returns a collection of resources of reflection klass type', ->
            @promise4.then =>
              expect(@target.first().klass()).toBe(MyLibrary.Order)

          it 'caches the result on the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(@target.size())

        describe '#all()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().all()
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @result = window.onSuccess.calls.mostRecent().args[0]

          it 'returns a collection', ->
            @promise4.then =>
              expect(@result.klass()).toBe(ActiveResource::CollectionResponse)

          it 'returns a collection of resources of reflection klass type', ->
            @promise4.then =>
              expect(@result.first().klass()).toBe(MyLibrary.Order)

          it 'does not assign the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(0)

        describe '#load()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().where(some: 'value').load()
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @result = window.onSuccess.calls.mostRecent().args[0]

          it 'returns a collection', ->
            @promise4.then =>
              expect(@result.klass()).toBe(ActiveResource::CollectionResponse)

          it 'returns a collection of resources of reflection klass type', ->
            @promise4.then =>
              expect(@result.first().klass()).toBe(MyLibrary.Order)

          it 'does assign the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).not.toEqual(0)

          it 'queries the first relationship resource with filters', ->
            @promise4.then =>
              expect(requestParams(moxios.requests.mostRecent())).toContain('filter[some]=value')

        describe '#first()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().first()
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @result = window.onSuccess.calls.mostRecent().args[0]

          it 'queries the first resource of the relationship data URL', ->
            @promise4.then =>
              expect(requestParams(moxios.requests.mostRecent())).toContain('limit=1')

          it 'gets a resource of the relationship', ->
            @promise4.then =>
              expect(@result.klass()).toBe(MyLibrary.Order)

          it 'does not assign the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(0)

        describe '#last()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().last()
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @result = window.onSuccess.calls.mostRecent().args[0]

          it 'queries the first resource of the relationship data URL', ->
            @promise4.then =>
              expect(requestParams(moxios.requests.mostRecent())).toContain('limit=1&offset=-1')

          it 'gets a resource of the relationship', ->
            @promise4.then =>
              expect(@result.klass()).toBe(MyLibrary.Order)

          it 'does not assign the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(0)

        describe '#find()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().find(1)
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)
              .then =>
                @result = window.onSuccess.calls.mostRecent().args[0]

          it 'queries a specific member of the relationship data URL', ->
            memberLink = 'https://example.com/api/v1/products/1/orders/1'
            @promise4.then =>
              expect(moxios.requests.mostRecent().url).toContain(memberLink)

          it 'gets a resource of the relationship', ->
            @promise4.then =>
              expect(@result.klass()).toBe(MyLibrary.Order)

          it 'does not assign the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(0)

        describe '#findBy()', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().findBy(token: 'abc123')
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @result = window.onSuccess.calls.mostRecent().args[0]

          it 'queries the first relationship resource with filters', ->
            @promise4.then =>
              expect(requestParams(moxios.requests.mostRecent())).toContain('filter[token]=abc123', 'limit=1')

          it 'gets a resource of the relationship', ->
            @promise4.then =>
              expect(@result.klass()).toBe(MyLibrary.Order)

          it 'does not assign the target', ->
            @promise4.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(0)

        describe 'when using a Relation extension method', ->
          it 'extends the association relation', ->
            @promise2.then =>
              expect(@resource.orders().where().klass()).toBe(ActiveResource::Associations::CollectionProxy)

          it 'adds query params to the relationship URL query', ->
            @promise3 = @promise2.then =>
              @resource.orders().where(price: 5).all()
              @resource

            @promise3.then =>
              expect(requestParams(moxios.requests.mostRecent())).toContain('filter[price]=5')

          describe '#select()', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                @resource.orders().select('price','verificationCode').all()
                @resource

            it 'uses the correct model name for shallow fields', ->
              @promise3.then =>
                expect(requestParams(moxios.requests.mostRecent())).toContain('fields[orders]=price,verification_code')

          describe '#includes()', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                @resource.orders().includes('orderItems').all()
                .then window.onSuccess
                @resource

              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.includes)
                .then =>
                  @result = window.onSuccess.calls.mostRecent().args[0]

            it 'associates included resources', ->
              @promise4.then =>
                expect(@result.first().orderItems().all(cached: true).size()).toEqual(1)
                expect(@result.last().orderItems().all(cached: true).size()).toEqual(1)

      describe 'reloading', ->
        describe 'when nested associations were included', ->
          beforeEach ->
            MyLibrary.Product.includes(orders: 'comments').find(1)
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.includes)

            @promise2 = @promise.then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          it "adds the nested associations to queryParams['include']", ->
            @promise3 = @promise2.then =>
              @resource.orders().reload()
              @resource

            @promise3.then =>
              expect(requestParams(moxios.requests.mostRecent())).toContain('include=comments')

      describe 'assigning when owner is unpersisted', ->
        beforeEach ->
          @resource = MyLibrary.Product.build(id: 2)

          @target = [MyLibrary.Order.build(id: 1), MyLibrary.Order.build(id: 2)]
          @resource.orders().assign(@target)

        it 'replaces the target with the resource(s)', ->
          _.each @target, (t) =>
            expect(@resource.orders().all(cached: true).toArray()).toContain(t)

        it 'replaces the inverse target(s) of the resource(s)', ->
          _.each @target, (t) =>
            expect(t.product()).toBe(@resource)

        it 'replaces the resources(s) foreign key(s)', ->
          _.each @target, (t) =>
            expect(t.productId).toEqual(@resource.id)

        describe 'when assigning wrong type', ->
          it 'throws an error', ->
            expect(=> @resource.orders().assign(MyLibrary.OrderItem.build())).toThrow()

        describe 'when foreignKey defined', ->
          beforeEach ->
            class MyLibrary.HasManyClass extends MyLibrary.Base
              this.className = 'HasManyClass'
              this.queryName = 'has_many_classes'

              @hasMany 'orders', foreignKey: 'hasManyClassToken'

            @resource = MyLibrary.HasManyClass.build(id: 2)

            @target = MyLibrary.Order.build()

            @resource.orders().assign(@target)

          it 'assigns the inverse\'s foreign key', ->
            expect(@target.hasManyClassToken).toEqual(2)

        describe 'when primaryKey defined', ->
          beforeEach ->
            class MyLibrary.HasManyClass extends MyLibrary.Base
              this.className = 'HasManyClass'
              this.queryName = 'has_many_classes'

              @hasMany 'orders', primaryKey: 'token', foreignKey: 'hasManyClassToken'

            @resource = MyLibrary.HasManyClass.build(token: 'abc123')

            @target = MyLibrary.Order.build()

            @resource.orders().assign(@target)

          it 'assigns the inverse\'s foreign key', ->
            expect(@target.hasManyClassToken).toEqual('abc123')

        describe 'when target is polymorphic', ->
          beforeEach ->
            class MyLibrary.HasManyClass extends MyLibrary.Base
              this.className = 'HasManyClass'
              this.queryName = 'has_many_classes'

              @hasMany 'belongsToPolymorphics', as: 'hasManyAlias'

            class MyLibrary.BelongsToPolymorphic extends MyLibrary.Base
              this.className = 'BelongsToPolymorphic'
              this.queryName = 'belongs_to_polymorphics'

              @belongsTo 'hasManyAlias', polymorphic: true

            @resource = MyLibrary.HasManyClass.build(id: 1)

            @target = MyLibrary.BelongsToPolymorphic.build()

            @resource.belongsToPolymorphics().assign(@target)

          it 'assigns the inverse\'s foreign key', ->
            expect(@target.hasManyAliasId).toEqual(1)

          it 'assigns the inverse\'s foreign type', ->
            expect(@target.hasManyAliasType).toEqual('HasManyClass')

        # TODO: Make `foreignType` option work with specs

      describe 'assigning when owner is persisted', ->
        beforeEach ->
          MyLibrary.Product.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        describe 'in general', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              MyLibrary.Order.all()
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
                .then =>
                  @target = window.onSuccess.calls.mostRecent().args[0]

            @promise4 = @promise3.then =>
              @resource.orders().assign(@target)

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

          it 'persists the update to the relationship URL', ->
            relationshipLink = 'https://example.com/api/v1/products/1/relationships/orders/'
            @promise4.then =>
              expect(moxios.requests.mostRecent().url).toEqual(relationshipLink)

          it 'makes a PATCH request', ->
            @promise4.then =>
              expect(moxios.requests.mostRecent().method).toEqual('patch')

        describe 'when assigning collection of resources', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              MyLibrary.Order.all()
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
                .then =>
                  @target = window.onSuccess.calls.mostRecent().args[0]

            @promise4 = @promise3.then =>
              @resource.orders().assign(@target)
              @resource

          it 'sends a resource identifier document', ->
            resourceDocument = JSON.stringify({
              data: [
                {
                  type: 'orders',
                  id: '1'
                },
                {
                  type: 'orders',
                  id: '2'
                }
              ]
            })
            @promise4.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          describe 'when update succeeds', ->
            beforeEach ->
              @promise5 = @promise4.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

            it 'replaces the target with the resource(s)', ->
              @promise5.then =>
                @target.each (t) =>
                  expect(@resource.orders().all(cached: true).toArray()).toContain(t)

            it 'replaces the inverse target(s) of the resource(s)', ->
              @promise5.then =>
                @target.each (t) =>
                  expect(t.product()).toBe(@resource)

            it 'replaces the resources(s) foreign key(s)', ->
              @promise5.then =>
                @target.each (t) =>
                  expect(t.productId).toEqual(@resource.id)

          describe 'when update fails', ->
            beforeEach ->
              @promise5 = @promise4.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.failure)

            it 'does not replace the target with the resource(s)', ->
              @promise5.catch =>
                @target.each (t) =>
                  expect(@resource.orders().all(cached: true).toArray()).not.toContain(t)

            it 'does not replace the inverse target(s) of the resource(s)', ->
              @promise5.catch =>
                @target.each (t) =>
                  expect(t.product()).not.toBe(@resource)

            it 'does not replace the foreign key(s) of the resource(s)', ->
              @promise5.catch =>
                @target.each (t) =>
                  expect(t.productId).not.toEqual(@resource.id)

        describe 'when assigning empty collection', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.orders().assign([])
              @resource

          it 'sends an empty document', ->
            resourceDocument = JSON.stringify({
              data: []
            })
            @promise3.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          describe 'when update succeeds', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

            it 'replaces the target with an empty collection', ->
              @promise4.then =>
                expect(@resource.orders().all(cached: true).size()).toEqual(0)

        describe 'when assigning with save: false', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              MyLibrary.Order.all()
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
                .then =>
                  @target = window.onSuccess.calls.mostRecent().args[0]

                  @priorRequestsCount = moxios.requests.count()

                  @output = @resource.orders().assign(@target.toCollection(), false)

          it 'does not make a request', ->
            @promise3.then =>
              expect(moxios.requests.count()).toEqual(@priorRequestsCount)

          it 'does return assigned resources', ->
            @promise3.then =>
              expect(@output.klass()).toBe(ActiveResource::Collection)

          it 'replaces the target', ->
            @promise3.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(@target.size())

      describe 'building', ->
        beforeEach ->
          MyLibrary.Product.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

              @target = @resource.orders().build([{ price: 1 }, { price: 2 }])

        it 'builds resource(s) of reflection klass type', ->
          @promise.then =>
            @target.each (t) =>
              expect(t.klass()).toBe(MyLibrary.Order)

        it 'assigns attributes to the resource(s)', ->
          @promise.then =>
            @target.each (t) =>
              expect([1, 2]).toContain(t.price)

        it 'assigns the inverse target(s)', ->
          @promise.then =>
            @target.each (t) =>
              expect(t.product()).toBe(@resource)

        it 'assigns the target(s) foreign key(s)', ->
          @promise.then =>
            @target.each (t) =>
              expect(t.productId).toEqual(@resource.id)

        it 'adds the resource to the target', ->
          @promise.then =>
            @target.each (t) =>
              expect(@resource.orders().all(cached: true).toArray()).toContain(t)

      describe 'creating', ->
        beforeEach ->
          MyLibrary.Product.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        describe 'in general', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().create({ price: 3, verificationCode: 'abc123' }, window.onCompletion)
              @resource

            @promise3 = @promise2.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.success)
              .then =>
                @target = window.onCompletion.calls.mostRecent().args[0]

          it 'makes a request to the target\'s root URL', ->
            targetURL = 'https://example.com/api/v1/orders/'
            @promise3.then =>
              expect(moxios.requests.mostRecent().url).toEqual(targetURL)

          it 'makes a POST request', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().method).toEqual('post')

          it 'sends a resource document', ->
            resourceDocument = JSON.stringify({
              data: {
                type: 'orders',
                attributes: {
                  price: 3,
                  verification_code: 'abc123',
                  product_id: '1'
                },
                relationships: {
                  product: {
                    data: { type: 'products', id: '1' }
                  }
                }
              }
            })
            @promise3.then =>
              expect(extractData(moxios.requests.mostRecent().data)).toEqual(resourceDocument)

          it 'builds resource(s) of reflection klass type', ->
            @promise3.then =>
              expect(@target.klass()).toBe(MyLibrary.Order)

          it 'assigns attributes to the resource(s)', ->
            @promise3.then =>
              expect(@target.price).toEqual(3)

          it 'assigns the inverse target(s)', ->
            @promise3.then =>
              expect(@target.product()).toBe(@resource)

          it 'assigns the resource(s) foreign key(s)', ->
            @promise3.then =>
              expect(@target.productId).toEqual(@resource.id)

          it 'adds the resource(s) to the target', ->
            @promise3.then =>
              expect(@resource.orders().all(cached: true).toArray()).toContain(@target)

        describe 'when creation succeeds', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().create({ price: 3, verificationCode: 'abc123' }, window.onCompletion)
              @resource

            @promise3 = @promise2.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.success)
              .then =>
                @target = window.onCompletion.calls.mostRecent().args[0]

          it 'persists the resource', ->
            @promise3.then =>
              expect(@target.persisted?()).toBeTruthy()

        describe 'when creation fails', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().create({ price: 3 }, window.onCompletion)

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)
                .catch =>
                  Promise.reject(@target = window.onCompletion.calls.mostRecent().args[0])

          it 'does not persist the resource', ->
            @promise2.catch =>
              expect(@target.persisted?()).toBeFalsy()

          it 'adds errors to the resource', ->
            @promise2.catch =>
              expect(@target.errors().empty?()).toBeFalsy()

        describe 'when autosave association is present', ->
          beforeEach ->
            @promise2 = @promise.then =>
              MyLibrary.Order.hasMany 'orderItems', autosave: true

              orderItems = [
                MyLibrary.OrderItem.build(amount: 1.0),
                MyLibrary.OrderItem.build(amount: 2.0)
              ]
              @resource.orders().create({ price: 3, orderItems: orderItems }, window.onCompletion)
              @resource

          afterEach ->
            MyLibrary.Order.hasMany 'orderItems'
            MyLibrary.Order.resetQueryParams()

          it 'adds the association attributes to the resource document', ->
            resourceDocument = {
              type: 'orders',
              attributes: {
                price: 3,
                product_id: '1'
              },
              relationships: {
                product: {
                  data: { type: 'products', id: '1' }
                },
                order_items: {
                  data: [
                    {
                      type: 'order_items',
                      attributes: {
                        amount: 1.0
                      },
                      relationships: {}
                    },
                    {
                      type: 'order_items',
                      attributes: {
                        amount: 2.0
                      },
                      relationships: {}
                    }
                  ]
                }
              }
            }
            @promise2.then =>
              expect(JSON.parse(moxios.requests.mostRecent().data)['data']).toEqual(resourceDocument)

          it "adds the autosave association to queryOptions['include']", ->
            @promise2.then =>
              expect(JSON.parse(moxios.requests.mostRecent().data)['include']).toContain('order_items')

          describe 'when creation succeeds', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)
                .then =>
                  @order = window.onCompletion.calls.mostRecent().args[0]

            it 'persists the autosave association', ->
              @promise3.then =>
                @order.orderItems().all(cached: true).each (o) ->
                  expect(o.persisted()).toBeTruthy()

        describe 'when owner is not persisted', ->
          it 'throws exception', ->
            resource = MyLibrary.Product.build()
            expect(-> resource.orders().create({ price: 5 })).toThrow()

      describe 'pushing', ->
        beforeEach ->
          MyLibrary.Product.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            MyLibrary.Order.all()
            .then window.onSuccess

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
              .then =>
                @target = window.onSuccess.calls.mostRecent().args[0]

          @promise3 = @promise2.then =>
            @resource.orders().push(@target)
            @resource

        describe 'in general', ->
          it 'makes a request to the target\'s relationship URL', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/products/1/relationships/orders/')

          it 'makes a POST request', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().method).toEqual('post')

          it 'sends a resource identifier document', ->
            resourceDocument = JSON.stringify({
              data: [
                { type: 'orders', id: '1' },
                { type: 'orders', id: '2' }
              ]
            })
            @promise3.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

        describe 'when pushing succeeds', ->
          beforeEach ->
            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

          it 'assigns the inverse target(s) of the resource(s)', ->
            @promise4.then =>
              @target.each (t) =>
                expect(t.product()).toBe(@resource)

          it 'assigns the resource(s) foreign key(s)', ->
            @promise4.then =>
              @target.each (t) =>
                expect(t.productId).toEqual(@resource.id)

          it 'adds the resource(s) to the target', ->
            @promise4.then =>
              @target.each (t) =>
                expect(@resource.orders().all(cached: true).toArray()).toContain(t)

        describe 'when pushing fails', ->
          beforeEach ->
            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.failure)

          it 'does not assign the inverse target(s) of the resource(s)', ->
            @promise4.catch =>
              @target.each (t) =>
                expect(t.product()).not.toBe(@resource)

          it 'does not assign the resource(s) foreign key(s)', ->
            @promise4.catch =>
              @target.each (t) =>
                expect(t.productId).not.toEqual(@resource.id)

          it 'does not add the resource(s) to the target', ->
            @promise4.catch =>
              @target.each (t) =>
                expect(@resource.orders().all(cached: true).toArray()).not.toContain(t)

      describe 'deleting', ->
        beforeEach ->
          MyLibrary.Product.includes('orders').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.includes)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

              @target = @resource.orders().all(cached: true)

        describe 'in general', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().delete(@target.first())
              @resource

          it 'makes a request to the target\'s relationship URL', ->
            @promise2.then =>
              expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/products/1/relationships/orders/')

          it 'makes a DELETE request', ->
            @promise2.then =>
              expect(moxios.requests.mostRecent().method).toEqual('delete')

          it 'sends a resource identifier document', ->
            resourceDocument = JSON.stringify({
              data: [
                { type: 'orders', id: '1' }
              ]
            })
            @promise2.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

        describe 'when deleting succeeds', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().delete(@target.first())

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

          it 'removes the inverse target(s) of the resource(s)', ->
            @promise2.then =>
              expect(@target.first().product()).toBeNull()

          it 'removes the resource(s) foreign key(s)', ->
            @promise2.then =>
              expect(@target.first().productId).toBeNull()

          it 'removes the resource(s) from the target', ->
            @promise2.then =>
              expect(@resource.orders().all(cached: true).toArray()).not.toContain(@target.first())

        describe 'when deleting fails', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().delete(@target.first())

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.failure)

          it 'does not remove the inverse target(s) of the resource(s)', ->
            @promise2.catch =>
              expect(@target.first().product()).toBe(@resource)

          it 'does not remove the resource(s) foreign key(s)', ->
            @promise2.catch =>
              expect(@target.first().productId).toEqual(@resource.id)

          it 'does not remove the resource(s) from the target', ->
            @promise2.catch =>
              expect(@resource.orders().all(cached: true).toArray()).toContain(@target.first())

        describe '#deleteAll()', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.orders().deleteAll()

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

          it 'sends a resource identifier document with all resources', ->
            resourceDocument = JSON.stringify({
              data: [
                { type: 'orders', id: '1' },
                { type: 'orders', id: '2' }
              ]
            })
            @promise2.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          it 'deletes all resources from the target', ->
            @promise2.then =>
              expect(@resource.orders().all(cached: true).size()).toEqual(0)

      describe '#empty()', ->
        describe 'when target is empty', ->
          beforeEach ->
            MyLibrary.Product.find(1)
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]

          it 'returns true', ->
            @promise.then =>
              expect(@resource.orders().empty()).toBeTruthy()

        describe 'when target is not empty', ->
          beforeEach ->
            MyLibrary.Product.includes('orders').find(1)
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.includes)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]

          it 'returns false', ->
            @promise.then =>
              expect(@resource.orders().empty()).toBeFalsy()

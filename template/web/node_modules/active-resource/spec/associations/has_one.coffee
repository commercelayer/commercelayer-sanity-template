describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Associations', ->
    describe '::HasOneAssociation', ->
      describe 'reading', ->
        beforeEach ->
          MyLibrary.GiftCard.includes('order').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.raw)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'returns the target', ->
          @promise.then =>
            expect(@resource.order().isA?(MyLibrary.Order)).toBeTruthy()

        it 'appends / to relationship links', ->
          @promise.then =>
            expect(@resource.association('order').links()['related']).toEqual('https://example.com/api/v1/gift_cards/1/order/')

        it 'appends / to relationship links', ->
          expect(@resource.association('order').links()['related']).toEqual('https://example.com/api/v1/gift_cards/1/order/')

      describe 'loading', ->
        beforeEach ->
          MyLibrary.GiftCard.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            @resource.loadOrder()
            .then window.onSuccess

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)

        it 'queries the relationship URL', ->
          @promise2.then =>
            expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/gift_cards/1/order/')

        it 'returns the target', ->
          @promise2.then =>
            @target = window.onSuccess.calls.mostRecent().args[0]
            expect(@target.isA?(MyLibrary.Order)).toBeTruthy()

      describe 'assigning', ->
        beforeEach ->
          MyLibrary.GiftCard.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.success)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

            @target = MyLibrary.Order.build()

            @resource.assignOrder(@target)
            @resource

        it 'assigns the target', ->
          @promise2.then =>
            expect(@resource.order()).toEqual(@target)

        it 'assigns the inverse target', ->
          @promise2.then =>
            expect(@resource.order().giftCard()).toEqual(@resource)

        it 'assigns the inverse\'s foreign key', ->
          @promise2.then =>
            expect(@resource.order().giftCardId).toEqual(@resource.id)

        describe 'when assigning wrong type', ->
          it 'throws an error', ->
            expect(=> @resource.assignOrder(MyLibrary.OrderItem.build())).toThrow()

        describe 'when foreignKey defined', ->
          beforeEach ->
            class MyLibrary.HasOneClass extends MyLibrary.Base
              @hasOne 'order', foreignKey: 'hasOneClassToken'

            @resource2 = MyLibrary.HasOneClass.build(id: 2)

            @target2 = MyLibrary.Order.build()

            @resource2.assignOrder(@target2)

          it 'assigns the inverse\'s foreign key', ->
            expect(@resource2.order().hasOneClassToken).toEqual(2)

        describe 'when primaryKey defined', ->
          beforeEach ->
            class MyLibrary.HasOneClass extends MyLibrary.Base
              this.className = 'HasOneClass'

              @hasOne 'order', primaryKey: 'token'

            @resource2 = MyLibrary.HasOneClass.build(token: 'abc123')

            @target2 = MyLibrary.Order.build()

            @resource2.assignOrder(@target2)

          it 'assigns the inverse\'s foreign key', ->
            expect(@resource2.order().hasOneClassId).toEqual('abc123')

        describe 'when target is polymorphic', ->
          beforeEach ->
            class MyLibrary.HasOneClass extends MyLibrary.Base
              this.className = 'HasOneClass'

              @hasOne 'belongsToPolymorphicClass', as: 'hasOneAlias'

            class MyLibrary.BelongsToPolymorphicClass extends MyLibrary.Base
              this.className = 'BelongsToPolymorphicClass'

              @belongsTo 'hasOneAlias', polymorphic: true

            @resource2 = MyLibrary.HasOneClass.build(id: 1)

            @target2 = MyLibrary.BelongsToPolymorphicClass.build()

            @resource2.assignBelongsToPolymorphicClass(@target2)

          it 'assigns the inverse\'s foreign key', ->
            expect(@resource2.belongsToPolymorphicClass().hasOneAliasId).toEqual(1)

          it 'assigns the inverse\'s foreign type', ->
            expect(@resource2.belongsToPolymorphicClass().hasOneAliasType).toEqual('HasOneClass')

        # TODO: Make `foreignType` option work with specs

      describe 'updating', ->
        beforeEach ->
          MyLibrary.GiftCard.includes('order').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.includes)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        describe 'in general', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @target = MyLibrary.Order.build(id: 2)

              @resource.updateOrder(@target)
              @resource

          it 'persists the update to the relationship URL', ->
            url = 'https://example.com/api/v1/gift_cards/1/relationships/order/'
            @promise2.then =>
              expect(moxios.requests.mostRecent().url).toEqual(url)

          it 'makes a PATCH request', ->
            @promise2.then =>
              expect(moxios.requests.mostRecent().method).toEqual('patch')

        describe 'when assigning a resource', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @target = MyLibrary.Order.build(id: 2)

              @resource.updateOrder(@target)
              @resource

          it 'sends a resource identifier document', ->
            resourceDocument =
              JSON.stringify({
                data: {
                  type: 'orders',
                  id: '2'
                }
              })

            @promise2.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          describe 'when update succeeds', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

            it 'assigns the target', ->
              @promise3.then =>
                expect(@resource.order()).toEqual(@target)

            it 'assigns the inverse target', ->
              @promise3.then =>
                expect(@resource.order().giftCard()).toEqual(@resource)

            it 'assigns the inverse\'s foreign key', ->
              @promise3.then =>
                expect(@resource.order().giftCardId).toEqual(@resource.id)

          describe 'when update fails', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.failure)

            it 'does not assign the target', ->
              @promise3.catch =>
                expect(@resource.order().id).toEqual('1')

            it 'does not assign the inverse target', ->
              @promise3.catch =>
                expect(@target.giftCard()).toBeNull()

            it 'does not assign the inverse\'s foreign key', ->
              @promise3.catch =>
                expect(@target.giftCardId).toBeUndefined()

        describe 'when assigning null', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @oldTarget = @resource.order()
              @resource.updateOrder(null)
              @resource

          it 'sends a blank document', ->
            @promise2.then =>
              expect(moxios.requests.mostRecent().data).toEqual(JSON.stringify({ data: null }))

          describe 'when update succeeds', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

            it 'assigns null', ->
              @promise3.then =>
                expect(@resource.order()).toBeNull()

            # TODO: Add inverse unassignment (Rails does this automagically since it reloads association
            # targets using nullified foreign keys, resulting in null inverse for old target)
            #it 'unassigns the inverse of the old target', ->
              #expect(@oldTarget.giftCard()).toBeNull()

            it 'assigns the inverse\'s foreign key', ->
              @promise3.then =>
                expect(@oldTarget.giftCardId).toBeNull()

      describe 'building', ->
        beforeEach ->
          MyLibrary.GiftCard.includes('order').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.includes)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]
              @target = @resource.buildOrder(price: 10)

        it 'builds a resource of reflection klass type', ->
          @promise.then =>
            expect(@target.klass()).toBe(MyLibrary.Order)

        it 'assigns the attributes to the target', ->
          @promise.then =>
            expect(@target.price).toEqual(10)

        it 'assigns the inverse target', ->
          @promise.then =>
            expect(@target.giftCard()).toBe(@resource)

        it 'adds a foreign key to the built target', ->
          @promise.then =>
            expect(@target.giftCardId).toEqual(@resource.id)

        describe 'when className is specified', ->
          beforeEach ->
            class MyLibrary.MyClass extends MyLibrary.Base
              @hasOne 'randomClass', className: 'GiftCard'

            @resource2 = MyLibrary.MyClass.build()
            @target2 = @resource2.buildRandomClass()

          it 'builds a resource of className type', ->
            expect(@target2.klass()).toBe(MyLibrary.GiftCard)

      describe 'creating', ->
        beforeEach ->
          MyLibrary.GiftCard.includes('order').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.includes)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        describe 'in general', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.createOrder(price: 3, verificationCode: 'asd')
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.success)
                .then =>
                  @target = window.onSuccess.calls.mostRecent().args[0]

          it 'makes a request to the target\'s root URL', ->
            @promise2.then =>
              expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/orders/')

          it 'makes a POST request', ->
            @promise2.then =>
              expect(moxios.requests.mostRecent().method).toEqual('post')

          it 'sends a resource document', ->
            resourceDocument =
              JSON.stringify({
                data: {
                  type: 'orders'
                  attributes: {
                    price: 3,
                    verification_code: 'asd',
                    gift_card_id: '1'
                  },
                  relationships: {
                    gift_card: {
                      data: { type: 'gift_cards', id: '1' }
                    }
                  }
                }
              })
            @promise2.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          it 'builds a resource of reflection klass type', ->
            @promise2.then =>
              expect(@target.klass()).toBe(MyLibrary.Order)

          it 'assigns the attributes to the target', ->
            @promise2.then =>
              expect(@target.price).toEqual(3)

          it 'assigns the inverse target', ->
            @promise2.then =>
              expect(@target.giftCard()).toBe(@resource)

          it 'adds a foreign key to the built target', ->
            @promise2.then =>
              expect(@target.giftCardId).toEqual(@resource.id)

        describe 'when creation succeeds', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.createOrder(price: 10, verificationCode: 'asd')
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.success)
                .then =>
                  @target = window.onSuccess.calls.mostRecent().args[0]

          it 'persists the target', ->
            @promise2.then =>
              expect(@target.persisted?()).toBeTruthy()

        describe 'when creation fails', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @resource.createOrder(price: 10)
              .catch window.onFailure

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)
                .catch =>
                  Promise.reject(@target = window.onFailure.calls.mostRecent().args[0])

          it 'does not persist the target', ->
            @promise2.catch =>
              expect(@target.persisted?()).toBeFalsy()

          it 'adds errors to the target', ->
            @promise2.catch =>
              expect(@target.errors().empty()).toBeFalsy()

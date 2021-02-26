describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Associations', ->
    describe '::BelongsToAssociation', ->
      describe 'reading', ->
        beforeEach ->
          MyLibrary.Order.includes('giftCard').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'returns the target', ->
          @promise.then =>
            expect(@resource.giftCard().isA?(MyLibrary.GiftCard)).toBeTruthy()

      describe 'loading', ->
        beforeEach ->
          MyLibrary.Order.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)

          @promise2 = @promise.then =>
            resource = window.onSuccess.calls.mostRecent().args[0]
            resource.loadGiftCard()
            .then window.onSuccess

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.find.success)

        it 'queries the relationship URL', ->
          @promise2.then =>
            expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/orders/1/gift_card/')

        it 'returns the target', ->
          @promise2.then =>
            target = window.onSuccess.calls.mostRecent().args[0]
            expect(target.isA?(MyLibrary.GiftCard)).toBeTruthy()

      describe 'assigning', ->
        beforeEach ->
          MyLibrary.Order.find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

            @target = MyLibrary.GiftCard.build(id: 2)

            @resource.assignGiftCard(@target)

        it 'assigns the target', ->
          @promise2.then =>
            expect(@resource.giftCard()).toEqual(@target)

        it 'assigns the inverse target', ->
          @promise2.then =>
            expect(@resource.giftCard().order()).toEqual(@resource)

        it 'assigns the owner\'s foreign key', ->
          @promise2.then =>
            expect(@resource.giftCardId).toEqual(@target.id)

        describe 'when assigning wrong type', ->
          it 'throws an error', ->
            @promise2.then =>
              expect(=> @resource.assignGiftCard(MyLibrary.OrderItem.build())).toThrow()

        describe 'when foreignKey defined', ->
          beforeEach ->
            class MyLibrary.BelongsToClass extends MyLibrary.Base
              this.className = 'BelongsToClass'

              @belongsTo 'giftCard', foreignKey: 'giftCardToken'

            @resource = MyLibrary.BelongsToClass.build()

            @target = MyLibrary.GiftCard.build(id: 'abc123')

            @resource.assignGiftCard(@target)

          it 'assigns the owner\'s foreign key', ->
            expect(@resource.giftCardToken).toEqual('abc123')

        describe 'when primaryKey defined', ->
          beforeEach ->
            class MyLibrary.BelongsToClass extends MyLibrary.Base
              this.className = 'BelongsToClass'

              @belongsTo 'giftCard', primaryKey: 'token', foreignKey: 'giftCardToken'

            @resource = MyLibrary.BelongsToClass.build()

            @target = MyLibrary.GiftCard.build(token: 'abc123')

            @resource.assignGiftCard(@target)

          it 'assigns the owner\'s foreign key', ->
            expect(@resource.giftCardToken).toEqual('abc123')

        describe 'when polymorphic', ->
          beforeEach ->
            @resource = MyLibrary.Comment.build()

            @target = MyLibrary.Order.build(id: 1)

            @resource.assignResource(@target)

          it 'assigns the owner\'s foreign key', ->
            expect(@resource.resourceId).toEqual(1)

          it 'assigns the owner\'s foreign type', ->
            expect(@resource.resourceType).toEqual('Order')

      describe 'updating', ->
        beforeEach ->
          MyLibrary.Order.includes('giftCard').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        describe 'in general', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @target = MyLibrary.GiftCard.build(id: 2)
              @resource.updateGiftCard(@target)
              @resource

          it 'persists the update to the relationship URL', ->
            @promise3.then =>
              url = 'https://example.com/api/v1/orders/1/relationships/gift_card/'
              expect(moxios.requests.mostRecent().url).toEqual(url)

          it 'makes a PATCH request', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().method).toEqual('patch')

        describe 'when assigning a resource', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @target = MyLibrary.GiftCard.build(id: 2)
              @resource.updateGiftCard(@target)
              @resource

          it 'sends a resource identifier document', ->
            resourceDocument = JSON.stringify(
              {
                data: {
                  type: 'gift_cards',
                  id: '2'
                }
              }
            )

            @promise3.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          describe 'when update succeeds', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

            it 'assigns the target', ->
              @promise4.then =>
                expect(@resource.giftCard()).toEqual(@target)

            it 'assigns the inverse target', ->
              @promise4.then =>
                expect(@resource.giftCard().order()).toEqual(@resource)

            it 'assigns the owner\'s foreign key', ->
              @promise4.then =>
                expect(@resource.giftCardId).toEqual(@target.id)

          describe 'when update fails', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.failure)

            it 'does not assign the target', ->
              @promise4.catch =>
                expect(@resource.giftCard()).not.toBe(@target)

            it 'does not assign the inverse target', ->
              @promise4.catch =>
                expect(@target.order()).toBeNull()

            it 'does not assign the owner\'s foreign key', ->
              @promise4.catch =>
                expect(@resource.giftCardId).toEqual('5')

        describe 'when assigning null', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @oldTarget = @resource.giftCard()
              @resource.updateGiftCard(null)
              @resource

          it 'sends a blank document', ->
            @promise3.then =>
              expect(moxios.requests.mostRecent().data).toEqual(JSON.stringify({ data: null }))

          describe 'when update succeeds', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

            it 'assigns null', ->
              @promise4.then =>
                expect(@resource.giftCard()).toBeNull()

            # TODO: Add inverse unassignment (Rails does this automagically since it reloads association
            # targets using nullified foreign keys, resulting in null inverse for old target)
            #it 'unassigns the inverse of the old target', ->
              #expect(@oldTarget.order()).toBeNull()

            it 'assigns the owner\'s foreign key', ->
              @promise4.then =>
                expect(@resource.giftCardId).toBeNull()

      describe 'building', ->
        describe 'inverseOf singular association', ->
          beforeEach ->
            MyLibrary.Order.includes('giftCard').find(1)
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)

            @promise2 = @promise.then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]
              @target = @resource.buildGiftCard(value: 5)

          it 'builds a resource of reflection klass type', ->
            @promise2.then =>
              expect(@target.klass()).toBe(MyLibrary.GiftCard)

          it 'assigns the attributes to the target', ->
            @promise2.then =>
              expect(@target.value).toEqual(5)

          it 'assigns the inverse target', ->
            @promise2.then =>
              expect(@target.order()).toBe(@resource)

          describe 'when className is specified', ->
            beforeEach ->
              class MyLibrary.MyClass extends MyLibrary.Base
                @className = 'MyClass'

                @belongsTo 'randomClass', className: 'GiftCard'

              @resource = MyLibrary.MyClass.build()
              @target = @resource.buildRandomClass(id: 1)

            it 'builds a resource of className type', ->
              expect(@target.klass()).toBe(MyLibrary.GiftCard)

            it 'builds the resource with foreign key of reflection name', ->
              expect(@resource.randomClassId).toEqual(1)

        describe 'inverseOf collection association', ->
          beforeEach ->
            MyLibrary.Order.find(1)
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)

            @promise2 = @promise.then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]
              @target = @resource.buildCustomer()

          it 'builds a resource of reflection klass type', ->
            @promise2.then =>
              expect(@target.klass()).toBe(MyLibrary.Customer)

          it 'assigns the inverse target', ->
            @promise2.then =>
              expect(@target.orders().target().toArray()).toEqual([@resource])

      describe 'creating', ->
        beforeEach ->
          MyLibrary.Order.includes('giftCard').find(1)
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)

          @promise2 = @promise.then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        describe 'in general', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.createGiftCard(initialValue: 10, value: 5)
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.save.success)

              moxios.wait =>
                @target = window.onSuccess.calls.mostRecent().args[0]

          it 'makes a request to the target\'s root URL', ->
            @promise4.then =>
              expect(moxios.requests.mostRecent().url).toEqual('https://example.com/api/v1/gift_cards/')

          it 'makes a POST request', ->
            @promise4.then =>
              expect(moxios.requests.mostRecent().method).toEqual('post')

          it 'sends a resource document', ->
            resourceDocument = JSON.stringify(
              {
                data: {
                  type: 'gift_cards'
                  attributes: {
                    initial_value: 10,
                    value: 5
                  },
                  relationships: {
                    order: {
                      data: { type: 'orders', id: '1' }
                    }
                  }
                }
              }
            )

            @promise4.then =>
              expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

          it 'builds a resource of reflection klass type', ->
            @promise4.then =>
              expect(@target.isA(MyLibrary.GiftCard)).toBeTruthy()

          it 'assigns the attributes to the target', ->
            @promise4.then =>
              expect(@target.value).toEqual(5)

          it 'assigns the inverse target', ->
            @promise4.then =>
              expect(@target.order()).toBe(@resource)

        describe 'when creation succeeds', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.createGiftCard(initialValue: 10, value: 5)
              .then window.onSuccess
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.save.success)
              @target = window.onSuccess.calls.mostRecent().args[0]

          it 'persists the target', ->
            @promise4.then =>
              expect(@target.persisted?()).toBeTruthy()

        describe 'when creation fails', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.createGiftCard(value: 5)
              .catch window.onFailure
              @resource

            @promise4 = @promise3.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.GiftCard.save.failure)
              .catch =>
                @target = window.onFailure.calls.mostRecent().args[0]

          it 'does not persist the target', ->
            @promise4.then =>
              expect(@target.persisted?()).toBeFalsy()

          it 'adds errors to the target', ->
            @promise4.then =>
              expect(@target.errors().empty?()).toBeFalsy()

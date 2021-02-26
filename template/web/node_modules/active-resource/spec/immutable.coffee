describe 'ActiveResource', ->
  beforeEach ->
    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Immutable', ->
    beforeAll ->
      window.ImmutableLibrary = ActiveResource.createResourceLibrary(
        'https://example.com/api/v1',
        immutable: true
      )

      moxios.install(ImmutableLibrary.interface.axios)

      class ImmutableLibrary.Comment extends ImmutableLibrary.Base
        this.className = 'Comment'
        this.queryName = 'comments'

        this.belongsTo 'order'

      class ImmutableLibrary.Customer extends ImmutableLibrary.Base
        this.className = 'Customer'
        this.queryName = 'customers'

        this.attributes('name')

        this.hasMany 'orders', inverseOf: 'customer'

      class ImmutableLibrary.GiftCard extends ImmutableLibrary.Base
        this.className = 'GiftCard'
        this.queryName = 'gift_cards'

        this.hasOne 'order'

      class ImmutableLibrary.Order extends ImmutableLibrary.Base
        this.className = 'Order'
        this.queryName = 'orders'

        this.attributes('price', 'tax')

        this.belongsTo 'customer', autosave: true, inverseOf: 'orders'
        this.belongsTo 'giftCard'

        this.hasMany 'comments'
        this.hasMany 'orderItems', autosave: true, inverseOf: 'order'

        this.hasOne 'rating', autosave: true

      class ImmutableLibrary.OrderItem extends ImmutableLibrary.Base
        this.className = 'OrderItem'
        this.queryName = 'order_items'

        this.attributes('amount')

        this.belongsTo 'order', inverseOf: 'orderItems'

      class ImmutableLibrary.Rating extends ImmutableLibrary.Base
        this.className = 'Rating'
        this.queryName = 'ratings'

        this.attributes('value')

        this.belongsTo 'order'

    describe 'adding errors', ->
      beforeEach ->
        @resource = ImmutableLibrary.Order.build()

      describe '#add', ->
        beforeEach ->
          @resource2 = @resource.errors().add('field', 'code', 'message')

        it 'returns new resource', ->
          expect(@resource2).not.toBe(@resource)

        it 'adds error to new resource', ->
          expect(@resource2.errors().size()).toBe(1)

      describe '#addAll', ->
        beforeEach ->
          @resource2 = @resource.errors().addAll(
            ['field', 'code', 'message'],
            ['field2', 'code2', 'message2'],
          )

        it 'returns new resource', ->
          expect(@resource2).not.toBe(@resource)

        it 'adds errors to new resource', ->
          expect(@resource2.errors().size()).toBe(2)

    describe 'propagating errors', ->
      beforeEach ->
        @resource = ImmutableLibrary.Order.build()

      describe 'singular relationship', ->
        beforeEach ->
          @resource = @resource.buildCustomer()
          @customer = @resource.customer()

          @errors = ActiveResource.Collection.build([
            {
              field: 'customer',
              code: 'invalid',
              message: 'invalid'
            },
            {
              field: 'customer.firstName',
              code: 'invalid',
              message: 'invalid'
            },
            {
              field: 'customer.lastName',
              code: 'invalid',
              message: 'invalid'
            }
          ])

          @resource.errors().propagate(@errors)

        it 'adds nested base errors to the nested relationship resource base', ->
          expect(@resource.customer().errors().forBase().size()).toEqual(1)

        it 'adds nested field errors to the nested relationship resource', ->
          expect(@resource.customer().errors().forField('firstName').size()).toEqual(1)

        it 'clones the relationship resource', ->
          expect(@resource.customer()).not.toBe(@customer)

        describe 'repeated propagation', ->
          beforeEach ->
            @resource.errors().propagate(@errors)

          it 'does not result in duplicate errors', ->
            expect(@resource.customer().errors().forField('firstName').size()).toEqual(1)

      describe 'collection relationship', ->
        beforeEach ->
          @resource = @resource.orderItems().build()
          @orderItem = @resource.orderItems().target().first()

          @errors = ActiveResource.Collection.build([
            {
              field: 'orderItems',
              code: 'invalid',
              message: 'invalid'
            },
            {
              field: 'orderItems.amount',
              code: 'invalid',
              message: 'invalid'
            }
          ])

          @resource.errors().propagate(@errors)

        it 'adds non-nested errors to the resource', ->
          expect(@resource.errors().forField('orderItems').size()).toEqual(1)

        it 'adds nested errors to the nested relationship resource', ->
          expect(@resource.orderItems().target().first().errors().forField('amount').size()).toEqual(1)

        it 'clones the relationship resource', ->
          expect(@resource.orderItems().target().first()).not.toBe(@orderItem)

        describe 'repeated propagation', ->
          beforeEach ->
            @resource.errors().propagate(@errors)

          it 'does not result in duplicate errors', ->
            expect(@resource.orderItems().target().first().errors().forField('amount').size()).toEqual(1)

    describe 'when resource unpersisted', ->
      beforeEach ->
        @resource = ImmutableLibrary.Order.build()

      describe 'assigning attributes', ->
        beforeEach ->
          @resource2 = @resource.assignAttributes({
            price: 3.0
          })

        it 'clones a new resource', ->
          expect(@resource).not.toBe(@resource2)

        it 'does not change the old resource', ->
          expect(@resource.price).toBeUndefined()

        it 'does not track the change on the old resource', ->
          expect(@resource.changedFields().include('price')).toBeFalsy()

        it 'creates a new resource with the changes', ->
          expect(@resource2.price).toEqual(3.0)

        it 'creates a new resource with the changed attribute tracked', ->
          expect(@resource2.changedFields().include('price')).toBeTruthy()

        describe 'saving the resource', ->
          beforeEach ->
            @resource2.save (resource3) =>
              @resource3 = resource3

            null

          describe 'on success', ->
            beforeEach ->
              @promise = moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)

            it 'clones a new resource', ->
              @promise.then =>
                expect(@resource2).not.toBe(@resource3)

            it 'does not persist the old resource', ->
              @promise.then =>
                expect(@resource2.persisted()).toBeFalsy()

            it 'does not persist new changes from the server to the old resource', ->
              @promise.then =>
                expect(@resource2.tax).toBeUndefined()

            it 'indicates the attribute was still changed on the old resource', ->
              @promise.then =>
                expect(@resource2.changedFields().include('price')).toBeTruthy()

            it 'persists a new resource', ->
              @promise.then =>
                expect(@resource3.persisted()).toBeTruthy()

            it 'persists new changes from the server', ->
              @promise.then =>
                expect(@resource3.tax).not.toBeUndefined()

            it 'does not indicate the attribute was changed', ->
              @promise.then =>
                expect(@resource3.changedFields().include('price')).toBeFalsy()

          describe 'on failure', ->
            beforeEach ->
              @promise = moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

            it 'clones a new resource', ->
              @promise.catch =>
                expect(@resource2).not.toBe(@resource3)

            it 'does not persist the old resource', ->
              @promise.catch =>
                expect(@resource2.persisted()).toBeFalsy()

            it 'does not add errors from the server to the old resource', ->
              @promise.catch =>
                expect(@resource2.errors().empty()).toBeTruthy()

            it 'indicates the attribute was still changed on the old resource', ->
              @promise.catch =>
                expect(@resource2.changedFields().include('price')).toBeTruthy()

            it 'does not persist the new resource', ->
              @promise.catch =>
                expect(@resource3.persisted()).toBeFalsy()

            it 'maintains attribute on new resource', ->
              @promise.catch =>
                expect(@resource3.price).toEqual(3.0)

            it 'adds errors from the server to the new resource', ->
              @promise.catch =>
                expect(@resource3.errors().empty()).toBeFalsy()

            it 'indicates the attribute was changed on the new resource', ->
              @promise.catch =>
                expect(@resource3.changedFields().include('price')).toBeTruthy()

      describe 'updating attributes', ->
        beforeEach ->
          @resource.update({
            price: 3.0
          }, (resource2) =>
            @resource2 = resource2
          )

          null

        describe 'on success', ->
          beforeEach ->
            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.success)

          it 'clones a new resource', ->
            @promise.then =>
              expect(@resource).not.toBe(@resource2)

          it 'does not persist the old resource', ->
            @promise.then =>
              expect(@resource.persisted()).toBeFalsy()

          it 'does not change the old resource', ->
            @promise.then =>
              expect(@resource.price).toBeUndefined()

          it 'does not persist new changes from the server to the old resource', ->
            @promise.then =>
              expect(@resource.tax).toBeUndefined()

          it 'does not track the change on the old resource', ->
            @promise.then =>
              expect(@resource.changedFields().include('price')).toBeFalsy()

          it 'persists a new resource', ->
            @promise.then =>
              expect(@resource2.persisted()).toBeTruthy()

          it 'persists a new resource with the changes', ->
            @promise.then =>
              expect(@resource2.price).toEqual(3.0)

          it 'persists new changes from the server', ->
            @promise.then =>
              expect(@resource2.tax).not.toBeUndefined()

          it 'does not indicate the attribute was changed', ->
            @promise.then =>
              expect(@resource2.changedFields().include('price')).toBeFalsy()

        describe 'on failure', ->
          beforeEach ->
            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

          it 'clones a new resource', ->
            @promise.catch =>
              expect(@resource).not.toBe(@resource2)

          it 'does not persist the old resource', ->
            @promise.catch =>
              expect(@resource.persisted()).toBeFalsy()

          it 'does not change the old resource', ->
            @promise.catch =>
              expect(@resource.price).toBeUndefined()

          it 'does not add errors from the server to the old resource', ->
            @promise.catch =>
              expect(@resource.errors().empty()).toBeTruthy()

          it 'does not indicate the attribute was changed on the old resource', ->
            @promise.catch =>
              expect(@resource.changedFields().include('price')).toBeFalsy()

          it 'does not persist the new resource', ->
            @promise.catch =>
              expect(@resource2.persisted()).toBeFalsy()

          it 'does not change attribute on new resource', ->
            @promise.catch =>
              expect(@resource2.price).toEqual(null)

          it 'adds errors from the server to the new resource', ->
            @promise.catch =>
              expect(@resource2.errors().empty()).toBeFalsy()

          it 'does not indicate the attribute was changed on the new resource', ->
            @promise.catch =>
              expect(@resource2.changedFields().include('price')).toBeFalsy()

      describe 'assigning relationships', ->
        describe 'singular relationship', ->
          describe 'when inverse is singular', ->
            beforeEach ->
              @singularResource = ImmutableLibrary.GiftCard.build(id: '1')
              @resource2 = @resource.assignAttributes({
                giftCard: @singularResource
              })

            it 'clones a new resource', ->
              expect(@resource).not.toBe(@resource2)

            it 'does not change the old resource', ->
              expect(@resource.giftCard()).toBeNull()

            it 'does not track the change on the old resource', ->
              expect(@resource.changedFields().include('giftCard')).toBeFalsy()

            it 'creates a new resource with the changes', ->
              expect(@resource2.giftCard()).toEqual(@singularResource)

            it 'creates a new resource with the changed relationship tracked', ->
              expect(@resource2.changedFields().include('giftCard')).toBeTruthy()

            describe 'saving the resource', ->
              beforeEach ->
                @resource2.save((resource3) =>
                  @resource3 = resource3
                )

                null

              describe 'on success', ->
                beforeEach ->
                  @promise = moxios.wait =>
                    moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.includes)

                it 'clones a new resource', ->
                  @promise.then =>
                    expect(@resource2).not.toBe(@resource3)

                it 'does not persist the old resource', ->
                  @promise.then =>
                    expect(@resource2.persisted()).toBeFalsy()

                it 'indicates the relationship was still changed on the old resource', ->
                  @promise.then =>
                    expect(@resource2.changedFields().include('giftCard')).toBeTruthy()

                it 'persists a new resource', ->
                  @promise.then =>
                    expect(@resource3.persisted()).toBeTruthy()

                it 'assigns relationship resource to clone', ->
                  @promise.then =>
                    expect(@resource2.giftCard()).toBe(@resource3.giftCard())

                it 'changes the inverse target of the new relationship resource', ->
                  @promise.then =>
                    expect(@resource3.giftCard().order()).toBe(@resource3)

                it 'does not indicate the new relationship resource inverse target was changed', ->
                  @promise.then =>
                    expect(@resource3.giftCard().changedFields().include('order')).toBeFalsy()

                it 'does not indicate the relationship was changed', ->
                  @promise.then =>
                    expect(@resource3.changedFields().include('giftCard')).toBeFalsy()

              describe 'on failure', ->
                beforeEach ->
                  @promise = moxios.wait =>
                    moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

                it 'clones a new resource', ->
                  @promise.catch =>
                    expect(@resource2).not.toBe(@resource3)

                it 'does not persist the old resource', ->
                  @promise.catch =>
                    expect(@resource2.persisted()).toBeFalsy()

                it 'does not add errors from the server to the old resource', ->
                  @promise.catch =>
                    expect(@resource2.errors().empty()).toBeTruthy()

                it 'indicates the relationship was still changed on the old resource', ->
                  @promise.catch =>
                    expect(@resource2.changedFields().include('giftCard')).toBeTruthy()

                it 'does not persist the new resource', ->
                  @promise.catch =>
                    expect(@resource3.persisted()).toBeFalsy()

                it 'adds errors from the server to the new resource', ->
                  @promise.catch =>
                    expect(@resource3.errors().empty()).toBeFalsy()

                it 'assigns relationship resource to clone', ->
                  @promise.catch =>
                    expect(@resource2.giftCard()).toBe(@resource3.giftCard())

                it 'changes the inverse target of the new relationship resource', ->
                  @promise.catch =>
                    expect(@resource3.giftCard().order()).toBe(@resource3)

                it 'indicates the relationship resource inverse target was still changed', ->
                  @promise.catch =>
                    expect(@resource3.giftCard().changedFields().include('order')).toBeTruthy()

                it 'indicates the relationship was still changed', ->
                  @promise.catch =>
                    expect(@resource3.changedFields().include('giftCard')).toBeTruthy()

          describe 'when inverse is collection', ->
            beforeEach ->
              @singularResource = ImmutableLibrary.Customer.build(id: '1')
              @resource2 = @resource.assignAttributes({
                customer: @singularResource
              })

            it 'clones a new resource', ->
              expect(@resource).not.toBe(@resource2)

            it 'does not change the old resource', ->
              expect(@resource.customer()).toBeNull()

            it 'does not track the change on the old resource', ->
              expect(@resource.changedFields().include('customer')).toBeFalsy()

            it 'creates a new resource with the changes', ->
              expect(@resource2.customer()).toEqual(@singularResource)

            it 'creates a new resource with the changed relationship tracked', ->
              expect(@resource2.changedFields().include('customer')).toBeTruthy()

            describe 'saving the resource', ->
              beforeEach ->
                @resource2.save((resource3) =>
                  @resource3 = resource3
                )

                null

              describe 'on success', ->
                beforeEach ->
                  @promise = moxios.wait =>
                    moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.includes)

                it 'clones a new resource', ->
                  @promise.then =>
                    expect(@resource2).not.toBe(@resource3)

                it 'does not persist the old resource', ->
                  @promise.then =>
                    expect(@resource2.persisted()).toBeFalsy()

                it 'indicates the relationship was still changed on the old resource', ->
                  @promise.then =>
                    expect(@resource2.changedFields().include('customer')).toBeTruthy()

                it 'persists a new resource', ->
                  @promise.then =>
                    expect(@resource3.persisted()).toBeTruthy()

                it 'assigns relationship resource to clone', ->
                  @promise.then =>
                    expect(@resource2.customer()).toBe(@resource3.customer())

                it 'changes the inverse target of the new relationship resource', ->
                  @promise.then =>
                    expect(@resource3.customer().orders().target().toArray()).toEqual([@resource3])

                it 'does not indicate the new relationship resource inverse target was changed', ->
                  @promise.then =>
                    expect(@resource3.customer().changedFields().include('orders')).toBeFalsy()

                it 'does not indicate the relationship was changed', ->
                  @promise.then =>
                    expect(@resource3.changedFields().include('customer')).toBeFalsy()

              describe 'on failure', ->
                beforeEach ->
                  @promise = moxios.wait =>
                    moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

                it 'clones a new resource', ->
                  @promise.catch =>
                    expect(@resource2).not.toBe(@resource3)

                it 'does not persist the old resource', ->
                  @promise.catch =>
                    expect(@resource2.persisted()).toBeFalsy()

                it 'does not add errors from the server to the old resource', ->
                  @promise.catch =>
                    expect(@resource2.errors().empty()).toBeTruthy()

                it 'indicates the relationship was still changed on the old resource', ->
                  @promise.catch =>
                    expect(@resource2.changedFields().include('customer')).toBeTruthy()

                it 'does not persist the new resource', ->
                  @promise.catch =>
                    expect(@resource3.persisted()).toBeFalsy()

                it 'adds errors from the server to the new resource', ->
                  @promise.catch =>
                    expect(@resource3.errors().empty()).toBeFalsy()

                it 'assigns relationship resource to clone', ->
                  @promise.catch =>
                    expect(@resource2.customer()).toBe(@resource3.customer())

                it 'changes the inverse target of the new relationship resource', ->
                  @promise.catch =>
                    expect(@resource3.customer().orders().target().toArray()).toEqual([@resource3])

                it 'indicates the relationship resource inverse target was still changed', ->
                  @promise.catch =>
                    expect(@resource3.customer().changedFields().include('orders')).toBeTruthy()

                it 'indicates the relationship was still changed', ->
                  @promise.catch =>
                    expect(@resource3.changedFields().include('customer')).toBeTruthy()

        describe 'collection relationship', ->
          beforeEach ->
            @collection = ActiveResource::Collection.build([
              ImmutableLibrary.Comment.build(id: '1'),
              ImmutableLibrary.Comment.build(id: '2')
            ])

            @resource2 = @resource.assignAttributes({
              comments: @collection
            })

          it 'clones a new resource', ->
            expect(@resource).not.toBe(@resource2)

          it 'does not change the old resource', ->
            expect(@resource.comments().empty()).toBeTruthy()

          it 'does not track the change on the old resource', ->
            expect(@resource.changedFields().include('comments')).toBeFalsy()

          it 'creates a new resource with the changes', ->
            expect(@resource2.comments().size()).toEqual(2)

          it 'creates a new resource with the changed relationship tracked', ->
            expect(@resource2.changedFields().include('comments')).toBeTruthy()

          describe 'saving the resource', ->
            beforeEach ->
              @resource2.save((resource3) =>
                @resource3 = resource3
              )

              null

            describe 'on success', ->
              beforeEach ->
                @promise = moxios.wait =>
                  moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.includes)

              it 'clones a new resource', ->
                @promise.then =>
                  expect(@resource2).not.toBe(@resource3)

              it 'does not persist the old resource', ->
                @promise.then =>
                  expect(@resource2.persisted()).toBeFalsy()

              it 'indicates the relationship was still changed on the old resource', ->
                @promise.then =>
                  expect(@resource2.changedFields().include('comments')).toBeTruthy()

              it 'persists a new resource', ->
                @promise.then =>
                  expect(@resource3.persisted()).toBeTruthy()

              it 'assigns relationship resources to clone', ->
                @promise.then =>
                  expect(@resource3.comments().target().toArray()).toEqual(@resource2.comments().target().toArray())

              it 'changes the inverse target of the new relationship resources', ->
                @promise.then =>
                  expect(@resource3.comments().target().first().order()).toBe(@resource3)

              it 'does not indicate the new relationship resource inverse target was changed', ->
                @promise.then =>
                  expect(@resource3.comments().target().first().changedFields().include('order')).toBeFalsy()

              it 'does not indicate the relationship was changed', ->
                @promise.then =>
                  expect(@resource3.changedFields().include('comments')).toBeFalsy()

            describe 'on failure', ->
              beforeEach ->
                @promise = moxios.wait =>
                  moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

              it 'clones a new resource', ->
                @promise.catch =>
                  expect(@resource2).not.toBe(@resource3)

              it 'does not persist the old resource', ->
                @promise.catch =>
                  expect(@resource2.persisted()).toBeFalsy()

              it 'does not add errors from the server to the old resource', ->
                @promise.catch =>
                  expect(@resource2.errors().empty()).toBeTruthy()

              it 'indicates the relationship was still changed on the old resource', ->
                @promise.catch =>
                  expect(@resource2.changedFields().include('comments')).toBeTruthy()

              it 'does not persist the new resource', ->
                @promise.catch =>
                  expect(@resource3.persisted()).toBeFalsy()

              it 'adds errors from the server to the new resource', ->
                @promise.catch =>
                  expect(@resource3.errors().empty()).toBeFalsy()

              it 'assigns relationship resources to clone', ->
                @promise.catch =>
                  expect(@resource3.comments().target().toArray()).toEqual(@resource2.comments().target().toArray())

              it 'changes the inverse target of the new relationship resource', ->
                @promise.catch =>
                  expect(@resource3.comments().target().first().order()).toBe(@resource3)

              it 'indicates the new relationship resource inverse target was still changed', ->
                @promise.catch =>
                  expect(@resource3.comments().target().first().changedFields().include('order')).toBeTruthy()

              it 'indicates the relationship was still changed', ->
                @promise.catch =>
                  expect(@resource3.changedFields().include('comments')).toBeTruthy()

    describe 'when resource persisted', ->
      beforeEach ->
        ImmutableLibrary.Order.includes('giftCard','orderItems').find('1')
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)
          .then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

      describe 'reload', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.reload()
            .then window.onSuccess

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes2)
              .then =>
                @resource2 = window.onSuccess.calls.mostRecent().args[0]

        it 'clones resource', ->
          @promise2.then =>
            expect(@resource).not.toBe(@resource2)

        it 'assigns new attributes', ->
          @promise2.then =>
            expect(@resource2.total).toEqual(9.0)

        it 'assigns new singular relationship', ->
          @promise2.then =>
            expect(@resource2.rating()).toBeNull()

        it 'assigns new collection relationship', ->
          @promise2.then =>
            expect(@resource2.orderItems().target().toArray()).toEqual([])

        it 'does not assign unloaded relationships', ->
          @promise2.then =>
            expect(@resource2.comments().size()).toEqual(2)

      describe 'assigning attributes', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource2 = @resource.assignAttributes({
              tax: 15.0
            })

        it 'clones a new resource', ->
          @promise2.then =>
            expect(@resource).not.toBe(@resource2)

        it 'does not change the old resource', ->
          @promise2.then =>
            expect(@resource.tax).toEqual(5.0)

        it 'does not track the change on the old resource', ->
          @promise2.then =>
            expect(@resource.changedFields().include('tax')).toBeFalsy()

        it 'creates a new persisted resource', ->
          @promise2.then =>
            expect(@resource2.persisted()).toBeTruthy()

        it 'creates a new resource with the changes', ->
          @promise2.then =>
            expect(@resource2.tax).toEqual(15.0)

        it 'creates a new resource with the changed attribute tracked', ->
          @promise2.then =>
            expect(@resource2.changedFields().include('tax')).toBeTruthy()

        describe 'saving the changed persisted resource', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource2.save((resource3) =>
                @resource3 = resource3
              )

              null

          describe 'on success', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.includes)

            it 'clones a new resource', ->
              @promise4.then =>
                expect(@resource2).not.toBe(@resource3)

            it 'does not persist new changes from the server to the old resource', ->
              @promise4.then =>
                expect(@resource2.balance).toBeUndefined()

            it 'indicates the attribute was still changed on the old resource', ->
              @promise4.then =>
                expect(@resource2.changedFields().include('tax')).toBeTruthy()

            it 'persists a new resource', ->
              @promise4.then =>
                expect(@resource3.persisted()).toBeTruthy()

            it 'persists new changes from the server', ->
              @promise4.then =>
                expect(@resource3.balance).not.toBeUndefined()

            it 'does not indicate the attribute was changed', ->
              @promise4.then =>
                expect(@resource3.changedFields().include('tax')).toBeFalsy()

          describe 'on failure', ->
            beforeEach ->
              @promise4 = @promise3.then =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

            it 'clones a new resource', ->
              @promise4.catch =>
                expect(@resource2).not.toBe(@resource3)

            it 'persists the old resource', ->
              @promise4.catch =>
                expect(@resource2.persisted()).toBeTruthy()

            it 'does not add errors from the server to the old resource', ->
              @promise4.catch =>
                expect(@resource2.errors().empty()).toBeTruthy()

            it 'indicates the attribute was still changed on the old resource', ->
              @promise4.catch =>
                expect(@resource2.changedFields().include('tax')).toBeTruthy()

            it 'persists the new resource', ->
              @promise4.catch =>
                expect(@resource3.persisted()).toBeTruthy()

            it 'maintains attribute on new resource', ->
              @promise4.catch =>
                expect(@resource3.tax).toEqual(15.0)

            it 'adds errors from the server to the new resource', ->
              @promise4.catch =>
                expect(@resource3.errors().empty()).toBeFalsy()

            it 'indicates the attribute was changed on the new resource', ->
              @promise4.catch =>
                expect(@resource3.changedFields().include('tax')).toBeTruthy()

      describe 'assigning relationships', ->
        describe 'singular relationship', ->
          beforeEach ->
            @promise2 = @promise.then =>
              @singularResource = ImmutableLibrary.GiftCard.build(id: '1')
              @resource2 = @resource.assignAttributes({
                giftCard: @singularResource
              })

          it 'clones a new resource', ->
            @promise2.then =>
              expect(@resource).not.toBe(@resource2)

          it 'does not change the old resource', ->
            @promise2.then =>
              expect(@resource.giftCard()).not.toBe(@singularResource)

          it 'does not track the change on the old resource', ->
            @promise2.then =>
              expect(@resource.changedFields().include('giftCard')).toBeFalsy()

          it 'creates a new persisted resource', ->
            @promise2.then =>
              expect(@resource2.persisted()).toBeTruthy()

          it 'creates a new resource with the changes', ->
            @promise2.then =>
              expect(@resource2.giftCard()).toBe(@singularResource)

          it 'creates a new resource with the changed relationship tracked', ->
            @promise2.then =>
              expect(@resource2.changedFields().include('giftCard')).toBeTruthy()

          describe 'saving the changed persisted resource', ->
            beforeEach ->
              @promise3 = @promise2.then =>
                @resource2.save((resource3) =>
                  @resource3 = resource3
                )

                null

            describe 'on success', ->
              beforeEach ->
                @promise4 = @promise3.then =>
                  moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.includes)

              it 'clones a new resource', ->
                @promise4.then =>
                  expect(@resource2).not.toBe(@resource3)

              it 'indicates the relationship was still changed on the old resource', ->
                @promise4.then =>
                  expect(@resource2.changedFields().include('giftCard')).toBeTruthy()

              it 'persists a new resource', ->
                @promise4.then =>
                  expect(@resource3.persisted()).toBeTruthy()

              it 'assigns relationship resource to clone', ->
                @promise4.then =>
                  expect(@resource2.giftCard()).toBe(@resource3.giftCard())

              it 'changes the inverse target of the relationship resource', ->
                @promise4.then =>
                  expect(@resource3.giftCard().order()).toBe(@resource3)

              it 'does not indicate the new relationship resource inverse target was changed', ->
                @promise4.then =>
                  expect(@resource3.giftCard().changedFields().include('order')).toBeFalsy()

              it 'does not indicate the relationship was changed', ->
                @promise4.then =>
                  expect(@resource3.changedFields().include('giftCard')).toBeFalsy()

            describe 'on failure', ->
              beforeEach ->
                @promise4 = @promise3.then =>
                  moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

              it 'clones a new resource', ->
                @promise4.catch =>
                  expect(@resource2).not.toBe(@resource3)

              it 'persists the old resource', ->
                @promise4.catch =>
                  expect(@resource2.persisted()).toBeTruthy()

              it 'does not add errors from the server to the old resource', ->
                @promise4.catch =>
                  expect(@resource2.errors().empty()).toBeTruthy()

              it 'indicates the relationship was still changed on the old resource', ->
                @promise4.catch =>
                  expect(@resource2.changedFields().include('giftCard')).toBeTruthy()

              it 'persists the new resource', ->
                @promise4.catch =>
                  expect(@resource3.persisted()).toBeTruthy()

              it 'adds errors from the server to the new resource', ->
                @promise4.catch =>
                  expect(@resource3.errors().empty()).toBeFalsy()

              it 'assigns relationship resource to clone', ->
                @promise4.catch =>
                  expect(@resource2.giftCard()).toBe(@resource3.giftCard())

              it 'changes the inverse target of the new relationship resource', ->
                @promise4.catch =>
                  expect(@resource3.giftCard().order()).toBe(@resource3)

              it 'indicates the new relationship resource inverse target was still changed', ->
                @promise4.catch =>
                  expect(@resource3.giftCard().changedFields().include('order')).toBeTruthy()

              it 'indicates the relationship was still changed', ->
                @promise4.catch =>
                  expect(@resource3.changedFields().include('giftCard')).toBeTruthy()

        describe 'collection relationship', ->
          beforeEach ->
            @collection = ActiveResource::Collection.build([
              ImmutableLibrary.Comment.build(id: '1'),
              ImmutableLibrary.Comment.build(id: '2')
            ])

            @resource2 = @resource.assignAttributes({
              comments: @collection
            })

          it 'clones a new resource', ->
            expect(@resource).not.toBe(@resource2)

          it 'does not change the old resource', ->
            expect(@resource.comments().target().map((o) => o.id).toArray()).toEqual(['1', '2'])

          it 'does not track the change on the old resource', ->
            expect(@resource.changedFields().include('comments')).toBeFalsy()

          it 'creates a new resource with the changes', ->
            expect(@resource2.comments().size()).toEqual(2)

          it 'creates a new resource with the changed relationship tracked', ->
            expect(@resource2.changedFields().include('comments')).toBeTruthy()

          describe 'saving the resource', ->
            beforeEach ->
              @resource2.save((resource3) =>
                @resource3 = resource3
              )

              null

            describe 'on success', ->
              beforeEach ->
                @promise = moxios.wait =>
                  moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.includes)

              it 'clones a new resource', ->
                @promise.then =>
                  expect(@resource2).not.toBe(@resource3)

              it 'persists the old resource', ->
                @promise.then =>
                  expect(@resource2.persisted()).toBeTruthy()

              it 'indicates the relationship was still changed on the old resource', ->
                @promise.then =>
                  expect(@resource2.changedFields().include('comments')).toBeTruthy()

              it 'persists a new resource', ->
                @promise.then =>
                  expect(@resource3.persisted()).toBeTruthy()

              it 'assigns relationship resources to clone', ->
                @promise.then =>
                  expect(@resource3.comments().target().toArray()).toEqual(@resource2.comments().target().toArray())

              it 'changes the inverse target of the relationship resources to the clone', ->
                @promise.then =>
                  expect(@resource3.comments().target().first().order()).toBe(@resource3)

              it 'does not indicate the relationship resource inverse target was changed', ->
                @promise.then =>
                  expect(@resource3.comments().target().first().changedFields().include('order')).toBeFalsy()

              it 'does not indicate the relationship was changed', ->
                @promise.then =>
                  expect(@resource3.changedFields().include('comments')).toBeFalsy()

            describe 'on failure', ->
              beforeEach ->
                @promise = moxios.wait =>
                  moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.failure)

              it 'clones a new resource', ->
                @promise.catch =>
                  expect(@resource2).not.toBe(@resource3)

              it 'persists the old resource', ->
                @promise.catch =>
                  expect(@resource2.persisted()).toBeTruthy()

              it 'does not add errors from the server to the old resource', ->
                @promise.catch =>
                  expect(@resource2.errors().empty()).toBeTruthy()

              it 'indicates the relationship was still changed on the old resource', ->
                @promise.catch =>
                  expect(@resource2.changedFields().include('comments')).toBeTruthy()

              it 'persists the new resource', ->
                @promise.catch =>
                  expect(@resource3.persisted()).toBeTruthy()

              it 'adds errors from the server to the new resource', ->
                @promise.catch =>
                  expect(@resource3.errors().empty()).toBeFalsy()

              it 'assigns relationship resources to clone', ->
                @promise.catch =>
                  expect(@resource3.comments().target().toArray()).toEqual(@resource2.comments().target().toArray())

              it 'changes the inverse target of the relationship resources to clone', ->
                @promise.catch =>
                  expect(@resource3.comments().target().first().order()).toBe(@resource3)

              it 'indicates the relationship resource inverse target was still changed', ->
                @promise.catch =>
                  expect(@resource3.comments().target().first().changedFields().include('order')).toBeTruthy()

              it 'indicates the relationship was still changed', ->
                @promise.catch =>
                  expect(@resource3.changedFields().include('comments')).toBeTruthy()

    describe 'when resource that is inverse of autosave relationship is changed', ->
      describe 'when relationship with autosave inverse is collection', ->
        beforeEach ->
          ImmutableLibrary.Customer.includes('orders').find('1')
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Customer.find.includes)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

              @resource2 = @resource.assignAttributes({
                name: 'New name'
              })

        it 'clones resource\'s collection relationship to clone', ->
          @promise.then =>
            @resource.orders().target().each((o) =>
              expect(@resource2.orders().target().include(o)).toBeFalsy()
              expect(@resource2.orders().target().map((t) => t.id).include(o.id)).toBeTruthy()
            )

        it 'changes the inverse target of the relationship resources to the clone', ->
          @promise.then =>
            expect(@resource2.orders().target().first().customer()).toBe(@resource2)

        it 'indicates the relationship resource inverse target was changed', ->
          @promise.then =>
            expect(@resource2.orders().target().first().changedFields().include('customer')).toBeTruthy()

        it 'does not indicate the relationship was changed', ->
          @promise.then =>
            expect(@resource2.changedFields().include('orders')).toBeFalsy()

      describe 'when relationship with autosave inverse is singular', ->
        describe 'when autosave inverse is collection', ->
          beforeEach ->
            ImmutableLibrary.Order.includes('orderItems').find('1')
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]
                @resource3 = @resource.orderItems().target().last()

                @resource2 = @resource.orderItems().target().first().assignAttributes({
                  amount: 1500
                })

          it 'does not replace resource in collection relationship of old inverse', ->
            @promise.then =>
              expect(@resource.orderItems().target().first()).not.toBe(@resource2)

          it 'clones the inverse target of the relationship', ->
            @promise.then =>
              expect(@resource2.order()).not.toBe(@resource)

          it 'does not indicate the relationship was changed', ->
            @promise.then =>
              expect(@resource2.changedFields().include('order')).toBeFalsy()

          it 'replaces resource with clone in collection relationship of cloned inverse', ->
            @promise.then =>
              expect(@resource2.order().orderItems().target().first()).toBe(@resource2)

          it 'does not clone other resources in inverse collection relationship', ->
            @promise.then =>
              expect(@resource2.order().orderItems().target().last()).toBe(@resource3)

          it 'sets the inverse target of other resources in inverse collection relationship to the clone', ->
            @promise.then =>
              expect(@resource2.order().orderItems().target().last().order()).toBe(@resource2.order())

          it 'does not indicate the inverse target of other resources was changed', ->
            @promise.then =>
              expect(@resource2.order().orderItems().target().last().changedFields().include('order')).toBeFalsy()

          it 'does not indicate the old inverse autosave relationship was changed', ->
            @promise.then =>
              expect(@resource.changedFields().include('orderItems')).toBeFalsy()

          it 'indicates the new inverse target autosave relationship was changed', ->
            @promise.then =>
              expect(@resource2.order().changedFields().include('orderItems')).toBeTruthy()

        describe 'when autosave inverse is singular', ->
          beforeEach ->
            ImmutableLibrary.Order.includes('rating').find('1')
            .then window.onSuccess

            @promise = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]
                @resource2 = @resource.rating().assignAttributes({
                  value: 15
                })

          it 'clones the inverse target of the relationship', ->
            @promise.then =>
              expect(@resource2.order()).not.toBe(@resource)

          it 'does not indicate the relationship was changed', ->
            @promise.then =>
              expect(@resource2.changedFields().include('order')).toBeFalsy()

          it 'does not set original inverse relationship target to clone', ->
            @promise.then =>
              expect(@resource.rating()).not.toBe(@resource2)

          it 'sets cloned inverse relationship target to clone', ->
            @promise.then =>
              expect(@resource2.order().rating()).toBe(@resource2)

          it 'does not indicate the original inverse target of the relationship was changed', ->
            @promise.then =>
              expect(@resource.changedFields().include('rating')).toBeFalsy()

          it 'indicates the cloned inverse target of the relationship was changed', ->
            @promise.then =>
              expect(@resource2.order().changedFields().include('rating')).toBeTruthy()

    describe 'when using relationship management', ->
      beforeEach ->
        ImmutableLibrary.Order.find('1')
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.includes)
          .then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

      describe 'singular', ->
        beforeEach ->
          ImmutableLibrary.Customer.find('1')
          .then window.onSuccess

          @promise2 = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Customer.find.includes)
            .then =>
              @relatedResource = window.onSuccess.calls.mostRecent().args[0]

        describe 'assign', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @clone = @resource.assignCustomer(@relatedResource)

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

          it 'clones related resource', ->
            @promise3.then =>
              expect(@clone.customer().isA(ImmutableLibrary.Customer)).toBeTruthy()
              expect(@clone.customer()).not.toBe(@relatedResource)

        describe 'update', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.updateCustomer(@relatedResource)
              .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)
                .then =>
                  @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

          it 'clones related resource', ->
            @promise3.then =>
              expect(@clone.customer().isA(ImmutableLibrary.Customer)).toBeTruthy()
              expect(@clone.customer()).not.toBe(@relatedResource)

        describe 'build', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @clone = @resource.buildCustomer({ name: 'J' })

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

        describe 'create', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.createCustomer({ name: 'M' })
                .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Customer.find.includes)
                .then =>
                  @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

      describe 'collection', ->
        beforeEach ->
          ImmutableLibrary.Comment.find('1')
          .then window.onSuccess

          @promise2 = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Comment.find.success)
            .then =>
              @relatedResource = window.onSuccess.calls.mostRecent().args[0]

        describe 'load', ->
          beforeEach ->
            @resource.comments().load()
            .then window.onSuccess

            @promise2 = moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Comment.all.success)
              .then =>
                @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise2.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise2.then =>
              expect(@clone).not.toBe(@resource)

          it 'loads related resources', ->
            @promise2.then =>
              expect(@clone.comments().size()).toEqual(2);

        describe 'assign', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @clone = @resource.comments().assign([@relatedResource], false)

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

          it 'clones related resources', ->
            @promise3.then =>
              expect(@clone.comments().target().first().isA(ImmutableLibrary.Comment)).toBeTruthy()
              expect(@clone.comments().target().first()).not.toBe(@relatedResource)

        describe 'update', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.comments().assign([@relatedResource])
                .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)
                .then =>
                  @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

          it 'clones related resources', ->
            @promise3.then =>
              expect(@clone.comments().target().first().isA(ImmutableLibrary.Comment)).toBeTruthy()
              expect(@clone.comments().target().first()).not.toBe(@relatedResource)

        describe 'build', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @clone = @resource.comments().build({ body: 'J' })

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

        describe 'create', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.comments().create({ body: 'M' })
                .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.Comment.find.success)
                .then =>
                  @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

        describe 'push', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.comments().push(@relatedResource)
                .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)
                .then =>
                  @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

          it 'clones related resources', ->
            @promise3.then =>
              expect(@clone.comments().target().first().isA(ImmutableLibrary.Comment)).toBeTruthy()
              expect(@clone.comments().target().first()).not.toBe(@relatedResource)

        describe 'delete', ->
          beforeEach ->
            @promise3 = @promise2.then =>
              @resource.comments().delete(@relatedResource)
                .then window.onSuccess

              moxios.wait =>
                moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)
                .then =>
                  @clone = window.onSuccess.calls.mostRecent().args[0]

          it 'returns owner of relationship', ->
            @promise3.then =>
              expect(@clone.isA(ImmutableLibrary.Order)).toBeTruthy()

          it 'clones resource', ->
            @promise3.then =>
              expect(@clone).not.toBe(@resource)

          it 'clones related resources', ->
            @promise3.then =>
              expect(@clone.comments().target().first().isA(ImmutableLibrary.Comment)).toBeTruthy()
              expect(@clone.comments().target().first()).not.toBe(@relatedResource)

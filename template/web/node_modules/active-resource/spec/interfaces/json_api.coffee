describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe 'Interfaces::JsonApi', ->
    beforeEach ->
      @lib = window.MyLibrary
      @interface = @lib.interface

    describe '#toCamelCase()', ->
      describe 'values', ->
        beforeEach ->
          @camelCase = @interface.toCamelCase({
            first_attribute: 'value',
            second_attribute: 'value'
          })

        it 'transforms keys to camelCase', ->
          expect(@camelCase).toEqual({
            firstAttribute: 'value',
            secondAttribute: 'value'
          })

      describe 'array', ->
        describe 'of objects', ->
          beforeEach ->
            @camelCase = @interface.toCamelCase({
              first_attribute: [
                {
                  other_attribute: 'value',
                  another_attribute: 'value'
                }
              ]
            })

          it 'transforms arrays objects keys to camelCase', ->
            expect(@camelCase).toEqual({
              firstAttribute: [
                {
                  otherAttribute: 'value',
                  anotherAttribute: 'value'
                }
              ]
            })

        describe 'of values', ->
          beforeEach ->
            @camelCase = @interface.toCamelCase({
              first_attribute: ['value1', 'value2']
            })

          it 'transforms arrays objects keys to camelCase', ->
            expect(@camelCase).toEqual({
              firstAttribute: ['value1', 'value2']
            })

    describe '#get()', ->
      describe 'getting resources', ->
        beforeEach ->
          @interface
          .get(@lib.Product.links()['related'])
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait =>
            true

        it 'uses JSONAPI content type', ->
          @promise.then =>
            expect(moxios.requests.mostRecent().headers['Content-Type']).toEqual('application/vnd.api+json')

        describe 'on timeout', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.timeout)
              .catch =>
                Promise.reject(@errors = window.onFailure.calls.mostRecent().args[0])

          it 'returns errors Collection', ->
            @promise2.catch =>
              expect(@errors.isA?(ActiveResource::Collection)).toBeTruthy()

          it 'returns error with detail', ->
            @promise2.catch =>
              expect(@errors.first()).toEqual({
                code: 'timeout',
                message: "Timeout occurred while loading https://example.com/api/v1/products/",
                detail: "Timeout occurred while loading https://example.com/api/v1/products/",
              })

        describe 'on success', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
              .then =>
                @collection = window.onSuccess.calls.mostRecent().args[0]

          it 'returns a collection', ->
            @promise2.then =>
              expect(@collection.isA?(ActiveResource::Collection)).toBeTruthy()

          it 'returns a collection of resources of the queried type', ->
            @promise2.then =>
              expect(@collection.last().isA?(@lib.Product)).toBeTruthy()

          it 'returns a collection of resources with links', ->
            @promise2.then =>
              expect(@collection.last().links()['self']).toBeDefined()

      describe 'getting a resource', ->
        beforeEach ->
          @interface
          .get(@lib.Product.links()['related'] + '1')
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait => true

        describe 'on success', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.success)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]

          it 'returns a resource of the queried type', ->
            @promise2.then =>
              expect(@resource.isA?(@lib.Product)).toBeTruthy()

          it 'returns a resource with a link', ->
            @promise2.then =>
              expect(@resource.links()['self']).toBeDefined()

        describe 'when no relationship links', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.noRelLinks)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]

          it 'builds links from owner self link', ->
            @promise2.then =>
              expect(@resource.association('timeSlots').links()).toEqual({
                self: "https://example.com/api/v1/products/1/relationships/time_slots/",
                related: "https://example.com/api/v1/products/1/time_slots/"
              })

        describe 'on failure', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.find.failure)
              .catch =>
                Promise.reject(@errors = window.onFailure.calls.mostRecent().args[0])

          it 'returns a collection of errors', ->
            @promise2.catch =>
              expect(@errors.klass()).toBe(ActiveResource::Collection)

          it 'returns a parameter error', ->
            @promise2.catch =>
              expect(@errors.first().parameter).toEqual('id')

      describe 'using fields queryParam', ->
        beforeEach ->
          queryParams =
            fields:
              products: ['title','updatedAt'],
              orders: ['price','createdAt']

          @interface
          .get(@lib.Product.links()['related'], queryParams)
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())

        it 'builds a field set into the query URL', ->
          @promise.then =>
            expect(@paramStr).toEqual('fields[products]=title,updated_at&fields[orders]=price,created_at')

      describe 'using fields queryParam with includes', ->
        beforeEach ->
          queryParams =
            fields:
              products: ['title'],
              orders: ['price']
            include: ['merchant', { orders: { transactions: 'paymentMethod' }, labels: ['author'] }]
            __root: 'products'

          @interface
            .get(@lib.Product.links()['related'], queryParams)
            .then(window.onSuccess)
            .catch(window.onFailure)

          @promise = moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())

        it 'merges includes with field set', ->
          @promise.then =>
            expect(@paramStr).toContain('fields[products]=title,merchant&fields[orders]=price,transactions&fields[transactions]=payment_method&fields[labels]=author')

      describe 'using include queryParam', ->
        beforeEach ->
          queryParams =
            include: ['merchant', 'attributeValues', { orders: 'transactions' }]

          @interface
          .get(@lib.Product.links()['related'], queryParams)
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())

        it 'builds an include tree into the query URL', ->
          @promise.then =>
            expect(@paramStr).toEqual('include=merchant,attribute_values,orders.transactions')

      describe 'using sort queryParam', ->
        beforeEach ->
          queryParams =
            sort: { updatedAt: 'asc', createdAt: 'desc' }

          @interface
          .get(@lib.Product.links()['related'], queryParams)
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait =>
            @paramStr = requestParams(moxios.requests.mostRecent())

        it 'builds an include tree into the query URL', ->
          @promise.then =>
            expect(@paramStr).toEqual('sort=updated_at,-created_at')

    describe '#post', ->
      describe 'persisting resource data', ->
        beforeEach ->
          @order = @lib.Order.build(price: 1.0)
          @order.transactions().assign(
            [
              @lib.Transaction.build(
                amount: 1.0,
                paymentMethod: @lib.PaymentMethod.build(id: 100)
              )
            ]
          )

          @order.timestamp = new Date()

          @interface
          .post(@lib.Order.links()['related'], @order)
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait => true

        it 'builds a resource document', ->
          resourceDocument =
            {
              type: 'orders',
              attributes: {
                price: 1.0,
                timestamp: @order.timestamp.toJSON()
              },
              relationships: {
                transactions: {
                  data: [
                    {
                      type: 'transactions',
                      attributes: {
                        amount: 1.0,
                        payment_method_id: 100
                      },
                      relationships: {
                        payment_method: {
                          data: { type: 'payment_methods', id: '100' }
                        }
                      }
                    }
                  ]
                }
              }
            }

          @promise.then =>
            expect(JSON.parse(moxios.requests.mostRecent().data).data).toEqual(resourceDocument)

        describe 'when persistence succeeds', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
              .then =>
                @resource = window.onSuccess.calls.mostRecent().args[0]

          it 'indicates the resource is persisted', ->
            @promise2.then =>
              expect(@resource.persisted?()).toBeTruthy()

          it 'updates the resource with attributes from the server', ->
            @promise2.then =>
              expect(@resource.description).toEqual('Another description')

        describe 'when persistence fails', ->
          beforeEach ->
            @promise2 = @promise.then =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.failure)
              .catch =>
                Promise.reject(@resource = window.onFailure.calls.mostRecent().args[0])

          it 'adds errors the resource', ->
            @promise2.catch =>
              expect(@resource.errors().empty?()).toBeFalsy()

          it 'converts a pointer to a base error field', ->
            @promise2.catch =>
              expect(@resource.errors().forBase().map((e) => e.detail).first()).toEqual("A problem occurred with the base of the product.")

          it 'converts a pointer to a attribute error field', ->
            @promise2.catch =>
              expect(@resource.errors().detailsForField('title')).toEqual({ blank: 'Title cannot be blank.' })

          it 'camelizes an underscored attribute name', ->
            @promise2.catch =>
              expect(@resource.errors().include('phoneNumber')).toBeTruthy()

          it 'converts a pointer to a relationship error field', ->
            @promise2.catch =>
              expect(@resource.errors().detailsForField('orders.price')).toEqual({ blank: 'Price cannot be blank.' })

      describe 'persisting changes involving resource identifiers', ->
        beforeEach ->
          @product = @lib.Product.build(id: 1, title: 'A product title')
          @product2 = @lib.Product.build(id: 2, title: 'Another title')

          @interface
          .post(@lib.Product.links()['related'], [@product, @product2], onlyResourceIdentifiers: true)
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait => true

        it 'builds a resource identifier document', ->
          resourceDocument =
            JSON.stringify({
              data: [
                {
                  type: 'products',
                  id: '1'
                },
                {
                  type: 'products',
                  id: '2'
                }
              ]
            })

          @promise.then =>
            expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

    describe '#delete', ->
      describe 'with resource data', ->
        beforeEach ->
          @lib.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            @interface
            .delete(@resource.links()['self'], @resource)
            .then(window.onSuccess)
            .catch(window.onFailure)

            moxios.wait => true

        it 'builds a resource identifier document', ->
          resourceDocument =
            JSON.stringify({
              data: {
                type: 'products',
                id: @resource.id.toString()
              }
            })

          @promise2.then =>
            expect(moxios.requests.mostRecent().data).toEqual(resourceDocument)

      describe 'without resource data', ->
        beforeEach ->
          @interface
          .delete(@lib.Product.links()['related'])
          .then(window.onSuccess)
          .catch(window.onFailure)

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.relationships.update.success)

        it 'sends no data', ->
          @promise.then =>
            expect(moxios.requests.mostRecent().data).toEqual(JSON.stringify({}))

    describe '#findResourceForRelationship', ->
      beforeEach ->
        @resource = @lib.Order.build()

        @response = getJSONFixture('orders/includes.json');

      describe 'when relationship not found in included', ->
        beforeEach ->
          @result =
            @interface.findResourceForRelationship(
              @response.data.relationships.order_items.data[0],
              [],
              @resource,
              @resource.klass().reflectOnAssociation('orderItems')
            )

        it 'returns undefined', ->
          expect(@result).toBeUndefined()

      describe 'when included is not on relationship target', ->
        describe 'when relationship collection', ->
          beforeEach ->
            @result =
              @interface.findResourceForRelationship(
                @response.data.relationships.order_items.data[0],
                @response.included,
                @resource,
                @resource.klass().reflectOnAssociation('orderItems'),
                0
              )

          it 'returns resource built from include id', ->
            expect(@result.id).toEqual(@response.data.relationships.order_items.data[0].id)

          it 'returns resource built from include type', ->
            expect(@result.klass()).toBe(@lib.OrderItem)

        describe 'when relationship singular', ->
          beforeEach ->
            @result =
              @interface.findResourceForRelationship(
                @response.data.relationships.customer.data,
                @response.included,
                @resource,
                @resource.klass().reflectOnAssociation('customer')
              )

          it 'returns resource built from include id', ->
            expect(@result.id).toEqual(@response.data.relationships.customer.data.id)

          it 'returns resource built from include type', ->
            expect(@result.klass()).toBe(@lib.Customer)

      describe 'when included is on relationship target', ->
        describe 'when relationship target persisted', ->
          describe 'when relationship collection', ->
            beforeEach ->
              @relationshipResource = @lib.OrderItem.build(id: "5")
              @resource.assignAttributes(orderItems: [
                @relationshipResource
              ])

              @result =
                @interface.findResourceForRelationship(
                  @response.data.relationships.order_items.data[0],
                  @response.included,
                  @resource,
                  @resource.klass().reflectOnAssociation('orderItems')
                  0
                )

            it 'returns resource from target', ->
              expect(@result).toBe(@relationshipResource)

            it 'merges include fields into resource', ->
              expect(@result.amount).toBeDefined()

          describe 'when relationship singular', ->
            beforeEach ->
              @relationshipResource = @lib.Customer.build(id: "1")
              @resource.assignAttributes(customer: @relationshipResource)

              @result =
                @interface.findResourceForRelationship(
                  @response.data.relationships.customer.data,
                  @response.included,
                  @resource,
                  @resource.klass().reflectOnAssociation('customer')
                )

            it 'returns resource from target', ->
              expect(@result).toBe(@relationshipResource)

            it 'merges include fields into resource', ->
              expect(@result.firstName).toBeDefined()

        describe 'when relationship target unpersisted', ->
          describe 'when relationship collection', ->
            beforeEach ->
              @relationshipResource0 = @lib.OrderItem.build()
              @relationshipResource1 = @lib.OrderItem.build()
              @resource.assignAttributes(orderItems: [
                @relationshipResource0
                @relationshipResource1
              ])

              @result =
                @interface.findResourceForRelationship(
                  @response.data.relationships.order_items.data[1],
                  @response.included,
                  @resource,
                  @resource.klass().reflectOnAssociation('orderItems')
                  1
                )

            it 'returns resource from target at index', ->
              expect(@result).toBe(@relationshipResource1)

            it 'merges include fields into resource', ->
              expect(@result.amount).toBeDefined()

            it 'persists resource', ->
              expect(@result.persisted()).toBeTruthy()

          describe 'when relationship singular', ->
            beforeEach ->
              @relationshipResource = @lib.Customer.build()
              @resource.assignAttributes(customer: @relationshipResource)

              @result =
                @interface.findResourceForRelationship(
                  @response.data.relationships.customer.data,
                  @response.included,
                  @resource,
                  @resource.klass().reflectOnAssociation('customer')
                )

            it 'returns resource from target', ->
              expect(@result).toBe(@relationshipResource)

            it 'merges include fields into resource', ->
              expect(@result.firstName).toBeDefined()

            it 'persists resource', ->
              expect(@result.persisted()).toBeTruthy()

      describe 'when included is polymorphic relationship target', ->
        beforeEach ->
          @result =
            @interface.findResourceForRelationship(
              @response.data.relationships.payment_source.data,
              @response.included,
              @resource,
              @resource.klass().reflectOnAssociation('paymentSource')
            )

        it 'builds polymorphic relationship using inverse', ->
          expect(@result.orders().target().first()).toBe(@resource)

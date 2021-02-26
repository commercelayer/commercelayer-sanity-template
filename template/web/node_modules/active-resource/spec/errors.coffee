describe 'ActiveResource', ->
  describe '::Errors', ->
    beforeEach ->
      @resource = MyLibrary.Product.build()
      @resource.errors().add('title', 'blank', 'Title cannot be blank')

    describe '#clear()', ->
      it 'clears the errors', ->
        @resource.errors().clear()
        expect(@resource.errors().size()).toEqual(0)

    describe '#add()', ->
      it 'adds an error with code and message', ->
        expect(@resource.errors().forField('title').size()).toEqual(1)

    describe '#addAll()', ->
      beforeEach ->
        @resource.errors().addAll(
          ['title', 'taken', 'Title is not unique'],
          ['description', 'blank', 'Description cannot be blank']
        )

      it 'adds errors', ->
        expect(@resource.errors().size()).toEqual(3)

    describe '#propagate', ->
      describe 'collection', ->
        beforeEach ->
          @resource.orders().build()
          errors = ActiveResource.Collection.build([
            {
              field: 'orders.price',
              code: 'code',
              message: 'message'
            }
          ])

          @resource.errors().propagate(errors)

        it 'adds error to root resource', ->
          expect(@resource.errors().forField('orders.price').size()).toEqual(1)

        it 'propagates errors to nested resource', ->
          expect(@resource.orders().target().first().errors().forField('price').size()).toEqual(1)

      describe 'singular', ->
        beforeEach ->
          @resource.buildMerchant()

          errors = ActiveResource.Collection.build([
            {
              field: 'merchant.name',
              code: 'code',
              message: 'message'
            }
          ])

          @resource.errors().propagate(errors)

        it 'adds error to root resource', ->
          expect(@resource.errors().forField('merchant.name').size()).toEqual(1)

        it 'propagates error to nested resource', ->
          expect(@resource.merchant().errors().forField('name').size()).toEqual(1)

    describe '#added()', ->
      describe 'when added', ->
        it 'returns true', ->
          expect(@resource.errors().added('title', 'blank')).toBeTruthy()

      describe 'when not added', ->
        it 'returns false', ->
          expect(@resource.errors().added('title', 'taken')).toBeFalsy()

    describe '#include()', ->
      describe 'when included', ->
        it 'returns true', ->
          expect(@resource.errors().include('title')).toBeTruthy()

      describe 'when not included', ->
        it 'returns false', ->
          expect(@resource.errors().include('price')).toBeFalsy()

    describe '#empty()', ->
      describe 'when empty', ->
        beforeEach ->
          @resource.errors().clear()

        it 'returns true', ->
          expect(@resource.errors().empty()).toBeTruthy()

      describe 'when not empty', ->
        it 'returns false', ->
          expect(@resource.errors().empty()).toBeFalsy()

    describe '#size()', ->
      it 'returns the total number of errors', ->
        expect(@resource.errors().size()).toEqual(1)

    describe '#delete()', ->
      it 'deletes the errors from the field', ->
        @resource.errors().delete('title')
        expect(@resource.errors().forField('title').empty()).toBeTruthy()

    describe '#each()', ->
      it 'iterates over each error', ->
        @resource.errors().each (field, error) ->
          expect(field).toEqual('title')
          expect(error.code).toEqual('blank')
          expect(error.message).toEqual('Title cannot be blank')

    describe '#forField()', ->
      beforeEach ->
        @resource.errors().add('customer', 'invalid', 'is invalid')
        @resource.errors().add('customer.firstName', 'blank', 'is blank')

      it 'returns all fields that start with arg', ->
        expect(@resource.errors().forField('customer').map((e) => e.code).toArray()).toEqual(['invalid', 'blank'])

    describe '#detailsForField()', ->
      it 'returns an object mapped to error code and message pairs for the field', ->
        expect(@resource.errors().detailsForField('title')).toEqual({ blank: 'Title cannot be blank' })

    describe '#forBase()', ->
      beforeEach ->
        @resource.errors().add('base', 'invalid', 'Product is invalid')

      it 'returns an object mapped to error code and message pairs for the base', ->
        expect(@resource.errors().forBase().map((e) => e.detail).first()).toEqual('Product is invalid')

    describe '#toArray()', ->
      it 'returns an array of errors for the resource', ->
        expect(@resource.errors().toArray()).toEqual([{ field: 'title', code: 'blank', message: 'Title cannot be blank', detail: 'Title cannot be blank' }])

    describe '#toCollection()', ->
      it 'returns a collection', ->
        expect(@resource.errors().toCollection().klass()).toBe(ActiveResource::Collection)

      it 'returns a collection of errors for the resource', ->
        expect(@resource.errors().toCollection().toArray()).toEqual([{ field: 'title', code: 'blank', message: 'Title cannot be blank', detail: 'Title cannot be blank' }])

describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

    MyLibrary.Product.last().then window.onSuccess

    @promise = moxios.wait =>
      moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
      .then =>
        @resource = window.onSuccess.calls.mostRecent().args[0]

  afterEach ->
    moxios.uninstall()

  describe '::Attributes', ->
    describe '.attributes()', ->
      beforeAll ->
        MyLibrary.Product.attributes('var1', 'var2', { readOnly: true })

      it 'returns result.readWrite as Collection with read-write attributes', ->
        expect(MyLibrary.Product.attributes().readWrite.toArray()).toEqual(['title']);

      it 'returns result.read as Collection with readOnly attributes', ->
        expect(MyLibrary.Product.attributes().read.toArray()).toEqual(['var1', 'var2']);

      it 'returns result.all as Collection with all attributes', ->
        expect(MyLibrary.Product.attributes().all.toArray()).toEqual(['title', 'var1', 'var2']);

    describe '#hasAttribute()', ->
      describe 'if resource has attribute', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.myAttribute = 'value'

        it 'returns true', ->
          @promise2.then =>
            expect(@resource.hasAttribute('myAttribute')).toBeTruthy()

      describe 'if resource does not have attribute', ->
        it 'returns false', ->
          @promise.then =>
            expect(@resource.__readAttribute('myAttribute')).toBeFalsy()

    describe '#__readAttribute()', ->
      describe 'if resource has attribute', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.myAttribute = 'value'

        it 'returns the attribute', ->
          @promise2.then =>
            expect(@resource.__readAttribute('myAttribute')).toEqual('value')

      describe 'if resource does not have attribute', ->
        it 'returns the attribute', ->
          @promise.then =>
            expect(@resource.__readAttribute('myAttribute')).toBeUndefined()

    describe '#assignAttributes()', ->
      it 'assigns attributes', ->
        @promise.then =>
          @resource.assignAttributes({ anAttribute: 'value' })
          expect(@resource.hasAttribute('anAttribute')).toBeTruthy()

      it 'assigns object attributes', ->
        @promise.then =>
          @resource.assignAttributes({ anAttribute: { stuff: 1234 } })
          expect(@resource.anAttribute).toEqual({ stuff: 1234 })

    describe '#attributes()', ->
      describe 'if attribute is a property', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.myAttribute = 1

        it 'returns the attribute', ->
          @promise2.then =>
            expect(@resource.attributes()['myAttribute']).toBeDefined()

      describe 'if attribute is a reserved word', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.__links = {}

        it 'does not return the attribute', ->
          @promise2.then =>
            expect(@resource.attributes()['__links']).toBeUndefined()

      describe 'if attribute is a function', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.myMethod = ->

        it 'does not return the attribute', ->
          @promise2.then =>
            expect(@resource.attributes()['myMethod']).toBeUndefined()

      describe 'strictAttributes mode', ->
        beforeEach ->
          MyLibrary.strictAttributes = true

          @promise2 = @promise.then =>
            @resource.assignAttributes(
              title: 'New title',
              anotherAttribute: 'string',
              var1: 'val1',
              var2: 'val2',
            )

        afterEach ->
          MyLibrary.strictAttributes = false

        it 'returns only attributes defined in klass.attributes', ->
          @promise2.then =>
            expect(@resource.attributes()).toEqual({
              title: 'New title',
              var1: 'val1',
              var2: 'val2',
            })

        describe 'readOnly arg', ->
          it 'returns readOnly args', ->
            @promise2.then =>
              expect(_.keys(@resource.attributes({ readOnly: true }))).toEqual([
                'var1',
                'var2',
              ])

        describe 'readWrite arg', ->
          it 'returns readWrite args', ->
            @promise2.then =>
              expect(_.keys(@resource.attributes({ readWrite: true }))).toEqual([
                'title',
              ])

    describe '#reload()', ->
      describe 'when resource is persisted', ->
        it 'makes a call to GET the resource', ->
          @promise.then =>
            @resource.reload()

            moxios.wait =>
              expect(moxios.requests.mostRecent().url).toEqual(@resource.links()['self'])

        it 'reloads the resource\'s attributes', ->
          @promise.then =>
            oldTitle = @resource.title
            @resource.reload()

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
              .then =>
                expect(@resource.title).not.toEqual(oldTitle)

      describe 'when resource has ID', ->
        beforeEach ->
          @resource2 = MyLibrary.Product.build(id: 1)

        it 'makes a call to GET the resource', ->
          @resource2.reload()
          moxios.wait =>
            expect(moxios.requests.mostRecent().url).toEqual(@resource2.links()['related'] + '1/')

      describe 'when resource is not persisted nor has ID', ->
        beforeEach ->
          @resource2 = MyLibrary.Product.build()

        it 'throws an error', ->
          expect(-> @resource2.reload()).toThrow()

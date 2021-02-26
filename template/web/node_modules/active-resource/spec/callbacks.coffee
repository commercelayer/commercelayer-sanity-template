describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Callbacks', ->
    describe '#afterBuild()', ->
      beforeEach ->
        MyLibrary.Order.afterBuild(->
          @orderItems().build([{}, {}, {}])
        )

        @resource = MyLibrary.Order.build()

      afterEach ->
        MyLibrary.Order.__callbacks['afterBuild'].clear()

      it 'calls after making a request', ->
        expect(@resource.orderItems().size()).toEqual(3)

    describe '#afterCreate()', ->
      beforeEach ->
        MyLibrary.Order.afterCreate(->
          @calls = @calls && @calls + 1 || 1
        )

        MyLibrary.Order.create()
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.find.success)
          .then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

      afterEach ->
        MyLibrary.Order.__callbacks['afterCreate'].clear()

      it 'calls after creating a resource', ->
        expect(@resource.calls).toEqual(1)

      describe 'when saving', ->
        beforeEach ->
          @promise2 = @promise.then =>
            @resource.save()

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.save.success)

        it 'does not call after saving a resource', ->
          expect(@resource.calls).toEqual(1)

    describe '#afterRequest()', ->
      beforeEach ->
        MyLibrary.Order.afterRequest(->
          @price = @price + 1.0
        )

        MyLibrary.Order.last()
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Order.all.success)
          .then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

      afterEach ->
        MyLibrary.Order.__callbacks['afterRequest'].clear()

      it 'calls after making a request', ->
        expect(@resource.price).toEqual(3.0)

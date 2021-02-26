describe 'ActiveResource', ->
  beforeEach ->
    moxios.install(MyLibrary.interface.axios)

    window.onSuccess = jasmine.createSpy('onSuccess')
    window.onFailure = jasmine.createSpy('onFailure')
    window.onCompletion = jasmine.createSpy('onCompletion')

  afterEach ->
    moxios.uninstall()

  describe '::Persistence', ->
    describe '#persisted()', ->
      describe 'when the resource is not persisted', ->
        beforeEach ->
          @resource = MyLibrary.Product.build()

        it 'returns false', ->
          expect(@resource.persisted?()).toBeFalsy()

      describe 'when the resource is persisted', ->
        beforeEach ->
          MyLibrary.Product.create(title: 'A product title', description: 'A product description', window.onCompletion)

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
            .then =>
              @resource = window.onCompletion.calls.mostRecent().args[0]

        it 'returns true', ->
          @promise.then =>
            expect(@resource.persisted?()).toBeTruthy()

    describe '#newResource()', ->
      describe 'when the resource is not persisted', ->
        beforeEach ->
          @resource = MyLibrary.Product.build()

        it 'returns true', ->
          expect(@resource.newResource?()).toBeTruthy()

      describe 'when the resource is persisted', ->
        beforeEach ->
          MyLibrary.Product.create(title: 'A product title', description: 'A product description', window.onCompletion)

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
            .then =>
              @resource = window.onCompletion.calls.mostRecent().args[0]

        it 'returns false', ->
          @promise.then =>
            expect(@resource.newResource?()).toBeFalsy()

    describe '#save', ->
      describe 'in general', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'executes the completion callback', ->
          @promise.then =>
            @resource.save(window.onCompletion)
            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
          .then =>
            expect(window.onCompletion).toHaveBeenCalled()

      describe 'when resource is persisted', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'makes a PATCH request', ->
          @promise.then =>
            @resource.save()

            moxios.wait =>
              expect(moxios.requests.mostRecent().method).toEqual('patch')

      describe 'when resource is not persisted', ->
        beforeEach ->
          @resource = MyLibrary.Product.build()

        it 'makes a POST request', ->
          @resource.save()
          moxios.wait =>
            expect(moxios.requests.mostRecent().method).toEqual('post')

      describe 'when resource is valid', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            @resource.title = 'Another title'
            @resource.save()

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)

        it 'returns the resource with saved attributes', ->
          @promise2.then =>
            expect(@resource.title).toEqual('Another title')

        it 'returns true for valid()', ->
          @promise2.then =>
            expect(@resource.valid()).toBeTruthy()

      describe 'when resource is invalid', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            @resource.title = ''
            @resource.save()

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.failure)

        it 'returns a resource with errors', ->
          @promise2.catch =>
            expect(@resource.errors().empty?()).toBeFalsy()

        it 'returns false for valid?()', ->
          @promise2.catch =>
            expect(@resource.valid?()).toBeFalsy()

    describe '#update', ->
      describe 'in general', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'executes the completion callback', ->
          @promise.then =>
            @resource.update(title: 'Another title', window.onCompletion)
            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)
          .then =>
            expect(window.onCompletion).toHaveBeenCalled()

      describe 'when resource is persisted', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

        it 'makes a PATCH request', ->
          @promise.then =>
            @resource.update(title: 'Another title')
            moxios.wait =>
              expect(moxios.requests.mostRecent().method).toEqual('patch')

      describe 'when resource is not persisted', ->
        beforeEach ->
          @resource = MyLibrary.Product.build(title: 'A product title', description: 'A product description')

        it 'makes a POST request', ->
          @resource.update(title: 'Another title')
          moxios.wait =>
            expect(moxios.requests.mostRecent().method).toEqual('post')

      describe 'when resource is valid', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            @resource.update(title: 'Another title', window.onCompletion)

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.success)

        it 'updates the resource\'s attributes', ->
          @promise2.then =>
            expect(@resource.title).toEqual('Another title')

      describe 'when resource is invalid', ->
        beforeEach ->
          MyLibrary.Product.last()
          .then window.onSuccess

          @promise = moxios.wait =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
            .then =>
              @resource = window.onSuccess.calls.mostRecent().args[0]

          @promise2 = @promise.then =>
            @resource.update(title: '', description: '', window.onCompletion)

            moxios.wait =>
              moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.save.failure)

        it 'does not update the attributes', ->
          @promise2.catch =>
            expect(@resource.title).not.toEqual('')

        it 'returns a resource with errors', ->
          @promise2.catch =>
            expect(@resource.errors().empty?()).toBeFalsy()

    describe '#destroy', ->
      beforeEach ->
        MyLibrary.Product.last()
        .then window.onSuccess

        @promise = moxios.wait =>
          moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.all.success)
          .then =>
            @resource = window.onSuccess.calls.mostRecent().args[0]

        @promise2 = @promise.then =>
          @resource.destroy()
          .then(window.onSuccess)
          .catch(window.onFailure)

          @resource

      describe 'in general', ->
        it 'makes a DELETE request', ->
          @promise2.then =>
            expect(moxios.requests.mostRecent().method).toEqual('delete')

      describe 'on success', ->
        beforeEach ->
          @promise3 = @promise2.then =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.destroy.success)

        it 'unpersists the resource', ->
          @promise3.then =>
            expect(@resource.persisted?()).toBeFalsy()

        it 'executes the success callback', ->
          @promise3.then =>
            expect(window.onSuccess).toHaveBeenCalled()

        it 'returns the destroyed resource to the callback', ->
          @promise3.then =>
            expect(window.onSuccess.calls.mostRecent().args[0]).toEqual(@resource)

      describe 'on failure', ->
        beforeEach ->
          @promise3 = @promise2.then =>
            moxios.requests.mostRecent().respondWith(JsonApiResponses.Product.destroy.failure)

        it 'does not unpersisted the resource', ->
          @promise3.catch =>
            expect(@resource.persisted?()).toBeTruthy()

        it 'executes the failure callback', ->
          @promise3.catch =>
            expect(window.onFailure).toHaveBeenCalled()

        it 'returns an error to the callback', ->
          @promise3.catch =>
            errors = window.onFailure.calls.mostRecent().args[0]
            expect(errors.first().code).toEqual('forbidden')

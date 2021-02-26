describe 'ActiveResource', ->
  describe '.extend()', ->
    it 'extends the class correctly', ->
      class MyModule
        @myMethod: ->

      class MyClass
        ActiveResource.extend(@, MyModule)

      expect(MyClass.myMethod).toBeDefined()

  describe '.include()', ->
    beforeEach ->
      class MyModule
        myMethod: ->

        class @::myOtherClass
          @__excludeFromExtend = true

      class MyClass
        ActiveResource.include(@, MyModule.prototype)

      @instance = new MyClass()

    it 'includes the class correctly', ->
      expect(@instance.myMethod).toBeDefined()

    it 'does not include methods flagged for exclusion', ->
      expect(@instance.myOtherClass).not.toBeDefined()

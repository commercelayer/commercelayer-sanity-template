describe 'ActiveResource', ->
  describe '::Typing', ->
    beforeEach ->
      @instance = new MyLibrary.Product()

      @otherInstance = new MyLibrary.Order()

    describe '#klass()', ->
      it 'returns the correct class', ->
        expect(@instance.klass()).toEqual(MyLibrary.Product)
        expect(@otherInstance.klass()).toEqual(MyLibrary.Order)

    describe '#isA()', ->
      describe "when argument is the object's class", ->
        it 'returns true', ->
          expect(@instance.isA(MyLibrary.Product)).toBeTruthy()

      describe "when argument is not the object's class", ->
        it 'returns false', ->
          expect(@instance.isA(MyLibrary.Order)).toBeFalsy()

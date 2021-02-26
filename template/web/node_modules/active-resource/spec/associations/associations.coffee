describe 'ActiveResource', ->
  describe '::Associations', ->
    describe '#association()', ->
      it 'builds associations', ->
        order = MyLibrary.Order.build()
        expect(
          order
          .association('product')
          .isA(ActiveResource::Associations::BelongsToAssociation)
        ).toBeTruthy()

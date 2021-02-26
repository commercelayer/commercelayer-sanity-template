describe 'ActiveResource', ->
  describe '::Collection', ->
    beforeEach ->
      @array = [1,2,3]
      @collection = ActiveResource::Collection.build(@array)

    describe '.build()', ->
      it 'builds an array into a collection', ->
        expect(ActiveResource::Collection.build(@array).toArray()).toEqual(@array)

      it 'builds a collection into a collection', ->
        expect(ActiveResource::Collection.build(@collection).toArray()).toEqual(@collection.toArray())

    describe '#size()', ->
      it 'returns an accurate size', ->
        expect(@collection.size()).toEqual(3)

    describe '#empty()', ->
      describe 'when collection is empty', ->
        beforeEach ->
          @collection = ActiveResource::Collection.build()

        it 'returns true', ->
          expect(@collection.empty()).toBeTruthy()

      describe 'when collection is not empty', ->
        it 'returns false', ->
          expect(@collection.empty()).toBeFalsy()

    describe '#include', ->
      describe 'if the item is in the collection', ->
        beforeEach -> @item = 2

        it 'returns true', ->
          expect(@collection.include(@item)).toBeTruthy()

      describe 'if the item is not in the collection', ->
        beforeEach -> @item = 100

        it 'returns true', ->
          expect(@collection.include(@item)).toBeFalsy()

    describe '#get()', ->
      it 'returns the item at the index', ->
        expect(@collection.get(1)).toEqual(2)

      describe 'when argument is greater than collection size', ->
        it 'returns undefined', ->
          expect(@collection.get(100)).toBeUndefined()

    describe '#set()', ->
      it 'sets the item at the index to the argument', ->
        @collection.set(1,4)
        expect(@collection.get(1)).toEqual(4)

      describe 'when index is greater than collection size', ->
        it 'does not set an index', ->
          @collection.set(100,4)
          expect(@collection.get(100)).toBeUndefined()

    describe '#toArray()', ->
      it 'returns the collection as an array', ->
        expect(@collection.toArray()).toEqual(@array)

    describe '#all()', ->
      it 'returns the collection as an array', ->
        expect(@collection.all()).toEqual(@array)

    describe '#first(n)', ->
      it 'returns the first item', ->
        expect(@collection.first()).toEqual(1)

      describe 'when n is specified', ->
        it 'returns the first n items', ->
          expect(@collection.first(2)).toEqual([1,2])

    describe '#last(n)', ->
      it 'returns the last item', ->
        expect(@collection.last()).toEqual(3)

      describe 'when n is specified', ->
        it 'returns the last n items', ->
          expect(@collection.last(2)).toEqual([2,3])

    describe '#each()', ->
      it 'iterates over each item', ->
        counter = 0
        @collection.each (i) ->
          counter += i
        expect(counter).toEqual(6)

    describe '#inject()', ->
      it 'iterates over each item with the object passed in', ->
        counter = @collection.inject 0, (num, i) ->
          num += i
        expect(counter).toEqual(6)

    describe '#map()', ->
      it 'returns a mapped collection', ->
        expect(@collection.map((i) -> i + 1).toArray()).toEqual([2,3,4])

    describe '#compact()', ->
      beforeEach ->
        @array = [1,null,false,2,undefined,3]
        @collection = ActiveResource::Collection.build(@array)

      it 'removes null values', ->
        expect(@collection.compact().toArray()).toEqual([1,false,2,3])

    describe '#flatten()', ->
      beforeEach ->
        @array = [[1,2],[3,[4,5]]]
        @collection = ActiveResource::Collection.build(@array)

      it 'flattens a nested array', ->
        expect(@collection.flatten().toArray()).toEqual([1,2,3,4,5])

    describe '#push()', ->
      it 'pushes an item onto the end of the collection', ->
        @collection.push(10)
        expect(@collection.toArray()).toEqual([1,2,3,10])

      describe 'when pushing multiple items', ->
        it 'pushes all items onto the collection', ->
          @collection.push(10,30)
          expect(@collection.toArray()).toEqual([1,2,3,10,30])

    describe '#unshift()', ->
      it 'unshifts an item onto the beginning of the collection', ->
        @collection.unshift(10)
        expect(@collection.toArray()).toEqual([10,1,2,3])

      describe 'when unshifting multiple items', ->
        it 'unshifts all items onto the collection', ->
          @collection.unshift(10,30)
          expect(@collection.toArray()).toEqual([10,30,1,2,3])

    describe '#delete()', ->
      it 'removes the item from the collection', ->
        @collection.delete(2)
        expect(@collection.toArray()).toEqual([1,3])

      it 'returns the deleted items', ->
        expect(@collection.delete(2)).toEqual([2])

      describe 'when deleting multiple items', ->
        it 'deletes all items from the collection', ->
          @collection.delete(1,2)
          expect(@collection.toArray()).toEqual([3])

    describe '#clear()', ->
      it 'clears the array', ->
        @collection.clear()
        expect(@collection.size()).toEqual(0)

    describe '#select()', ->
      beforeEach ->
        @predicate = (i) ->
          i % 2 == 0

      it 'returns a collection of items that passed the predicate', ->
        expect(@collection.select(@predicate).toArray()).toEqual([2])

      describe 'when predicate does not match any items', ->
        beforeEach ->
          @predicate = (i) ->
            false

        it 'returns an empty colletion', ->
          expect(@collection.select(@predicate).toArray()).toEqual([])

    describe '#detect()', ->
      beforeEach ->
        @predicate = (i) ->
          i % 2 == 1

      it 'returns a collection of items that passed the predicate', ->
        expect(@collection.detect(@predicate)).toEqual(1)

      describe 'when predicate does not match any items', ->
        beforeEach ->
          @predicate = (i) ->
            false

        it 'returns undefined', ->
          expect(@collection.detect(@predicate)).toBeUndefined()

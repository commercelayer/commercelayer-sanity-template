describe('inflector', function() {
  /**
   * Test macro for pluralize & singularize tests
   */
  function example(method, from, to) {
    it(method + 's "' + from + '" to "' + to + '"', function() {
      expect(_[method](from)).to.equal(to);
    });
  }

  describe('plurals', function() {
    [
      ['rose', 'roses'],
      ['axis', 'axes'],
      ['virus', 'viri'],
      ['alias', 'aliases'],
      ['bus', 'buses'],
      ['tomato', 'tomatoes'],
      ['datum', 'data'],
      ['analysis', 'analyses'],
      ['life', 'lives'],
      ['leaf', 'leaves'],
      ['loaf', 'loaves'],
      ['thief', 'thieves'],
      ['hive', 'hives'],
      ['boss', 'bosses'],
      ['soliloquy', 'soliloquies'],
      ['wish', 'wishes'],
      ['vertex', 'vertices'],
      ['mouse', 'mice'],
      ['ox', 'oxen'],
      ['quiz', 'quizzes']
    ].forEach(function(word) {
      example('pluralize', word[0], word[1]);
    });
  });
  describe('singulars', function() {
    [
      ['roses', 'rose'],
      ['news', 'news'],
      ['data', 'datum'],
      ['analyses', 'analysis'],
      ['hives', 'hive'],
      ['soliloquies', 'soliloquy'],
      ['series', 'series'],
      ['movies', 'movie'],
      ['wishes', 'wish'],
      ['mice', 'mouse'],
      ['buses', 'bus'],
      ['shoes', 'shoe'],
      ['bosses', 'boss'],
      ['boss', 'boss'],
      ['crises', 'crisis'],
      ['viri', 'virus'],
      ['statuses', 'status'],
      ['oxen', 'ox'],
      ['vertices', 'vertex'],
      ['quizzes', 'quiz'],
      ['databases', 'database']
    ].forEach(function(word) {
      example('singularize', word[0], word[1]);
    });
  });
  describe('irregulars', function() {
    [
      ['person', 'people'],
      ['man', 'men'],
      ['child', 'children'],
      ['sex', 'sexes'],
      ['move', 'moves'],
      ['cow', 'kine']
    ].forEach(function(word) {
      example('pluralize', word[0], word[1]);
      example('singularize', word[1], word[0]);
    });
  });
  describe('uncountables', function() {
    [
      'equipment',
      'information',
      'rice',
      'money',
      'species',
      'series',
      'fish',
      'sheep',
      'jeans'
    ].forEach(function(word) {
      example('pluralize', word, word);
      example('singularize', word, word);
    });
  });
  describe('#resetInflections', function() {
    it('resets the default inflections', function() {
      _.plural('haxor', 'hax0rs!');
      expect(_.pluralize('haxor')).to.equal('hax0rs!');
      _.resetInflections();
      expect(_.pluralize('haxor')).to.equal('haxors');
    });
  });
});

describe('#pluralize', function() {
  it('pluralizes the given noun', function() {
    expect(_.pluralize('post')).to.equal('posts');
  });
  it('returns the same word if it cannot be pluralized', function() {
    expect(_.pluralize('posts')).to.equal('posts');
  });
  describe('with a number', function() {
    it('pluralizes the word if not 1', function() {
      expect(_.pluralize('post', 0)).to.equal('posts');
    });
    it('pluralizes the word if not "1"', function() {
      expect(_.pluralize('post', '0')).to.equal('posts');
    });
    it('pluralizes the word if non-1 float', function() {
      expect(_.pluralize('post', 1.5)).to.equal('posts');
    });
    it('singularizes the word if 1', function() {
      expect(_.pluralize('posts', 1)).to.equal('post');
    });
    it('singularizes the word if "1"', function() {
      expect(_.pluralize('posts', '1')).to.equal('post');
    });
    describe('and true', function() {
      it('includes the word with the plural', function() {
        expect(_.pluralize('post', 0, true)).to.equal('0 posts');
      });
      it('includes the word with non-1 float', function() {
        expect(_.pluralize('post', '1.3', true)).to.equal('1.3 posts');
      });
      it('includes the word with the singular', function() {
        expect(_.pluralize('post', 1, true)).to.equal('1 post');
      });
    });
  });
});

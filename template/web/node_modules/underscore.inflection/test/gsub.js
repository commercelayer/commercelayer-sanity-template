describe('#gsub', function() {
  describe('with a regex', function() {
    it('replaces one instance of the match', function() {
      expect(_.gsub('word', /wo/, 'ne')).to.equal('nerd');
    });
    it('replaces two instances of the match', function() {
      expect(_.gsub('word word', /wo/, 'ne')).to.equal('nerd nerd');
    });
    it('returns null if no match', function() {
      expect(_.gsub('word', /zz/, 'ne')).to.be.null;
    });
  });
  describe('with a string', function() {
    it('replaces one instance of the match', function() {
      expect(_.gsub('word', 'wo', 'ne')).to.equal('nerd');
    });
    it('replaces two instances of the match', function() {
      expect(_.gsub('word word', 'wo', 'ne')).to.equal('nerd nerd');
    });
    it('returns null if no match', function() {
      expect(_.gsub('word', 'zz', 'ne')).to.be.null;
    });
  });
});

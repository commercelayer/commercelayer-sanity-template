describe('#titleize', function() {
  it('returns non-strings', function() {
    expect(_.titleize(5)).to.equal(5);
  });
  it('returns the empty string when provided with the empty string', function() {
    expect(_.titleize('')).to.equal('');
  });
  it('titleizes a word', function() {
    expect(_.titleize('banana')).to.equal('Banana');
  });
  it('titleizes multiple words', function() {
    expect(_.titleize('banana potato fork')).to.equal('Banana Potato Fork');
  });
  it('does not change the whitespace', function() {
    expect(_.titleize('\tbanana\npotato  fork\r\n')).to.equal('\tBanana\nPotato  Fork\r\n');
  });
  it('does not alter words that begin with non-alphabetic characters', function() {
    expect(_.titleize('123banana')).to.equal('123banana');
  });
});

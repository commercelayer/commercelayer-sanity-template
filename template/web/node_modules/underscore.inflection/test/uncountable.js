describe('#uncountable', function() {
  it('notes the word as a special case in pluralization', function() {
    _.uncountable('asdf');
    expect(_.pluralize('asdf')).to.equal('asdf');
  });
  it('notes the word as a special case in singularization', function() {
    _.uncountable('asdf');
    expect(_.singularize('asdf')).to.equal('asdf');
  });
});

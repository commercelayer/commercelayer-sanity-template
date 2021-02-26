describe('#singular', function() {
  it('adds a new singularization rule by explicit string', function() {
    _.singular('data', 'datum');
    expect(_.singularize('data')).to.equal('datum');
  });
  it('adds a new singularization rule by regex', function() {
    _.singular(/(t)a$/i, '$1um');
    expect(_.singularize('data')).to.equal('datum');
  });
});

describe('#plural', function() {
  it('adds a new pluralization rule by explict string', function() {
    _.plural('axis', 'axes');
    expect(_.pluralize('axis')).to.equal('axes');
  });
  it('adds a new pluralization rule by regex', function() {
    _.plural(/(ax)is$/i, '$1es');
    expect(_.pluralize('axis')).to.equal('axes');
  });
});

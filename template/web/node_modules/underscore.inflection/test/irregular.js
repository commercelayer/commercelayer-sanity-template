describe('#irregular', function() {
  it('adds a rule to pluralize the special case', function() {
    _.irregular('haxor', 'hax0rs!');
    expect(_.pluralize('haxor')).to.equal('hax0rs!');
  });
  it('adds a rule to singularize the special case', function() {
    _.irregular('hax0r!', 'haxors');
    expect(_.singularize('haxors')).to.equal('hax0r!');
  });
});

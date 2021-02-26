describe('#ordinalize', function() {
  it('returns a stirng that is not a number or string', function() {
    expect(_.ordinalize('hello')).to.equal('hello');
  });
  it('ordinalizes a number', function() {
    expect(_.ordinalize(4)).to.equal('4th');
  });
  it('ordinalizes a number string', function() {
    expect(_.ordinalize('4')).to.equal('4th');
  });
  it('ordinalizes 0 to "0th"', function() {
    expect(_.ordinalize(0)).to.equal('0th');
  });
  it('ordinalizes 1 to "1st"', function() {
    expect(_.ordinalize(1)).to.equal('1st');
  });
  it('ordinalizes 2 to "2nd', function() {
    expect(_.ordinalize(2)).to.equal('2nd');
  });
  it('ordinalizes 3 to "3rd"', function() {
    expect(_.ordinalize(3)).to.equal('3rd');
  });
  it('ordinalizes 11 to "11th"', function() {
    expect(_.ordinalize(11)).to.equal('11th');
  });
  it('ordinalizes 12 to "12th"', function() {
    expect(_.ordinalize(12)).to.equal('12th');
  });
  it('ordinalizes 13 to "13th"', function() {
    expect(_.ordinalize(13)).to.equal('13th');
  });
  it('ordinalizes 1003 to "1003rd"', function() {
    expect(_.ordinalize(1003)).to.equal('1003rd');
  });
  it('ordinalizes -11 to "-11th', function() {
    expect(_.ordinalize(-11)).to.equal('-11th');
  });
  it('ordinalizes -1021 to "-1021st', function() {
    expect(_.ordinalize(-1021)).to.equal('-1021st');
  });
});

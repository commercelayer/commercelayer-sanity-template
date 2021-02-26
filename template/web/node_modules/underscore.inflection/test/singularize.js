describe('#singularize', function() {
  it('singularizes the given noun', function() {
    expect(_.singularize('posts')).to.equal('post');
  });
  it('returns the same word if it cannot be singularized', function() {
    expect(_.singularize('post')).to.equal('post');
  });
  it('singularizes a word that contains an irregular', function() {
    expect(_.singularize('comments')).to.equal('comment');
  });
});

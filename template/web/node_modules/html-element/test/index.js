require('../global-shim');

var test = require('tap').test;

//remove white space so it's easier to test
function clean(e) {
  return e.replace(/\n/g, '')
          .replace(/\s+/, ' ')
}

test('Element attributes', function(t){
  var div = document.createElement('div')
  t.equal(div.nodeName, 'div')
  t.equal(div.tagName, 'div')

  t.end()
})

test('assign textContent to an Element', function(t){
  var div = document.createElement('div')
  t.equal(clean(div.textContent), '')

  // adds and replaces text
  div.textContent = 'text 1'
  t.equal(clean(div.textContent), 'text 1')
  div.textContent = 'text 2'
  t.equal(clean(div.textContent), 'text 2')

  // replaces existing children
  div = document.createElement('div')
  var p1 = document.createElement('p')
  var p2 = document.createElement('p')
  div.appendChild(p1)
  div.appendChild(p2)
  t.same(div.childNodes[0], p1)
  t.same(div.childNodes[1], p2)
  t.equal(clean(div.textContent), '')
  div.textContent = 'replacement'
  t.equal(clean(div.textContent), 'replacement')
  t.equal(div.childNodes.length, 1)
  t.notSame(div.childNodes[0], p1)

  t.end()
})

test('create a Text node', function(t){
  var h1 = document.createElement('h1')
  t.equal(clean(h1.outerHTML), "<h1></h1>")
  t.equal(clean(h1.textContent), "")
  t.equal(clean(h1.innerHTML), "")

  h1.setAttribute('class', 'myclass');
  t.type(h1.toString(), "string", "type of h1 should be string")

  t.equal(clean(h1.outerHTML), '<h1 class="myclass"></h1>')
  t.equal(clean(h1.textContent), "")

  h1.appendChild(document.createTextNode('hello'))

  t.equal(clean(h1.outerHTML), '<h1 class="myclass">hello</h1>')
  t.equal(clean(h1.textContent), "hello")
  t.equal(clean(h1.innerHTML), "hello")

  h1.appendChild(document.createElement('h2'))
  t.equal(clean(h1.outerHTML), '<h1 class="myclass">hello<h2></h2></h1>')
  t.equal(clean(h1.innerHTML), "hello<h2></h2>")

  h1.innerHTML = ''

  t.equal(clean(h1.innerHTML), "")
  t.equal(clean(h1.outerHTML), '<h1 class="myclass"></h1>')
  t.equal(h1.childNodes.length, 0)


  t.end();
})

test('Text.length', function(t) {
  var tnode = document.createTextNode('wombats')

  t.equal(tnode.length, 7);
  tnode.replaceData(0, tnode.length, 'bla');
  t.equal(tnode.length, 3);

  t.end();
});

test('Text.replaceData', function(t) {
  var tnode = document.createTextNode('wombats')

  t.equal(tnode.textContent, 'wombats');
  tnode.replaceData(2, 3, 'tsi');
  t.equal(tnode.textContent, 'wotsits');

  t.end();
});

test('create a Comment node', function(t){
  var body = document.createElement('body')

  var comment = document.createComment('a comment')
  body.appendChild(comment)

  t.equal(clean(body.outerHTML), "<body><!--a comment--></body>")

  comment.data = 'still a comment'

  t.equal(clean(body.outerHTML), "<body><!--still a comment--></body>")

  t.end()
})

test('dataset', function(t){

  var div = document.createElement('div')
  div.dataset['id'] = '123'
  t.equal(clean(div.outerHTML), '<div data-id="123"></div>')

  t.end()
})

test('basic set innerHTML', function(t){

  var div = document.createElement('div')
  var span = document.createElement('span')

  div.appendChild(span)

  t.equal(clean(div.outerHTML), '<div><span></span></div>')

  div.innerHTML = '<strong>Replaced content</strong>'

  t.equal(clean(div.outerHTML), '<div><strong>Replaced content</strong></div>')

  t.end()
})

test('correct html and attribute escaping', function(t){

  var div = document.createElement('div')
  div.setAttribute('title', "It's <bad> & \"scary\"")
  div.appendChild(document.createTextNode("It's text with <bad> & not so bad characters in \"it\""))

  t.equal(clean(div.outerHTML),
    '<div title="It\'s &lt;bad&gt; &amp; &quot;scary&quot;">' +
    'It\'s text with &lt;bad&gt; &amp; not so bad characters in "it"</div>'
  )

  t.end()
})

test('whitespace preserved', function(t){
  var body = document.createElement('body')
  body.appendChild(document.createTextNode('\n  '))
  var div = document.createElement('div')
  div.appendChild(document.createTextNode('The con'))
  var em = document.createElement('em')
  em.appendChild(document.createTextNode('tent'))
  div.appendChild(em)
  div.appendChild(document.createTextNode(' of the div'))
  body.appendChild(div)
  body.appendChild(document.createTextNode('\n'))

  t.equal(body.outerHTML,
    "<body>\n" +
    "  <div>The con<em>tent</em> of the div</div>\n" +
    "</body>"
  )

  t.end()

})

test('set/get style.cssText', function(t){
  var div = document.createElement('div')

  div.style.setProperty('background', 'green')
  t.equal(div.style.cssText, 'background:green;')

  div.style.cssText = 'color: red; padding: 8px'
  t.equal(div.style.cssText, 'color:red;padding:8px;')

  t.end()
})

test('style set/getAttribute', function(t){
  var div = document.createElement('div')

  div.style.setProperty('background', 'green')
  t.equal(div.getAttribute('style'), 'background:green;')

  div.setAttribute('style', 'color: red; padding: 8px')
  t.equal(div.getAttribute('style'), 'color:red;padding:8px;')

  t.end()
})

test('non style set/getAttribute', function(t){
  var input = document.createElement('input')

  t.equal(input.getAttribute('value'), null, 'should return null if attribute does not exist')
  input.setAttribute('someattribute', 'testvalue')
  t.equal(input.getAttribute('someattribute'), 'testvalue')
  input.setAttribute('someattribute', '')
  t.equal(input.getAttribute('someattribute'), '', 'handles empty string')
  input.setAttribute('someattribute', false)
  t.equal(typeof input.getAttribute('someattribute'), 'string', 'should return strings')
  t.equal(input.getAttribute('someattribute'), 'false', 'should handle booleans')

  t.end()
})

test('render outerHTML with inline style', function(t){
  var div = document.createElement('div')

  div.style.setProperty('background', 'green')
  t.equal(div.outerHTML, '<div style="background:green;"></div>')

  div.style.cssText = 'color: red; padding: 8px'
  t.equal(div.outerHTML, '<div style="color:red;padding:8px;"></div>')

  t.end()
})

test('outerHTML should include only HTML attributes', function(t) {
  var a = document.createElement('a')
  a.href = '/link'
  a.foo = 'bar'
  t.equal(a.outerHTML, '<a href="/link"></a>')

  var div = document.createElement('div')
  div.href = '/invalid'
  div.tabindex = 2
  t.equal(div.outerHTML, '<div tabindex="2"></div>')

  t.end()
})

test('outerHTML should translate props to attrs', function(t) {
  var label = document.createElement('label')
  label.headers = 'invalid'
  label.htmlFor = 'respect'
  t.equal(label.outerHTML, '<label for="respect"></label>')

  var div = document.createElement('div')
  div.className = 'foo bar'
  t.equal(div.outerHTML, '<div class="foo bar"></div>')

  t.end()
})

test('removeAttribute', function(t){
  var div = document.createElement('div')
  div.setAttribute('data-id', 100)
  t.same(div.attributes[0], { name: 'data-id', value: 100 })
  div.setAttribute('data-key', 'key')
  t.same(div.attributes[1], { name: 'data-key', value: 'key' })
  div.removeAttribute('data-key')
  t.same(div.attributes, [ { name: 'data-id', value: 100 } ])
  div.removeAttribute('data-id')
  t.same(div.attributes, [])
  div.className = 'css-class'
  div.removeAttribute('class')
  t.equal('className' in div, false)
  t.end()
})

test('insertBefore', function(t){
  var div = document.createElement('div')
  var div1 = document.createElement('div')
  var div2 = document.createElement('div')
  div.appendChild(div1)
  div.appendChild(div2)
  var children = div.childNodes
  t.same(children[0], div1)
  t.same(children[1], div2)
  t.same(div2.parentNode, div)

  var div3 = document.createElement('div')
  div.insertBefore(div3, div2)
  t.same(children[1], div3)
  t.same(children[2], div2)
  t.same(div2.parentNode, div)

  // If referenceNode is null, the newNode is inserted
  // at the end of the list of child nodes.
  var div4 = document.createElement('div')
  div.insertBefore(div4, null)
  t.same(children[2], div2)
  t.same(children[3], div4)
  t.same(div4.parentNode, div)

  // insertBefore should set parentNode
  var div5 = document.createElement('div')
  div.insertBefore(div5, div4)
  t.same(children[3], div5)
  t.same(div5.parentNode, div)

  t.end()
})

test('addEventListener', function(t) {
  var div = document.createElement('div')
  var listener1 = function() { return 1; };
  var listener2 = function() { return 2; };

  div.addEventListener('click', listener1);
  t.same(div._eventListeners, {click: [listener1]});

  // ensure no duplicate listeners
  div.addEventListener('click', listener1);
  t.same(div._eventListeners, {click: [listener1]});

  div.addEventListener('click', listener2);
  t.same(div._eventListeners, {click: [listener1, listener2]});

  t.end();
});

test('removeEventListener', function(t) {
  var div = document.createElement('div')
  var listener1 = function() { return 1; };
  var listener2 = function() { return 2; };

  div.addEventListener('click', listener1);
  div.addEventListener('click', listener2);

  t.same(div._eventListeners, {click: [listener1, listener2]});
  div.removeEventListener('click', listener1);
  t.same(div._eventListeners, {click: [listener2]});

  // ensure no error on nonexistent listener removal
  div.removeEventListener('click', listener1);
  t.same(div._eventListeners, {click: [listener2]});

  // ensure no removal by equivalent event listener value; only by reference
  div.removeEventListener('click', function() { return 2; });
  t.same(div._eventListeners, {click: [listener2]});

  div.removeEventListener('click', listener2);
  t.same(div._eventListeners, {click: []});

  t.end();
});

test('dispatchEvent', function(t) {
  var div = document.createElement('div')
  div.setAttribute('value', 'baz');

  var selected = [];

  var listener = function(ev) {
    // test event target
    selected.push(ev.detail.selected + ':' + ev.target.getAttribute('value'));
  };

  div.addEventListener('click', listener);
  div.dispatchEvent(new CustomEvent('click', {
    detail: {
      selected: 'foo',
    },
  }));

  t.same(selected, ['foo:baz']);

  div.dispatchEvent(new CustomEvent('click', {
    detail: {
      selected: 'bar',
    },
  }));

  t.same(selected, ['foo:baz', 'bar:baz']);

  var doubleListener = function(ev) {
    selected.push(ev.detail.selected + ev.detail.selected);
  };
  div.addEventListener('click', doubleListener);
  div.dispatchEvent(new CustomEvent('click', {
    detail: {
      selected: 'bar',
    },
  }));

  t.same(selected, ['foo:baz', 'bar:baz', 'bar:baz', 'barbar']);

  div.removeEventListener('click', doubleListener);
  div.dispatchEvent(new CustomEvent('click', {
    detail: {
      selected: 'foo',
    },
  }));

  t.same(selected, ['foo:baz', 'bar:baz', 'bar:baz', 'barbar', 'foo:baz']);

  div.removeEventListener('click', listener);
  div.dispatchEvent(new CustomEvent('click', {
    detail: {
      selected: 'bar',
    },
  }));

  // selected list should stay the same since all listeners were removed
  t.same(selected, ['foo:baz', 'bar:baz', 'bar:baz', 'barbar', 'foo:baz']);

  t.end();
});

test('Input with minlength and maxlength', function(t){
  var input = document.createElement('input')
  input.setAttribute('minlength', 42)
  input.setAttribute('maxlength', 420)
  t.equal(input.outerHTML, '<input minlength="42" maxlength="420">')
  t.end()
})

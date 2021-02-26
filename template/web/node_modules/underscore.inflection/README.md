## underscore.inflection

> [![NPM version][npm-badge]][npm]
> [![Build Status][travis-badge]][travis-ci]
> [![Coverage Status][coveralls-badge]][coveralls]

**Another javascript inflector?!**

I'll be the first to say it; this isn't the first port of [ActiveSupport::Inflector][activesupport] to js. Not by a long shot. But I'll definitely take [underscore][underscore] mixins over extending String.prototype or other clunky implementations any day.

Also, this one has tests!

Inflections
-----------

The methods listed below are the ones you'll be using 99% of the time.

### pluralize

**Signature:** `_.pluralize(word)`

`pluralize` pluralizes the string passed to it.

	// functional style
	_.pluralize('word'); // => 'words'

	// object-oriented style
	_('word').pluralize(); // => 'words'

It also can accept a number as the second parameter. If a number is provided, it will pluralize the word to match the number.

	_('word').pluralize(0); // => 'words'
	_('word').pluralize(1); // => 'word'
	_('word').pluralize(1.5); // => 'words'

Optionally, you can pass `true` as a third parameter. If found, this will include the count with the output.

	_('word').pluralize(0, true); // => '0 words'
	_('word').pluralize(1, true); // => '1 word'

### singularize

**Signature:** `_.singularize(word)`

`singularize` returns the singular version of the plural passed to it.

	// functional style
	_.singularize('words'); // => 'word'

	// object-oriented style
	_('words').singularize(); // => 'word'

### gsub

**Signature:** `_.gsub(word, rule, replacement)`

`gsub` is a method that is just slightly different than our standard `String#replace`. The main differences are that it matches globally every time, and if no substitution is made it returns `null`. It accepts a string for `word` and `replacement`, and `rule` can be either a string or a regex.

	// functional style
	_.gsub('word', /wo/, 'ne'); // => 'nerd'

	// object-oriented style
	_('word').gsub(/wo/, 'ne'); // => 'nerd'

### ordinalize

**Signature:** `_.ordinalize(number)`

`ordinalize` adds an ordinal suffix to `number`.

	_.ordinalize(1);    // => '1st'
	_.ordinalize("5");  // => '5th'
	_.ordinalize(11);   // => '11th'
	_.ordinalize(1033); // => '1033rd'
	_.ordinalize(-15);  // => '-15th'

### titleize

**Signature:** `_.titleize( words )`

`titleize` capitalizes the first letter of each word in the string `words`. It preserves the existing whitespace.

	_.titleize('banana');               // => 'Banana'
	_.titleize('banana potato fork');   // => 'Banana Potato Fork'
	_.titleize('banana  potato\tfork'); // => 'Banana  Potato\tFork'

## Configuring the Inflector

Should you ever need to configure the Inflector beyond the defaults, use these methods to do so:

### plural

**Signature:** `_.plural(rule, replacement)`

`plural` creates a new pluralization rule for the inflector. `rule` can be either a string or a regex.

	// functional style with explicit string
	_.plural('axis', 'axes');

	// object-oriented style with explicit string
	_('axis').plural('axes');

	// functional style with regex
	_.plural(/(ax)is$/i, '$1es');

	// object-oriented style with regex
	_(/(ax)is$/i).plural('$1es');

### singular

**Signature:** `_.singular(rule, replacement)`

`singular` creates a new singularization rule for the inflector. `rule` can be either a string or a regex.

	// functional style with explicit string
	_.singular('data', 'datum');

	// object-oriented style with explicit string
	_('data').singular('datum');

	// functional style with regex
	_.singular(/(t)a$/i, '$1um');

	// object-oriented style with regex
	_(/(t)a$/i).singular('$1um');

### irregular

**Signature:** `_.irregular(singular, plural)`

`irregular` is a shortcut method to create both a pluralization and singularization rule for the word at the same time. You must supply both the singular form and the plural form as explicit strings.

	// functional style
	_.irregular('haxor', 'hax0rs!');

	// object-oriented style
	_('haxor').irregular('hax0rs!');

### uncountable

**Signature:** `_.uncountable(word)`

`uncountable` creates a new uncountable rule for `word`. Uncountable words do not get pluralized or singularized.

	// functional style
	_.uncountable('equipment');

	// object-oriented style
	_('equipment').uncountable();

### resetInflections

**Signature:** `_.resetInflections()`

`resetInflections` resets the inflector's rules to their initial state, clearing out any custom rules that have been added.

## Thanks to...

The [Rails][rails] team for [ActiveSupport][activesupport]

The [DocumentCloud][documentcloud] team for [underscore.js][underscore]

These other Inflector implementations:

- [active-support-for-javascript](http://code.google.com/p/active-support-for-javascript/)
- [inflection-js](http://code.google.com/p/inflection-js/)
- [Javascript Rails-like inflector](http://snippets.dzone.com/posts/show/3205)

Though no code was taken directly from them, they deserve plenty of props for doing it before me. If underscore isn't your thing, check them out!

## Contributors

```
    66	Jeremy Ruppel
     7	Landon Schropp
     2	Johnathon Sanders
     2	Seggy Umboh
     1	Sam Dornan
     1	Shane Riley
     1	bramski
     1	maratfakhreev
     1	Daniel Perez
     1	trevor
     1	Dayton Nolan
     1	Joseph Spens
     1	Kris Neuharth
```

## License

[MIT License][LICENSE]

[npm]: http://badge.fury.io/js/underscore.inflection
[npm-badge]: https://badge.fury.io/js/underscore.inflection.svg
[travis-ci]: https://travis-ci.org/jeremyruppel/underscore.inflection
[travis-badge]: https://travis-ci.org/jeremyruppel/underscore.inflection.svg?branch=master
[coveralls]: https://coveralls.io/r/jeremyruppel/underscore.inflection?branch=master
[coveralls-badge]: https://img.shields.io/coveralls/jeremyruppel/underscore.inflection.svg
[rails]: https://github.com/rails/rails
[activesupport]: https://github.com/rails/rails/tree/master/activesupport
[underscore]: http://documentcloud.github.com/underscore/
[documentcloud]: http://www.documentcloud.org/home
[LICENSE]: https://github.com/jeremyruppel/underscore.inflection/blob/master/LICENSE

### 0.9.0

* Republished activeresource@2.0.11 npm package as active-resource@0.9.0

### 0.9.1

* Removed promises from calls to `Association#assign(save: false)` in favor of synchronous assignment

### 0.9.2

* Added `Base#clone` to clone resources

### 0.9.3

* Added `#errors` to list of objects/properties cloned in `Base#clone`
* Added `afterBuild` callback to Resource classes

### 0.9.4

* Add change tracking to fields, with methods `resource.changed()` and `resource.changedFields()` accessible for seeing
changes to each resource
  * Add `klass().attributes()` for specifying attributes to track.
  * Relationships will automatically be tracked
* Add `CollectionResponse` object that is returned from `GET` requests to collection endpoints
  * Provides pagination helpers when response includes pagination links
* Allow `Interfaces.JsonApi` to be overridden easier by making all helper methods prototype properties

### 0.9.5

* Allow response documents to omit `id`
* Append '/' to relationship links
* Refactor links to add storage capability and fix bugs
* Allow `Interfaces.JsonApi` to create default relationship links using resource self link and reflection name if links not otherwise present

### 0.9.6

* Fix bug in Fields#changedFields collection association new target item finding
* Fix bug in Fields#changedFields resulting from owner relationship resources not being assigned as a field to their children

## 0.9.7

* Add `resourceLibrary.includePolymorphicRepeats` option that if `true` allows primary data’s relationships to send polymorphic
  owner data to the server, despite that data also being the primary data

## 1.0.0-alpha.0

* **Breaking:** Switched from `jQuery.ajax` to `axios`, which have different promise interfaces
* **Breaking:** Switched all references of `attribute` in `errors()` object to `field`:
  * `error.attribute` is now `error.field`
  * `resource.errors().forField(field)` returns a collection of errors where `field.startsWith(field)`
  * `resource.errors().forAttribute(attribute)` is now `resource.errors().detailsForField(field)`
* **Potentially breaking:** Fixed the incorrect `Content-Type` in default request interface (`JsonApi`)
  * Original: `application/json`
  * Correct: `application/vnd.api+json`
* Switch to new build system using `grunt-umd` package instead of `grunt-umd_wrapper`
* Pad `/` on bad URL references to remove ill formatting of query URLs
* Fix bug in relationship link name being camelCased in `JsonApi` interface
* Add `resourceLibrary.strictAttributes` boolean config option. If true, only attributes defined in `klass().attributes()` will
  be in the result of `resource.attributes()`. If false, any non-function properties of the resource will be returned.
* Add `afterRequest` callback that is called after GET, POST, PATCH, PUT requests of a resource
  * `afterBuild` will be called on GET, but it is called before any fields are assigned to the resource
* Add source maps
* Fix bug in array processing in `Interfaces.JsonApi#toCamelCase` and `toUnderscored`

## 1.0.0-alpha.1

* Add source map for dist release

## 1.0.0-alpha.2

* Allow resources to be provided as values in `where` statements, transforming their primaryKey as value
* Fix bug that left `Relation#select` field classes camelCased in requests
* Use a single instance of `axios` in interfaces, so that `resourceLibrary.interface.axios.request` can be easily stubbed
* Fix bug in Interfaces.JsonApi#toCamelCase that mishandles attributes with arrays of strings as the value
* Add pop and shift to Collection
* Fix JSON API interface sending invalid relationship data format when relationship assigned to null
* Add readOnly and readWrite attributes and only send readWrite attributes to server via JsonApi interface
* Add default error message for timeouts to requests
* Add immutable mode that makes all resources immutable and all behavior conform to this
* Reserve `__super__` attribute from being used publicly
* Add pretty print for `Base.toString()`
* Add `ResourceLibrary#createResource` that takes in class and composes it with `Base` class, calling static `define`
  on it to define fields directly in the class

## 1.0.0-alpha.3

* Allow arrays of values/resources to be supplied as `where` values
* Allow `Relation` to inherit custom class methods from the base class it starts from
* Add Node.js support

## 1.0.0-beta.0

* Ensure `Errors#propagate` adds full error to root resource instead of just propagating them to nested resources
* Fix polymorphic relationship construction from server
* Allow `null` values for where filters
* Merge `includes` with `fields` in JSON:API interface so includes aren't left out when fields are used
* Change README to Javascript

## 1.0.0-beta.1

* Fix bug introduced by 28c8f7a

## 1.0.0-beta.2

* Fix bug in `CollectionProxy#load` only loading one item when using immutable mode

## 1.0.0-beta.3

* Add pagination caching to CollectionResponse

## 1.0.0-beta.4

* BREAKING: Remove support for adding classes to resource library `prototype` instead of as direct object property
* FIX: Allow resource library headers to be set after initialization
* FEATURE: Add afterCreate callback

# 1.0.0-beta.5

* Add immutable `reload`
* In immutable mode, don't flag associations as loaded unless they are included in response

# 1.0.0-beta.6

* Add polymorphic relationships to clone

# 1.0.0-beta.7

* In immutable mode, don't flag associations as loaded if they are not defined in the response

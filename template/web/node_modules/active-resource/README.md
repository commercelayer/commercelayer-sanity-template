# ActiveResource.js - API Resource relational mapping in Javascript
Welcome to ActiveResource.js, an API resource ORM library for JavaScript.
<br/>
<br/>
ActiveResource.js is designed to make interacting with resources stored on a RESTful server more free-flowing and holistic than simpler solutions like
`Backbone` and `ngResource` or creating your own requests for each CRUD operation in your API. ActiveResource.js constructs and executes requests and formats responses into
meaningful resource representations on the client side, allowing you to perform CRUD operations, as well
as interact with and modify the various relationships of resources effortlessly.
<br/>
<br/>
ActiveResource.js is inspired heavily by [Active Record](https://github.com/rails/rails/tree/master/activerecord), the well known
ORM for Ruby on Rails. In the same way that Active Record and other libraries like it make interacting with relational databases trivial in most of the
use cases that might be required of a server side application, ActiveResource.js aims to make interacting with
RESTful servers trivial in most of the use cases required of a client side application.
<br/>
<br/>
The library provides a base class that, when subclassed, sets up a mapping between the new class
and an existing resource on the server. Resources can be connected to other resources in two ways: through client side interaction (whose behavior is defined
by associations), and by making requests to persist the association on the server.
<br/>
<br/>
ActiveResource.js relies heavily on naming in that it uses class and association names to establish mappings between
respective resource endpoints, and nested/related resource endpoints. Although these mappings can be defined
explicitly, it's recommended to follow naming conventions, especially when getting started with the library.
<br/>
<br/>
An introduction to ActiveResource.js can be found on the Toptal Engineering Blog at https://www.toptal.com/api-developers/fast-powerful-js-sdks-for-rest-apis .

## Installation

```
yarn add active-resource
```

## Getting Started

In order to use ActiveResource, you must first create a resource library to hold configuration data for accessing your resources:

```javascript
// /resources/APILibrary.js
import { createResourceLibrary } from 'active-resource';

export default createResourceLibrary(
  'https://example.com/api/v1/', // base url for your server
  headers: { Authorization: 'Bearer ...' }
);
```

Then, you create a resource class for each resource in your library using `library.createResource`:

```javascript
// /resources/Product.js
import APILibrary from './APILibrary';

class Product extends MyLibrary.Base {
  static define() {
    /* ... */
  }
}

export default APILibrary.createResource(Product);
```

If you use a minification library that changes the names of classes, it is recommended that you set `this.className` inside `define`. See [configuration section of this page](#config) for more details.

## Features

* * *

### Automated mapping between classes and endpoints, attributes and relationships

```javascript
class Product extends MyLibrary.Base {
  static define() {
    /* ... */
  }
}

export default APILibrary.createResource(Product);
```

The Product class is automatically mapped to the RESTful endpoints for product resources on the server with the URL:
```
https://example.com/api/v1/products/
```

Create an index file for all your resources so that `createResource` will be called on all of them at the same time:

```javascript
// /resources/index.js

import Product from './Product';

export {
  Product
}
```

If you don't call `createResource` on a resource class, your ResourceLibrary will not know it exists, and will fail to create relationships between that resource
and other resources that have had `createResource` called on them.

* * *

### HTTP requests constructable through simple to use chained relation methods

```javascript
await Product.where({ title: 'A product title' }).includes('orders').order({ createdAt: 'desc' }).all();
await Product.select('title').first(5);
await Product.page(2).perPage(1).all();

await Product.limit(2).offset(2).all();

await Product.find(1);
await Product.findBy({ title: 'A product title' });

await Product.each((p) => console.log(p));

await Product.includes('orders', { merchant: ['currency'] }).all()
```

Method calls like `all()` will return a promise, and the response to the promise will be an `ActiveResource.Collection` (see [below](#collection)).
If the response is expected to be a single resource (`find`, `findBy`, `first`) it will just be that resource.

* * *

### Persistence methods that simplify managing of resources

```javascript
product = Product.build({ title: 'A product title' })
product.save(() => {
  if(product.valid()) {
    product.persisted() // true
  } else {
    product.errors().empty() // false
  }
})

Product.create({ title: 'A product title' }, (product) => {
  if(product.valid()) {
    /* ... */
  } else {
    product.newRecord() // true
  }
})

Product.first()
.then((product) => {
  product.update({ title: 'A new title' })
})

Product.first()
.then((product) => {
  product.destroy()
})

Product.first()
.then((product) => {
  product.reload()
})
```

* * *

### Associations between objects defined by simple class methods

```javascript
class Product extends MyLibrary.Base {
  static define() {
    this.hasMany('orders')
  }
}

class Order extends MyLibrary.Base {
  static define() {
    this.belongsTo('product')
  }
}
```

This defines a number of methods on each class. For `hasMany`:
```javascript
product = Product.build()
product.orders()             // collection proxy to use for more queries (see below)
product.orders().build()     // local construction
await product.orders().create()    // persisted construction
await product.orders().assign()    // persisted assignment
await product.orders().push()      // persisted concatenation
await product.orders().delete()    // persisted deletion of association (not the resources themselves)
await product.orders().deleteAll()
await product.orders().reload()
product.orders().target()    // currently loaded collection
product.orders().toArray()   // currently loaded collection as array
product.orders().empty()     // Whether or not the current target is empty
product.orders().size()      // The size of the current target
```

In regards to association collection proxies, you can work off them just like you would any other ActiveResource relation:
```javascript
product.orders().where({ title: 'A product title' }).select('title').last(10)
.then((orders) => {
  // orders related to the product
})

product.orders().includes('merchant').create({ title: 'A product title' }, (order) => {
  if(order.valid()) {
    order.merchant() // included in response
  } else {
    order.errors()
  }
})
```

None of the `hasMany` methods above will assign the actual `target()` of the association to their result,
nor will the association be considered "loaded." For example:
```javascript
product.orders().where({ title: 'A product title' }).select('title').last(10)
.then((orders) => {
  orders // not empty
  product.orders().target() // empty
  product.association('orders').loaded() // false
})
```

To accomplish this, one must `load` the association either in the initial query, or at some later point in time:
```javascript
Product.includes('orders').first()
.then((product) => {
  product.orders().target() // not empty
  product.association('orders').loaded() // true
});

Product.first()
.then((product) => {
  product.association('orders').loaded() // false

  product.orders().load()
  .then(() => {
    product.association('orders').loaded() // true
  });
});
```

There are a number of methods defined for singular associations (`hasOne`, `belongsTo`) as well:

```javascript
order = Order.build()
order.product()       // read locally
await order.loadProduct()   // read persisted

order.assignProduct() // assign locally
await order.updateProduct() // persist assignment

order.buildProduct()  // local construction
await order.createProduct() // persist construction
```

**You should never make a direct assignment like `product=`, because ActiveResource is not aware when this happens and it may cause unexpected results.**

* * *

### Reflections on associations

```javascript
let reflection = Order.reflectOnAssociation('product');
reflection.name // 'product'
reflection.macro // 'belongsTo'
reflection.klass() // Product

Order.reflectOnAllAssociations().each((reflection) => { /* ... */ });
```

* * *

### Attribute management

```javascript
class Order extends MyLibrary.Base {
  static define() {
    this.attributes('price', 'quantity')
  }
}

order = Order.build()

order.assignAttributes({ price: 5.0 })
order.attributes() // { price: 5.0 }
```

* * *

### Change tracking

Defining `attributes` on resource classes allows changes to those attributes to be tracked, as will
relationships defined using `hasMany`, `belongsTo`, etc.

The result is that when saving an existing resource (updating / `PATCH` request), only those
attributes and relationships that have changed will be submitted to server.

```javascript
Order.find(1)
.then((order) => {
  order.price // 5.0
  order.quantity // 2

  order.price = 10.0;

  order.changedFields().toArray() // ['price']

  order.save() // only sends +price+ to server
});
```

* * *

### Typing

```javascript
Order.build().isA(Order) // true
Order.build().isA(Product) // false

Order.build().klass() // Order
```

* * *

<a name="collection"></a>

### Collections

```javascript
let collection = ActiveResource.Collection.build([product1, product2])

collection.all()
collection.toArray()
collection.size()
collection.empty()
collection.include(item)
collection.first(n)
collection.last(n)
collection.each((i) => /* ... */)
collection.map((i) => /* ... */)
collection.inject({}, (memo, iterator) => /* ... */)
collection.compact()
collection.flatten()
collection.join()
collection.push(items)
collection.delete(items)
collection.clear()
collection.select((i) => /* ... */)
collection.detect((i) => /* ... */)
```

`Collection` is returned from requests for collections such as `all()` and `hasManyAssociation.target()`.

### Pagination

```javascript
Order.perPage(10).all()
.then(async (orders) => {
  if(orders.hasNextPage()) await orders.nextPage();

  if(orders.hasPrevPage()) await orders.prevPage();
})
```

* * *

<a name="config"></a>

### Configuration

#### `ResourceLibrary.baseUrl`

```javascript
ActiveResource.createResourceLibrary(
  'http://example.com/api/v1'
)
```

**This property is required.** It specifies the root URL to the resource server, and all requests for resources in the library will be made relative to this URL.

#### `ResourceLibrary.headers`

```javascript
ActiveResource.createResourceLibrary(
  'http://example.com/api/v1',
  {
    headers: {
      'Authorization': 'Bearer [TOKEN]'
    }
  }
)
```

*This property is optional.* It specifies any headers that should be added to every request for resources in the library. The most obvious use case is providing an
`Authorization` header if your resource server requires authentication.

#### `ResourceLibrary.constantizeScope`

```javascript
let MyLibrary = ActiveResource.createResourceLibrary(
  'http://example.com/api/v1',
  {
    constantizeScope: window
  }
)

MyLibrary.createResource(
  class Product extends MyLibrary.Base {}
)

window.Product // defined
```

*This property is optional, and defaults to null.* It specifies the object to assign classes to. If null, classes will be added as properties to your `ResourceLibrary`.

#### `ResourceLibrary.interface`

```javascript
ActiveResource.createResourceLibrary(
  'http://example.com/api/v1',
  {
    interface: MyCustomInterface
  }
)
```

*This property is optional and defaults to `ActiveResource.Interfaces.JsonApi`.* `Interface`s allow you to define the interface between
a server and ActiveResource, constructing requests from input data, and constructing objects from response data. Right now, the only
interface that is supported internally is `JsonApi`, which is in accordance with the [JSON API specification](http://jsonapi.org/).

You can create your own custom interface if your API adheres to its own standard by extending `ActiveResource.Interfaces.Base`.

#### `Base.className`

```javascript
class Product extends MyLibrary.Base {
  static className = 'Product';
}
```

**This property is optional.** It is so the library will continue to work in minified environments, where a call to `constructor.name` might yield a random result instead of the intended class name.

#### `Base.queryName`

```javascript
class Product extends MyLibrary.Base {
  static queryName = 'products';
}
```

**This property is optional.** This is the name that will be used in URLs, so a call like `Product.all()` will result in an HTTP request `GET /api/v1/products`. Defaults to the pluralized form of `className` above.

#### `Base.primaryKey`

```javascript
class Product extends MyLibrary.Base {
  static primaryKey = 'token';
}
```

*This property is optional.* It tells ActiveResource which attribute is the primaryKey of the resource.

#### `Association.className`

```javascript
class Product extends MyLibrary.Base {
  static define() {
    this.hasMany('specialOrders', { className: 'Order' })
  }
}

class Order extends MyLibrary.Base {
  static define() {
    this.belongsTo('product')
  }
}
```

This option allows you to name an association by one name, but have that association refer to an existing class of a different name.

#### `Association.as` && `Association.polymorphic`

```javascript
class Product extends MyLibrary.Base {
  static define() {
    this.hasMany('orders', { as: 'resource', inverseOf: 'resource' })
  }
}

class Service extends MyLibrary.Base {
  static define() {
    this.hasMany('orders', { as: 'resource', inverseOf: 'resource' })
  }
}

class Order extends MyLibrary.Base {
  static define() {
    this.belongsTo('resource', { polymorphic: true, inverseOf: 'orders' })
  }
}
```

These options work together to allow for polymorphic associations between models. See `inverseOf` explanation below.

#### `Association.inverseOf`

```javascript
class Product extends MyLibrary.Base {
  static define() {
    this.hasMany('orders', { inverseOf: 'product' })
  }
}

class Order extends MyLibrary.Base {
  static define() {
    this.belongsTo('product', { inverseOf: 'product' })
  }
}
```

This option allows you to define the inverse of an association on a class. Typically, this is done automatically, but there are cases,
like polymorphic relationships, where this cannot be done automatically, and it is extremely useful and highly recommended to provide `inverseOf` in those instances.

#### `Association.autosave`

```javascript
class Order extends MyLibrary.Base {
  static define() {
    this.hasMany('orderItems', { autosave: true })
  }
}

class OrderItem extends MyLibrary.Base {
  static define() {
    this.belongsTo('order')
  }
}

let order = Order.build({ orderItems: [OrderItem.build({ amount: 5.0 })] });
await order.save() // sends orderItems attributes to server too
```

This option allows you to specify that associated resources(s) of a resource should be saved with the resource itself.

## Sponsors

[![Occasion](https://www.getoccasion.com/wp-content/uploads/2016/01/Occasion-Logo-Black_Web1.png)](https://www.getoccasion.com)

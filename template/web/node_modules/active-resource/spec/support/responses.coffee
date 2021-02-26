# Defines responses for various queries

jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures/json'

moxios.delay = 1

window.JsonApiResponses =
  timeout:
    status: 408
    response: getJSONFixture('timeout.json')
  Comment:
    find:
      success:
        status: 200
        response: getJSONFixture('comments/singular.json')
    all:
      success:
        status: 200
        response: getJSONFixture('comments/collection.json')
  Customer:
    find:
      includes:
        status: 200
        response: getJSONFixture('customers/includes.json')
  GiftCard:
    find:
      success:
        status: 200
        response: getJSONFixture('gift_cards/singular.json')
      includes:
        status: 200
        response: getJSONFixture('gift_cards/includes.json')
      raw:
        status: 200
        response: getJSONFixture('gift_cards/raw.json')
    save:
      success:
        status: 200
        response: getJSONFixture('gift_cards/singular.json')
      failure:
        status: 422
        response: getJSONFixture('gift_cards/422_resource_invalid.json')
  Order:
    all:
      success:
        status: 200
        response: getJSONFixture('orders/collection.json')
      includes:
        status: 200
        response: getJSONFixture('orders/collection_includes.json')
    find:
      success:
        status: 200
        response: getJSONFixture('orders/singular.json')
      includes:
        status: 200
        response: getJSONFixture('orders/find_includes.json')
      includes2:
        status: 200
        response: getJSONFixture('orders/find_includes2.json')
    save:
      success:
        status: 200
        response: getJSONFixture('orders/singular.json')
      includes:
        status: 200
        response: getJSONFixture('orders/includes.json')
      failure:
        status: 422
        response: getJSONFixture('orders/422_resource_invalid.json')
  Product:
    all:
      success:
        status: 200
        response: getJSONFixture('products/collection.json')
      paginated:
        status: 200
        response: getJSONFixture('products/paginated.json')
    find:
      success:
        status: 200
        response: getJSONFixture('products/singular.json')
      includes:
        status: 200
        response: getJSONFixture('products/includes.json')
      noRelLinks:
        status: 200
        response: getJSONFixture('products/no_rel_links.json')
      failure:
        status: 404
        response: getJSONFixture('products/404_resource_not_found.json')
    save:
      success:
        status: 200
        response: getJSONFixture('products/another_singular.json')
      failure:
        status: 422
        response: getJSONFixture('products/422_resource_invalid.json')
    destroy:
      success:
        status: 204
      failure:
        status: 403
        response: getJSONFixture('products/403_forbidden.json')
  Venue:
    find:
      tokenized:
        status: 200
        response: getJSONFixture('venues/singular_token.json')
  relationships:
    update:
      success:
        status: 204
        response: null
      failure:
        status: 403
        response: null

window.extractData = (response) -> JSON.stringify(data: JSON.parse(response).data)

# Commerce Layer React Components

A collection of reusable React components that makes it super fast and simple to build your own custom commerce UI, leveraging [Commerce Layer API](https://docs.commercelayer.io/api/).

### What is Commerce Layer?

[Commerce Layer](https://commercelayer.io/) is a headless platform that lets you easily build enterprise-grade ecommerce into any website, by using the language, CMS, and tools you already master and love.

# Getting started

To get started with Commerce Layer React Components you need to install them and then get the credentials that will allow you to perform the API calls they wrap.

- [Installation](#installation)
- [Authentication](#authentication)
- [Import](#import)

## Installation

Commerce Layer React Components are available as an [npm package](https://www.npmjs.com/package/@commercelayer/react-components):

```
// npm
npm install @commercelayer/react-components

// yarn
yarn add @commercelayer/react-components
```

## Authentication

All requests to Commerce Layer API must be authenticated with an [OAuth2](https://oauth.net/2/) bearer token. Hence, to use these components, you need to get a valid access token. Once you got it, you can pass it as prop — together with the endpoint of your Commerce Layer organization — to the `CommerceLayer` component, as follow:

```
<CommerceLayer
  accessToken="your-access-token"
  endpoint="https://yourdomain.commercelayer.io">

  {/* ... child components */}

</CommerceLayer>
```

This token will be used to authorize the API calls of all its child components. That's why the presence of (at least) one `CommerceLayer` component is mandatory — it must wrap every other component you need to use.

> Please note that — in case you need to fetch data with different tokens (i.e. from different organizations or using apps with different roles and permissions) — nothing prevents you from putting as many `CommerceLayer` components you want in the same page.

You can check [our documentation](https://docs.commercelayer.io/api/authentication) for more information about the available authorization flows and leverage [Commerce Layer JS Auth](https://github.com/commercelayer/commercelayer-js-auth) to easily interact with our authentication API.

## Import

You can use ES6 named import with every single component you plan to use (in addition to `CommerceLayer` one), as follow:

```
import { CommerceLayer, ...otherComponents } from '@commercelayer/react-components'
```

Check [this summary table](#list-of-components) for the complete (and constantly updated) list of available components.

# Usage

The code snippets below show how to put into action Commerce Layer React Components in some common use cases. Check the [`pages`](/pages) folder of this repository for more detailed examples.

- [Prices](#prices)
- [Add to cart](#add-to-cart)
- [Shopping cart](#shopping-cart)
- [Cart summary](#cart-summary)

Under the hood, our React components are built on top of [Commerce Layer JS SDK](https://github.com/commercelayer/commercelayer-js-sdk) — feel free to use it if you want to develop your custom ones.

## Prices

This example shows how to use Commerce Layer React Components to display the prices of some SKUs, identified by their SKU codes:

```
import {
  CommerceLayer,
  PricesContainer,
  Price
} from '@commercelayer/react-components'

// your code [...]

<CommerceLayer accessToken="your-access-token" endpoint="https://yourdomain.commercelayer.io">
  <PricesContainer>
    <Price
      skuCode="BABYONBU000000E63E7412MX"
      className="your-custom-class"
      compareClassName="your-custom-class"
    />
    <Price
      skuCode="CANVASAU000000FFFFFF1824"
      className="your-custom-class"
      compareClassName="your-custom-class"
    />
    <Price
      skuCode="LSLEEVMM000000E63E74LXXX"
      className="your-custom-class"
      compareClassName="your-custom-class"
    />
  </PricesContainer>
</CommerceLayer>

// your code [...]
```

You can style the selling price and the full price as you like by passing the `className` and `compareClassName` props to the `Price` component. You can choose not to show the full price by passing `showCompare={false}` (default is `true`).

If you need to paginate the list of prices, pass the `perPage` prop to the `PricesContainer` component (default is `10`) — to learn how pagination works, check our [API reference](https://docs.commercelayer.io/api/pagination) or our [SDK documentation](https://github.com/commercelayer/commercelayer-js-sdk#how-to-paginate-a-collection-of-skus).

## Add to cart

This example shows how to use Commerce Layer React Components to implement the "add to cart" functionality on your page, showing the price of the chosen SKU, the possibility to select a variant and its quantity, the information about its availability, and the related button to perform the action:

```
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
  ItemContainer,
  PricesContainer,
  Price,
  VariantsContainer,
  VariantSelector,
  QuantitySelector,
  AddToCartButton,
  AvailabilityContainer,
  AvailabilityTemplate
} from '@commercelayer/react-components'

// your code [...]

<CommerceLayer accessToken="your-access-token" endpoint="https://yourdomain.commercelayer.io">
  <OrderStorage persistKey="your-persist-key">
    <OrderContainer
      attributes={{
        cart_url: 'https://yourdomain.com/cart',
        return_url: 'https://yourdomain.com/return',
        privacy_url: 'https://yourdomain.com/privacy'
      }}>
      <ItemContainer>
        <PricesContainer>
          <Price skuCode="BABYONBU000000E63E746MXX" />
        </PricesContainer>
        <VariantsContainer>
          <VariantSelector
            placeholder="Select a size"
            options={[
              {
                label: '6 months',
                code: 'BABYONBU000000E63E746MXX',
                lineItem: {
                  name: 'your-item-name',
                  imageUrl: 'https://img.yourdomain.com/your-item-image.png'
                }
              },
              {
                label: '12 months',
                code: 'BABYONBU000000E63E7412MX',
                lineItem: {
                  name: 'your-item-name',
                  imageUrl: 'https://img.yourdomain.com/your-item-image.png'
                }
              }
            ]}
          />
        </VariantsContainer>
        <QuantitySelector />
        <AddToCartButton />
        <AvailabilityContainer>
          <AvailabilityTemplate />
        </AvailabilityContainer>
      </ItemContainer>
    </OrderContainer>
  </OrderStorage>
</CommerceLayer>

// your code [...]
```

For each variant you can define the custom name (i.e. its translation based on location) and image that will be shown on the corresponding line item, by passing the `options` prop to the `VariantSelector` component and properly setting the `lineItem` key — all these content data are usually taken from your CMS, since Commerce Layer doesn't manage any kind of content. You can change the type of input by passing `type="radio"` (default is `select`).

When you add a product to your shopping cart:

- if there is an order stored in the Local Storage identified by a key that matches the `persistKey` property, a line item is created and it is associated with that order;
- if no order in the Local Storage matches the `persistKey` property, a new order is created and stored.

> A common best practice — especially for multi-country ecommerce — is to use as `persistKey` a key containing the country code, so that you have a different shopping cart for each country.

If you need to set some of the [order object](https://docs.commercelayer.io/api/resources/orders/create_order) attributes at the moment of the order creation, pass to the optional prop `attributes` to the `OrderContainer` component.

## Shopping cart

This example shows how to use Commerce Layer React Components to build a shopping cart UI, containing the items that are going to be purchased with all their information (image, name, quantity, price) and the option to possibly remove some of them:

```
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
  LineItemsContainer,
  LineItemsCount,
  LineItem,
  LineItemImage,
  LineItemName,
  LineItemQuantity,
  LineItemAmount,
  LineItemRemoveLink,
  Errors
} from '@commercelayer/react-components'

// your code [...]

<CommerceLayer accessToken="your-access-token" endpoint="https://yourdomain.commercelayer.io">
  <OrderStorage persistKey="your-persist-key">
      <OrderContainer>
        <LineItemsContainer>
          <p className="your-custom-class">
            Your shopping cart contains <LineItemsCount /> items
          </p>
          <LineItem>
            <LineItemImage width={50} />
            <LineItemName />
            <LineItemQuantity max={10} />
            <Errors resource="lineItem" field="quantity" />
            <LineItemAmount />
            <LineItemRemoveLink />
          </LineItem>
        </LineItemsContainer>
      </OrderContainer>
  </OrderStorage>
</CommerceLayer>

// your code [...]
```

The `Errors` component lets you show the error (if present) returned by our API on a single attribute of a specific resource. You can customize the error message as you like by passing the `messages` prop to the component.

## Cart summary

This example shows how to use Commerce Layer React Components to show a sample order summary with all the order line items (including discounts, shipping costs, taxes, and gift cards — if present) and totals:

```
import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
  SubTotalAmount,
  DiscountAmount,
  ShippingAmount,
  TaxesAmount,
  GiftCardAmount,
  TotalAmount,
  CheckoutLink
} from '@commercelayer/react-components'

// your code [...]

<CommerceLayer accessToken="your-access-token" endpoint="https://yourdomain.commercelayer.io">
  <OrderStorage persistKey="your-persist-key">
    <OrderContainer>
      <SubTotalAmount />
      <DiscountAmount />
      <ShippingAmount />
      <TaxesAmount />
      <GiftCardAmount />
      <TotalAmount />
      <CheckoutLink />
    </OrderContainer>
  </OrderStorage>
</CommerceLayer>

// your code [...]
```

You can change the amount format of each line of the summary by passing the `format` prop to the desired component (default is `formatted`).

The `CheckoutLink` component lets you proceed to checkout and links to the checkout URL configured on Commerce Layer (_Settings → Markets_).

# List of components

These are the currently available Commerce Layer React Components.

> Please note that not every Commerce Layer React component can be nested into any other one.

For each component, the table below shows its props and the list of the permitted children (if any):

>

| Name                       | Props                                                                            | Children                                                                                                                                                                                                             |
| -------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AddToCartButton`          | `disabled`<br />`label`<br />`skuCode`<br />`lineItem`                           |
| `AvailabilityContainer`    | `skuCode`                                                                        | `AvailabilityTemplate`                                                                                                                                                                                               |
| `AvailabilityTemplate`     | `showShippingMethodName`<br />`timeFormat`                                       |
| `CheckoutLink`             | `label`                                                                          |
| `CommerceLayer`            | `accessToken`<br />`endpoint`                                                    | `GiftCardContainer`<br />`OrderContainer`<br />`PricesContainer`                                                                                                                                                     |
| `DiscountAmount`           | `className`<br />`format`<br />`id`<br />`name`<br />`style`                     |
| `Errors`                   | `field`<br />`messages`<br />`resource`                                          |
| `ExternalFunction`         | `url`                                                                            | `AddToCartButton`                                                                                                                                                                                                    |
| `GiftCard`                 | `onSubmit`                                                                       | `Errors`<br />`GiftCardCurrencySelector`<br />`GiftCardInput`<br />`MetadataInput`<br />`SubmitButton`                                                                                                               |
| `GiftCardAmount`           | `className`<br />`format`<br />`id`<br />`name`<br />`style`                     |
| `GiftCardContainer`        |                                                                                  | `GiftCard`<br/>`Errors`                                                                                                                                                                                              |
| `GiftCardCurrencySelector` | `placeholder`<br />`required`<br />`value`                                       |
| `GiftCardInput`            | `name`<br />`placeholder`<br />`type`                                            |
| `ItemContainer`            | `lineItem`<br />`skuCode`                                                        | `AddToCartButton`<br />`AvailabilityContainer`<br />`QuantitySelector`<br />`PricesContainer`<br />`SkuOptionContainer`<br />`VariantsContainer`                                                                     |
| `LineItem`                 | `type`                                                                           | `Errors`<br />`LineItemAmount`<br />`LineItemImage`<br />`LineItemName`<br />`LineItemOptions`<br />`LineItemQuantity`<br />`LineItemRemoveLink`                                                                     |
| `LineItemAmount`           | `className`<br />`format`<br />`id`<br />`name`<br />`style`<br />`type`         |
| `LineItemImage`            | `width`                                                                          |
| `LineItemName`             |                                                                                  |
| `LineItemOption`           | `keyClassName`<br />`keyId`<br />`keyStyle`<br />`name`<br />`valueClassName`    |
| `LineItemOptions`          | `title`<br /> `showName`<br />`skuOptionId`                                      | `LineItemOption`                                                                                                                                                                                                     |
| `LineItemQuantity`         | `disabled`<br />`max`                                                            |
| `LineItemRemoveLink`       | `label`                                                                          |
| `LineItemsContainer`       | `filters`<br />`loader`                                                          | `LineItem`<br />`LineItemsCount`                                                                                                                                                                                     |
| `LineItemsCount`           | `className`<br />`id`<br />`name`<br />`style`                                   |
| `MetadataInput`            | `name`<br />`onChange`<br />`placeholder`<br />`type`                            |
| `OrderContainer`           | `attributes`<br />`metadata`<br />`orderId`                                      | `CheckoutLink`<br />`DiscountAmount`<br />`GiftCardAmount`<br />`GiftCardContainer`<br />`ItemContainer`<br />`LineItemsContainer`<br />`ShippingAmount`<br />`SubTotalAmount`<br />`TaxesAmount`<br />`TotalAmount` |
| `OrderStorage`             | `clearWhenPlaced`<br />`persistKey`                                              | `OrderContainer`                                                                                                                                                                                                     |
| `Price`                    | `compareClassName`<br />`showCompare`<br />`skuCode`                             |
| `PricesContainer`          | `filters`<br />`loader`<br />`perPage`<br />`skuCode`                            | `Price`                                                                                                                                                                                                              |
| `QuantitySelector`         | `disabled`<br />`max`<br />`min`<br />`skuCode`<br />`value`                     |
| `ShippingAmount`           | `className`<br />`format`<br />`id`<br />`name`<br />`style`                     |
| `SkuOption`                | `id`                                                                             | `SkuOptionInput`                                                                                                                                                                                                     |
| `SkuOptionInput`           | `name`<br />`onChange`<br />`placeholder`<br />`type`                            |
| `SkuOptionsContainer`      | `skuCode`                                                                        | `SkuOption`                                                                                                                                                                                                          |
| `SubmitButton`             | `label`                                                                          |
| `SubTotalAmount`           | `className`<br />`format`<br />`id`<br />`name`<br />`style`                     |
| `TaxesAmount`              | `className`<br />`format`<br />`id`<br />`name`<br />`style`                     |
| `TotalAmount`              | `className`<br />`format`<br />`id`<br />`name`<br />`style`                     |
| `VariantsContainer`        | `filters`<br />`skuCode`                                                         | `VariantSelector`                                                                                                                                                                                                    |
| `VariantSelector`          | `loader`<br />`name`<br />`options`<br />`placehoder`<br />`skuCode`<br />`type` |

For more detailed information on each components (i.e. prop types and default values, required props, etc.), have a look at the configuration file [`src/config/components.ts`](/src/config/components.ts).

---

### License

This repository is published under the [MIT](LICENSE) license.

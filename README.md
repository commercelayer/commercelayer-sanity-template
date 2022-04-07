# Commerce Layer Starter

A multi-country ecommerce starter that features the sanity studio built with Commerce Layer, Next.js, and deployed to Netlify.

![A preview image showing the frontend demo with some products.](https://raw.githubusercontent.com/commercelayer/sanity-template-commercelayer/main/.sanity-template/assets/preview.jpg)

![A screenshot of Commerce Layer Sanity studio](https://raw.githubusercontent.com/commercelayer/sanity-template-commercelayer/main/.sanity-template/assets/studio.png)

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Starter features](#starter-features)
- [Getting started](#getting-started)
  - [⚙️ Installation guide](#%EF%B8%8F-installation-guide)
  - [⬇️ Import test studio content](#%EF%B8%8F-import-test-studio-content)
  - [⬇️ Seed Commerce Layer data](#%EF%B8%8F-seed-commerce-layer-data)
- [⚠️ Important notes](#%EF%B8%8F-important-notes)
- [🛒 Setup hosted checkout](#%EF%B8%8F-setup-hosted-checkout)
- [Contributors guide](#contributors-guide)
- [Need help?](#need-help)
- [License](#license)

## Starter features

- An ecommerce storefront built with Nextjs, [Commerce Layer react components library](https://github.com/commercelayer/commercelayer-react-components), and Tailwind CSS.
- International shopping capabilities powered by [Commerce Layer](https://commercelayer.io) APIs.
- [Micro CLI seeder](https://github.com/commercelayer/commercelayer-cli-plugin-seeder/blob/main/README.md) to import Commerce Layer data.
- Structured content on Sanity CMS.
- Localization support.
- Deployment configuration to Netlify.

## Getting started

The quickest way to get up and running is to go to https://www.sanity.io/create?template=commercelayer/sanity-template-commercelayer and create a new project by following the instructions on Sanity.

Alternatively, you can clone this repository, configure the starter, import the dataset into your Sanity studio, import some test data into your Commerce Layer organization, and deploy your application.

![](https://raw.githubusercontent.com/commercelayer/sanity-template-commercelayer/main/.sanity-template/assets/sanity.png 'A screenshot of Commerce Layer Starter in sanity.io')

### ⚙️ Installation guide

1. Clone this repository ([learn how to do this](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)).

2. Rename the `/env.example` file to `.env` and add the following:

- Your project ID, dataset, and token from [manage.sanity.io](https://manage.sanity.io).
- Your sales_channels application client ID and base endpoint from [Commerce Layer](https://commercelayer.io). You can create this automatically by following our [onboarding guide](https://docs.commercelayer.io/developers/) or manually on the [Commerce Layer dashboard](https://dashboard.commercelayer.io/sign_up).

3. Run the command below to install the necessary dependencies of your project:

```bash
npm install && cd /studio && sanity install
```

4. Add your `projectTitle`, `projectId,` and `dataset` in `/studio/sanity.json`.

5. Run the command below to start the development server:

```bash
npm run dev
```

This will run the frontend at `localhost:3000` and studio at `localhost:3333`.

### ⬇️ Import test studio content

> If you set up your project from the starters page on Sanity, you should skip this step as Sanity will automatically add the dataset's content.

1. Extract the `production.tar.gz` file in `/.sanity-template/data` directory using the command below:

```bash
tar -xf production.tar.gz
```

The extracted folder name should look like `production-export-2021-02-26t14-15-56-557z`.

2. Run the command below in the `/studio` directory to import the `data.ndjson` file in the extracted folder.

```bash
sanity dataset import ../.sanity-template/data/<name of extracted folder>/data.ndjson <your_dataset>
```

3. Check the frontend and studio now to preview the imported content.

### ⬇️ Seed Commerce Layer data

1. Create a free [Commerce Layer account](https://dashboard.commercelayer.io/sign_up). If you already have an account, kindly skip to Step 3.

2. Create a new [organization](https://commercelayer.io/docs/data-model/users-and-organizations) or follow the [onboarding tutorial guide](https://docs.commercelayer.io/developers/).

3. Create a new application in the **Integrations** tab with **Name** set to `<Project Name>`, and **Role** set to `admin`.

4. In your newly created application, copy your `Client ID`, `Client Secret`, and base endpoint.

5. Install the [Commerce Layer CLI](https://github.com/commercelayer/commercelayer-cli) which is available as an [npm package](https://www.npmjs.com/package/@commercelayer/commercelayer-cli) or [yarn package](https://yarnpkg.com/package/@commercelayer/cli) using the command below:

```bash
// npm
npm install -g @commercelayer/cli

//yarn
yarn global add @commercelayer/cli
```

6. Log into your application via the CLI using the previously created CLI credentials like so:

```bash
commercelayer applications:login -o <organizationSlug> -i <clientId> -s <clientSecret> -a <applicationAlias>
```

7. Install the [seeder plugin](https://github.com/commercelayer/commercelayer-cli-plugin-seeder/blob/main/README.md) using the command below:

```bash
commercelayer plugins:install seeder
```

8. Run the command below to import three demo [markets](https://data.commercelayer.app/seed/markets.json) (UK, USA, and Europe), a set of [product SKUs](https://data.commercelayer.app/seed/skus.json), related [price lists](https://data.commercelayer.app/seed/price_lists.json), related [prices](https://data.commercelayer.app/seed/prices.json), [stock locations](https://data.commercelayer.app/seed/stock_locations.json), and [inventory](https://data.commercelayer.app/seed/stock_items.json) into your organization using the multi_market [business model](https://commercelayer.io/docs/data-model/markets-and-business-models).

```bash
commercelayer seed -b multi_market
```

9. To see the commands for other seeder options, type the command below:

```bash
commercelayer --help
```

## ⚠️ Important notes

The Sanity content data includes a collection of sample countries, products, variants, sizes, taxons, taxonomies, catalogs, and product images created during development. To get an [access token](https://docs.commercelayer.io/developers/authentication) we fetch the scope (market ID) from the Market Id attribute set in the Sanity country schema.

So, when you seed your Commerce Layer organization, some markets will be created which will have a different Market ID from the one set in Sanity. So you need to fetch the valid market scope (from the sales channel tab in the [Commerce Layer dashboard](https://dashboard.commercelayer.io/)) and update the appropriate country model in Sanity. For example, the Europe Market on Commerce Layer and Italy country model on Sanity. Failure to do this will result in an invalid scope authentication error when you try to access your application.

Also, you must access the application using the right locale slug for the country you have configured like so `localhost:3000/it/it-it` or `localhost:3000/us/en-us`. If you want to set up other countries, then create a market for it on Commerce Layer alongside the associated resources and update the Market ID on Sanity as you earlier did.

![A preview image showing the Commerce Layer dashboard.](https://raw.githubusercontent.com/commercelayer/sanity-template-commercelayer/main/./public/cl-screen.png)

![A preview image showing the sanity studio.](https://raw.githubusercontent.com/commercelayer/sanity-template-commercelayer/main/./public/sanity-screen.png)

Ideally, you would want to add your content data and set up Commerce Layer manually based on your use cases. To ensure the starter runs smoothly, ensure to update the market ID attribute, create a product, and link to variant(s) on Sanity and create a market associated with a stock location, stock item, price list, price, and SKU in Commerce Layer.

## 🛒 Setup hosted checkout

To set up a checkout functionality, you can use the [Commerce Layer React Checkout Application](https://github.com/commercelayer/commercelayer-react-checkout) that provides you with a PCI-compliant, PSD2-compliant, and production-ready checkout flow powered by Commerce Layer APIs. We will be launching a (free) hosted version of this checkout application and a new dashboard soon. But for now you can proceed to add a checkout template URL like so `<your-organization-slug>/:order_id`, to the CHECKOUT URL field in *Settings > Markets > [Select a market of your choice]* on the existing [admin dashboard](https://core.commercelayer.io/admin/account/organizations). The `CheckoutLink` component from our react-components library will automatically populate with the right link to checkout any order in cart.

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/sanity-template-commercelayer) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/sanity-template-commercelayer.git && cd sanity-template-commercelayer
```

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/sanity-template-commercelayer/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.

---

Want to learn more about how we built this starter and how you can build yours? Then you should read [this article](https://commercelayer.io/blog/how-to-build-an-international-ecommerce-website-with-sanity-and-commerce-layer).

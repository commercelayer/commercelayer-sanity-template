# Commerce Layer Starter

A multi-country ecommerce starter that features the datocms built with Commerce Layer, Next.js, and deployed to Netlify.

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Starter features](#starter-features)
- [Getting started](#getting-started)
  - [⚙️ Installation guide](#%EF%B8%8F-installation-guide)
  - [⬇️ Import test studio content](#%EF%B8%8F-import-test-studio-content)
  - [⬇️ Seed Commerce Layer data](#%EF%B8%8F-seed-commerce-layer-data)
- [Contributors guide](#contributors-guide)
- [Need help?](#need-help)
- [License](#license)

## Starter features

- An ecommerce storefront built with Nextjs, [Commerce Layer react components library](https://github.com/commercelayer/commercelayer-react-components), and Tailwind CSS.
- International shopping capabilities powered by [Commerce Layer](https://commercelayer.io) APIs.
- [Micro CLI seeder](https://github.com/commercelayer/commercelayer-seeder-cli) to import Commerce Layer data.
- Structured content on Datocms.
- Localization support.
- Deployment configuration to Netlify.

## Getting started

1. [Create an account on DatoCMS](https://datocms.com).

2. Make sure that you have set up the [Github integration on Vercel](https://vercel.com/docs/git/vercel-for-github).

3. Let DatoCMS set everything up for you clicking this button:

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/nextjs-demo)

### Local setup

Once the setup of the project and repo is done, clone the repo locally.

#### Set up environment variables

In your DatoCMS' project, go to the **Settings** menu at the top and click **API tokens**.

Then click **Read-only API token** and copy the token.

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Then set each variable on `.env`:

- `NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN` should be the API token you just copied.
- `NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET` can be any random string (but avoid spaces), like `MY_SECRET` - this is used for the Preview Mode](https://www.datocms.com/docs/next-js/setting-up-next-js-preview-mode).

Your `.env` file should look like this:

```bash
NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN=...
NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET=...
```

#### Run your project locally

```bash
npm install
npm run dev
```

Your project should be up and running on [http://localhost:3000](http://localhost:3000)!


### ⬇️ Seed Commerce Layer data

1. Create a free [Commerce Layer account](https://dashboard.commercelayer.io/sign_up).

2. Create a new [organization](https://commercelayer.io/docs/data-model/users-and-organizations).

3. Create a new application in the **Integrations** tab with **Name** set to `<Project Name>`, and **Role** set to `admin`.

4. In your newly created application, copy your `Client ID`, `Client Secret`, and organization slug.

5. Install the [Commerce Layer CLI](https://github.com/commercelayer/commercelayer-cli) which is available as an [npm package](https://www.npmjs.com/package/@commercelayer/commercelayer-cli) using the command below:

```
// npm
npm install -g @commercelayer/cli

//yarn
yarn global add @commercelayer/cli
```

6. Log into your application via the CLI using the previously created CLI credentials like so:

```
commercelayer applications:login -o <organizationSlug> -i <clientId> -s <clientSecret> -a <applicationAlias>
```

7. Install the seeder plugin using the command below:

```
commercelayer plugins:install seeder
```

8. Run the command below to import a [set of products](https://data.commercelayer.app/seed/skus.json), related [prices](https://data.commercelayer.app/seed/prices.json), and [inventory](https://data.commercelayer.app/seed/stock_items.json) into your organization.

```bash
commercelayer seed
```

9. To see the commands for other seeder options, type the command below:

```bash
commercelayer --help
```

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

Want to learn more about how we built this starter and how you can build yours? Sign up for our [newsletter](https://commercelayer.io/blog) to get notified once we publish the article.

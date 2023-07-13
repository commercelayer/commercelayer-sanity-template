import React from "react";
import locale from "@locale/index";
import LanguageSelector from "@components/LanguageSelector";
import CountrySelector from "@components/CountrySelector";
import { Country } from "@typings/models";

type Props = {
  lang: string;
  countries: Country[];
  buildLanguages: Country[];
};

const Footer: React.FC<Props> = ({ lang, countries, buildLanguages }) => {
  return (
    <footer className="bg-gray-50 mt-24 md:mt-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <hr />
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-4 md:px-8">
        <div className="mt-16 lg:flex lg:items-center lg:justify-between">
          {" "}
          <div className="md:flex md:items-center md:space-x-5">
            <CountrySelector options={countries} />
            <LanguageSelector options={buildLanguages} />
          </div>
          <div className="md:flex md:items-center">
            <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} | {""}
              {process.env.NEXT_PUBLIC_SITE_NAME
                ? process.env.NEXT_PUBLIC_SITE_NAME
                : "Examples Store, Inc"}
              . | All rights reserved.
            </p>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {locale[lang].subscribeTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{locale[lang].subscribeText}.</p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:w-56 sm:text-sm sm:leading-6"
              placeholder={locale[lang].subscribePlaceholder}
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              {/* Handle the subcribe form yourself */}
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {locale[lang].subscribe}
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

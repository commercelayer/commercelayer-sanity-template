import React from "react";
import Image from "next/image";
import locale from "@locale/index";

type Props = {
  lang: string;
};

const Header: React.FC<Props> = ({ lang }) => {
  return (
    <main aria-labelledby="header-heading">
      <h2 id="header-heading" className="sr-only">
        Header
      </h2>
      <div className="md:relative">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-36 lg:pb-56 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1 className="text-center sm:text-left text-5xl sm:text-4xl mb-20 sm:mb-10 font-bold tracking-tight text-gray-900">
                {locale[lang].welcome}!
              </h1>
              <p className="relative z-10 mt-6 text-lg leading-8 text-gray-700">
                This ecommerce store is powered by {""}
                <a
                  href="//commercelayer.io?utm_source=commercelayer-sanity-template"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="font-bold">Commerce Layer</span>
                </a>
                — an API-first global commerce solution that can easily make any digital experience
                shoppable. This demo was built with <span className="font-bold">Nextjs</span> and{" "}
                <span className="font-bold">Sanity</span>.
              </p>
              <div className="mt-16 flex items-center gap-x-6">
                <a
                  href="#start"
                  className="z-10 rounded-md border-2 border-gray-900 hover:bg-gray-900 hover:text-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {locale[lang].startShopping}
                </a>
                <a
                  href="//commercelayer.io/why?utm_source=commercelayer-sanity-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="z-10 text-sm font-semibold leading-6 text-gray-900"
                >
                  {locale[lang].learnMore} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <Image
              className="-mt-80 md:mt-0 w-full object-cover lg:inset-0 lg:aspect-auto lg:h-full"
              src="https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2576&q=80"
              alt="An image of a happy woman smiling and sitting in a shopping trolley"
              width={1000}
              height={500}
              priority={true}
            />
          </div>
        </div>
      </div>
      <hr id="start" />
    </main>
  );
};

export default Header;

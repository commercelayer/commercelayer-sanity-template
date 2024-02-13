import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LineItemsContainer, LineItemsCount } from "@commercelayer/react-components";
import locale from "@locale/index";
import SEOHead from "@components/SEO";

type Props = {
  lang: string;
  countryCode: string;
  pageTitle?: string;
};

const Header: React.FC<Props> = ({ lang, countryCode, pageTitle }) => {
  return (
    <>
      <SEOHead productName={pageTitle} />
      <div className="sticky top-0 max-w-7xl mx-auto">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Header navigation"
        >
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href={`/${countryCode}/${lang}`} passHref>
                <span className="sr-only">Commerce Layer</span>
                <Image
                  className="h-8 w-auto"
                  src="//data.commercelayer.app/assets/logos/full-logo/black/commercelayer_full_logo_black.svg"
                  alt="Commerce Layer Logo"
                  loading="eager"
                  width={200}
                  height={50}
                />
              </Link>
            </div>
          </div>
          <div className="md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <Link href={"/[countryCode]/[lang]/cart"} as={`/${countryCode}/${lang}/cart`}>
              <div className="flex flex-row items-center">
                <span className="hidden md:inline-block">{locale[lang].shoppingBag}</span>
                <span className="md:hidden">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27 6H5C4.44772 6 4 6.44772 4 7V25C4 25.5523 4.44772 26 5 26H27C27.5523 26 28 25.5523 28 25V7C28 6.44772 27.5523 6 27 6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 10H28"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 14C21 15.3261 20.4732 16.5979 19.5355 17.5355C18.5979 18.4732 17.3261 19 16 19C14.6739 19 13.4021 18.4732 12.4645 17.5355C11.5268 16.5979 11 15.3261 11 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <LineItemsContainer>
                  <LineItemsCount className="animate-bounce -ml-4 md:ml-2 inline-flex items-center px-2 py-1 rounded-full text-sm font-medium leading-5 bg-indigo-500 text-gray-50" />
                </LineItemsContainer>
              </div>
            </Link>
          </div>
        </nav>
        <hr className="mt-6" />
      </div>
    </>
  );
};

export default Header;

import React from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Country } from "@typings/models";

type Props = {
  children: React.ReactNode;
  lang: string;
  countryCode: string;
  buildLanguages?: Country[];
  countries?: Country[];
  pageTitle?: string;
};

const Layout: React.FC<Props> = ({
  children,
  buildLanguages = [],
  lang,
  countryCode,
  countries = []
}) => {
  return (
    <>
      <div className="relative bg-ashy overflow-hidden">
        <div className="relative pt-5 pb-10 px-5 lg:px-0 lg:pb-16 max-w-screen-lg mx-auto">
          <Header lang={lang} countryCode={countryCode} />
        </div>

        <main>{children}</main>

        <Footer lang={lang} countries={countries} buildLanguages={buildLanguages} />
      </div>
    </>
  );
};

export default Layout;

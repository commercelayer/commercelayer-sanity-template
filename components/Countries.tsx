import _ from "lodash";
import React from "react";
import Link from "next/link";
import locale from "@locale/index";
import { Country } from "@typings/models";

type Props = {
  items: Country[];
};

const Countries: React.FC<Props> = ({ items }) => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <h1 className="text-lg mb-24 uppercase text-center">Choose your location/region</h1>
      <div className="grid grid-cols-2 gap-y-14 gap-x-16 md:grid-cols-2 md:gap-y-8 md:gap-x-4">
        {items.map(({ name, defaultLocale, code }, key) => {
          const lang = _.first(defaultLocale.toLowerCase().split(","));
          const countryCode = code.toLowerCase();

          return (
            <Link
              key={key}
              href={{
                pathname: "/[countryCode]/[lang]",
                query: {
                  countryCode,
                  lang
                }
              }}
            >
              <div className="text-center">
                <p className="text-lg font-bold">{name}</p>
                <p className="text-xs pt-1">{locale[lang as string].languageName}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Countries;

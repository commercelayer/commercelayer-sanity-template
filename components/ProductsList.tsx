import _ from "lodash";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Price, PricesContainer } from "@commercelayer/react-components";
import { Product } from "@typings/models";

type Props = {
  products: Product[];
};

const ProductsList = ({ products }: Props) => {
  const {
    query: { countryCode, lang }
  } = useRouter();
  return (
    <div className="mt-12 sm:ml-10 lg:col-span-2">
      <ul className="md:pt-7 space-y-12 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
        {products.map(({ images, name, variants, slug }, key: number) => {
          const img = _.first(images)?.url;
          const code = _.first(variants)?.code;
          return (
            <li key={key}>
              <Link
                href={"/[countryCode]/[lang]/[productName]"}
                as={`/${countryCode}/${lang}/${slug}`}
                passHref
              >
                <div className="flex flex-col h-full border-2 rounded-lg p-5 md:p-3 hover:shadow-2xl">
                  <div className="aspect-w-3 aspect-h-2 mb-5">
                    <Image
                      className="object-contain"
                      src={`${img}`}
                      alt={name}
                      width={200}
                      height={50}
                    />
                  </div>
                  <h3 className="text-base leading-6 font-medium space-y-1 h-full">{name}</h3>
                  <div className="justify-self-end mt-5">
                    <ul className="flex justify-between space-x-1 items-center">
                      <li>
                        <PricesContainer skuCode={code}>
                          <Price
                            className="text-indigo-600 mr-1 text-base font-bold md:text-sm"
                            compareClassName="text-gray-500 line-through text-sm md:text-xs"
                          />
                        </PricesContainer>
                      </li>
                    </ul>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductsList;

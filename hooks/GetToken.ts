import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { authentication } from "@commercelayer/js-auth";
import { parseEndpoint } from "@utils/parser";

const clEndpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT as string;
const clientId = process.env.NEXT_PUBLIC_CL_CLIENT_ID as string;
const slug = parseEndpoint(clEndpoint);

type UseGetToken = {
  (args: { scope: string; countryCode: string }): string;
};

export const useGetToken: UseGetToken = ({ scope, countryCode }) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const getCookieToken = Cookies.get(`clAccessToken-${countryCode}`);
    if (!getCookieToken && clientId && slug && scope) {
      const getToken = async () => {
        const auth = await authentication("client_credentials", {
          clientId,
          slug,
          scope: `market:${scope}`
        });
        setToken(auth?.accessToken as string);
        Cookies.set(`clAccessToken-${countryCode}`, auth?.accessToken as string, {
          // @ts-ignore
          expires: auth?.expires
        });
      };
      getToken();
    } else {
      setToken(getCookieToken || "");
    }
  }, [scope, countryCode]);
  return token;
};

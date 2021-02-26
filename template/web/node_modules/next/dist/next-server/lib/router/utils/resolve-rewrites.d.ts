/// <reference types="node" />
import { ParsedUrlQuery } from 'querystring';
import { Rewrite } from '../../../../lib/load-custom-routes';
export default function resolveRewrites(asPath: string, pages: string[], rewrites: Rewrite[], query: ParsedUrlQuery, resolveHref: (path: string) => string, locales?: string[]): string;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tough_cookie_1 = require("tough-cookie");
exports.CookieJar = tough_cookie_1.CookieJar;
/**
 * Read and write cookies with a cookie jar.
 */
function cookies(jar = new tough_cookie_1.CookieJar()) {
    return async function cookieJar(req, next) {
        const prevCookies = req.headers.getAll("Cookie").join("; ");
        const res = await new Promise((resolve, reject) => {
            jar.getCookieString(req.url, (err, cookies) => {
                if (err)
                    return reject(err);
                if (cookies) {
                    req.headers.set("Cookie", prevCookies ? `${prevCookies}; ${cookies}` : cookies);
                }
                return resolve(next());
            });
        });
        const cookies = res.headers.getAll("set-cookie");
        await Promise.all(cookies.map(function (cookie) {
            return new Promise(function (resolve, reject) {
                jar.setCookie(cookie, req.url, { ignoreError: true }, (err) => (err ? reject(err) : resolve()));
            });
        }));
        return res;
    };
}
exports.cookies = cookies;
//# sourceMappingURL=index.js.map
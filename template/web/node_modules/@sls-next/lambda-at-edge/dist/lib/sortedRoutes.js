"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedRoutes = void 0;
class UrlNode {
    constructor() {
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
    }
    insert(urlPath) {
        this._insert(urlPath.split("/").filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = "/") {
        const childrenPaths = [...this.children.keys()].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
        }
        const routes = childrenPaths
            .map((c) => this.children.get(c)._smoosh(`${prefix}${c}/`))
            .reduce((prev, curr) => [...prev, ...curr], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            routes.unshift(prefix === "/" ? "/" : prefix.slice(0, -1));
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children
                .get("[...]")
                ._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw new Error(`Catch-all must be the last part of the URL.`);
        }
        let nextSegment = urlPaths[0];
        if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
            let segmentName = nextSegment.slice(1, -1);
            if (segmentName.startsWith("...")) {
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith(".")) {
                throw new Error(`Segment names may not start with erroneous periods ('${segmentName}').`);
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    if (previousSlug !== nextSlug) {
                        throw new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`);
                    }
                }
                if (slugNames.indexOf(nextSlug) !== -1) {
                    throw new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`);
                }
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                handleSlug(this.restSlugName, segmentName);
                this.restSlugName = segmentName;
                nextSegment = "[...]";
            }
            else {
                handleSlug(this.slugName, segmentName);
                this.slugName = segmentName;
                nextSegment = "[]";
            }
        }
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children
            .get(nextSegment)
            ._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
}
function getSortedRoutes(normalizedPages) {
    const root = new UrlNode();
    normalizedPages.forEach((pagePath) => root.insert(pagePath));
    return root.smoosh();
}
exports.getSortedRoutes = getSortedRoutes;

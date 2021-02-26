"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Map of HTTP headers.
 */
class Headers {
    constructor(init) {
        this.object = Object.create(null);
        if (init)
            this.extend(init);
    }
    set(headerName, value) {
        this.object[headerName.toLowerCase()] =
            Array.isArray(value) ? value.map(String) : String(value);
    }
    append(headerName, value) {
        const key = headerName.toLowerCase();
        const prevValue = this.object[key];
        // tslint:disable-next-line
        if (prevValue === undefined) {
            if (Array.isArray(value)) {
                this.object[key] = value.map(String);
            }
            else {
                this.object[key] = String(value);
            }
        }
        else if (Array.isArray(prevValue)) {
            if (Array.isArray(value)) {
                for (const v of value)
                    prevValue.push(String(v));
            }
            else {
                prevValue.push(String(value));
            }
        }
        else {
            this.object[key] = Array.isArray(value)
                ? [prevValue, ...value.map(String)]
                : [prevValue, String(value)];
        }
    }
    get(headerName) {
        const value = this.object[headerName.toLowerCase()];
        if (value === undefined)
            return null; // tslint:disable-line
        return Array.isArray(value) ? value[0] : value;
    }
    getAll(headerName) {
        const value = this.object[headerName.toLowerCase()];
        if (value === undefined)
            return []; // tslint:disable-line
        return Array.isArray(value) ? [...value] : [value];
    }
    has(headerName) {
        return headerName.toLowerCase() in this.object;
    }
    delete(headerName) {
        delete this.object[headerName.toLowerCase()];
    }
    *entries() {
        yield* Object.entries(this.object);
    }
    *keys() {
        yield* Object.keys(this.object);
    }
    *values() {
        yield* Object.values(this.object);
    }
    clear() {
        this.object = Object.create(null);
    }
    asObject() {
        return Object.assign(Object.create(null), this.object);
    }
    extend(obj) {
        if (Symbol.iterator in obj) {
            for (const [key, value] of obj) {
                this.append(key, value);
            }
        }
        else if (obj instanceof Headers) {
            for (const [key, value] of obj.entries())
                this.append(key, value);
        }
        else {
            for (const key of Object.keys(obj)) {
                const value = obj[key];
                if (value !== undefined)
                    this.append(key, value);
            }
        }
    }
    clone() {
        return new Headers(this.object);
    }
}
exports.Headers = Headers;
//# sourceMappingURL=headers.js.map
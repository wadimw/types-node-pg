This repo is meant to showcase differences between configurations of Typescript projects targeting older version of Node.js (Node 12) but using newer version of Node.js (Node 20) for development.

In order to safely target an older version, the following should be set:

-   `tsconfig.json` should extend `@tsconfig/nodeXX` version matching the targeted Node.js runtime (in this case `@tsconfig/node12`)
-   `@types/node` should be installed in the **major** version matching the targeted Node.js runtime (in this case `@types/node@12`)

This way, the following aspects are accounted for by Typescript:

-   Latest syntax features (e.g. operators) are available\
    `@tsconfig/node12` sets the `.compilerOptions.target = es2019`, which tells Typescript that the transpiled code must only use ES2019 syntax; for example, nullish coalescing operator
    ```js
    maybeNull ?? "coalesced";
    ```
    is transpiled to
    ```js
    maybeNull !== null && maybeNull !== void 0 ? maybeNull : "coalesced";
    ```
-   ECMAScript API feature set (e.g. new methods) is limited to ECMAScript version supported by targeted Node.js runtime\
    This is because `@tsconfig/node12` sets the `.compilerOptions.lib = [es2019, es2020.promise, es2020.bigint, es2020.string]` which means that only those types are available; attempt to use a newer feature will result in a compilation error (because the type is not available);
    for example, `Promise.any` is not available in Node.js 12, so the following code will result in a compilation error
    ```ts
    Promise.any([Promise.resolve(1), Promise.resolve(2)]);
    ```
    in order to use `Promise.any`, a polyfill for it must be installed or implemented manually - such polyfill should provide both the runtime implementation and the type definition.
-   Node.js API feature set is limited to what's provided by targeted Node.js runtime\
    This is because `@types/node@12` only provides types for Node.js 12 API; attempt to use a newer feature will result in a compilation error (because the type is not available);
    for example, `os.machine()` is not available in Node.js 12, so the following code will result in a compilation error
    ```ts
    import os from "os";
    console.log(os.machine());
    ```
    in order to use `os.machine()`, a polyfill for it must be installed or implemented manually - such polyfill should provide both the runtime implementation and the type definition.

Note that code which _targets_ Node.js 12 can easily be built using newer Node.js runtime (or even something entirely different like `esbuild` which is written in Go) as long as the output code only uses APIs available in Node.js 12.

In order to use APIs from newer runtimes, the code must use polyfills. Only when using blanket/automatic polyfilling of ECMAScript features at build time (like `@babel/preset-env`) it might be beneficial to override `.compilerOptions.lib` in `tsconfig.json` to include newer ECMAScript features that will be polyfilled automatically (e.g. `.compilerOpotions.lib = es2025`) (note I'm not sure about this, please check if Babel docs provide recommended configuration). Also note that while `@babel/preset-env` can be used to automatically polyfill ECMAScript features (like `Promise.any`) and has compatibility mapping between Node version adn ECMAScript, it does not provide polyfills for Node.js APIs (like `os.machine()`) - hence, even when using `@babel/preset-env`, `@types/node` installed major version should match targeted runtime (e.g. `@12`).

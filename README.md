This repo is meant to showcase differences between configurations of Typescript projects targeting older version of Node.js (Node 12) but using newer version of Node.js (Node 20) for development.

In order to safely target an older version, the following should be set:

-   `tsconfig.json` should extend `@tsconfig/nodeXX` version matching the targeted Node.js runtime (in this case `@tsconfig/node12`)
-   `@types/node` should be installed in the **major** version matching the targeted Node.js runtime (in this case `@types/node@12`)

This way, the following aspects are accounted for by Typescript:

-   Latest typescript _syntax_ features are available for development
    `@tsconfig/node12` sets the `.compilerOptions.target = es2019`, which tells Typescript that the transpiled code must only use ES2019 syntax; for example, nullish coalescing operator
    ```js
    maybeNull ?? "coalesced";
    ```
    is transpiled to
    ```js
    maybeNull !== null && maybeNull !== void 0 ? maybeNull : "coalesced";
    ```
-   ECMAScript API feature set is limited to what's provided by targeted Node.js runtime
    This is because `@tsconfig/node12` sets the `.compilerOptions.lib = [es2019, es2020.promise, es2020.bigint, es2020.string]` which means that only those types are available; attempt to use a newer feature will result in a compilation error (because the type is not available)
-   Node.js API feature set is limited to what's provided by targeted Node.js runtime
    This is because `@types/node@12` only provides types for Node.js 12 API; attempt to use a newer feature will result in a compilation error (because the type is not available)

Note that code which _targets_ Node.js 12 can easily be built using newer Node.js runtime (or even something entirely different like `esbuild` which is written in Rust) as long as the output code only uses APIs available in Node.js 12.

In order to use APIs from newer runtimes, the code must use polyfills - if they are available. Note that babel/preset-env can be used to automatically polyfill ECMAScript features (like `Promise.any`), but it does not work for Node.js APIs (like `stream/promises` or `os.machine()`).

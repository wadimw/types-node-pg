// this should be flagged as build error because
// according to MDN `Promise.any` was added in ES2021 and Node 15.0.0;
// running this script on Node v12.22.12 will result in runtime error
// `TypeError: Promise.any is not a function`
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

// even though we're using @types/node@20 in this package
// (and this API is supported since Node 15), this still gets correctly flagged as build error
// because ECMAScript version definitions are built into Typescript compiler
// (set by `lib` compiler option in `tsconfig.json`)
// and are not affected by the version of @types/node package

(async () => {
    console.log(await Promise.any([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]));
})();

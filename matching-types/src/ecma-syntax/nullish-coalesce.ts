// this should NOT be flagged as build error and will NOT result in runtime error
// even though support for `??` operator was added in ES2020 (Node 14.0.0 per MDN)
// Typescript compiler transpiles this syntax so that its runtime equivalent
// is compatible with targeted ECMAScript version (ES2019 in case of Node 12 as per @tsconfig/node12)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

const nullValue = null;
console.log(nullValue ?? "null coalescing works");

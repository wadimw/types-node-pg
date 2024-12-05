// this should be flagged as build error because
// according to MDN `Promise.any` was added in ES2021 and Node 15.0.0;
// running this script on Node v12.22.12 will result in runtime error
// `TypeError: Promise.any is not a function`
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any

(async () => {
    console.log(await Promise.any([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]));
})();

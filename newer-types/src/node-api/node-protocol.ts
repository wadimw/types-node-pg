// this should be flagged as build error because
// `node:` scheme support in requires was backported only to Node 14
// Running this script on Node v12.22.12 will result in runtime error
// `Error: Cannot find module 'node:path'`
// https://nodejs.org/api/esm.html#node-imports

// because we're using @types/node@20 in this package,
// this does NOT get flagged as build error,
// but still results in runtime error!

import pathWithPrefix from "node:path";

console.log(pathWithPrefix.delimiter);

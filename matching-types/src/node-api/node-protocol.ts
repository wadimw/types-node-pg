// this should be flagged as build error because
// `node:` scheme support in requires was backported only to Node 14
// Running this script on Node v12.22.12 will result in runtime error
// `Error: Cannot find module 'node:path'`

// https://nodejs.org/api/esm.html#node-imports

import pathWithPrefix from "node:path";

console.log(pathWithPrefix.delimiter);

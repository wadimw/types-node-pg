// this should be flagged as build error because
// os.machine() method was added in Node 16;
// running this script on Node v12.22.12 will result in runtime error
// `TypeError: os.machine is not a function`
// https://nodejs.org/api/os.html#osmachine

// because we're using @types/node@20 in this package,
// this does NOT get flagged as build error,
// but still results in runtime error!

import os from "os";

console.log(os.machine());

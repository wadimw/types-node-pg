// this should be flagged as build error because
// stream/promises API was added in Node 15;
// running this script on Node v12.22.12 will result in runtime error
// `Error: Cannot find module 'stream/promises'`
// https://nodejs.org/api/stream.html#streams-promises-api

// because we're using @types/node@20 in this package,
// this does NOT get flagged as build error,
// but still results in runtime error!

import { pipeline } from "stream/promises";

import fs from "fs";
import os from "os";
import path from "path";

(async () => {
    await pipeline(fs.createReadStream(__filename), fs.createWriteStream(path.join(os.tmpdir(), "stream-pipeline.ts")));
})();

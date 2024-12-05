// this should be flagged as build error because
// stream/promises API was added in Node 15;
// running this script on Node v12.22.12 will result in runtime error
// `Error: Cannot find module 'stream/promises'`

import { pipeline } from "stream/promises";

import fs from "fs";
import os from "os";
import path from "path";

(async () => {
    await pipeline(fs.createReadStream(__filename), fs.createWriteStream(path.join(os.tmpdir(), "stream-pipeline.ts")));
})();

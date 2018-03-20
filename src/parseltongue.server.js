// Constants:
const PARSELTONGUE_EXT = '.pt';
const JAVASCRIPT_EXT = '.js';

// Dependencies:
import * as fs from 'fs';
import * as path from 'path';
import { parseltongue } from './index';

let scriptPath = path.resolve(process.cwd(), process.argv[2]);
let pt = fs.readFileSync(scriptPath, 'utf8');
let js = parseltongue(scriptPath, pt);
// eslint-disable-next-line
console.log(js);

let writePath = scriptPath.replace(PARSELTONGUE_EXT, JAVASCRIPT_EXT);
// eslint-disable-next-line
console.log(`Writing to... ${writePath}`);
fs.writeFileSync(writePath, js);

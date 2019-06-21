import { parser, lexer } from './grammar';

const result = lexer.tokenize('{var');
parser.input = result.tokens;
const cst = parser.greycat();

console.dir(cst, { depth: 10e5 });

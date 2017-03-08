// Dependencies:
import estreeLoc from 'estree-loc';
import { lexText } from './lex-text';

export function createState (sourceText, sourcePath) {
    return {
        tokens: [],
        stateFn: lexText,
        source: sourceText,
        start: 0,
        pos: 0,
        tokenIndex: 0,
        toLoc: estreeLoc(sourceText, sourcePath)
    };
}

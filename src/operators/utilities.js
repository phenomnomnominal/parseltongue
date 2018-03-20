// Dependencies:
import { AND, EQUALS, OR, TO } from './operators';

export function isPossiblyOperator (word) {
    return !![AND, EQUALS, OR, TO].find(operator => operator.startsWith(word));
}

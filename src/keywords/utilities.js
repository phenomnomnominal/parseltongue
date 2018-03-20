// Dependencies:
import { ELSE, ELSEIF, IF, LOOP } from './keywords';

export function isKeyword (word) {
    return [ELSE, ELSEIF, IF, LOOP].includes(word);
}

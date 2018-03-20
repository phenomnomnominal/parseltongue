// Dependencies:
import { FALSE, NULL, TRUE } from './values';

export function isBooleanValue (word) {
    return word === FALSE || word === TRUE;
}

export function isNullValue (word) {
    return word === NULL;
}

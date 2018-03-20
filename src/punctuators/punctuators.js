import { NOT } from '../operators';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE, MODULO, POWER } from '../operators';
import { LESS_THAN, GREATER_THAN } from '../operators';
import { AND, OR } from '../operators';
import { ASSIGNMENT } from '../operators';
import { TO } from '../operators';
import { LESS_THAN_OR_EQUAL, GREATER_THAN_OR_EQUAL, EQUALS, NOT_EQUALS } from '../operators';

export const DECIMAL = '.';

export const SEPARATOR = ',';

export const GROUPING_START = '(';
export const GROUPING_END = ')';

export const ARRAY_START = '[';
export const ARRAY_END = ']';

export const OBJECT_START = '{';
export const OBJECT_END = '}';

export const QUOTE = '\'';

export const LENGTH_ONE = [
    NOT,
    DECIMAL,
    ADD, SUBTRACT, MULTIPLY, DIVIDE, MODULO, POWER,
    LESS_THAN, GREATER_THAN,
    SEPARATOR,
    GROUPING_START, GROUPING_END,
    ARRAY_START, ARRAY_END,
    OBJECT_START, OBJECT_END
];

export const LENGTH_TWO = [
    AND, OR,
    ASSIGNMENT,
    TO,
    LESS_THAN_OR_EQUAL, GREATER_THAN_OR_EQUAL, EQUALS, NOT_EQUALS
];

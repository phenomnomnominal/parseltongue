// Constants:
import { AND, OR } from './operators';
import { EQUALS, NOT_EQUALS } from './operators';
import { LESS_THAN, LESS_THAN_OR_EQUAL, GREATER_THAN, GREATER_THAN_OR_EQUAL } from './operators';
import { ADD, SUBTRACT } from './operators';
import { MULTIPLY, DIVIDE, MODULO } from './operators';

export const PRECEDENCE = {
    [OR]: 0,
    [AND]: 1,
    [EQUALS]: 2,
    [NOT_EQUALS]: 2,
    [LESS_THAN]: 3,
    [LESS_THAN_OR_EQUAL]: 3,
    [GREATER_THAN]: 3,
    [GREATER_THAN_OR_EQUAL]: 3,
    [ADD]: 4,
    [SUBTRACT]: 4,
    [MULTIPLY]: 5,
    [DIVIDE]: 5,
    [MODULO]: 5
};

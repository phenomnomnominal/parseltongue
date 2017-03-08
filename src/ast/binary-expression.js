// Dependencies:
import { Expression } from './expression';

export class BinaryExpression extends Expression {
    constructor (operator, left, right, loc) {
        super('BinaryExpression');
        this.operator = operator;
        this.left = left;
        this.right = right;
        this.loc = loc;
    }
}

// Dependencies:
import { Expression } from './expression';

export class LogicalExpression extends Expression {
    constructor (operator, left, right, loc) {
        super();
        this.operator = operator;
        this.left = left;
        this.right = right;
        this.loc = loc;
    }
}

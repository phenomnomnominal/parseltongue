// Dependencies:
import { Expression } from './expression';

export class LogicalExpression extends Expression {
    constructor (operator, left, right, loc) {
        super('LogicalExpression');
        this.operator = operator;
        this.left = left;
        this.right = right;
        this.loc = loc;
    }
}

// Dependencies:
import { Expression } from './expression';

export class AssignmentExpression extends Expression {
    constructor(left, right, loc) {
        super();
        this.operator = '=';
        this.left = left;
        this.right = right;
        this.loc = loc;
    }
}

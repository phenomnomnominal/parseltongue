// Dependencies:
import { Expression } from './expression';

export class CallExpression extends Expression {
    constructor (callee, args, loc) {
        super();
        this.callee = callee;
        this.arguments = args;
        this.loc = loc;
    }
}

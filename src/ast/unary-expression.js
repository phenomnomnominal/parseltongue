// Dependencies:
import { Expression } from './expression';

export class UnaryExpression extends Expression {
    constructor (operator, argument, prefix, loc) {
        super();
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        this.loc = loc;
    }
}

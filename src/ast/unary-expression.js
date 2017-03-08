// Dependencies:
import { Expression } from './expression';

export class UnaryExpression extends Expression {
    constructor (operator, argument, prefix, loc) {
        super('UnaryExpression');
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
        this.loc = loc;
    }
}

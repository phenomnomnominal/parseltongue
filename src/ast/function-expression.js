// Dependencies:
import { Expression } from './expression';

export class FunctionExpression extends Expression {
    constructor (params, body, loc) {
        super('FunctionExpression');
        this.params = params;
        this.body = body;
        this.loc = loc;
    }
}

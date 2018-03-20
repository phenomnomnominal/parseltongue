// Dependencies:
import { Expression } from './expression';

export class FunctionExpression extends Expression {
    constructor (params, body, loc) {
        super();
        this.params = params;
        this.body = body;
        this.loc = loc;
    }
}

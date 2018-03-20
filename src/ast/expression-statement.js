// Dependencies:
import { Statement } from './statement';

export class ExpressionStatement extends Statement {
    constructor (expression, loc) {
        super();
        this.expression = expression;
        this.loc = loc;
    }
}

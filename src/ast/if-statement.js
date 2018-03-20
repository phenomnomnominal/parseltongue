// Dependencies:
import { Statement } from './statement';

export class IfStatement extends Statement {
    constructor(test, consequent, alternate, loc) {
        super();
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
        this.loc = loc;
    }
}

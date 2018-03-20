// Dependencies:
import { Statement } from './statement';

export class ReturnStatement extends Statement {
    constructor (argument, loc) {
        super();
        this.argument = argument;
        this.loc = loc;
    }
}

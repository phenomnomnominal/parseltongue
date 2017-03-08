// Dependencies:
import { Statement } from './statement';

export class ReturnStatement extends Statement {
    constructor (argument, loc) {
        super('ReturnStatement');
        this.argument = argument;
        this.loc = loc;
    }
}

// Dependencies:
import { Statement } from './statement';

export class ForStatement extends Statement {
    constructor (init, test, update, body, loc) {
        super('ForStatement');
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
        this.loc = loc;
    }
}

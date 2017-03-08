// Dependencies:
import { Statement } from './statement';

export class BlockStatement extends Statement {
    constructor (body, loc) {
        super('BlockStatement');
        this.body = body;
        this.loc = loc;
    }
}

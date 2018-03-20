// Dependencies:
import { Node } from './node';

export class Program extends Node {
    constructor (body) {
        super();
        this.body = body;
    }
}

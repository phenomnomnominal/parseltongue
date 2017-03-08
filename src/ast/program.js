import { Node } from './node';

export class Program extends Node {
    constructor (body) {
        super('Program');
        this.body = body;
    }
}

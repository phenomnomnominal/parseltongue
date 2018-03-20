// Test:
import { expect } from 'chai';
import dedent from 'dedent';

// Dependencies:
import { parseltongue } from '../src';

export function assertTranspile (pt, js) {
    expect(parseltongue('', dedent(pt))).to.include(dedent(js));
}

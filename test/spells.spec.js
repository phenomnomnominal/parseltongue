// Dependencies:
import { assertTranspile } from './setup';

describe('parseltongue - ', () => {
    describe('spells - ', () => {
        it('should transpile complex spells:', () => {
            assertTranspile(`
                sssSpell <~ 'Expecto Patronum'

                sssMagic [sssSpell, sssIntensity]
                    sssIntense <~ ''
                    sssss sssI <~ 0 ~> sssIntensity
                        sssIntense <~ sssIntense + '!'

                    <~ sssSpell + sssIntense

                sssResult
                sssss sssI <~ 0 ~> 10
                    sssResult <~ sssMagic <~ [sssSpell, sssI]

                sssCast <~ [sssResult]
            `, `
                var spell = 'Expecto Patronum';
                var magic = function (spell, intensity) {
                    var intense = '';
                    for (var i = 0; i < intensity; i = i + 1) {
                        intense = intense + '!';
                    }
                    return spell + intense;
                };
                var result;
                for (var i = 0; i < 10; i = i + 1) {
                    result = magic(spell, i);
                }
                alert(result);
            `);
        });
    });
});

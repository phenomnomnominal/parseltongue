// Dependencies:
import { assertTranspile } from './setup';

describe('parseltongue - ', () => {
    describe('loops - ', () => {
        it('should transpile a basic for loop:', () => {
            assertTranspile(`
                sssStart <~ 0
                sssEnd <~ 10
                sssss sssI <~ sssStart ~> sssEnd
                    sssCast <~ []
            `, `
                var start = 0;
                var end = 10;
                for (var i = start; i < end; i = i + 1) {
                    alert();
                }
            `);
        });

        it('should transpile a for loop with the values declared inline:', () => {
            assertTranspile(`
                sssss sssI <~ 0 ~> 10
                    sssCast <~ []
            `, `
                for (var i = 0; i < 10; i = i + 1) {
                    alert();
                }
            `);
        });
    });
});

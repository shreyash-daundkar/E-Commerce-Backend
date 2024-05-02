import add from './a';

describe('test add function', () => {

    it('should return sum of 2 number provided', () => {

        const a = 2;
        const b = 5;
        const expectedAnswer = 7;

        const answer = add(a, b);

        expect(answer).toBe(expectedAnswer);
    })
})
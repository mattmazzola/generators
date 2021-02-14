import * as gs from './generators'
import * as tok from './tokenize'

describe('Generators', () => {
    describe('Basic manual counter execution', () => {
        test('counter will print out successively increasing values', () => {
            const counter1 = gs.counter(3, 3)
            const outputs = []

            outputs.push(counter1.next())
            outputs.push(counter1.next())
            outputs.push(counter1.next())
            outputs.push(counter1.return())

            const expected = [
                { done: false, value: 3 },
                { done: false, value: 6 },
                { done: false, value: 9 },
                { done: true, value: undefined },
            ]

            expect(expected).toEqual(outputs)
        })
    })

    describe('Comparison of normal vs generator functions', () => {
        test('normal returns array', () => {
            const rangeArray = gs.range(5)
            const expected = [1, 2, 3, 4, 5]
            expect(expected).toEqual(rangeArray)
        })

        test('generator returns iterator which must be iterated to produce array of values', () => {
            const rangeIter = gs.rangeForOf(10)
            const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            expect(expected).toEqual([...rangeIter])
        })
    })

    describe('Nested Generators', () => {
        test('using yield* within to exhaust generator', () => {
            const rangeWrapped = gs.rangeWrapper(gs.rangeForOf(7, 1))
            const expected = [-1, 1, 2, 3, 4, 5, 6, 7, 100]
            expect(expected).toEqual([...rangeWrapped])
        })
    })

    describe('Understanding the Lifecycle', () => {
        // Generator has this sequence
        // 1
        // 2 + input
        // 3
        // 10 + input2

        let res

        describe('Continue calling next() after gen is done', () => {
            test('calling next after done returns a undefined value', () => {
                const genLifecycle = gs.generatorLifecycle()
                const outputs = [
                    'Run: Input 5 (Ignored)',
                    genLifecycle.next(5),
                    'Run: Input 6 (Becomes input1)',
                    genLifecycle.next(6),
                    'Run: Input 2 (Becomes input2)',
                    genLifecycle.next(2),
                    'Run: Input 4 (Discarded)',
                    genLifecycle.next(4),
                    'Run: Input 4',
                    genLifecycle.next(4),
                ]

                const expected = [
                    'Run: Input 5 (Ignored)',
                    { done: false, value: 1 },
                    'Run: Input 6 (Becomes input1)',
                    { done: false, value: 8 },
                    'Run: Input 2 (Becomes input2)',
                    { done: false, value: 3 },
                    'Run: Input 4 (Discarded)',
                    { done: true, value: 12 },
                    'Run: Input 4',
                    { done: true, value: undefined },
                ]

                expect(expected).toEqual(outputs)
            })
        })

        describe('Gen with return() before done', () => {
            test('lifecycle output should match', () => {
                const genLifecycle = gs.generatorLifecycle()
                const outputs = [
                    'Run: Input 5',
                    genLifecycle.next(5),
                    'Run: Input 6',
                    genLifecycle.return(70),
                    'Run: Input 2',
                    genLifecycle.next(2),
                    'Run: Input 4',
                    genLifecycle.next(4),
                    'Run: Input 4',
                    genLifecycle.next(4),
                ]

                const expected = [
                    'Run: Input 5',
                    { done: false, value: 1 },
                    'Run: Input 6',
                    { done: true, value: 70 },
                    'Run: Input 2',
                    { done: true, value: undefined },
                    'Run: Input 4',
                    { done: true, value: undefined },
                    'Run: Input 4',
                    { done: true, value: undefined },
                ]

                expect(expected).toEqual(outputs)
            })

            test('can return() multiple times and calling return forces it to return value even if already done', () => {
                const genLifecycle = gs.generatorLifecycle()
                const outputs = [
                    genLifecycle.return(1),
                    genLifecycle.return(2),
                    genLifecycle.return(3),
                    genLifecycle.next(),
                    genLifecycle.return(4),
                ]

                const expected = [
                    { done: true, value: 1 },
                    { done: true, value: 2 },
                    { done: true, value: 3 },
                    { done: true, value: undefined },
                    { done: true, value: 4 },
                ]

                expect(expected).toEqual(outputs)
            })
        })

        describe('Gen with throw() before done', () => {
            test('after an error is forced throw iterator will be done', () => {
                const genLifecycle = gs.generatorLifecycle()
                let outputs: any = [
                    'Run: Input 5',
                    genLifecycle.next(5),
                    'Run: Input 6',
                    `Thrown result`
                ]

                try {
                    genLifecycle.throw(new Error(`Some message`))
                }
                catch (e) {
                    const err = e as Error 
                    outputs.push(err.message)
                }

                outputs = [
                    ...outputs,
                    'Run: Input 2',
                    genLifecycle.next(2),
                    'Run: Input 4',
                    genLifecycle.next(4),
                    'Run: Input 4',
                    genLifecycle.next(4),
                ]

                const expected = [
                    'Run: Input 5',
                    { done: false, value: 1 },
                    'Run: Input 6',
                    'Thrown result',
                    'Some message',
                    'Run: Input 2',
                    { done: true, value: undefined },
                    'Run: Input 4',
                    { done: true, value: undefined },
                    'Run: Input 4',
                    { done: true, value: undefined },
                ]

                expect(expected).toEqual(outputs)
            })
        })

        describe('Async generator', () => {
            test('manual execution awaiting promises', async () => {
                const asyncIter = gs.asyncGenerator()
                const outputs = []

                let res
                res = await asyncIter.next()
                outputs.push(res)
                res = await asyncIter.next()
                outputs.push(res)
                res = await asyncIter.next()
                outputs.push(res)
                res = await asyncIter.next()
                outputs.push(res)
                res = await asyncIter.next()
                outputs.push(res)
                res = await asyncIter.next()
                outputs.push(res)
                res = await asyncIter.next()
                outputs.push(res)

                const expected = [
                    { done: false, value: 1 },
                    { done: false, value: 2 },
                    { done: false, value: 3 },
                    { done: true, value: 4 },
                    { done: true, value: undefined },
                    { done: true, value: undefined },
                    { done: true, value: undefined },
                ]
                expect(expected).toEqual(outputs)
            })

            test('for await of execution auto await and does not loop when done', async () => {
                const asyncIter = gs.asyncGenerator()
                const outputs = []

                for await (let x of asyncIter) {
                    outputs.push(x)
                }

                const expected = [1, 2, 3]

                expect(expected).toEqual(outputs)
            })
        })

        describe('Fibonacci', () => {
            test('Synchronous Fibonacci with array of given size', () => {
                const fib = gs.fib(10)
                const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                expect(expected).toEqual(fib)
            })

            test('Generator Fibonacci with max iters consume infinite Fib generator', () => {
                const fib = gs.fixIter(10)
                const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
                expect(expected).toEqual([...fib])
            })
        })

        describe('ML Data preparation', () => {
            test('tokenizer match expected', () => {
                const inputString = "How do generators work?"
                const lowerInputString = inputString.toLowerCase()
                const tokens = tok.tokenize(lowerInputString)
                const processedIter = tok.processTokens(tokens)
                const vocabIter = tok.vocabValues(processedIter)

                const expectedTokens = ['how', 'do', 'generators', 'work?']
                expect(expectedTokens).toEqual(tokens)

                const expectedVocab = [1,3,4,5,0,2]
                expect(expectedVocab).toEqual([...vocabIter])
            })
        })
    })
})





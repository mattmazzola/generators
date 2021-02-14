import * as gs from './generators'
import * as tok from './tokenize'

describe('Generators', () => {
    describe('Basic manual counter execution', () => {
        test('counter will print out successively increasing values', () => {
            const counter1 = gs.counter(3,3)
            
            let vals = []
            vals.push(counter1.next())
            vals.push(counter1.next())
            vals.push(counter1.next())
            vals.push(counter1.return())

            const expected = [
                { value: 3, done: false },
                { value: 6, done: false },
                { value: 9, done: false },
                { value: undefined, done: true },
            ];

            expect(expected).toEqual(vals);
        })
    })

    describe('Generator using other generator with limits', () => {
        test('range array', () => {
            const rangeArray = gs.range(5)
            const expected = [1,2,3,4,5]
            expect(expected).toEqual(rangeArray);
        })

        test('range iterator', () => {
            const rangeIter = gs.rangeGen(10)
            const expected = [1,2,3,4,5,6,7,8,9,10]
            expect(expected).toEqual([...rangeIter])
        })
    })

    describe('Generator using yield* within', () => {
        test('nested generator exhausted and wrapped', () => {
            const rangeWrapped = gs.rangeWrapper(gs.rangeGen(7, 1))
            const expected = [-1, 1,2,3,4,5,6,7, 100]
            expect(expected).toEqual([...rangeWrapped])
        }) 
    })
})

// // Generator using for of to run other generator
// const range7 = gs.range4(10, 1)
// console.log({ range: [...range7 ]})

// let res

// console.log('Gen with next() after done')
// // Generator LifeCycle
// const genLifecycle1 = gs.generatorLifecye()

// console.log('Run: ', 'Input 5')
// res = genLifecycle1.next(5)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 6')
// res = genLifecycle1.next(6)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 2')
// res = genLifecycle1.next(2)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 4')
// res = genLifecycle1.next(4)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 4')
// res = genLifecycle1.next(4)
// console.log('Run: ', { res })

// console.log('Gen with return() before done')

// // Generator LifeCycle Force Return?
// const genLifecycle2 = gs.generatorLifecye()

// console.log('Run: ', 'Input 5')
// res = genLifecycle2.next(5)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 6')
// res = genLifecycle2.return(70)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 2')
// res = genLifecycle2.next(2)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 4')
// res = genLifecycle2.next(4)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 4')
// res = genLifecycle2.next(4)
// console.log('Run: ', { res })

// console.log('Gen with throw() before done')
// // Generator LifeCycle Force Throw?
// const genLifecycle3 = gs.generatorLifecye()

// console.log('Run: ', 'Input 5')
// res = genLifecycle3.next(5)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 6')
// try {

//     res = genLifecycle3.throw(new Error(`Some message`))
// }
// catch {
//     console.log('Thrown result: ', { res })
// }

// console.log('Run: ', 'Input 2')
// res = genLifecycle3.next(2)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 4')
// res = genLifecycle3.next(4)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 4')
// res = genLifecycle3.next(4)
// console.log('Run: ', { res })

// async function main() {

//     const asyncIter = gs.asyncGenerator()

    // let res
    // res = await asyncIter.next()
    // console.log({ res })
    // res = await asyncIter.next()
    // console.log({ res })
    // res = await asyncIter.next()
    // console.log({ res })
    // res = await asyncIter.next()
    // console.log({ res })
    // res = await asyncIter.next()
    // console.log({ res })
    // res = await asyncIter.next()
    // console.log({ res })
    // res = await asyncIter.next()
    // console.log({ res })

//     for await (let x of asyncIter) {
//         console.log({ x })
//     }
// }

// main()

// // Sychronous Fibonacci with array of given size
// const fib1 = gs.fib(10)
// console.log({ fib1 })

// // Generator Fibonacci with max iters consume infinite Fib generator
// const fib2 = gs.fixIter(10)
// console.log({ fib: [...fib2] })


// const inputString = "How do generators work?"
// console.log(inputString)
// const tokenized = tok.tokenize(inputString)
// console.log({ tokenized })
// const processedIter = tok.processTokens(tokenized)
// // console.log({ processTokens: [...processedIter] })
// const vocabIter = tok.vocabValues(processedIter)
// console.log({ vocabsTokens: [...vocabIter] })

// // const vocabIter2 = tok.vocabValues(['adf', 'adf', 'asdf'])
// console.log({ vocabsTokens: [...vocabIter2] })



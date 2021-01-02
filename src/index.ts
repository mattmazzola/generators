import * as gs from './generators'

// // Basic manual counter execution
// const counter1 = gs.counter(3,3)

// let val
// val = counter1.next()
// console.log({ val })
// val = counter1.next()
// console.log({ val })
// val = counter1.next()
// console.log({ val })
// val = counter1.return()
// console.log({ val })

// // Generator using other generator with limits
// const range5 = gs.range(5)
// const range52 = gs.range2(5, 2)
// const range53 = gs.range2(20, 2)

// console.log({ range: range5 })
// console.log({ range: [...range52] })
// console.log({ range: [...range53] })

// // Generator using yield* within
// const range6 = gs.rangeWrapper(gs.range2(7, 1))
// console.log({ range: [...range6 ]})

// // Generator using for of to run other generator
// const range7 = gs.range4(10, 1)
// console.log({ range: [...range7 ]})

// let res

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

// console.log('Gen with Return')

// // Generator LifeCycle Force Return?
// const genLifecycle2 = gs.generatorLifecye()

// console.log('Run: ', 'Input 5')
// res = genLifecycle2.next(5)
// console.log('Run: ', { res })

// console.log('Run: ', 'Input 6')
// res = genLifecycle2.return(6)
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

// async function main() {

//     const asyncIter = gs.asyncGenerator()

//     let res
//     res = await asyncIter.next()
//     console.log({ res })
//     res = await asyncIter.next()
//     console.log({ res })
//     res = await asyncIter.next()
//     console.log({ res })
//     res = await asyncIter.next()
//     console.log({ res })
//     res = await asyncIter.next()
//     console.log({ res })
//     res = await asyncIter.next()
//     console.log({ res })
//     res = await asyncIter.next()
//     console.log({ res })

// main()

// Sychronous Fibonacci with array of given size
const fib1 = gs.fib(10)
console.log({ fib1 })

// Generator Fibonacci with max iters consume infinite Fib generator
const fib2 = gs.fixIter(10)
console.log({ fib: [...fib2] })

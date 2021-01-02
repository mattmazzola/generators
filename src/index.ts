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
// const range53 = gs.range2(0, 2)

// console.log({ range: range5 })
// console.log({ range: [...range52] })
// console.log({ range: [...range53] })

// Generator using yield* within
const range6 = gs.range3(10, 2)
console.log({ range: [...range6 ]})

let res

// Generator LifeCycle
const genLifecycle1 = gs.generatorLifecye()

console.log('Run: ', 'Input 5')
res = genLifecycle1.next(5)
console.log('Run: ', { res })

console.log('Run: ', 'Input 6')
res = genLifecycle1.next(6)
console.log('Run: ', { res })

console.log('Run: ', 'Input 2')
res = genLifecycle1.next(2)
console.log('Run: ', { res })

console.log('Run: ', 'Input 4')
res = genLifecycle1.next(4)
console.log('Run: ', { res })

console.log('Run: ', 'Input 4')
res = genLifecycle1.next(4)
console.log('Run: ', { res })

console.log('Gen with Return')

// Generator LifeCycle Force Return?
const genLifecycle2 = gs.generatorLifecye()

console.log('Run: ', 'Input 5')
res = genLifecycle2.next(5)
console.log('Run: ', { res })

console.log('Run: ', 'Input 6')
res = genLifecycle2.return(6)
console.log('Run: ', { res })

console.log('Run: ', 'Input 2')
res = genLifecycle2.next(2)
console.log('Run: ', { res })

console.log('Run: ', 'Input 4')
res = genLifecycle2.next(4)
console.log('Run: ', { res })

console.log('Run: ', 'Input 4')
res = genLifecycle2.next(4)
console.log('Run: ', { res })
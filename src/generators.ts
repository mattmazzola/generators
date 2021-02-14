export function* counter(start = 1, inc = 1) {
    let n = start

    while (true) {
        yield n
        n += inc
    }
}

export function range(max: number): number[] {
    if (max < 0) {
        throw new Error(`Given max value must be greater than 0. You passed: ${max}`)
    }

    return Array.from({ length: max }, (_, i) => i + 1)
}

export function* rangeWrapper(iter: Generator) {
    yield -1
    yield* iter
    yield 100
}

export function* rangeForOf(max: number, inc: number = 1) {
    const iter = counter(1, inc)
    for (let n of iter) {
        if (n > max) {
            break
        }
        yield n
    }
}

export function* generatorLifecycle(debug = false) {
    debug && console.log('Gen: ', "Started")

    let input = yield 1
    debug && console.log('Gen: ', { input })
    let input2 = yield 2 + input
    debug && console.log('Gen: ', { input2 })

    yield 3

    debug && console.log('Gen: ', "Done")
    return 10 + input2
}

export function delay(ms: number = 0, val: number = 0) {
    return new Promise((res) => {
        setTimeout(() => { res(val) }, ms)
    })
}

export async function* asyncGenerator() {
    yield delay(1000, 1)
    yield delay(1000, 2)
    await delay(1000)
    yield 3
    await delay(1000)
    return 4
}

// Fibonacci
// [0,1,1,2,3,5,8,13,21,44,....]
export function fib(max: number): number[] {
    const ns: number[] = []

    let current = 0
    let next = 1

    for (let i = 0; i < max; i++) {
        ns.push(current);
        [current, next] = [next, next + current]
    }

    return ns
}


/**
 * Fibonacci sequence
 * Infinite generator
 */
export function* fibGen() {
    let current = 0
    let next = 1

    while (true) {
        let reset = yield current;
        [current, next] = [next, next + current]

        if (reset) {
            current = 0
            next = 1
        }
    }
}

/**
 * Fibonacci sequence with max limit
 *
 * @param iters Number of values in fibonacci sequence to computer
 */
export function* fixIter(iters?: number) {
    const fib2Iter = fibGen()

    if (typeof iters !== 'number') {
        yield* fib2Iter
        return
    }

    if (iters < 0) {
        throw new Error(`n must be greater than 0`)
    }

    for (let i = 0; i < iters; i++) {
        let res = fib2Iter.next()
        yield res.value
    }
}

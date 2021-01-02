export function *counter(start = 1, inc = 1) {
    let n = start

    while(true) {
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

export function *range2(max: number, inc: number = 1) {
    const couterIterator = counter(0, inc)
    let n = couterIterator.next()
    yield n.value

    while(n.value < max) {
        n = couterIterator.next()
        yield n.value
    }
}

export function *range3(max: number, inc: number = 1) {
    const counterIter = counter(0, inc)

    let res

    res = yield* counterIter
}

export function *generatorLifecye() {
    console.log('Gen: ', "Started")

    let input = yield 1
    console.log('Gen: ', { input })
    let input2 = yield 2 + input
    console.log('Gen: ', { input2 })

    yield 3

    console.log('Gen: ', "Done")
    return 10 + input2
}

export function delay(ms: number = 0): Promise<void> {
    return new Promise((res, rej) => {
        setTimeout(() => res(), ms)
    })
}

export async function *asyncGenerator() {
    yield 1
    await delay(2000)
    yield 2
    await delay(2000)
    yield 3
}
# Generators Playground

## Goals

1. Simple generator with manual execution
1. Generator consumed by for loop
1. Learning generator lifecycle
    1. Injecting data by passing values to next()
    1. Forcing return by calling return()


## Question to Answer

1. When a generator finishes do most consumers use the value of the result.value?
Based on what's out there most generators just simply yield, and have a void return which would return undefined so this value would not be used. In other words when `done == true` the `value` is unused.  Example: `{ done: true, value: 345345 }`

It is not included meaning expectation is that generators return by default istead of explicitly and not to rely on return

E.g. When you run iterator until completion the return value will or will not be included?
[...iterator]

2. How does yield* work? Compare to non yeilds
It seems like it runs the given iterator until exaustion which means you can't input values, but exposes the internal yields to consumer
This is how you extend / streams

Does run to completion?

3. After a generator is finished/returned, will it ever have non undefined value?
We know by using `return` we can make value non-undefined with done: true, but any calls to next() after that seem to always return undefined

It returns value once then always undefined


## Notes:

When you auto run an iterator using for-or or for-await-of, it directly gets the values instead of the result objects


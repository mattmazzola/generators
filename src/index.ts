import * as gs from './generators'
import * as tok from './tokenize'

const inputString = "How do generators work?"
const tokenized = tok.tokenize(inputString.toLowerCase())
const processedIter = tok.processTokens(tokenized)
// console.log({ processTokens: [...processedIter] })
const vocabIter = tok.vocabValues(processedIter)

console.log(inputString)
console.log({ tokenized })
console.log({ vocabsTokens: [...vocabIter] })
const vocabIter2 = tok.vocabValues(['adf', 'adf', 'asdf'])
console.log({ vocabsTokens: [...vocabIter2] })




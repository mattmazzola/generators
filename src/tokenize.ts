export function tokenize(s: string): string[] {
    return s.split(/\s/)
}

const vocab: Record<string, number> = {
    "<UNK>": 0,
    "<SOS>": 1,
    "<EOS>": 2,
    "how": 3,
    "do": 4,
    "generators": 5,
    "work": 6,
}

export function *processTokens(tokenIter: Iterable<string>) {
    yield "<SOS>"
    yield* tokenIter
    yield "<EOS>"
}

export function *vocabValues(processedTokens: Iterable<string>) {
    for(let token of processedTokens) {
        const val = vocab[token] ?? vocab["<UNK>"]
        yield val
    }
}
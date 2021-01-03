export function tokenize(s: string): string[] {
    return s.split(/\s/)
}

const vocab: Record<string, number> = {
    "<UNK>": 1,
    "<EOS>": 0,
    "<SOS>": 2,
    "how": 1,
    "do": 2,
    "generators": 3,
    "work": 4,
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
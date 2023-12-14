let currOperation: string | undefined

export const getNextOperation = () => {
    if (!currOperation) {
        currOperation = "intro"
    }
    else if (currOperation === 'intro') {
        currOperation = "symptoms"
    }

    return currOperation
}
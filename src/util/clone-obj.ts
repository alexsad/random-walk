const cloneObject = <T>(pObject: T) => {
    return JSON.parse(JSON.stringify(pObject)) as T
}

export { cloneObject }
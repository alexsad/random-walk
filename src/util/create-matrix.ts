function createMatrix<T>(rows: number, cols: number, initialValue: T): T[][] {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => initialValue));
}

export { createMatrix };
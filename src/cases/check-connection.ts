
const checkConnection = async () => {
    const url = '/stream-api/status'
    const timeout = 2000
    const controller = new AbortController();
    const signal = controller.signal;

    // Define um timeout para abortar a requisição se demorar demais
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal });

        clearTimeout(timeoutId); // Cancela o timeout se a resposta chegou a tempo

        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        if ((error as Error).name === "AbortError") {
            return false;
        }
        return false;
    }
}

export {checkConnection}
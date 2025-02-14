import { createOrder } from "./cases/order";


async function fallowOrder(orderId: number) {
    const response = await fetch(`/stream-api/order-status/track/${orderId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
        throw new Error('Não foi possível obter o reader da stream.');
    }

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            console.log('Recebido:', decoder.decode(value, { stream: true }));
        }
    } catch (error) {
        console.error('Erro na stream:', error);
    } finally {
        reader.releaseLock();
    }
}

(async () => {
    const savedOrder = await createOrder({
        customer: '1',
        dishName: 'cuscuz com charque',
    })
    if (typeof savedOrder?.id === 'number') {
        fallowOrder(savedOrder.id)
    }
})()


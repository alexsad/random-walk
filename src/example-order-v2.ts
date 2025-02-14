import { createOrder } from "./cases/order";

async function* fallowOrderV2(orderId: number) {
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
            yield decoder.decode(value, { stream: true })
            // console.log('Recebido:', decoder.decode(value, { stream: true }));
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
        const fallowOrder2Inst = fallowOrderV2(savedOrder.id)
        for await (const orderStatus of fallowOrder2Inst) {
            console.log('status:', orderStatus)
        }
    }
})()


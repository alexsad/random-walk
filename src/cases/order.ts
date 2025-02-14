export type IOrder = {
    id?: number,
    dishName: string,
    customer: string,
    createAt?: string,
}

const createOrder = (order: IOrder) => {
    return fetch(
        `/stream-api/order`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        },
    ).then(rs => rs.json()) as Promise<IOrder>
}

export { createOrder }

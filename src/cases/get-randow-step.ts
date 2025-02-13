import { EventSourcePolyfill } from "event-source-polyfill";
import { interval, Observable, of } from "rxjs";
import { catchError, map, takeWhile } from "rxjs/operators";



const getRandowStep = (trackId: string, steps: number) => {
    return interval(400)
        .pipe(
            takeWhile(val => val < steps + 0),
            map(val => ({
                y: val,
                x: Math.random() < .5 ? -1 : 1,
                trackId,
            })),
        )
}


export type IStep = {
    x: number,
    y: number,
    trackId: string,
}

function getRandowStepFromAPI(trackId: string, steps: number) {
    return new Observable<MessageEvent<string>>(observer => {
        // const eventSource = new EventSource(`/stream-api/drunk/walk?steps=${steps}&track-id=${trackId}`);
        const eventSource = new EventSourcePolyfill(`/stream-api/drunk/walk?steps=${steps}`, {
            headers: {
                'Connection': 'keep-alive',
                "X-Use-HTTP2": "true",
            }
        });
        const onMessage = (event: any) => observer.next(event);
        const onError = (error: any) => {
            console.log('error:', error);
            observer.error(error);
            eventSource.close();
        };

        eventSource.addEventListener('message', onMessage);
        eventSource.addEventListener('error', onError);

        return () => {
            eventSource.removeEventListener('message', onMessage);
            eventSource.removeEventListener('error', onError);
            eventSource.close();
        };
    }).pipe(
        map(({ data }) => JSON.parse((data || '{}')) as IStep),
        map(item => ({
            ...item,
            trackId,
        })),
        catchError(err => {
            console.log('error tratado:', err)
            return of({
                y: -1,
                x: 0,
                trackId,
            })
        })
    )
}

export { getRandowStep, getRandowStepFromAPI };


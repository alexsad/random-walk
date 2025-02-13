const nextOddNumber = (vlw: number) => {
    while(vlw % 2 === 0){
        vlw++
    } 
    return vlw
}

const getRightPlacimentPercentSize = (vlw: number) => {
    let lastOddVlw = 1
    let lastMaxOddVlw = 1
    while(vlw > lastMaxOddVlw){
        lastOddVlw = nextOddNumber((lastOddVlw + 1))
        lastMaxOddVlw+=lastOddVlw
    }
    
    return Math.round(100 / Math.max(1, lastOddVlw - 1))
 }

 export {getRightPlacimentPercentSize}
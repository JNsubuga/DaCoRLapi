export  function CurrencyFormat(numberToFormat){
    const formater = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'UGX'
    })

    return formater.format(numberToFormat)
}


export function DateFormat(dateToFormat) {
    const date = new Date(dateToFormat);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate
}
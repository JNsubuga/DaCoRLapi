export default  function CurrencyFormat(numberToFormat){
    const formater = new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'UGX'
    })

    return formater.format(numberToFormat)
}
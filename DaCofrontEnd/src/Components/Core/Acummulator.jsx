import { CurrencyFormat } from "./Locale";

export default function Acummulator({ objectValuesToAcummulate = {} }) {
    //Convert input Object to an Array
    const arrayValuesToAcummulate = Object.values(objectValuesToAcummulate)

    let totalPrinciple = 0
    let totalPaid = 0
    let totalBalance = 0

    // arrayValuesToAcummulate.map(element => {
    arrayValuesToAcummulate.forEach(element => {
        totalPrinciple += element.accountAnualPrinciple
        totalPaid += element.totalAmountPaid
        totalBalance += element.accountBalance
    });

    return (
        <tr className="border-b-2 border-gray-600 font-semibold capitalize">
            <td colSpan="2" className="py-0 px-2 text-left">Total</td>
            <td className="py-0 px-2 text-right">
                {CurrencyFormat(totalPrinciple)}
            </td>
            <td className="py-0 px-2 text-right">
                {CurrencyFormat(totalPaid)}
            </td>
            <td className="py-0 px-2 text-right">
                {CurrencyFormat(totalBalance)}
            </td>
        </tr>)
} 
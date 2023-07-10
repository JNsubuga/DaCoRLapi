import { CurrencyFormat, DateFormat } from "../../Components/Core/Locale";

export default function TransactionsCell({ transaction }) {
    return (
        <tr className="border-b border-gray-400">
            <td className="py-0 px-6">{DateFormat(transaction.txnDate)}</td>
            <td className="py-0 px-6 text-left">{transaction.Folio}</td>
            {transaction.event == 1 &&
                <>
                    <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Amount)}</td>
                    <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                </>
            }
            {transaction.event == 2 &&
                <>
                    <td className="py-0 px-6 text-right">{CurrencyFormat(0)}</td>
                    <td className="py-0 px-6 text-right">{CurrencyFormat(transaction.Amount)}</td>
                </>
            }
        </tr >
    )
}

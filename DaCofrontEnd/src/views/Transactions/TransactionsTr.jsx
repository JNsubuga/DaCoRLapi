import { CurrencyFormat, DateFormat } from '../../Components/Core/Locale'
import TransactionsCell from './TransactionsCell'

export default function TransactionsTr({ searchResults }) {
    return (
        <tbody>
            {searchResults ?
                searchResults.map(transaction => (
                    <tr className="border-b border-gray-400" key={transaction.id}>
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
                )) : (
                    <tr>
                        <td colSpan="5" className="text-red-500 text-center">
                            No record in the database!!!
                        </td>
                    </tr>
                )
            }
        </tbody>
    )
}
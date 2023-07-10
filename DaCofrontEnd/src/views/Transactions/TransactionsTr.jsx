import TransactionsCell from './TransactionsCell'

export default function TransactionsTr({ searchResults }) {
    const results = searchResults.map(transaction => <TransactionsCell key={transaction.id} transaction={transaction} />)
    // const results = searchResults.map(transaction => (
    //     console.log(transaction)
    // ))
    // console.log(searchResults)
    const content = results?.length ? results : /*<article><p>No Matching record Transaction</p></articl

    */
        (
            <tr>
                <td colSpan="5" className="text-red-500 text-center">
                    No record in the database!!!
                </td>
            </tr>
        )
    return (
        <tbody>
            {content}
        </tbody>
    )
}
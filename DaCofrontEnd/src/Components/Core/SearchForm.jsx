import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function SearchForm({ transactions, setSearchResults }) {
    const [searchs, setSearchs] = useState("")
    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (!searchs) return setSearchResults(transactions)
        const searchArray = transactions.filter(transaction =>
            transaction.txnDate.includes(searchs) ||
            transaction.Folio.includes(searchs) ||
            transaction.Amount.includes(searchs)
            // console.log(transaction)
        )
        setSearchResults(searchArray)
        // console.log(searchs)
    }
    return (
        <form
            className="flex mx-auto max-w-3xl rounded-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onSubmit={handleSubmit}
        >
            <input
                id='search'
                name='search'
                type='text'
                className='border-t border-l border-b rounded-l-full border-slate-700 w-full pl-4'
                value={searchs}
                onChange={(ev) => setSearchs(ev.target.value)}
            />
            <button>
                <MagnifyingGlassIcon className='text-slate-600h-5 w-6 h-6 font-extrabold' />
            </button>
        </form>
    )
}

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
export default function PageComponent({ heading, buttonz = '', handleSearch = () => { }, searchs = '', setSearchs = '', children }) {
    return (
        <>
            <header className="bg-white shadow">
                {/* <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"> */}
                <div className="flex justify-between items-center mx-auto px-4 py-3 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight capitalize text-green-700">{heading}</h1>
                    <div className='flex space-x-1'>
                        <form
                            className="flex mx-auto max-w-xl rounded-full border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onSubmit={handleSearch}
                        >
                            <input
                                id='search'
                                name='search'
                                type='text'
                                className='border-t border-l border-b rounded-l-full border-slate-200 w-full pl-4'
                                value={searchs}
                                onChange={(ev) => setSearchs(ev.target.value)}
                            />
                            <button className='text-2xl font-extrabold tracking-tight text-slate-700 stroke mr-2'>
                                <MagnifyingGlassIcon
                                    // className='text-slate-600 w-6 h-6 font-bold text-2xl' 
                                    className='w-5 h-5' />
                            </button>
                        </form>
                        {buttonz}
                    </div>

                </div>
            </header>
            <main>
                <div className="mx-auto py-6 sm:px-3 lg:px-4">
                    {children}
                </div>
            </main >
        </>
    )
}
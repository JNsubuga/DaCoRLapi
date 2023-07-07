export default function PageComponent({ heading, buttonz = '', children }) {
    return (
        <>
            <header className="bg-white shadow">
                {/* <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"> */}
                <div className="flex justify-between items-center mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold tracking-tight capitalize text-green-700">{heading}</h1>
                    {buttonz}
                </div>
            </header>
            <main>
                {/* <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"> */}
                {/* <div className="flex">
                    <div className="w-1/5 bg-slate-900 max-h-full text-slate-400">
                        Side Bar
                    </div> */}
                <div className="mx-auto py-6 sm:px-3 lg:px-4">
                    {/* <div className="w-4/5 py-6 sm:px-3 lg:px-4"> */}
                    {children}
                </div>
                {/* </div> */}

            </main >
        </>
    )
}
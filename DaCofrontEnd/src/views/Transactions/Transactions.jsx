import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../../Components/Core/PageComponent";
import TButton from "../../Components/Core/TButton";

export default function Transactions() {
    return (
        <PageComponent
            heading="Transactions"
            buttonz={
                <TButton color="green" to="/transactions/create">
                    <PlusCircleIcon className="h-6 w-6 mr-1" />
                    Register User
                </TButton>}
        >
            <div>Transactions</div>
        </PageComponent>

    )
}

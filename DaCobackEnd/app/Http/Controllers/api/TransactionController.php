<?php

namespace App\Http\Controllers\api;

use App\Models\Member;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TransactionResource::collection(
            Transaction::query()->orderBy('created_at', 'desc')->paginate(50)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $data = $request->validated();
        dd($data);
        switch ($data->event_id) {
            case 1:
                $selectedMember = Member::where('id', $data['member_id'])->first();

                $Dr = $data['amount'];
                $Cr = 0;
                $balanceBefore = $selectedMember['currentBalance'];
                $balanceAfter = $selectedMember['currentBalance'] + $data['amount'];

                $memberAccountIds = [$selectedMember['id'], $data['account_id']];
                // dd($memberAccountIds[0] . '-' . $memberAccountIds[1]);
                DB::table('member_account')->insert([
                    'member_id' => $memberAccountIds[0],
                    'account_id' => $memberAccountIds[1]
                ]);

                $transaction = Transaction::create([
                    'txnDate' => $data['txnDate'],
                    'account_id' => $data['account_id'],
                    'event_id' => $data['event_id'],
                    'member_id' => $data['member_id'],
                    'Dr' => $Dr,
                    'Cr' => $Cr,
                    'balanceBefore' => $balanceBefore
                ]);

                Member::where('id', $selectedMember['id'])->update([
                    'Names' => $selectedMember['Names'],
                    'Code' => $selectedMember['Code'],
                    'Contacts' => $selectedMember['Contacts'],
                    'currentBalance' => $balanceAfter
                ]);
                return response(new TransactionResource($transaction), 201);
                // return redirect(route('transaction.index'))->with('success', 'Transaction Recorded Successfully!!');
                break;
            case 2:
                $Dr = 0;
                $Cr = $request->amount;
                break;

            default:
                return back()->with('error', 'Event Not Selected!!!');

                // $data = $request->validated();
                // $account = Transaction::create($data);
                // return response(new TransactionResource($account), 201);
        }
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return re
     */
    // public function show(Transaction $transaction)
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}

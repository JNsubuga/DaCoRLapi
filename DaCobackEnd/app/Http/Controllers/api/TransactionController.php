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
            Transaction::query()->orderBy('txnDate', 'desc')->paginate(50)
        );
    }

    /**
     * Store a newly created resource in storage.
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTransactionRequest $request)
    {
        $data = $request->validated();
        // return response($data['event_id']);
        // return response(new TransactionResource($data['event_id']));
        switch ($data['event_id']) {
            case 1:
                $selectedMember = Member::where('id', $data['member_id'])->first();

                $Dr = $data['amount'];
                $Cr = 0;
                $balanceBefore = $selectedMember['currentBalance'];
                $balanceAfter = $selectedMember['currentBalance'] + $data['amount'];

                $memberAccountIds = [$selectedMember['id'], $data['account_id']];
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
                break;
            case 2:
                $Dr = 0;
                $Cr = $request->amount;
                break;

            default:
                return back()->with('error', 'Event Not Selected!!!');
        }
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    // public function show(Transaction $transaction)
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    // public function update(UpdateTransactionRequest $request, Transaction $transaction)
    public function update(UpdateTransactionRequest $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}

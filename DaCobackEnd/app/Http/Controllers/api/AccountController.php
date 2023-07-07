<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountDetailsResource;
use App\Http\Resources\AccountResource;
use App\Models\Account;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return AccountResource::collection(
            Account::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        $data = $request->validated();
        $account = Account::create($data);
        return response(new AccountResource($account), 201);
    }

    /**
     * Display the specified resource.
     * @param int $id
     */
    // public function show(Account $account)
    public function show($id)
    {
        $account = Account::where('id', $id)->first();
        return new AccountResource($account);
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function accountMembers($id)
    {
        $accountDetails = Account::where('accounts.id', $id)
            ->leftJoin('transactions', 'accounts.id', '=', 'transactions.account_id')
            ->join('members', 'members.id', '=', 'transactions.member_id')
            ->selectRaw('accounts.id as accountId, accounts.Name as accountName, accounts.year as accountOpeningYear, accounts.Code as accountCode, accounts.AnualPrinciple as accountAnualPrinciple, members.id as memberId, members.Names as member, members.Code as memberCode, SUM(transactions.Dr) as totalAmountPaid')
            ->groupBy(['accountId', 'accountName', 'memberId'])
            ->orderBy('memberId', 'ASC')
            ->get();

        return AccountDetailsResource::collection($accountDetails);
    }

    /**
     * Update the specified resource in storage.
     * @param int $id
     */
    // public function update(UpdateAccountRequest $request, Account $account)
    public function update(UpdateAccountRequest $request, $id)
    {

        $data = $request->validated();
        $account = Account::where('id', $id)->update($data);

        return new AccountResource($account);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     */
    // public function destroy(Account $account)
    public function destroy($id)
    {
        // $account->delete();
        Account::destroy($id);
        return response("Account was Deleted successfully!!", 204);
    }
}

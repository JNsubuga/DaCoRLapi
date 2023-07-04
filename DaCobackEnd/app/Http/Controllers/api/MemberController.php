<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Http\Resources\MemberAccountDetailsResource;
use App\Http\Resources\MemberAccountsResource;
use App\Http\Resources\MemberResource;
use App\Http\Resources\MemberTransactionDetailsResource;
use App\Models\Member;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MemberResource::collection(
            Member::query()->orderBy('Code', 'asc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $data = $request->validated();
        // $data['password'] = bcrypt($data['password']);
        $member = Member::create($data);
        $member['currentBalance'] = 0;
        return response(new MemberResource($member), 201);
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @param \App\Models\Member $member
     * @return \Illuminate\Http\Response
     * 
     */
    // public function show(Member $member)
    public function show($id)
    {
        $member = Member::where('id', $id)->first();
        return new MemberResource($member);
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @return \Illuminate\Http\Response
     * 
     */
    // public function memberTransactionDetails(Member $member)
    public function memberTransactionDetails($id)
    {
        $memberTransactionDetails = Member::where('members.id', $id)
            ->leftJoin('transactions', 'members.id', '=', 'transactions.member_id')
            ->join('accounts', 'accounts.id', '=', 'transactions.account_id')
            ->selectRaw('accounts.Name as accountName, accounts.year as accountOpeningYear, accounts.Code as accountCode, accounts.AnualPrinciple as accountAnualPrinciple, members.id as memberId, members.Names as member, members.Code as memberCode,  transactions.txnDate as txnDate, transactions.id as txnId, transactions.Dr as Dr, transactions.Cr as Cr')
            ->orderBy('txnDate', 'ASC')
            ->get();
        return MemberTransactionDetailsResource::collection($memberTransactionDetails);
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function memberAccounts($id)
    {
        $memberAccounts = Member::where('members.id', $id)
            ->leftJoin('transactions', 'members.id', '=', 'transactions.member_id')
            ->join('accounts', 'accounts.id', '=', 'transactions.account_id')
            ->selectRaw('accounts.id as accountId, accounts.Name as accountName, accounts.year as accountOpeningYear, accounts.Code as accountCode, accounts.AnualPrinciple as accountAnualPrinciple, members.id as memberId, members.Names as member, members.Code as memberCode, SUM(transactions.Dr) as totalAmountPaid')
            ->groupBy(['accountId', 'accountName', 'memberId'])
            ->orderBy('accountId', 'ASC')
            ->get();
        return MemberAccountsResource::collection($memberAccounts);
    }

    /**
     * 
     * @param int $account_id
     * @param int $member_id
     * @return \Illuminate\Http\Response
     */
    public function memberAccountDetails($member_id, $account_id)
    {
        $memberAccountDetails = Member::where([
            ['members.id', $member_id],
            ['accounts.id', $account_id]
        ])
            ->leftJoin('transactions', 'members.id', '=', 'transactions.member_id')
            ->join('accounts', 'accounts.id', '=', 'transactions.account_id')
            ->selectRaw('transactions.id as txnId, transactions.txnDate as txnDate, accounts.id as accountId, accounts.Name as accountName, accounts.year as accountOpeningYear, accounts.Code as accountCode, accounts.AnualPrinciple as accountAnualPrinciple, members.id as memberId, members.Names as member, members.Code as memberCode, transactions.Dr as Dr, transactions.Cr as Cr')
            ->orderBy('txnDate', 'ASC')
            ->get();
        return MemberAccountDetailsResource::collection($memberAccountDetails);
    }

    /**
     * Update the specified resource in storage.
     * @param \App\Http\Requests\UpdateMemberRequest $request
     * @param \App\Models\Member $member
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function update(UpdateMemberRequest $request, Member $member)
    public function update(UpdateMemberRequest $request, $id)
    {
        $data = $request->validated();
        return response(new MemberResource(Member::where('id', $id)->update($data)), 202);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     */
    // public function destroy(Member $member)
    public function destroy($id)
    {
        Member::destroy($id);
        return response("", 204);
    }
}

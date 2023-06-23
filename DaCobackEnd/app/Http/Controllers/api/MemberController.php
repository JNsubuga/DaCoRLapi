<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Http\Resources\MemberResource;
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
     * 
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

    public function memberAccounts($id)
    {
        $memberAccounts = Member::where('members.id', $id)
            ->leftJoin('transactions', 'members.id', '=', 'transactions.member_id')
            ->join('accounts', 'accounts.id', '=', 'transactions.account_id')
            ->selectRaw('accounts.id as account_id, accounts.Name, accounts.year, accounts.Code, accounts.AnualPrinciple, members.id as member_id, members.Names as member, members.Code as member_Code, SUM(transactions.Dr) as totalAmountPaid')
            ->groupBy(['account_id', 'accounts.Name', 'members.id'])
            ->orderBy('account_id', 'ASC')
            ->get();
        return new MemberResource($memberAccounts);
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
        // if (isset($data['password'])) {
        //     $data['password'] = bcrypt($data['password']);
        // }

        // $member->update($data);

        // return new MemberResource($member);
        return response(new MemberResource(Member::where('id', $id)->update($data)), 202);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        //
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberAccountsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'accountId' => $this->account_id,
            'accountsName' => $this->accounts->Name,
            'accountOpeningYear' => $this->accounts->year,
            'accountCode' => $this->accounts->Code,
            'accountAnualPrinciple' => $this->accounts->AnualPrinciple,
            'memberId' => $this->member_id,
            'member' => $this->member,
            'memberCode' => $this->member_Code,
            'totalAmountPaid' => $this->totalAmountPaid


            // 'member' => $this->member,
            // 'AnualPrinciple' => $this->AnualPrinciple,
            // 'totalAmountPaid' => $this->totalAmountPaid,
            // 'Name' => $this->Name,
            // 'accountOpeningYear' => $this->year,
            // 'memberCode' => $this->member_Code,
            // 'accountCode' => $this->Code
        ];
    }
}

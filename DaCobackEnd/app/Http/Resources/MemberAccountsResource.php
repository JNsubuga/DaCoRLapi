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
            // 'accountId' => $this->accountId,
            // 'accountName' => $this->accountName,
            // 'accountOpeningYear' => $this->accountOpeningYear,
            // 'accountCode' => $this->accountCode,
            // 'accountAnualPrinciple' => $this->accountAnualPrinciple,
            // 'memberId' => $this->memberId,
            // 'member' => $this->member,
            // 'memberCode' => $this->memberCode,
            // 'totalAmountPaid' => $this->totalAmountPaid


            'member' => $this->member,
            'memberId' => $this->memberId,
            'accountId' => $this->accountId,
            'accountName' => $this->accountName,
            'Folio' => 'F' . $this->accountOpeningYear . '-' . $this->memberCode . '-' . $this->accountCode,
            'accountAnualPrinciple' => $this->accountAnualPrinciple,
            'totalAmountPaid' => $this->totalAmountPaid,
            'accountBalance' => $this->accountAnualPrinciple - $this->totalAmountPaid
            // 'AnualPrinciple' => $this->AnualPrinciple,
            // 'totalAmountPaid' => $this->totalAmountPaid,
            // 'Name' => $this->Name,
            // 'accountOpeningYear' => $this->year,
            // 'memberCode' => $this->member_Code,
            // 'accountCode' => $this->Code
        ];
    }
}

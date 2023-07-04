<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberAccountDetailsResource extends JsonResource
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
            'txnId' => $this->txnId,
            'txnDate' => $this->txnDate,
            'accountId' => $this->accountId,
            'accountName' => $this->accountName,
            'accountOpeningYear' => $this->accountOpeningYear,
            'accountCode' => $this->accountCode,
            'accountAnualPrinciple' => $this->accountAnualPrinciple,
            'memberId' => $this->memberId,
            'member' => $this->member,
            'memberCode' => $this->memberCode,
            'Dr' => $this->Dr,
            'Cr' => $this->Cr
        ];
    }
}

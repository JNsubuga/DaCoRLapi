<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
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
            // 'id' => $this->id,
            // 'txnDate' => $this->txnDate,
            // 'accountOpeningYear' => $this->account->year,
            // 'accountCode' => $this->account->Code,
            // 'event_id' => $this->event_id,
            // 'memberCode' => $this->member->Code,
            // 'Dr' => $this->Dr,
            // 'Cr' => $this->Cr,
            // 'balanceBefore' => $this->balanceBefore

            'id' => $this->id,
            'txnDate' => $this->txnDate,
            'Folio' => $this->account->year . '-' . $this->member->Code . '-' . $this->account->Code,
            'event' => $this->event_id,
            'Amount' => $this->Dr,
            // 'Cr' => $this->Cr,
            // 'balanceBefore' => $this->balanceBefore
        ];
    }
}

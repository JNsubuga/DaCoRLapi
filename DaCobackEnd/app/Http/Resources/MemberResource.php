<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MemberResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'Names' => $this->Names,
            'Code' => $this->Code,
            'Contacts' => $this->Contacts,
            'currentBalance' => $this->currentBalance,
            'created_at' => $this->created_at

            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            // 'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}

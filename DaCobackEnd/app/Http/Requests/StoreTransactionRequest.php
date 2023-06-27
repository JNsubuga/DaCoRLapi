<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'txnDate' => 'required|date',
            'event_id' => 'required|numeric',
            'member_id' => 'required|numeric',
            'account_id' => 'required|numeric',
            'amount' => 'required|numeric'
        ];
    }
}

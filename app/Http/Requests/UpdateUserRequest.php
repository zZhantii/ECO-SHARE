<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            '0.name' => 'required|string|max:255',
            '0.email' => 'required|email',
            '0.surname1' => 'nullable|string|max:255',
            '0.surname2' => 'nullable|string|max:255',
            '0.alias' => 'nullable|string|max:255',
            'role_id' => 'nullable|exists:roles,id',
        ];
    }
}

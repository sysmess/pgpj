<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttachmentRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'folder' => 'required|string|max:255',
            'description' => 'string|max:1000',
            'attachment' => 'required|max:1024|mimes:pdf,png,jpeg,gif,doc,docx,xls,xlsx,csv,rtf,txt,zip,rar,7z'
        ];
    }
}

?>

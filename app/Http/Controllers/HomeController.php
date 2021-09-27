<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Attachment;
use App\Http\Requests\StoreAttachmentRequest;

class HomeController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function store(StoreAttachmentRequest $request)
    {
        $attachment = new Attachment;
        $attachment->folder = $request->folder;
        $attachment->description = $request->description;
        $attachment->path = $attachment->upload($request->attachment, 'public', 'uploads/' . $request->folder, $request->description);
        $attachment->save();

        if($attachment->path) return response()->json([
            'url' => $attachment->path,
            'message' => 'Attachment has been successfully uploaded',
        ]);
        else return response()->json([
            'message' => 'Error' ,
        ]);
    }
}

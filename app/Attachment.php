<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Eloquent\Uploadable;

class Attachment extends Model
{
    use Uploadable;

    protected $fillable = ['folder', 'path' , 'description'];
}

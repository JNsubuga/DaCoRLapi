<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasFactory;

    protected $fillable = ['year', 'Name', 'Code', 'AnualPrinciple'];

    public function members()
    {
        return $this->belongsToMany(Member::class, 'member_account');
    }

    // public function transactions()
    // {
    //     return $this->hasMany(Transaction::class);
    // }
}

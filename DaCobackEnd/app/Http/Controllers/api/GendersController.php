<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGenderRequest;
use App\Http\Requests\UpdateGenderRequest;
use App\Models\Gender;

class GendersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGenderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Gender $gender)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGenderRequest $request, Gender $gender)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gender $gender)
    {
        //
    }
}

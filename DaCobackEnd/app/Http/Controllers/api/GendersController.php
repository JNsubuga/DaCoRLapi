<?php

namespace App\Http\Controllers\api;

use App\Models\Gender;
use App\Http\Controllers\Controller;
use App\Http\Resources\GenderResource;
use App\Http\Requests\StoreGenderRequest;
use App\Http\Requests\UpdateGenderRequest;

class GendersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return GenderResource::collection(
            Gender::query()->orderBy('Gender', 'asc')
        );
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

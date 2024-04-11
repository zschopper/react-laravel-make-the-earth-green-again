<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Entry::with('activity')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $entry = new Entry();
        $entry->fill($request->all());
        $entry->status = "unapproved";
        $entry->save();
        return $entry;
    }

    /**
     * Display the specified resource.
     */
    public function showClass($class)
    {
        return Entry::with('activity')->where('class', $class)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entry $entry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entry $entry)
    {
        //
    }

        /**
     * Store a newly created resource in storage.
     */
    public function approve(Request $request)
    {
        $entry = Entry::findOrFail($request->entry_id);
        $entry->status = "approved";
        $entry->save();
        return $entry;
    }


}

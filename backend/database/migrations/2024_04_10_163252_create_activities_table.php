<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('points');
            $table->timestamps();
        });

        $activities = [
            ['name' => 'I came to school by bike', 'points' => rand(1, 5)],
            ['name' => 'I came to school by scooter', 'points' => rand(1, 5)],
            ['name' => 'I walked 10 km instead of taking the bus', 'points' => rand(1, 5)],
            ['name' => 'I planted a tree', 'points' => rand(1, 5)],
            ['name' => 'I planted a flower', 'points' => rand(1, 5)],
            ['name' => 'I planted another type of plant', 'points' => rand(1, 5)],
            ['name' => 'I used less water for bathing', 'points' => rand(1, 5)],
            ['name' => 'I picked up trash in a public area, forest, etc.', 'points' => rand(1, 5)],
            ['name' => 'I shopped with a reusable bag, not a plastic one', 'points' => rand(1, 5)],
            ['name' => 'I did not use disposable plastic', 'points' => rand(1, 5)],
            ['name' => 'I bought products in sustainable packaging – e.g., bought milk in glass, not in a PET bottle', 'points' => rand(1, 5)],
            ['name' => 'I bought products in environmentally friendly packaging', 'points' => rand(1, 5)],
            ['name' => 'I ate less meat this week', 'points' => rand(1, 5)],
            ['name' => 'I bought food from an ecological farm', 'points' => rand(1, 5)],
            ['name' => 'I spent time outdoors, went hiking this week', 'points' => rand(1, 5)],
            ['name' => 'I bought fewer clothes/products this week to be more sustainable!', 'points' => rand(1, 5)],
            ['name' => 'I volunteered at Greenpeace or another environmental organization', 'points' => rand(1, 5)],

            // ['name' => 'kerékpárral jöttem iskolába', 'points' => rand(1, 5)],
            // ['name' => 'rollerrel jöttem iskolába', 'points' => rand(1, 5)],
            // ['name' => '10 km-t gyalogoltam buszozás helyett', 'points' => rand(1, 5)],
            // ['name' => 'ültettem fát', 'points' => rand(1, 5)],
            // ['name' => 'ültettem virágot', 'points' => rand(1, 5)],
            // ['name' => 'ültettem egyéb növényt', 'points' => rand(1, 5)],
            // ['name' => 'kevesebb vizet használtam a fürdéshez', 'points' => rand(1, 5)],
            // ['name' => 'összeszedtem a szemetet egy közterületen, erdőben, stb', 'points' => rand(1, 5)],
            // ['name' => 'tartós szatyorba vásároltam, nem nylonba', 'points' => rand(1, 5)],
            // ['name' => 'nem használtam egyszer használatos műanyagot', 'points' => rand(1, 5)],
            // ['name' => 'tartós csomagolású terméket vásároltam – pl üvegbe vettem a tejet, nem használtam pet palackot,', 'points' => rand(1, 5)],
            // ['name' => 'környezetbarát csomagolású terméket vásároltam', 'points' => rand(1, 5)],
            // ['name' => 'kevesebb húst ettem a héten', 'points' => rand(1, 5)],
            // ['name' => 'ökológiai gazdaságból származó élelmiszert vettem', 'points' => rand(1, 5)],
            // ['name' => 'kirándultam, szabadban töltöttem időt a héten', 'points' => rand(1, 5)],
            // ['name' => 'kevesebb ruhát/terméket vásároltam a héten, hogy fenntarthatóbb legyen a környeztünk!', 'points' => rand(1, 5)],
            // ['name' => 'önkénteskedtem a Greenpeace-nél, vagy más zöld szervezetnél', 'points' => rand(1, 5)],
        ];
        foreach ($activities as $activity) {
            (new \App\Models\Activity($activity))->save();
        };
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};

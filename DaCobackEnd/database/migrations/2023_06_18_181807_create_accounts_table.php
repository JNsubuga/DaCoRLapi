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
        Schema::create('accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->year('year');
            $table->string('Name');
            $table->string('Code');
            $table->double('AnualPrinciple', 12, 2);
            $table->timestamps();

            // $table->id();
            // $table->timestamps();

            // $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};

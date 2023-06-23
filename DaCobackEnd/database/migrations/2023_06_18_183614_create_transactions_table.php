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
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            // $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->date('txnDate');
            $table->foreignId('event_id')->constrained('events')->onDelete('cascade');
            $table->foreignId('member_id')->constrained('members')->onDelete('cascade');
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->boolean('confirmed')->default(0);
            $table->double('Dr', 12, 2);
            $table->double('Cr', 12, 2);
            $table->double('balanceBefore', 12, 2);
            // $table->double('balanceAfter');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};

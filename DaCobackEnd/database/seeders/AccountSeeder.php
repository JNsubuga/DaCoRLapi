<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = [
            [
                'year' => 2023,
                'Name' => 'Membership Account',
                'Code' => 'MS',
                'AnualPrinciple' => 180000
            ],
            [
                'year' => 2023,
                'Name' => 'Welfare Account',
                'Code' => 'WS',
                'AnualPrinciple' => 200000
            ],
            [
                'year' => 2023,
                'Name' => 'Party Account',
                'Code' => 'PS',
                'AnualPrinciple' => 60000
            ]
        ];

        foreach ($accounts as $account) {
            Account::create($account);
        }
    }
}

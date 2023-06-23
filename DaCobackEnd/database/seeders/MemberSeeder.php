<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = [
            [
                'Names' => 'John Mary Mulindwa',
                'Code' => 'M01',
                'Contacts' => '+256776645001',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Joseph Nsubuga',
                'Code' => 'M02',
                'Contacts' => '+256782020069',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Robina Kabagenyi',
                'Code' => 'M03',
                'Contacts' => '+256704399256',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Denis Lubega',
                'Code' => 'M04',
                'Contacts' => '+256784602194',
                'currentBalance' => 0
            ],
            [
                'Names' => 'James Mukwaya',
                'Code' => 'M05',
                'Contacts' => '+256782822016',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Fred Kyobe',
                'Code' => 'M06',
                'Contacts' => '+256782700143',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Juliet Kulabako Nakayondo',
                'Code' => 'M07',
                'Contacts' => '+256702451352',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Claire Nakubulwa Namanda',
                'Code' => 'M08',
                'Contacts' => '+256787253881',
                'currentBalance' => 0
            ],
            [
                'Names' => 'Deogratius Mutyaba',
                'Code' => 'M09',
                'Contacts' => '+256783433261',
                'currentBalance' => 0
            ],
            [
                'Names' => 'John Baptist Ssenkajako',
                'Code' => 'M10',
                'Contacts' => '+256773427207',
                'currentBalance' => 0
            ],
        ];

        foreach ($members as $member) {
            Member::create($member);
        }
    }
}

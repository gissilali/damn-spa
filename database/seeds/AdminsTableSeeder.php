<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->delete();
        DB::table('admins')->insert([
        	'name' => 'Gibson Silali',
        	'email' => 'gibsonsilali@mail.com',
        	'password' => bcrypt('catafalque')
        	]);
    }
}

<?php

namespace App\Http\Controllers\Blood;
use App\BloodGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BloodGroupController extends Controller
{
    public function getBloodGroups() {
    	$bloodgroups = BloodGroup::all();
    	return json_encode($bloodgroups);
    }
}

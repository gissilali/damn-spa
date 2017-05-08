<?php

namespace App\Http\Controllers\Donor;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Donor;

class DonorController extends Controller
{
    public function registerDonor(Request $request){
    	$validator = Validator::make($request->all(), [
    			'name' => 'required|string',
    			'email' => 'required|email',
    			'blood_group_id' => 'required|integer'
    		]);
    	if($validator->fails()){
    		return response($validator);
    	} else{
    		$existing_donor = Donor::where('email', $request['email'])->get();
    		if(count($existing_donor)>0) {
    			return response('donor exists',422);
    		} else{
    			Donor::create([
    				'name' => $request['name'],
    				'email' => $request['email'],
    				'blood_group_id' => $request['blood_group_id'],
    				]);
    			return response('donor has been registered',200);
    		}

    	}
    }
}

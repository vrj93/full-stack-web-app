<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function createUser(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'roles' => 'required',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email
            ]);

            $roles = $request->roles;

            foreach ($roles as $role) {
                $userRole = new UserRole();
                $userRole->user_id = $user->id;
                $userRole->role_id = $role;
                $userRole->save();
            }

            return response(['msg' => 'User created successfully', 'flag' => true], 201);
        } catch (Exception $ex) {
            return response(['msg' => $ex->getMessage(), 'flag' => false]);
        }
    }

    public function getUser(Request $request)
    {
        $role = $request->role;

        if ($role) {
            $usersWithRole = User::whereHas('roles', function ($query) use ($role) {
                $query->where('role_id', $role);
            })->get();
        } else {
            $usersWithRole = User::all();
        }

        return $usersWithRole;
    }
}

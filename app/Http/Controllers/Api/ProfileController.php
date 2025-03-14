<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * @throws ValidationException
     */
    public function update(UpdateProfileRequest $request)
    {
        $profile = Auth::user();
        $profile->name = $request->name;
        $profile->surname1 = $request->surname1;
        $profile->surname2 = $request->surname2;
        $profile->email = $request->email;


        if (!empty($request->password)) {
            $profile->password = Hash::make($request->password) ?? $profile->password;
        }

        if ($profile->save()) {
            return $this->successResponse($profile, 'User updated');
            ;
        }
        return response()->json(['status' => 403, 'success' => false]);
    }

    public function user(Request $request)
    {
        $user = $request->user()->load('roles');
        $avatar = '';
        if (count($user->media) > 0) {
            $avatar = $user->media[0]->original_url;
        }
        $user->avatar = $avatar;


        return $this->successResponse($user, 'User found');
    }

    public function uploadAvatar(Request $request)
    {
        $user = Auth::user();

        if ($request->hasFile("avatar")) {

            $user->media()->delete();
            $media = $user->addMediaFromRequest("avatar")->preservingOriginal()->toMediaCollection("images/users");
        }
        $user = User::with("media")->find($user->id);




        return response()->json(["success" => true, "data" => $user], 200);
    }
    public function unlinkAvatar()
    {
        $user = Auth::user();

        $media = $user->getFirstMedia('images/users');

        if ($media) {
            $media->delete();

        }

        return response()->json(["success" => true, "message" => "Avatar eliminado"], 200);
    }


}

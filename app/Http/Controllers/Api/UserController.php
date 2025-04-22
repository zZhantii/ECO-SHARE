<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $orderColumn = request('order_column', 'created_at');
        if (!in_array($orderColumn, ['id', 'name', 'created_at'])) {
            $orderColumn = 'created_at';
        }
        $orderDirection = request('order_direction', 'desc');
        if (!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }
        $users = User::
            when(request('search_id'), function ($query) {
                $query->where('id', request('search_id'));
            })
            ->when(request('search_title'), function ($query) {
                $query->where('name', 'like', '%' . request('search_title') . '%');
            })
            ->when(request('search_global'), function ($query) {
                $query->where(function ($q) {
                    $q->where('id', request('search_global'))
                        ->orWhere('name', 'like', '%' . request('search_global') . '%');

                });
            })
            ->orderBy($orderColumn, $orderDirection)
            ->paginate(50);

        return UserResource::collection($users);
    }

    public function index2() {
        $users = User::All();
        return response()->json(["success" => true, "data" => $users], 200);
    }

    public function store(StoreUserRequest $request)
    {
        $role = Role::find($request->role_id);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->surname1 = $request->surname1;
        $user->surname2 = $request->surname2;
        $user->alias = $request->alias;

        $user->password = Hash::make($request->password);

        if ($user->save()) {
            if ($role) {
                $user->assignRole($role);
            }
            return new UserResource($user);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return UserResource
     */
    // public function show(User $user)
    // {
    //     $user->load('roles')->get();
    //     return new UserResource($user);
    // }
    public function show(User $user)
    {
        $user = User::with(['media', 'roles'])->find($user);
        return response()->json(["success" => true, "data" => $user], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return UserResource
     */
        public function update(UpdateUserRequest $request, User $user)
    {        
        $userData = $request->all()[0];
        
        $user->name = $userData['name'];
        $user->email = $userData['email'];
        $user->surname1 = $userData['surname1'];
        $user->surname2 = $userData['surname2'];
        $user->alias = $userData['alias'];
    
        if ($user->save()) {
            if (isset($userData['roles']) && !empty($userData['roles'])) {
                $roleId = $userData['roles'][0]['id'];
                $role = Role::find($roleId);
            if ($role) {
                $user->syncRoles($role);
            }
        }
            
            $user->load('media', 'roles');
            
            return response()->json([
                "success" => true, 
                "data" => $user,
                "message" => "Usuario actualizado correctamente"
            ], 200);
        }
    
        return response()->json([
            "success" => false,
            "message" => "Error al actualizar el usuario"
        ], 500);
    }


    public function updateimg(Request $request)
    {

        $user = User::find($request->id);

        if ($request->hasFile('picture')) {
            $user->media()->delete();
            $media = $user->addMediaFromRequest('picture')->preservingOriginal()->toMediaCollection('images-users');

        }
        $user = User::with('media')->find($request->id);
        return $user;
    }

    public function destroy(User $user)
    {
        $this->authorize('user-delete');
        $user->delete();

        return response()->noContent();
    }
}

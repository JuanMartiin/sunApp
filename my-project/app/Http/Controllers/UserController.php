<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    
    // public function create(Request $request)
    // {
    //     // return User::create([
    //     //     'name' => $request.name.data,
    //     //     'email' => $request.email.data,
    //     //     'password' => $request.password.data,
    //     // ]);
        
    //      try{
    //         $usuario = new User($request->all());
    //         $usuario->save();
    //         return response()->json([
    //             'name' => $request.name.data,
    //             'email' => $request.email.data,
    //             'password' => $request.password.data,
    //             ]);
    //     }catch( \Exception $e){
    //         return back()->withInput()->withErrors();
    //         ['default' => 'Error, escriba correctamente'];
    //     }
    // }
    
    public function register(Request $request)
        {

            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('user','token'),201);
        }
    
    
    // public function login(Request $request)
    // {
        
    //     $result = \DB::select('select id from users where email = :email AND password = :password' ,  ['email' => $request->email, 'password' => $request->password]);
        
    //     if(!$result==[]){
    //         $id = $result[0]->id;
    //         $request->session()->put('id', $id);
    //         return response()->json([
    //                                 'message' => 'login succesfull',
    //                             ]);
    //     }else{
    //         return response()->json([
    //                                 'message' => 'email or password incorrect',
    //                             ]);
    //     }
        
    // }
    
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }
    
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['user_not_found'], 404);
            }
            } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                    return response()->json(['token_expired'], $e->getStatusCode());
            } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                    return response()->json(['token_invalid'], $e->getStatusCode());
            } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                    return response()->json(['token_absent'], $e->getStatusCode());
            }
            return response()->json(compact('user'));
    }
}

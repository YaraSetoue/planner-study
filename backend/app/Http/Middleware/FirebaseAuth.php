<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Kreait\Firebase\Auth as FirebaseAuthService;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class FirebaseAuth
{
    protected $firebaseAuth;

    public function __construct(FirebaseAuthService $firebaseAuth)
    {
        $this->firebaseAuth = $firebaseAuth;
    }

    public function handle(Request $request, Closure $next)
    {
        $idToken = $request->bearerToken();

        if (!$idToken) {
            return response()->json(['error' => 'Token não fornecido'], Response::HTTP_UNAUTHORIZED);
        }

        try {
            $verifiedIdToken = $this->firebaseAuth->verifyIdToken($idToken);
            $firebaseUid = $verifiedIdToken->claims()->get('sub');

            // Busca ou cria usuário localmente
            $firebaseUser = $this->firebaseAuth->getUser($firebaseUid);
            $user = User::firstOrCreate(
                ['firebase_uid' => $firebaseUid],
                [
                    'name' => $firebaseUser->displayName ?? 'Usuário',
                    'email' => $firebaseUser->email ?? '',
                    'avatar' => $firebaseUser->photoUrl ?? null,
                ]
            );

            // Autentica o usuário no Laravel
            auth()->login($user);

        } catch (\Throwable $e) {
            return response()->json(['error' => 'Token inválido ou expirado'], Response::HTTP_UNAUTHORIZED);
        }

        return $next($request);
    }
}
<?php

namespace app\Notifications;

use App;
use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;

class VerifyCorpEmail extends VerifyEmailBase
{
    protected function verificationUrl($user)
    {
        $prefix = config('frontend.url') .config('frontend.email_verify_url');
        $routeName = 'verification-corp.verify';
        $temporarySignedURL = URL::temporarySignedRoute(
            $routeName, Carbon::now()->addMinutes(60), ['id' => $user->getKey()]
        );

        return urldecode($prefix . urlencode($temporarySignedURL));
    }
}

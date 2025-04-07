<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\UserResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, InteractsWithMedia;

    protected $fillable = [
        'name',
        'alias',
        'email',
        'password',
        'surname1',
        'surname2',
        'rating'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new UserResetPasswordNotification($token));
    }

    public function assignaments()
    {
        return $this->hasMany(UserAssignment::class, 'user_id');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images/users')
            ->useFallbackUrl('/images/placeholder.jpg')
            ->useFallbackPath(public_path('/images/placeholder.jpg'));
    }

    public function registerMediaConversions(Media $media = null): void
    {
        if (env('RESIZE_IMAGE') === true) {

            $this->addMediaConversion('resized-image')
                ->width(env('IMAGE_WIDTH', 300))
                ->height(env('IMAGE_HEIGHT', 300));
        }
    }
    //Método para guardar las fotos/avatar del perfil de usuario




    // Relacion usuarios-vehiculos 1:N (1 Usuarios)
    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'user_id');
    }

    // Relacion users-trips 1:N (1 Usuarios)
    public function trips()
    {
        return $this->hasMany(Trip::class, 'user_id');
    }

    // Relacion user_trips_rates N:M (N Usuarios)
    public function rates()
    {
        return $this->belongsToMany(Trip::class, 'user_trips_rates', 'trip_id')
            ->withPivot('rating', 'comment');
    }

    // Relacion user_trips_reserves N:M (N Usuarios)
    public function reserves()
    {
        return $this->belongsToMany(Trip::class, 'user_trips_reserves', 'trip_id', 'user_id')
            ->withPivot('seats_reserved', 'reservation_date', 'check_in');
    }
}

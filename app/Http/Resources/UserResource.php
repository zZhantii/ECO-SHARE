<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'   => $this->id,
            'alias' => $this->alias,
            'name' => $this->name,
            'surname1' => $this->surname1,
            'surname2' => $this->surname2,
            'email' => $this->email,
            'role_id' => $this->roles,
            'roles' => $this->roles,
            'avatar' => count($this->getMedia('*')) > 0 ? $this->getMedia('*')[0]->getUrl() : null,
            'created_at' => $this->created_at->toDateString()
        ];
    }
}

create table users (
    user_id bigint primary key generated always as identity,
    name text not null,
    alias text,
    surname1 text not null,
    surname2 text,
    email text unique not null,
    password text not null,
    profile_photo text,
);

create table vehicles (
    vehicle_id bigint primary key generated always as identity,
    user_id bigint not null,
    plate text not null,
    brand text not null,
    model text not null,
    consumption numeric(5, 2),
    pax_number int,
    foreign key (user_id) references users (user_id)
);

create table trips (
    trip_id bigint primary key generated always as identity,
    user_id bigint not null,
    vehicle_id bigint not null,
    start_point text not null,
    end_point text not null,
    departure_time timestamp with time zone not null,
    available_seats int not null,
    price numeric(10, 2) not null,
    foreign key (user_id) references users (user_id),
    foreign key (vehicle_id) references vehicles (vehicle_id)
);

create table rates (
    user_id bigint not null,
    trip_id bigint not null,
    rating int,
    comment text,
    primary key (user_id, trip_id),
    foreign key (user_id) references users (user_id),
    foreign key (trip_id) references trips (trip_id)
);

create table reserves (
    user_id bigint not null,
    trip_id bigint not null,
    seats_reserved int not null,
    reservation_date timestamp with time zone not null,
    check_in boolean default false,
    primary key (user_id, trip_id),
    foreign key (user_id) references "User" (user_id),
    foreign key (trip_id) references trips (trip_id)
);

create table tags (
    tag_id bigint primary key generated always as identity,
    tag_name text not null
);

create table trip_tags (
    trip_id bigint not null,
    tag_id bigint not null,
    primary key (trip_id, tag_id),
    foreign key (trip_id) references trips (trip_id),
    foreign key (tag_id) references tags (tag_id)
);
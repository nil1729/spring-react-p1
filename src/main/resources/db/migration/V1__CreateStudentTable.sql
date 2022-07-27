create table if not exists student (
    student_id uuid primary key not null,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(200) not null unique,
    gender varchar(6) not null
        check (
            gender = 'MALE' or
            gender = 'male' or
            gender = 'FEMALE' or
            gender = 'female'
        )
);
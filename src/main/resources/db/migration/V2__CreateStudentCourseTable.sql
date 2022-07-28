create table if not exists course (
    course_id uuid not null primary key unique,
    name varchar(255) not null unique,
    description text not null,
    teacher_name varchar(100),
    department varchar(255)
);

create table if not exists student_course (
    student_id uuid not null references student (student_id),
    course_id uuid not null references course (course_id),
    start_date date not null,
    end_date date not null,
    grade integer check (grade >= 0 and grade <= 100),
    unique (student_id, course_id)
);
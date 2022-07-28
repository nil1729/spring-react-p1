package xyz.nilanjan.spring.react.springreact.course;

import java.util.UUID;

public class Course {
    private final UUID courseId;
    private final String courseName;
    private final String description;
    private final String teacherName;
    private final String department;

    public Course(
            UUID courseId,
            String courseName,
            String description,
            String teacherName,
            String department
    ) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.description = description;
        this.teacherName = teacherName;
        this.department = department;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getDescription() {
        return description;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public String getDepartment() {
        return department;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", description='" + description + '\'' +
                ", teacherName='" + teacherName + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}

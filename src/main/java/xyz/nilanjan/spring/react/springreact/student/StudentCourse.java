package xyz.nilanjan.spring.react.springreact.student;

import java.time.LocalDate;
import java.util.UUID;

public class StudentCourse {
    private final UUID studentId;
    private final UUID courseId;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final Integer grade;
    private final String courseName;
    private final String description;
    private final String teacherName;
    private final String department;

    public StudentCourse(
            UUID studentId,
            UUID courseId,
            LocalDate startDate,
            LocalDate endDate,
            Integer grade,
            String courseName,
            String description,
            String teacherName,
            String department
    ) {
        this.studentId = studentId;
        this.courseId = courseId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.grade = grade;
        this.courseName = courseName;
        this.description = description;
        this.teacherName = teacherName;
        this.department = department;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getGrade() {
        return grade;
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
}

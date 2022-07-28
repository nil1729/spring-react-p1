package xyz.nilanjan.spring.react.springreact.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.nilanjan.spring.react.springreact.EmailValidator;
import xyz.nilanjan.spring.react.springreact.exception.ApiRequestException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class StudentService {
    private final StudentDataAccessService studentDataAccessService;

    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService) {
        this.studentDataAccessService = studentDataAccessService;
    }

    List<Student> getAllStudents() {
        return studentDataAccessService.selectAllStudents();
    }

    void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        // Validate Email Address
        if(!EmailValidator.validate(student.getEmail())) {
            throw new ApiRequestException("Email address is not valid");
        }

        // Check email address already exists
        if(studentDataAccessService.isEmailTaken(student.getEmail())) {
            throw new ApiRequestException(
                    String.format("[%s] this email address is already taken", student.getEmail())
            );
        }

        studentDataAccessService.insertStudent(newStudentId, student);
    }

    public List<StudentCourse> getStudentCourses(UUID studentId) {
        return studentDataAccessService.getStudentCourses(studentId);
    }
}

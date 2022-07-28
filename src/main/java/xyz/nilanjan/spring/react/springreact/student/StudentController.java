package xyz.nilanjan.spring.react.springreact.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/v1/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public ResponseEntity<Object> addNewStudent(@RequestBody @Valid Student student) {
        studentService.addNewStudent(student);
        URI uri = URI.create(
                ServletUriComponentsBuilder
                        .fromCurrentContextPath()
                        .path("/api/v1/students")
                        .toUriString()
        );

        Map<String, String> response = new HashMap<>();
        response.put("message", "Student registered successfully");
        return ResponseEntity.created(uri).body(response);
    }

    @GetMapping("{studentId}")
    public ResponseEntity<Object> getStudentCourses(@PathVariable("studentId")UUID studentId){
        List<StudentCourse> studentCourses = studentService.getStudentCourses(studentId);
        return ResponseEntity.ok().body(studentCourses);
    }
}

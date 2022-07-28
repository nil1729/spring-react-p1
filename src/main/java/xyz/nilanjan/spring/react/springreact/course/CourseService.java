package xyz.nilanjan.spring.react.springreact.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseDataAccessService courseDataAccessService;

    @Autowired
    public CourseService(CourseDataAccessService courseDataAccessService) {
        this.courseDataAccessService = courseDataAccessService;
    }

    public List<Course> getAllCourses() {
        return courseDataAccessService.selectAllCourses();
    }
}

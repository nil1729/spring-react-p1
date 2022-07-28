package xyz.nilanjan.spring.react.springreact.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class CourseDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CourseDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Course> selectAllCourses() {
        String sql = "" +
                "select " +
                "   course_id, " +
                "   name as course_name, " +
                "   description, " +
                "   teacher_name, " +
                "   department " +
                "from course";

        return jdbcTemplate.query(sql, getCourseRowMapper());
    }

    private RowMapper<Course> getCourseRowMapper() {
        return (resultSet, index) -> new Course(
                UUID.fromString(resultSet.getString("course_id")),
                resultSet.getString("course_name"),
                resultSet.getString("description"),
                resultSet.getString("teacher_name"),
                resultSet.getString("department")
        );
    }
}

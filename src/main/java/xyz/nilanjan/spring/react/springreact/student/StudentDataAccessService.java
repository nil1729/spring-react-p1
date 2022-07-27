package xyz.nilanjan.spring.react.springreact.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Repository
public class StudentDataAccessService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {
        String sql = "" +
                "select " +
                "   student_id, " +
                "   first_name, " +
                "   last_name, " +
                "   email, " +
                "   gender " +
                "from student;";

        return jdbcTemplate.query(sql, getStudentRowMapper());
    }

    private RowMapper<Student> getStudentRowMapper() {
        return (rs, rowNum) -> {
            UUID studentId = UUID.fromString(rs.getString("student_id"));
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String genderStr = rs.getString("gender").toUpperCase();
            Gender gender = Gender.valueOf(genderStr);

            return new Student(
                    studentId, firstName, lastName, email, gender
            );
        };
    }

    public int insertStudent(UUID studentId, Student student) {
        String sql = "" +
                "insert into student (" +
                "   student_id, " +
                "   first_name, " +
                "   last_name, " +
                "   email, " +
                "   gender) " +
                "values (?, ?, ?, ?, ?)";

        try {
            return jdbcTemplate.update(
                    sql,
                    studentId,
                    student.getFirstName(),
                    student.getLastName(),
                    student.getEmail(),
                    student.getGender().name().toUpperCase()
            );
        } catch (DataAccessException e) {
            System.out.printf("CUSTOM ERROR: %s%n", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public boolean isEmailTaken(String email) {
        String sql = "" +
                "select exists (" +
                "   select 1 " +
                "   from student " +
                "   where email=?" +
                ")";

        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(
                sql,
                (resultSet, i) -> resultSet.getBoolean(1),
                email
        ));
    }
}

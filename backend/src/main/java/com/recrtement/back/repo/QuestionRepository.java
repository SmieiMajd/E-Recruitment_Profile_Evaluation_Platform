package com.recrtement.back.repo;

import com.recrtement.back.model.exams.Question;
import com.recrtement.back.model.exams.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    Set<Question> findByQuiz(Quiz quiz);
}

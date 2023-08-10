package com.recrtement.back.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recrtement.back.model.User;
import com.recrtement.back.model.exams.Quiz;
import com.recrtement.back.model.exams.Result;

public interface ResultRepository extends JpaRepository<Result, Integer> {

	List<Result> findByQuiz(Quiz quiz);

	List<Result> findByUser(User user);

	List<Result> findByQuizAndUser(Quiz quiz, User user);

}

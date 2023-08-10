package com.recrtement.back.repo;

import com.recrtement.back.model.exams.Category;
import com.recrtement.back.model.exams.Quiz;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz,Long>{

	public List<Quiz> findByCategory(Category cat);

	

}

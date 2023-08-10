package com.recrtement.back.services;

import com.recrtement.back.model.exams.Category;
import com.recrtement.back.model.exams.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getQuizzes();
    public  Quiz getQuiz(Long quizId);
    public  void  deleteQuiz(Long quizId);
	public List<Quiz> getQuizzesOfCategory(Category cat);
	
}

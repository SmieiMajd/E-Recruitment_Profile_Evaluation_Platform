package com.recrtement.back.services;

import java.util.List;

import com.recrtement.back.model.User;
import com.recrtement.back.model.exams.Quiz;
import com.recrtement.back.model.exams.Result;

public interface ResultService {
	
	public Result addResult(Result result);
	public List<Result> getAllResult();
	public List<Result> getResultOfQuiz(Quiz quiz);
	public List<Result> getResultOfUser(User user);
	public List<Result> getResultOfUserAndQuiz(Quiz quiz,User user);

}

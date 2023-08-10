package com.recrtement.back.services.implement;

import java.util.List;

import com.recrtement.back.repo.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recrtement.back.model.User;
import com.recrtement.back.model.exams.Quiz;
import com.recrtement.back.model.exams.Result;
import com.recrtement.back.services.ResultService;

@Service
public class ResultServiceImpl implements ResultService {
	
	@Autowired
	private ResultRepository resultrepository;

	@Override
	public Result addResult(Result result) {
		return this.resultrepository.save(result);
	}

	@Override
	public List<Result> getAllResult() {
		// TODO Auto-generated method stub
		return this.resultrepository.findAll();
	}

	@Override
	public List<Result> getResultOfQuiz(Quiz quiz) {
		// TODO Auto-generated method stub
		return this.resultrepository.findByQuiz(quiz);
	}

	@Override
	public List<Result> getResultOfUser(User user) {
		// TODO Auto-generated method stub
		return this.resultrepository.findByUser(user);
	}

	@Override
	public List<Result> getResultOfUserAndQuiz(Quiz quiz, User user) {
		// TODO Auto-generated method stub
		return this.resultrepository.findByQuizAndUser(quiz,user);
	}

}

package com.recrtement.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recrtement.back.model.User;
import com.recrtement.back.model.exams.Quiz;
import com.recrtement.back.model.exams.Result;
import com.recrtement.back.services.ResultService;

@RestController
@RequestMapping("/result")
@CrossOrigin("*")
public class ResultController {
	
	@Autowired
	private ResultService resultservice;
	
	@PostMapping("/")
	public ResponseEntity<?> addResult(@RequestBody Result result)
	{
		return ResponseEntity.ok(this.resultservice.addResult(result));
	}
	
	@GetMapping("/{qid}/{uid}")
	public ResponseEntity<?> getResultByUserAndQuiz(@PathVariable("qid") long qid,@PathVariable("uid") long uid)
	{
		Quiz quiz1=new Quiz();
		quiz1.setQid(qid);
		User user1=new User();
		user1.setId(uid);
		System.out.println(qid+" "+uid);
		List<Result>lis=(this.resultservice.getResultOfUserAndQuiz(quiz1, user1));
	for(Result r:lis)
	{
		System.out.println(r.getMarksScored());
	}
		return ResponseEntity.ok(lis);
		
	}
	
	@GetMapping("/{qid}")
	public ResponseEntity<?> getResultByQuiz(@PathVariable("qid") long qid)
	{
		Quiz quiz1=new Quiz();
		quiz1.setQid(qid);
		List<Result>lis=this.resultservice.getResultOfQuiz(quiz1);
		return ResponseEntity.ok(lis);
		
	}

	@GetMapping("/user/{uid}")
	public ResponseEntity<?> getResultByUserId(@PathVariable("uid") long uid) {
		User user = new User();
		user.setId(uid);
		List<Result> resultList = this.resultservice.getResultOfUser(user);
		return ResponseEntity.ok(resultList);
	}
	
	
	

}

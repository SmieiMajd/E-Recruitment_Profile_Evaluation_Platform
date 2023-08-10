import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CondidatService } from 'src/app/services/condidat.service';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ResultService } from 'src/app/services/result.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  quizz: any;
  qid: any;
  marksGot = 0;
  percentage = 0;
  qTitle: any;
  marks = 0;
  correctAnswers = 0;
  Attempts = 0;
  isSubmit = false;
  question = {
    quiz: {
      qid: '',
      title: '',
      description: '',
      maxMarks: '',
      noOfQuestions: '',
      active: '',
      category: {
        title: '',
        description: '',
      },
    },
    content: '',
    answer: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  };
  questions: any[] = [];
  timer: any;
  user: any;
  timerValue: number = 0; // Ajouter un initialisateur à la propriété 'timerValue'


  condidat: any = null;
  result = {
    user: {
      id: '',
    }, // Change the type to BigInt
    quiz: {
      qid: '',
    }, // Change the type to BigInt
    result_id: '',
    qAttempted: '',
    correctAns: '',
    marksScored: '',
    submitDateTime: '',
  };
  constructor(
    private _question: QuestionService,

    private _quiz: QuizService,
    private router: Router,
    private _route: ActivatedRoute,
    private condidatService: CondidatService,
    public login: LoginService,
    private _snack: MatSnackBar,
    private _result: ResultService,
    private locationSt: LocationStrategy
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this._route.params.subscribe((params) => {
      this.qid = params['id'];
      this.Attempts = 0 ;
      this._question.getQuestionsOfQuizTest(this.qid).subscribe((data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 60;

        this.questions.forEach((q: any) => {
          q['givenAnswer'] = '';
          this.marks += q.quiz.maxMarks; // add maxMarks of each question to total marks
          this.startTimer();
        });
      });
    });
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
        this.addResult();
      }
    });
  }
  startTimer() {
    if (this.timer) {
      clearInterval(this.timer); // Clear the previous timer interval
    }
    this.timerValue = this.questions.length * 10; // Reset the timerValue

    this.timer = setInterval(() => {
      if (this.timerValue <= 0) {
        this.evalQuiz();
        clearInterval(this.timer);
      } else {
        this.timerValue--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.timerValue / 60);
    let ss = this.timerValue - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
  evalQuiz() {
    this.correctAnswers = 0;
    this.marksGot = 0;
    if (!this.isSubmit) {
      this.isSubmit = true;

      this.questions.forEach((q: any) => {
        if (q.answer == q.givenAnswer) {
          this.correctAnswers++;
          let marksSingle =
            this.questions[0].quiz.maxMarks / this.questions.length;
          // this.quizz[0].maxMarks/this.quizz[0].noOfQuestions;
          this.marksGot = Math.round(marksSingle * this.correctAnswers);
          this.percentage = Math.round((this.marksGot / this.marks) * 100);
        }
        if (q.givenAnswer.trim() != '') {
          this.Attempts++;
        }
      });
    }
  }
  addResult() {
    this.user = this.login.getUser();
    // this.result.userId = this.login.getUser().id;
    console.log(this.user);
    this.result.user.id = this.user.id;
    this._route.params.subscribe((params) => {
      this.qid = params['id'];
    });
    console.log(this.qid);
    this.result.quiz.qid = this.qid;
    this.result.marksScored = this.marksGot.toString();
    this.result.qAttempted = this.Attempts.toString()  ;
    this.result.correctAns = this.correctAnswers.toString();
    this.result.submitDateTime = new Date().toLocaleString();

    console.log(this.result);

    this._result.addResult(this.result).subscribe(
      (response) => {
        console.log('Result saved successfully:', response);
        // Optionally, you can perform additional actions after saving the result
      },
      (error) => {
        console.error('Error saving result:', error);
        // Handle the error as needed
      }
    );
  }

  retakeQuiz() {
    // Reset variables and restart the quiz
    this.isSubmit = false;
    this.marksGot = 0;
    this.percentage = 0;
    this.Attempts = 0;
    console.log(this.Attempts)
    this.timerValue = this.questions.length * 5;

    this.questions.forEach((q: any) => {
      q.givenAnswer = ''; // Reset the given answer for each question
    });
  }
}

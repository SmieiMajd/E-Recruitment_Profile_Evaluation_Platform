import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-user',
  templateUrl: './quiz-user.component.html',
  styleUrls: ['./quiz-user.component.css'],
})
export class QuizUserComponent implements OnInit {
  quizz: any;
  selectedQuiz: any;
  selected :any ;
   qid: any;
  qTitle: any;
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
  questions: any;
  constructor(private _quiz: QuizService, private _router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedQuiz = JSON.parse(params['quiz']);
      console.log(this.selectedQuiz);})
    this._quiz.quiz().subscribe(
      (data: any) => {
        this.quizz = data;
        console.log(this.quizz);

        // sélectionner un quiz aléatoire
        const randomIndex = Math.floor(Math.random() * this.quizz.length);
        this.selectedQuiz = this.quizz[randomIndex];

        console.log('Selected quiz:', this.selectedQuiz);

        console.log( this.selectedQuiz.qid);
      },
      (error) => {
        console.log(error);
        alert('error in loading quiz');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't save`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start-quiz', this.selectedQuiz.qid]);
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }}

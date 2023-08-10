import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { never } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  quiz = [
    {
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
  ];
  questions = [
    {
      quesId: '',
      content: '',
      description: '',
      answer: '',
      image: '',

      option1: '',
      option2: '',
      option3: '',
      option4: '',
    },
  ];
  qid: any;
  quesId: any;
  qTitle: any;
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar,
    _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      title: 'Are you sure you want to delete this question?',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (data: any) => {
            this._snack.open('Question deleted successfully', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q: any) => q.quesId != qid);
          },
          (error) => {
            console.log(error);
            this._snack.open('Error in deleting question', '', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public editor: any = ClassicEditor;
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
  constructor(
    private _question: QuestionService,
    private _quiz: QuizService,
    private router: Router,
    private _route: ActivatedRoute,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log(this.qid);
    this.question.quiz['qid'] = this.qid;
  }







  formSubmit() {
    this.addQuestion();
  }
  addQuestion() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success', 'Question Added', 'success');
        this.question.content = '';
        this.question.answer = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';

        this.router.navigate([`/admin/quiz/`]);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in Adding question', 'error');
      }
    );
  }

}

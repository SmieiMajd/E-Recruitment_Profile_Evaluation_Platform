import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css'],
})
export class ViewQuizComponent implements OnInit {
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
  constructor(private _quiz: QuizService) {}
  ngOnInit(): void {
    this._quiz.quiz().subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error loading data', 'error');
      }
    );
  }

  deleteQuiz(qid: any) {
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure?',
          confirmButtonText: 'Yes, delete it!',
          showCancelButton: true,
        }).then(result => {
          if (result.isConfirmed) {
            this._quiz.deleteQuiz(qid).subscribe(
              (data: any) => {
                console.log(data);
                this.quiz = this.quiz.filter((q: any) => q.qid !== qid);
                Swal.fire('Success', 'Quiz deleted successfully', 'success');
                },
                (error) => {
                  console.log(error);
                  Swal.fire('Error', 'Error deleting quiz', 'error');
                  }


            );
      }
});
  }
  }

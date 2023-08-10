import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _cat:CategoryService, private _router: Router) {}

  qid = 0;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    noOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };
  categories = [
    { cid: '', title: '' },
    { cid: '', title: '' },  ];

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    this._quiz.getQuiz(this.qid).subscribe((data: any) => {
      this.quiz = data;
      console.log(this.quiz);
    },
    (error) => {
      console.log(error);
      }

    );
    this._cat.categories().subscribe((data:any) => {
      this.categories = data;
      console.log(this.categories);
    },
    (error) => {
      console.log(error);
      }
    )
  }
// update
public updateData(){
  this._quiz.updateQuiz(this.quiz).subscribe(
    (data:any) => {
      console.log(data);
      Swal.fire("Updated",'quiz updated','success').then((e)=>{
        this._router.navigate(['/admin/quiz'])
      })
      },
      (error) => {
        console.log(error);
        Swal.fire("Error",'error in updating quiz','error')
      }
      )
}

}

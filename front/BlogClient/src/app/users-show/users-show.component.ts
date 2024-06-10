import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../auth/question.service';
import { AnswerService } from '../auth/answer.service';
import { Question } from '../auth/Question';
import { Answer } from '../auth/Answer';
import { QuestionWithAnswers } from '../auth/QuestionWithAnswers';


@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrl: './users-show.component.css'
})
export class UsersShowComponent implements OnInit {
  firstName: string = "";
  questionId!: number;
  questions: Question[] = [];
  answers: Answer[] = [];
  userNames: any[] =[];
  userName: string ='';
  questionWithAnswers: QuestionWithAnswers[] = [];

  constructor(private questionService: QuestionService, private answerService: AnswerService){}
  
  ngOnInit(): void {
    this.getDistinctUsers();
  }

  getDistinctUsers(): void {
    this.answerService.getDistinctUsers()
      .subscribe(
        users => {
          this.userNames = users;
          console.log(users);
        },
        error => {
          console.error('Error loading users:', error);
        }
      );
  }

  onSelectUser(user: string) {
    this.userName = user;
    console.log("Selected user:", user);
    this.answerService.getDataByUserName(user)
      .subscribe(
        questionWithAnswers => {
          console.log('Questions and answers for user:', questionWithAnswers);
          this.questionWithAnswers = questionWithAnswers;
        },
        error => {
          console.error('Error loading questions and answers for user:', error);
        }
      );
  }
  
}

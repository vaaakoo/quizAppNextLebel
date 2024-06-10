import { Component, OnInit } from '@angular/core';
import { Question } from '../auth/Question';
import { QuestionService } from '../auth/question.service';
import { AnswerService } from '../auth/answer.service';
import { Answer } from '../auth/Answer';

@Component({
  selector: 'app-questioneries',
  templateUrl: './questioneries.component.html',
  styleUrl: './questioneries.component.css'
})
export class QuestioneriesComponent implements OnInit {
  fullName: string = '';
  answers: Answer[] = [];
  questions: Question[] = [];

  constructor(private questionService: QuestionService, private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      questions => {
        this.questions = questions;
        this.answers = questions.map(question => ({
          id: 0,
          questionId: question.id,
          name: '',
          answerText: ''
        }));
      },
      error => {
        console.error('Error loading questions:', error);
      }
    );
  }

  submitForm(): void {
    debugger;
    for (let i = 0; i < this.questions.length; i++) {
      const answer: Answer = {
        id: 0,
        questionId: this.questions[i].id,
        name: this.fullName,
        answerText: this.answers[i].answerText
      };

      this.answerService.addAnswer(this.questions[i].id, answer).subscribe(
        response => {
          console.log('Answer added successfully:', response);
          this.answers[i].answerText = '';
          this.fullName = '';
        },
        error => {
          console.error('Error adding answer:', error);
        }
      );
      
    }
  }
}

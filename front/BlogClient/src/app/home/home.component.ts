import { Component, OnInit } from '@angular/core';
import { Question } from '../auth/Question';
import { QuestionService } from '../auth/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  questions: Question[] = [];
  newQuestionText: string = '';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  addQuestion(): void {
    const newQuestion: Question = {
      id: 0,
      text: this.newQuestionText
    };

    this.questionService.addQuestion(newQuestion).subscribe(() => {
      this.loadQuestions();
      this.newQuestionText = '';
    });
  }

  updateQuestionText(index: number): void {
    const question = this.questions[index];
    this.questionService.updateQuestion(question.id, question).subscribe(
      () => {
        console.log('Question text updated successfully.');
      },
      error => {
        console.error('Error updating question text:', error);
      }
    );
  }
}

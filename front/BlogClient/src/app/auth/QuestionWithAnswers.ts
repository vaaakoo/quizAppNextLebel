import { Answer } from "./Answer";
import { Question } from "./Question";

export class QuestionWithAnswers {
    userName: string = '';
    question?: Question;
    answers: Answer[] = [];
  }
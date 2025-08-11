import { Component, OnInit } from '@angular/core';
import { Api } from '../../services/api';
import { TitleCasePipe, CommonModule } from '@angular/common'; // ✅ import here

@Component({
  selector: 'app-api-data',
  standalone: true, // ✅ if using new syntax, this should be true
  imports: [CommonModule, TitleCasePipe], // ✅ make the pipe available here
  templateUrl: './api-data.html',
  styleUrls: ['./api-data.css']
})
export class ApiDataComponent implements OnInit {
  questions: any[] = [];
  loading = true;
  error: string | null = null;
  showAnswerIndex: number | null = null;

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getTriviaQuestions().subscribe({
      next: (data) => {
        if (data && data.results) {
          this.questions = data.results.map((q: any) => ({
            ...q,
            allAnswers: [...q.incorrect_answers, q.correct_answer]
              .sort(() => Math.random() - 0.5) // Shuffle
          }));
        } else {
          this.error = 'No questions found';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load trivia questions';
        this.loading = false;
      }
    });
  }

  toggleAnswer(index: number) {
    this.showAnswerIndex = this.showAnswerIndex === index ? null : index;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { CommonModule } from '@angular/common'; // Needed for pipes like titlecase

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class FormComponent implements OnInit {
  quizForm!: FormGroup;
  questions: any[] = [];
  submitted = false;
  resultMessage = '';

  constructor(private fb: FormBuilder, private api: Api) {}

  ngOnInit() {
    this.api.getTriviaQuestions().subscribe(data => {
      if (data && data.results) {
        this.questions = data.results.slice(0, 5).map((q: any) => ({
          ...q,
          allAnswers: [...q.incorrect_answers, q.correct_answer]
            .sort(() => Math.random() - 0.5)
        }));

        const group: any = {};
        this.questions.forEach((_, i) => {
          group['q' + i] = ['', Validators.required];
        });
        this.quizForm = this.fb.group(group);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.quizForm.invalid) return;

    const answers = this.quizForm.value;
    let correctCount = 0;

    this.questions.forEach((q, i) => {
      if (answers['q' + i] === q.correct_answer) correctCount++;
    });

    this.resultMessage = `You got ${correctCount} out of ${this.questions.length} correct!`;
    this.api.submitQuizAnswers(answers).subscribe();
  }
}

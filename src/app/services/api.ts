import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private triviaApi = 'https://opentdb.com/api.php?amount=9&type=multiple';

  constructor(private http: HttpClient) {}

  // Fetch 10 multiple choice trivia questions
  getTriviaQuestions(): Observable<any> {
    return this.http.get(this.triviaApi).pipe(
      catchError(err => {
        console.error('Trivia API error', err);
        return of(null);
      })
    );
  }

  // Simulate form submission, you can replace with your backend
  submitQuizAnswers(payload: any) {
    // For demo: just log and return observable success
    console.log('Quiz submitted:', payload);
    return of({ success: true, message: 'Thanks for submitting!' });
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.scss']
})
export class AnswerComponent {
  @Input() questionId!: number;
  @Output() answerSubmitted = new EventEmitter<void>();

  answerText: string = '';
  message: string = '';
  hideMessage: boolean = false;  // Flag to control hiding the message
  symbolsVisible: boolean = false; // Flag to control visibility of the math symbols

  @Input() answer: any;

  constructor(private http: HttpClient) {}

  // Toggle visibility of math symbols
  toggleSymbols() {
    this.symbolsVisible = !this.symbolsVisible;
  }

  // Insert the clicked math symbol into the answer textarea
  insertSymbol(symbol: string) {
    const cursorPos = this.getCaretPosition();
    this.answerText = this.answerText.slice(0, cursorPos) + symbol + this.answerText.slice(cursorPos);
    this.setCaretPosition(cursorPos + symbol.length);  // Place the cursor after the inserted symbol
  }

  // Get the current cursor position in the textarea
  getCaretPosition(): number {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    return textarea.selectionStart;
  }

  // Set the cursor position after inserting the symbol
  setCaretPosition(position: number): void {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    textarea.selectionStart = position;
    textarea.selectionEnd = position;
    textarea.focus();
  }

  submitAnswer() {
    if (!this.answerText.trim()) return;

    this.http.post('http://localhost:3000/api/answers', {
      question_id: this.questionId,
      answer_text: this.answerText
    }).subscribe({
      next: () => {
        this.message = 'Answer submitted!';
        this.answerText = '';

        // Hide the answer message after 3 seconds
        setTimeout(() => {
          this.message = '';  // Clear the success message after a timeout
        }, 4000);  // Adjust the time (3000ms = 3 seconds)

        this.answerSubmitted.emit(); // Notify parent to refresh
      },
      error: err => {
        this.message = 'Something went wrong!';
        console.error(err);
      }
    });
  }
}

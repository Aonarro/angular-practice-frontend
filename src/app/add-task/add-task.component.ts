import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from './task.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent implements OnInit {
  @Input() customerId!: string;
  @Output() taskAdded = new EventEmitter<void>();
  addTaskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.addTaskForm = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addTaskForm.valid) {
      const newTask = {
        ...this.addTaskForm.value,
        customerId: this.customerId,
        done: false,
      };

      this.taskService.addTask(newTask).subscribe({
        next: (response) => {
          this.taskAdded.emit();
        },
        error: (err) => {
          console.error('Error creating task:', err);
        },
      });
    }
  }

  onCancel(): void {
    this.taskAdded.emit();
    console.log('click on Cancel button');
  }
}

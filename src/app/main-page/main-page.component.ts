import { Component, OnInit } from '@angular/core';
import { TaskService } from '../add-task/task.service';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  customers: any[] = [];
  selectedCustomer: any = null;
  tasks: any[] = [];
  showAddTaskForm: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  onSelectCustomer(customer: any): void {
    this.selectedCustomer = customer;
    this.taskService.getTasks(this.selectedCustomer._id).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onClickAddTaskForm(): void {
    this.showAddTaskForm = true;
  }

  onClickDeleteTask(task: any): void {
    const taskId = task._id;

    this.taskService.deleteTask(taskId).subscribe((response) => {
      this.taskService
        .getTasks(this.selectedCustomer._id)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onClickDoneTask(task: any): void {
    this.taskService.doneTask(task).subscribe((response) => {
      this.taskService
        .getTasks(this.selectedCustomer._id)
        .subscribe((tasks) => {
          this.tasks = tasks;
        });
    });
  }

  onTaskAdded(): void {
    this.showAddTaskForm = false;

    this.taskService.getTasks(this.selectedCustomer._id).subscribe((data) => {
      this.tasks = data;
    });
  }
}

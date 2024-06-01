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
    console.log(this.selectedCustomer);
    this.taskService.getTasks(this.selectedCustomer._id).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onClickAddTaskForm(): void {
    this.showAddTaskForm = true;
    console.log(this.showAddTaskForm);
  }

  onTaskAdded(): void {
    this.showAddTaskForm = false;

    this.taskService.getTasks(this.selectedCustomer._id).subscribe((data) => {
      this.tasks = data;
    });
  }
}

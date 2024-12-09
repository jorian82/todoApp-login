import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit {
  router = inject(Router);

  title = '';

  ngOnInit(): void {
    this.title = this.router.routerState.snapshot.url.includes("edit")?"Edit task":"Add task";
  }
}

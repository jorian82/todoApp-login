import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faAdd, faAsterisk, faCalendarAlt, faCheckCircle, faComment, faEdit, faInfo, faPaperclip } from '@fortawesome/free-solid-svg-icons';

const tasks = [
  {title: 'List group item heading 1', info: 'Some placeholder content in a paragraph.', smallprint: 'And some small print.', created: '3 days ago', id: 1},
  {title: 'List group item heading 2', info: 'Some placeholder content in a paragraph.', smallprint: 'And some small print.', created: '3 days ago', id: 2},
  {title: 'List group item heading 3', info: 'Some placeholder content in a paragraph.', smallprint: 'And some small print.', created: '3 days ago', id: 3},
  {title: 'List group item heading 4', info: 'Some placeholder content in a paragraph.', smallprint: 'And some small print.', created: '3 days ago', id: 4},
  {title: 'List group item heading 5', info: 'Some placeholder content in a paragraph.', smallprint: 'And some small print.', created: '3 days ago', id: 5},
  {title: 'List group item heading 6', info: 'Some placeholder content in a paragraph.', smallprint: 'And some small print.', created: '3 days ago', id: 6},
]
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FaIconComponent, NgFor, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss','../../../../../../styles.scss']
})
export class DashboardComponent {
  edit = faEdit;
  done = faCheckCircle;
  info = faInfo;
  addTask = faAdd;
  asterisk = faAsterisk;
  comments = faComment;
  calendar = faCalendarAlt;
  paperclip = faPaperclip;
  tasks = tasks;
}

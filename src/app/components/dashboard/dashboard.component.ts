import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MediumEditor from 'medium-editor';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('container') container: ElementRef;

  ngAfterViewInit() {
    const element = this.container.nativeElement;
    const editor = new MediumEditor(element);
  }
}

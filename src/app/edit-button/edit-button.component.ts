import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
})
export class EditButtonComponent implements OnInit {

  constructor(public appState: AppStateService) { }

  ngOnInit() {
  }

}

import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(private route: ActivatedRoute) { 
  	this.route.snapshot.data}

  lines: {
  	text: string;
  	userInput: boolean;
  }[] = [];

  currentLine: string = '';

  currentItemIndex: number = 0;

  promptNext(){
  // 	let hasDescription = false;
  // 	let item;
  // 	for ()
  // 	do {
		let item = this.route.snapshot.data.allItems[this.currentItemIndex];
		// hasDescription = !!item.description;
  // 	} while (!hasDescription);
	this.lines.push({text: 'Enter name of: ' + item.name, userInput: false});
  }

  addLine(){
  	let input = this.currentLine.trim();
  	if (input) {
	  	this.lines.push({text: input, userInput: true});
	  	this.currentLine = '';
		this.testLine(input);  		
  	}
  }

  ngOnInit() {
  	this.promptNext();
  	  	this.scrollToBottom();
  }

  ngAfterViewChecked() {
  	this.scrollToBottom();
  }

	scrollToBottom(): void {
		try {
		    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
		} catch(err) { }                 
	}	

  testLine(input: string) {
  	let item = this.route.snapshot.data.allItems[this.currentItemIndex];
  	if (item.name.toLowerCase().indexOf(input.toLowerCase()) != -1){
  		this.lines.push({text: 'Correct! The correct answer was: "' + item.name + '"', userInput: false});
  		this.currentItemIndex++;
  	} else {
  		// this.lines.push({text: 'Incorrect...', userInput: false});
  	}
  	this.promptNext();
  }

}

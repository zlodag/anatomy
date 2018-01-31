import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailField, DETAIL_FIELDS } from '../detail-field';

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
    if (this.currentItemIndex < this.route.snapshot.data.allItems.length) {
      let item = this.route.snapshot.data.allItems[this.currentItemIndex];
      this.log({text: 'Enter name of: ' + item.name, userInput: false});
    } else {
      this.log({text: 'No more items', userInput: false});
    }
		// hasDescription = !!item.description;
  // 	} while (!hasDescription);
  }

  addLine(){
  	let input = this.currentLine.trim();
  	if (input) {
	  	this.log({text: input, userInput: true});
	  	this.currentLine = '';
		this.testLine(input);  		
  	}
  }

  log(line : {text: string, userInput: boolean}){
    this.lines.push(line);
    if (line.userInput) {
      console.debug(line.text);
    } else {
      console.log(line.text);
    }
  }

  ngOnInit() {
    // while(this.currentItemIndex < this.route.snapshot.data.allItems.length) {

    // }
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
    if (this.currentItemIndex >= this.route.snapshot.data.allItems.length) {
      this.log({text: 'No more items', userInput: false});
      return;
    }
    const item = this.route.snapshot.data.allItems[this.currentItemIndex];
    // console.log(item);
    let detailField : DetailField = null;
    let testItems : string[];
    let match = input.match(/^\W*(?:(cheat)\W+)?(\w{2})(?:\W+(.+))?$/);
    if (match) {
      let key = match[2];
      for (var i = 0; !detailField && i < DETAIL_FIELDS.length; i++) {
        if (key == DETAIL_FIELDS[i].shortcut){
          detailField = DETAIL_FIELDS[i];
          if (match[1]){
            this.log({text: 'Cheating:', userInput: false});
          }
          this.log({text: detailField.label, userInput: false});
          let itemField = item[detailField.key];
          if (detailField.array ? !itemField.length : !itemField){
            this.log({text: 'No entry for: ' + detailField.label, userInput: false});
            return;
          } else {
            testItems = detailField.array ? itemField : [itemField];
            if (match[1]){
              for (var j = 0; j < testItems.length; j++) {
                let testItem = testItems[j];
                this.log({text: 'ANSWER: "' + testItem + '"', userInput: false});
              }
              return;
            }
          }
        }
      }
      if (!detailField) {
        this.log({text: 'Invalid key: "' + key + '". Try "help"', userInput: false});
        return;
      }
    }
    if (!detailField) {
      switch (input) {
        case "skip":
          this.log({text: 'Skipping...', userInput: false});
          this.currentItemIndex++;
          this.promptNext();
          return;
        case "help":
          for (var i = 0; i < DETAIL_FIELDS.length; i++) {
            let field = DETAIL_FIELDS[i];
            let helpText = field.shortcut + ': ' + field.label;
            this.log({text: helpText, userInput: false});
          }
          return;
        default:
          this.log({text: 'Invalid input (no key supplied). Try "help"', userInput: false});
          return;
      }
    }
    // if (tokens.length < 2) {
    //   this.log({text: 'Invalid input (no space): "' + input + '"', userInput: false});
    //   return;
    // }
    console.log(match[3]);
    if (!match[3]){
      this.log({text: 'Invalid input (no answer supplied). Try "help"', userInput: false});
      return;
    }
    let tokens = match[3].split(',');
    console.log(tokens);
    for (var i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!token.length) continue;
      this.log({text: token, userInput: true});
      // console.log(detailField.key, token);
      // console.log(testItems);
      let found = false;
      for (var j = 0; !found && j < testItems.length; j++) {
        const testItem = testItems[j];
        if (testItem.toLowerCase().indexOf(token.toLowerCase()) != -1) {
          // console.log('Found!', testItem);
          this.log({text: 'Found! The correct answer was: "' + testItem + '"', userInput: false});
          found = true;
          // return;
          // this.currentItemIndex++;
          // this.promptNext();

        }
      }
      if (!found) {
        this.log({text: 'Not found...', userInput: false});
      }
    }
  }

  // testLine(input: string) {
  // 	let item = this.route.snapshot.data.allItems[this.currentItemIndex];
  // 	if (item.name.toLowerCase().indexOf(input.toLowerCase()) != -1){
  // 		this.log({text: 'Correct! The correct answer was: "' + item.name + '"', userInput: false});
  // 		this.currentItemIndex++;
  // 	} else {
  // 		// this.log({text: 'Incorrect...', userInput: false});
  // 	}
  // 	this.promptNext();
  // }

}

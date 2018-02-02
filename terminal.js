const readline = require('readline');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const Region = require('./models/Region.js');
const Category = require('./models/Category.js');
const Section = require('./models/Section.js');
const Item = require('./models/Item.js');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const DETAIL_FIELDS = [

  	{key: 'introduction', label: 'Introduction', array: false, shortcut: 'in' },
  	{key: 'structure', label: 'Structure', array: false, shortcut: 'st' },

  	{key: 'superiorRelations', label: 'Superior relations', array: true, shortcut: 'sr' },
  	{key: 'inferiorRelations', label: 'Inferior relations', array: true, shortcut: 'ir' },
  	{key: 'anteriorRelations', label: 'Anterior relations', array: true, shortcut: 'ar' },
  	{key: 'posteriorRelations', label: 'Posterior relations', array: true, shortcut: 'pr' },
  	{key: 'medialRelations', label: 'Medial relations', array: true, shortcut: 'mr' },
  	{key: 'lateralRelations', label: 'Lateral relations', array: true, shortcut: 'lr' },

  	{key: 'superiorBoundary', label: 'Superior boundary', array: false, shortcut: 'sb' },
  	{key: 'inferiorBoundary', label: 'Inferior boundary', array: false, shortcut: 'ib' },
  	{key: 'anteriorBoundary', label: 'Anterior boundary', array: false, shortcut: 'ab' },
  	{key: 'posteriorBoundary', label: 'Posterior boundary', array: false, shortcut: 'pb' },
  	{key: 'medialBoundary', label: 'Medial boundary', array: false, shortcut: 'mb' },
  	{key: 'lateralBoundary', label: 'Lateral boundary', array: false, shortcut: 'lb' },

  	{key: 'contents', label: 'Contents', array: true, shortcut: 'co' },
  	{key: 'articulations', label: 'Articulations', array: true, shortcut: 'ar' },
  	{key: 'attachments', label: 'Attachments', array: true, shortcut: 'at' },
  	{key: 'specialStructures', label: 'Special structures', array: true, shortcut: 'ss' },

  	{key: 'nerveSupply', label: 'Nerve supply', array: false, shortcut: 'ns' },
  	{key: 'arterialSupply', label: 'Arterial supply', array: false, shortcut: 'as' },
  	{key: 'venousDrainage', label: 'Venous drainage', array: false, shortcut: 'vd' },
  	{key: 'lymphaticDrainage', label: 'Lymphatic drainage', array: false, shortcut: 'ld' },

  	{key: 'variants', label: 'Variants', array: true, shortcut: 'va' },

];
	// rl.on('SIGINT', () => {
	//  //  console.log('Caught SIGINT.');
	// 	// rl.close();
	// 	process.exit();
	// });
	// rl.on('SIGTSTP', () => {
	//   console.log('Caught SIGTSTP.');
	// });
	// rl.on('pause', () => {
	//   console.log('Readline paused.');
	// });

let counter = 0;
let testItems;
let totalAnswers;
let remainder;
let newItem = true;
let itemModel;

mongoose.connect('mongodb://localhost/mean-angular5', { useMongoClient: true })
	  // .then(Region.find().exec())
	  // .then(regions => {
	  //     testItems = regions;
	  //     console.log(testItems);
	  //     loop();
	  //   })
	.then(() => {
		let id = '5a64292f19357214abffe516';
		// let query = Item.find({'_id' : id});
		let query = Item.find();
		return query.exec();
	})
	.then(regions => {
		testItems = regions;
		loop();
	})
	.catch(error => {
		logError(error.message);
		process.exit();
	});

function tally(item){
	let n = 0;
	for (var i = DETAIL_FIELDS.length - 1; i >= 0; i--) {
		const detailField = DETAIL_FIELDS[i];
		const itemField = item[detailField.key];
		n += (detailField.array ? itemField.length : itemField ? 1 : 0);
	}
	return n;
}

function logInfo(string){
	console.log(chalk.green(string));
}

function logWarning(string){
	console.log(chalk.magenta(string));
}

function logError(string){
	console.error(chalk.red(string));
}

function loop() {
	if (!newItem && remainder == 0){
		counter++;
		newItem = true;
	}
	while (newItem) {
		if (!testItems || counter >= testItems.length){
			console.log('No more items...');
			process.exit();
		}
		const item = testItems[counter];
		itemModel = {};
		itemModel.name = item.name;
		totalAnswers = 0;
		for (var i = DETAIL_FIELDS.length - 1; i >= 0; i--) {
			const detailField = DETAIL_FIELDS[i];
			const itemField = item[detailField.key];
			if (detailField.array) {
				itemModel[detailField.key] = [];
				for (var j = 0; j < itemField.length; j++) {
					itemModel[detailField.key].push(itemField[j]);
				}
				totalAnswers += itemModel[detailField.key].length;
			} else if (itemField) {
				itemModel[detailField.key] = itemField;
				totalAnswers++;
			}
		}
		if (totalAnswers) {
			console.log(`${counter + 1} of ${testItems.length}`);
			remainder = totalAnswers;
			newItem = false;
		} else {
			counter++;
		}
	}
	testMe(itemModel);
}

function testMe(item){
	rl.question(`${item.name}: [${totalAnswers-remainder}/${totalAnswers}]: `, answer => {
		processMe(answer, item);
		loop();
	});
}

// function initFreshItem(item){
// 	if (!testItems || counter >= testItems.length){
// 		console.log('No more items...');
// 		process.exit();
// 	} else {
// 		console.log(`Item number ${counter + 1} of ${testItems.length}`);
// 		testMe(testItems[counter]);
// 	}
// }

function printHelp() {
	for (let i = 0; i < DETAIL_FIELDS.length; i++) {
		const detailField = DETAIL_FIELDS[i];
		console.log(chalk.underline(detailField.shortcut) + ' ' + chalk.blue(detailField.label));
		// console.log(chalk.blue(detailField.shortcut + ': ') + detailField.label);
	}
}

function printAll(item) {
	console.log(chalk.blue.bold(item.name));
	for (let i = 0; i < DETAIL_FIELDS.length; i++) {
		const detailField = DETAIL_FIELDS[i];
		const itemField = item[detailField.key];
		if (detailField.array ? itemField.length : itemField) {
			console.log(chalk.blue(detailField.label));
			if (detailField.array) {
				for (let j = 0; j < itemField.length; j++) {
					console.log('+ ' + itemField[j]);
				}
			} else {
				console.log('= ' + itemField);
			}
		}
	}
}

function processMe(answer, item) {
	if (answer == 'help') {
		printHelp();
		return;
	} else if (answer == 'cheat') {
		console.log(chalk.inverse('CHEATING!'));
		printAll(item);
	} else if (answer == 'skip'){
		console.log(chalk.bgYellow('SKIPPING...'));
		counter++;
		newItem = true;
	} else {
	    let match = answer.match(/^\W*(\w{2})\W+(.+)$/);
	    // let match = answer.match(/^\W*(?:(cheat)\W+)?(\w{2})(?:\W+(.+))?$/);
	    // if (match) {
	    // 	console.log(match[2]);
	    // }
	    if (match) {
	    	const key = match[1];
	    	for (var i = 0; i < DETAIL_FIELDS.length; i++) {
	    		const detailField = DETAIL_FIELDS[i];
	    		if (key == detailField.shortcut){
	    			// console.log(chalk.blue.bold(detailField.label));
	    			const itemField = item[detailField.key];
	    			if (detailField.array) {
						const tokens = match[2].split(',');
						for (var i = 0; i < tokens.length; i++) {
							const token = tokens[i].trim();
							let found = false;
							for (var j = itemField.length - 1; !found && j >= 0; j--) {
								if (testToken(token, detailField.label, itemField[j])){
									found = true;
									item[detailField.key].splice(j, 1);
									remainder--;
								}
							}
							if (!found) {
								console.log(chalk.blue(detailField.label + ': ') + chalk.red.bold(token));
							}
						}
	    			} else {
	    				const token = match[2].trim();
	    				if (itemField && testToken(token, detailField.label, itemField)){
	    					delete item[detailField.key];
							remainder--;
	    				} else {
							console.log(chalk.blue(detailField.label + ': ') + chalk.red.bold(token));
						}
	    			}
					// let guesses = detailField.array ? [match[3]]

	    // 			if (detailField.array ? itemField.length : itemField){
	    // 				let subFields = detailField.array ? itemField : [itemField];
					// 	for (var j = 0; j < subFields.length; j++) {
					// 		let subField = subFields[j];
					// 		if (match[1] || )
					// 		console.log(chalk.green('ANSWER: ') + chalk.blue(subField));
					// 		counter++;
					// 	}
					// 	return;
	    // 			}
					// logWarning('No entry for: ' + detailField.label);
	    			return;
	    		}
	    	}
			logWarning('Invalid key: "' + key + '". Try "help"');
			return;
	    }
	    logWarning('Invalid input. Try "help"');
	}
}

function testToken(token, section, answer) {
	// console.log(chalk.cyan(`Testing token "${token}" against answer "${answer}"`));
	if (answer.toLowerCase().indexOf(token.toLowerCase()) != -1) {
		console.log(chalk.blue(section + ': ') + chalk.green.bold(answer));
		return true;
	}
	return false;
}
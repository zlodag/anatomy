const readline = require('readline');
const chalk = require('chalk');
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const shuffle = require('shuffle-array');
const argv = require( 'argv' );
argv.option([{
    name: 'region',
    short: 'r',
    type: 'csv,string',
    description: 'Filter by region',
}, {
    name: 'category',
    short: 'c',
    type: 'csv,string',
    description: 'Filter by category',
}, {
    name: 'section',
    short: 's',
    type: 'csv,string',
    description: 'Filter by section',
}, {
    name: 'item',
    short: 'i',
    type: 'csv,string',
    description: 'Filter by item',
}]);
const args = argv.run();

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

let counter = 0;
let testItems;
let totalAnswers;
let remainder;
let newItem = true;

mongoose.connect('mongodb://localhost/mean-angular5', { useMongoClient: true })
	.then(() => {
		if (args.options.item){
			return Item.find({$text: {$search:args.options.item.join(' ')}}).exec();
		} else if (args.options.section){
			return Section.find({$text: {$search:args.options.section.join(' ')}}, {_id: 1}).lean().exec()
				.then(sections => Item.find({'section': {'$in': collateIds(sections)}}).exec());
		} else if (args.options.category){
			return Category.find({$text: {$search:args.options.category.join(' ')}}, {_id: 1}).lean().exec()
				.then(categories => Section.find({'category': {'$in': collateIds(categories)}}, {_id: 1}).lean().exec())
				.then(sections => Item.find({'section': {'$in': collateIds(sections)}}).exec());
		} else if (args.options.region) {
			return Region.find({$text: {$search:args.options.region.join(' ')}}, {_id: 1}).lean().exec()
				.then(regions => Category.find({'region': {'$in': collateIds(regions)}}, {_id: 1}).lean().exec())
				.then(categories => Section.find({'category': {'$in': collateIds(categories)}}, {_id: 1}).lean().exec())
				.then(sections => Item.find({'section': {'$in': collateIds(sections)}}).exec());
		} else {
			return Item.find().exec();
		}
	})
	.then(items => {
		shuffle(items);
		testItems = items;
		loop();
	})
	// .catch(error => {
	// 	console.error(chalk.red(error.message));
	// 	process.exit();
	// })
	;

function collateIds(documents){
	let ids = [];
	for (var i = 0; i < documents.length; i++) {
		ids.push(documents[i]._id);
	}
	return ids;
}

function tally(item){
	let n = 0;
	for (var i = DETAIL_FIELDS.length - 1; i >= 0; i--) {
		const detailField = DETAIL_FIELDS[i];
		const itemField = item[detailField.key];
		n += (detailField.array ? itemField.length : itemField ? 1 : 0);
	}
	return n;
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
			return;
		}
		const item = testItems[counter];
		console.log(`${counter + 1} of ${testItems.length}`);
		totalAnswers = 0;
		for (var i = DETAIL_FIELDS.length - 1; i >= 0; i--) {
			const detailField = DETAIL_FIELDS[i];
			const itemField = item[detailField.key];
			totalAnswers += detailField.array ? itemField.length : !!itemField ? 1 : 0;
		}
		remainder = totalAnswers;
		if (remainder) {
			newItem = false;
		} else {
			console.log(chalk`Skipping {bold.green ${item.name}} as no testable items...`);
			counter++;
		}
	}
	testMe(testItems[counter]);
}

function testMe(item){
	rl.question(`${item.name}: `, answer => {
		processMe(answer.trim(), item);
		loop();
	});
}

function printKeys(){
	for (let i = 0; i < DETAIL_FIELDS.length; i++) {
		const detailField = DETAIL_FIELDS[i];
		console.log(chalk.underline(detailField.shortcut) + ' ' + chalk.blue(detailField.label));
	}
}

function printHelp() {
	console.log(chalk.bold.underline('\nUsage\n'));
	console.log(chalk.bold('<key> <guess>[,<guess>...]'), '\n\t Attempt answer(s) to current item for the specified key');
	console.log(chalk.bold('progress'), '\n\tShow current item progress');
	console.log(chalk.bold('skip'), '\n\tSkip current item');
	console.log(chalk.bold('cheat'), '\n\tPrint answer(s) to current item');
	console.log(chalk.bold('cheat <key> [<key>...]'), '\n\tPrint answer(s) to current item for the specified key(s)');
	console.log(chalk.bold('keys'), '\n\tDisplay a list of keys');
	console.log(chalk.bold('help'), '\n\tShow this message');
	console.log(chalk.bold('quit'), '\n\tQuit');

}

function printProgress(){
	console.log(chalk.yellow(`${totalAnswers-remainder} of ${totalAnswers}`));
}

function printAnswer(item, detailField, forcePrintEvenIfEmpty) {
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
	} else if (forcePrintEvenIfEmpty) {
		console.log(chalk.gray(detailField.label, '(N/A)'));
	}
}

function printAnswers(item, tokens) {
	console.log(chalk.bold.underline(item.name));
	if (tokens) {
		for (var i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			let found = false;
			for (var j = 0; !found && j < DETAIL_FIELDS.length; j++) {
				const detailField = DETAIL_FIELDS[j];
				if (token == detailField.shortcut) {
					found = true;
					printAnswer(item, detailField, true);
				}
			}
			if (!found) {
				informInvalidKey(token);
			}
		}
	} else {
		for (let i = 0; i < DETAIL_FIELDS.length; i++) {
			const detailField = DETAIL_FIELDS[i];
			printAnswer(item, detailField, false);
		}
	}
}

function processMe(answer, item) {
	if (answer == 'help') {
		printHelp();
		return;
	} else if (answer == 'quit') {
		process.exit();
		return;
	} else if (answer == 'keys') {
		printKeys();
		return;
	} else if (answer == 'progress') {
		printProgress();
		return;
	} else if (answer.startsWith('cheat')) {
		console.log(chalk.inverse('CHEATING!'));
		const keys = answer.slice(5).match(/\S+/g);
		printAnswers(item, keys);
	} else if (answer == 'skip'){
		console.log(chalk.yellow('SKIPPING...'));
		counter++;
		newItem = true;
	} else {
	    let match = answer.match(/^(\w{2})\s+(.+)$/);
	    if (match) {
	    	const key = match[1];
	    	for (var i = 0; i < DETAIL_FIELDS.length; i++) {
	    		const detailField = DETAIL_FIELDS[i];
	    		if (key == detailField.shortcut){
	    			const itemField = item[detailField.key];
	    			if (detailField.array) {
						const tokens = match[2].split(',');
						for (var i = 0; i < tokens.length; i++) {
							const token = tokens[i].trim();
							if (adequateLength(token)){
								let found = false;
								for (var j = itemField.length - 1; !found && j >= 0; j--) {
									if (testToken(token, detailField.label, itemField[j])){
										found = true;
										item[detailField.key].splice(j, 1);
										remainder--;
									}
								}
								if (!found) {
		    						informIncorrect(token, detailField.label);
								}
							}
						}
	    			} else {
	    				const token = match[2].trim();
	    				if (adequateLength(token)) {
		    				if (itemField && testToken(token, detailField.label, itemField)){
		    					delete item[detailField.key];
								remainder--;
		    				} else {
		    					informIncorrect(token, detailField.label);
							}
	    				}
	    			}
	    			return;
	    		}
	    	}
	    	informInvalidKey(key);
			return;
	    }
	    console.log(chalk.magenta('Invalid input. Try "help"'));
	}
}

function testToken(token, label, answer) {
	const indexStart = answer.toLowerCase().indexOf(token.toLowerCase());
	if (indexStart != -1) {
		informCorrect(answer, indexStart, indexStart + token.length, label);
		return true;
	}
	return false;
}

function informCorrect(answer, indexStart, indexEnd, label){
	console.log(chalk.green('✔', chalk.bold(label), answer.slice(0, indexStart) + chalk.inverse(answer.slice(indexStart, indexEnd)) + answer.slice(indexEnd, answer.length)));
}

function informIncorrect(token, label) {
	console.log(chalk.red('✘', chalk.bold(label),  chalk.inverse(token)));
}

function informInvalidKey(token) {
	console.log(chalk.magenta(`Invalid key "${token}". Enter`, chalk.bold('keys'), 'to display a list of keys'));
}

function adequateLength(token){
	if (token.length <= 2) {
		console.log(chalk.magenta('✘', chalk.bold('Entry must be 3 or more characters'),  chalk.inverse(token)));
		return false;
	}
	return true;
}
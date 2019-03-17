var male = prompt("What's the name of the male?");
check_prompt_cancel(male);
var female = prompt("What's the name of the female?");
check_prompt_cancel(female);
matchThemUp(male, female);

/**
*
* Function that ask questions and try to match them up
*
**/
function matchThemUp(male_name, female_name){
	var both = [];
	var questions = [];

	both.push({"gender":"male", "name":male_name, "answers":[]})
	both.push({"gender":"female", "name":female_name, "answers":[]})

	questions.push({"tag": "pets", "question": "Do you like pets "});
	questions.push({"tag": "beer", "question": "Do you like beer "});
	questions.push({"tag": "books", "question": "Do you like reading books "});
	questions.push({"tag": "bike", "question": "Do you enjoy riding bike "});
	questions.push({"tag": "music", "question": "Do you like mainstream music the most "});
	
	// Fill answers on both array
	both.forEach(function(both_val){
		questions.forEach(function(val){
			var validated = false;
			var answer = '';
			while(validated != true){
				answer = prompt(val.question + both_val.name + '? (Please answer Yes or No)');
				check_prompt_cancel(answer);
				validated = validate_answer(answer);
			}
			both_val.answers.push({"tag": val.tag, "answer": answer});
		});
	});
	
	//Compare answers
	var matched_answers = 0;
	var male_answers = both.filter(gender => gender.gender === 'male')[0];
	var female_answers = both.filter(gender => gender.gender === 'female')[0];
	var count_answers = both[0].answers.length;

	male_answers.answers.forEach( function(val){
		var question_female_answer = female_answers.answers.filter(function(result){return result.tag == val.tag})[0];
		if(question_female_answer.answer == val.answer){
			matched_answers++;
		}
	});

	if (matched_answers > count_answers/2){
		alert("We have a match");
	}
	else{
		alert("No match found!");
	}
}

/**
*
* Function to validate that the answer is Yes or No
* Returns True if it's Yes or No. Otherwise retuns false
*
**/
function validate_answer(answer){
	switch(answer.toLowerCase()){
		case 'yes':
			return true;
			break;
		case 'no':
			return true;
			break;
		default:
			return false;
			break;

	}
}

/**
*
* Function to cancel execution if cancel button is pressed
*
**/
function check_prompt_cancel(answer){
	if (answer == null) {
		alert('You canceled. Execution stopped.');
		throw new Error("Exection canceled by user");
	}
}
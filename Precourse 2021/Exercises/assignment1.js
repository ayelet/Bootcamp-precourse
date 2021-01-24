// Assignment1: Fun quiz
// Author: Ayelet Danieli

'use strict';
const { readlinkSync } = require('fs');
var readlineSync = require('readline-sync');
const stars = "**********************************************";
////////////////////////////////////////////////////////////////
// Display one question from the quiz
function displayQuestion(i) {
    console.log(stars);
    console.log(myQuiz[i].question);
}
/////////////////////////////////////////////////////////////////
// Display optional answers for the questions 
function displayPossibleAnswers(i, keys) {

  // After shuffling the keys, let's map them to the questions
  let shuffledQuestions = keys.map(function(cur) {
    return myQuiz[i].answers[cur];
    })
  
    let choice = readlineSync.keyInSelect(shuffledQuestions, null, {cancel: false});
  
   let score = myScore[keys[choice]];
  

    return score;
};
///////////////////////////////////////////////////////////////////////////
// Shuffle the answers so that the quiz will not be
// too obvious to the user
function shuffleKeys() {

    let displayArray = ['a', 'b', 'c', 'd'];
    
    // sort keys in random order
    displayArray.sort((a,b) => 0.5 - Math.random());
    
    return displayArray;
}
///////////////////////////////////////////////////////////////////////////////
// Calculate the end result according to what user have answered
function calcResults(totalScore) {
    // results are calculated as the total score divided by the maximum 
    // score presents normalized to a hundred
    let numQuestions = myQuiz.length;
  
    let maxScore = myScore['d'] * myQuiz.length;
    let normalizedScore  = (totalScore / maxScore) * 100;
    //console.log("max score is " + maxScore + ". Score obtained is " + normalizedScore);
   return normalizedScore;
};
//////////////////////////////////////////////////////////////
// show to results according to the score obtained
function showDiagnosis(score) {
   // console.log("You are " + Math.floor(score) + "% foodie");
    let i = 0;
    if (score <= 25)
        i = 0;
    else if (score <= 50)
        i = 1;
    else if (score <= 75)
        i = 2;
    else 
        i = 3;

    console.log(myDiagnosis[i]);

};
///////////////////////////////////////////////////////////////////////
const title = "How foodie are you?";
const title1 = `              
        \\|||/
        (o o)        
,---ooO--(_)-------.  
|   Test Yourself:  |           
|   Are you a real  | 
|       Foodie?     |
'--------------Ooo--'   
       |__|__|       
        || ||            
       ooO Ooo              `;

// score of the question's quiz
const myScore = {
    a: 5,
    b: 10,
    c: 15,
    d: 20
}

const myQuiz = [
    {
      question: "What kind of a mustard is in your kitchen?",
      answers: {
        a: "None. I hate mustard.",
        b: "I'm trying out some new organic mustards.",
        c: "I'll only use French yellow mustard",
        d: "Homemade stone ground mustard."
      }
    },
    {
      question: "Which pickles do you prefer on your plate?",          
      answers: {
        a: "None. I hate pickles",
        b: "Classic",
        c: "Whatever it is, it's going to remain on the plate",
        d: "Homemade garlic pickles"
      }
    },
    {
      question: "What do you order at McDonald's?",
      answers: {
        a: "My usual: McDouble and a Large Fry.",
        b: "I'll eat the McRib when it's available.",
        c: "Big Mac, no lettuce, extra special sauce, no pickles.",
        d: "Nothing. I'd rather starve"
      }
    },
    {
        question: "How many spices do you own?",
        answers: {
          a: "umm.. do salt and pepper count?",
          b: "a few, such as maybe... garlic, parsley, oregano, nutmeg",   
          c: "A spice rack with all the standard stuff",
          d: "My spice collection includes exotic spices like cardamom, white pepper, achiote, and chinese five spice"
        }
      },
      {
        question: "When you watch competitive food shows, you...",
        answers: {
          a: "Huh? I don't watch those shows",
          b: "are amazed at the dishes prepared",
          c: "imagine yourself competing",
          d: "actually create dishes in your head that you would've prepared"
        }
      },
      {
        question: "How many types of vinegar do you have in your kitchen now?",
        answers: {
          a: "Vine-what?",
          b: "Not more than one",
          c: "2 or 3",
          d: "I own every type of vinegar ever created on this planet"
        }
      }
  ];

  const myDiagnosis = [
`Well, you are not a foodie! 
You should try stepping out of your comfort zone once in awhile 
to sample what else is out there!`,
`You've got a little foodie in you, but you're not a true epicurean. 
Bravo for stepping outside your comfort zone sometimes and experimenting, though!`,
`Well, you are more than half foodie. 
You know what you like and you are willing to explore, to find new flavors. 
But you are not a hardcore foodie. You don't go overboard.`,
`Wow, you are a total foodie! 
Your palate must be constantly challenged with new flavors. 
Your christmas list is all pasta makers and immersion blenders. 
Other people think you are a bit loco, but you don't care!`
  ];

  ////////////////////////////

  console.log(stars);
  console.log(title1);
  console.log(stars);
  console.log("Test yourself: Are you a real foodie?")
  console.log(stars);
 
  let n = myQuiz.length;

  let totalScore = 0;
 // Display question and answers
  for (let i = 0; i < n; i +=1) {
    displayQuestion(i);
    let answersToDisplay = shuffleKeys();
    totalScore += displayPossibleAnswers(i, answersToDisplay);
  }

  // calculate score
  let normalizedScore = calcResults(totalScore);
  // Display score
  console.log(stars);
  console.log("Your diagnosis:")
  console.log(stars);
  showDiagnosis(normalizedScore);
  console.log(stars);

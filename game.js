var error_guess = 0 ;
var correct_guesses =[] ;
var error_guesses= [] ;
var string = [];
var used = [];
s = "Welcome in Hangman game =) , Are you ready to when ?"
console.log(s);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Start a game ?', (ans) => {
    if (ans === 'Y' || ans === 'y')
    {
        start() ;
    }
    else{

        process.exit(1);
    }

});
function word_choice(max, words) {
    while (1) {
        let x = Math.trunc(Math.random() * max - 1);
        var word = words[x];
        if (!used.includes(word)) {
            used.push(word);
            break;
        }
    }
    return word;
}
function start() {
    string =[] ;
    error_guesses= [];
    correct_guesses =[];
    error_guess = 0 ;
    str="now you have a word from 4 letters ,you have to guess them .you have just 6 guesses so be careful ^-^";
    const fs = require('fs');
    const content = fs.readFileSync('words.txt', 'utf8');
    const words = content.split("\n");
    let max = words.length;
    var word = word_choice(max, words);
    var output = word.split('');
    var s='' ;
    for (var i = 0; i < output.length-1; i++) {
        s=s+'-';
        string[i]='-';
    }
    console.log(s);
    let uniqueChars = [...new Set(output)];
    readvalue (uniqueChars ,output) ;
}
function  readvalue (output , n)
{   console.log("uncorrected attempt: ");
    var uncorrected_attempt ='';
    for (var j = 0; j < error_guesses.length; j++) {
        uncorrected_attempt=uncorrected_attempt+error_guesses[j];
    }
    console.log(uncorrected_attempt);

    rl.question('Inter a guess', (ans) => {


        var v =   play (ans,output,n) ;
        if (v === 1)
        {
            readvalue(output,n) ;
        }
        else {

            s = "Would you like to start a gain or exit(y/n) ?" ;

            const readline = require('readline');

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(s, (ans2) => {
                if (ans2 === 'Y' || ans2 === 'y')
                {
                    start() ;
                }
                if (ans2 === 'n' || ans2 === 'N')
                {
                    process.exit(1);
                }

            });

        }

    });
}
function correct_ans(ans, n, output, i) {
    var flage = 0;
    for (var j = 0; j < correct_guesses.length; j++) {
        if (ans === correct_guesses[j]) {
            console.log("you try it");
            flage = 1;
        }
    }
    if (flage === 0) {
        console.log("Correct *_*");

        for (var v = 0; v < n.length - 1; v++) {
            if (output[i] === n[v]) {
                string[v] = n[v];
            }


        }
        correct_guesses.push(output[i]);
        var st ='';
        for (var u = 0; u < string.length; u++) {
            st=st+string[u];

        }
        console.log(st);

    }
    return {flage, j, v, u};
}
function Uncorrect_ans(ans) {
    var flage2 = 0;
    for (var j = 0; j < error_guesses.length; j++) {
        if (ans === error_guesses[j]) {
            console.log("Letter already used");
            flage2 = 1;
        }
    }
    if (flage2 === 0) {
        error_guess = error_guess + 1;
        error_guesses.push(ans);
        drow(error_guess);
        console.log("UNCORRECT ANSWER =(");

    }
}
function correct_value(output, ans, findit, n) {
    for (var i = 0; i < output.length - 1; i++) {
        if (ans === output[i]) {
            findit = 1;
            correct_ans(ans, n, output, i);

        }


    }
    return findit;
}
function anumber_valu() {
    console.log("Incorrect value");
    return 1;
}
function  play (ans,output,n)
{
    var input = ans.split('');

        if (input.length ===1)
    {

        if (parseInt(input[0]) >=0 && parseInt(input[0]) <=9 )
        {
            return anumber_valu();
        }
        else {
            var findit =0;
            findit = correct_value(output, ans, findit, n);
            if (findit===0)
            {
                Uncorrect_ans(ans);

            }
            if (correct_guesses.length === output.length-1) {
                console.log("CORRECT ANSWER!!! You GOT IT ^o^ ");
                return 0;

            }
            if (error_guess=== 6)
            {    console.log("GAME OVER ~_~");
                return 0;
            }
        }

    }
    else {
            if (parseInt(input[1]) === 1 &&input[0] === '-' )
            {

                return 0 ;
            }
            console.log ("Incorrect value");
            return 1;
    }
    return 1;

}
function drow(n)
{
    switch (n){
        case 1:drowhead() ; break;
        case 3:drowleftarm() ; break;
        case 4:drowrightarm() ; break;
        case 5:drowleftleg() ; break;
        case 6:drowrightleg() ; break;
        case 2:drowtorso() ; break;
    }
}
function drowhead (){
    console.log("---------");
    console.log("|       |");
    console.log("|       O");
    console.log("|       ");
    console.log("|       ");



}
function drowleftarm (){
    console.log("---------");
    console.log("|       |");
    console.log("|       O");
    console.log("|      /|");
    console.log("|       ");




}
function drowrightarm (){
    console.log("---------");
    console.log("|       |");
    console.log("|       O");
    console.log("|      /|\\");
    console.log("|       ");



}
function drowleftleg (){
    console.log("---------");
    console.log("|       |");
    console.log("|       O");
    console.log("|      /|\\");
    console.log("|      / ");



}
function drowrightleg (){
    console.log("---------");
    console.log("|       |");
    console.log("|       O");
    console.log("|      /|\\");
    console.log("|      / \\");



}
function drowtorso (){
    console.log("---------");
    console.log("|       |");
    console.log("|       O");
    console.log("|       |");
    console.log("|       ");




}

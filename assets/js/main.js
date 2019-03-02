
var Quize = {
    // Declar Variable 
        questions: "",
        currentQuestion: 0,
        quizeTime: 10,
        Timer:this.quizeTime,

        correct:   0,
        incorrect: 0,
        noAnswer:  0,

        intervalId:0,

    // ========= Timer check
        decrement:function(){
            $(".timeLeft").html("Time Left:" + Quize.Timer )
            if (Quize.Timer === 0) {
                $(".message").removeClass("msgCorrect");
                $(".message").text("Time Up!").addClass("msgWrong")
                Quize.noAnswer++;
                Quize.currentQuestion++;
                Quize.Timer=Quize.quizeTime;
                Quize.disableItems();
                clearInterval(Quize.intervalId);
                setTimeout(function() {
                    Quize.startQuize();
                }, 2000);    
            }else 
            Quize.Timer--;
    
        },

    // ========= Reset Page 
        restPage: function(){
            $(".list-group").empty();
            $(".message").empty();
            if (Quize.currentQuestion<questionLib.length){
                Quize.Timer= Quize.quizeTime;
                $(".progress-bar").width((100/questionLib.length)*(Quize.currentQuestion) + "%")
            }
            else {
                Quize.displayResult(1);
            }
        },
            
    // ========= Reset Page 
        resetQuize: function(){
            $(".list-group").empty();
            $(".message").empty();
            $( "#result" ).hide();
            $( ".list-group" ).show();
            Quize.currentQuestion = 0;
            Quize.noAnswer = 0;
            Quize.correct = 0;
            Quize.incorrect = 0;
            Quize.nextQuize(questionLib[Quize.currentQuestion]);
            $(".progress-bar").width((100/questionLib.length)*(Quize.currentQuestion) + "%")
        },
            
    // ========= Disable Items
        disableItems: function(){
            $(".list-group-item ").addClass("disabled")
        },

    //========  check answers
        checkAnswer: function(question,answer){
            if (question.answers[question.cAnswer-1]=== answer){
                Quize.correct++;
                $(".message").text("Correct Answer!").addClass("msgCorrect")
                $(".message").removeClass("msgWrong")
            }
            else{
                Quize.incorrect++;  
                $(".message").text("Wrong Answer!").addClass("msgWrong")
                $(".message").removeClass("msgCorrect")
            }
        },

    // ========= Next Quize
        nextQuize: function(question){
            clearInterval(Quize.intervalId);
            Quize.intervalId = setInterval(Quize.decrement, 1000);
            Quize.restPage();
            $( ".progress" ).show();

            qItem = $("<a>",{
                "class": 'list-group-item list-group-item-action active list-group-header text-break',
                text: question.question});
                href: 'somelink.html',
                $(".list-group").append(qItem);

            for(var i=0; i< question.answers.length; i++)
            {
                qItem = $("<input>",{
                    "class": 'list-group-item list-group-item-action choose',
                    val: question.answers[i],
                    type: "submit",
                    click: function(){
                        Quize.disableItems();
                        Quize.checkAnswer(question, $( this ).val());
                        Quize.currentQuestion++;
                        clearInterval(Quize.intervalId);
                        setTimeout(function() {
                            Quize.restPage();
                            Quize.startQuize();
                        }, 2000);
                }});
                
                $(".list-group").append(qItem);    
            }
        },


    // ========= Start Quize
        startQuize: function(){
            Quize.displayResult(0)        
            if (!(Quize.currentQuestion === questionLib.length))
                Quize.nextQuize(questionLib[Quize.currentQuestion]);
            else
                Quize.displayResult(1)
            
        },        

    // ========= Display Result
        displayResult: function(stat){
            if (stat==0){
                $( "#result" ).hide();
            }else 
            {
                $( ".list-group" ).hide();
                $( ".progress" ).hide();
                $( "#result" ).show();
                $(".timeLeft").empty();
                $(".message").empty();
                $( "#ACorrect" ).text("Correct: " + Quize.correct);
                $( "#AIncorrect" ).text("Incorrect: " + Quize.incorrect);
                $( "#NoAnswer" ).text("No Answered: " + Quize.noAnswer);
                $( "#AScore" ).text("Score: " + (Quize.correct/questionLib.length*100) + "%");
                if ((Quize.correct/questionLib.length*100) >=70){
                    $("#Passed").html("<h2>PASSED</h2>");
                    $("#Passed").addClass("bg-success");
                    $("#Passed").removeClass("bg-danger");
                }
                else{
                    $("#Passed").html("<h2>FAILED</h2>");
                    $("#Passed").addClass("bg-danger");
                    $("#Passed").removeClass("bg-success");
                }

            }
        }

}        


$( document ).ready(function() {
    $("#resetQuize").on("click",Quize.resetQuize);
    Quize.startQuize();
});

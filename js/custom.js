/**
 Add any custom JS like widgets into this file.
 */
var multiChoiceMethod = {
    revealAnswer:function(){
        //the element variable represents the element that was clicked on.
        var element = this;
        //grab all the LI within the parent
        var listItems = element.parentNode.getElementsByTagName('li');
        //RIP through them, if correct then style one way, if NOT make gray.
        for (var i=0, length=listItems.length;i < length;i++){
            var theClassname = listItems[i].className;
            if (theClassname == "correct cel-answer"){
                //this is the correct answer so turn it green
                listItems[i].classList.remove("cel-answer");
                listItems[i].classList.add("cel-answer-is-correct");
                //now shove the feedback into something you can view.
                var theFeedback = listItems[i].getAttribute("data-feedback");
            }
            else{
                //this is the wrong answer so turn it grey
                listItems[i].classList.remove("cel-answer");
                listItems[i].classList.add("cel-answer-is-incorrect");
                listItems[i].removeEventListener("click",multiChoiceMethod.revealAnswer,false);
                //listItems[i].parentNode.removeEventListener("click",multiChoiceMethod.revealAnswer,false);
            }//end if
        }//end for
        //if your questions have no feedback then just comment the following line out.
        alert(theFeedback);

    } //end function
}; //end method
var multiChoiceQuestion = document.getElementsByClassName("cel-answer");
for(var xz=0;xz<multiChoiceQuestion.length;xz++){
    multiChoiceQuestion[xz].addEventListener("click",multiChoiceMethod.revealAnswer,"false");
}//end for

document.getElementById("fillBlank1").addEventListener("click", function(){this.innerHTML = " blanks ";}, false);

document.getElementById("fillBlank2").addEventListener("click", function(){this.innerHTML = " easy ";}, false);
document.getElementById("fillBlank3").addEventListener("click", function(){this.innerHTML = " variety of ways ";}, false);

var accordionMethod = {
    celAccordionHandler:function(){
        //grab the parent element
        var theAccordionParent = document.getElementById(this.parentNode.parentNode.id);
        if(theAccordionParent.getElementsByClassName("is-activeAccordion")[0]){
            //if there is an active accordion then change it to is-invisible class
            theAccordionParent.getElementsByClassName("is-activeAccordion")[0].classList.add("is-invisible");
            theAccordionParent.getElementsByClassName("is-activeAccordion")[0].classList.remove("is-activeAccordion");
        }//end if
        //if there is an openAccordion (header object clicked upon) change it to closed as well.
        if(theAccordionParent.getElementsByClassName("is-openAccordion")[0]){
            theAccordionParent.getElementsByClassName("is-openAccordion")[0].classList.add("is-closedAccordion");
            theAccordionParent.getElementsByClassName("is-openAccordion")[0].classList.remove("is-openAccordion");
        }//end if
        //now show the accordion that was clicked.
        var showThisAccordion = this.parentNode;
        this.classList.remove("is-closedAccordion");
        this.classList.add("is-openAccordion");
        this.parentNode.classList.add("is-cleared");
        //replace class name.
        showThisAccordion.getElementsByClassName("is-invisible")[0].className = "is-activeAccordion";
    }//end function
};/*end accordionMethod*/
var accordionHeaders = document.getElementsByClassName("cel-accordionHeader");
for(var ah=0;ah<accordionHeaders.length;ah++){
    accordionHeaders[ah].addEventListener("click",accordionMethod.celAccordionHandler,"false");
}//end for
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

var theTabularContainers = document.getElementsByClassName("cel-tabular-container");
for(var z=0;z<theTabularContainers.length;z++){
    theTabularContainers[z].classList.add("is-card");
    //looping through each tabular group
    //grab the all the nav elements within that container.
    var theNavsWithin =  theTabularContainers[z].getElementsByClassName("cel-tabNav");
    var theBase = 100 - theNavsWithin.length;
    var tabNavWidthPercentage = theBase/theNavsWithin.length;
    for(var a=0;a<theNavsWithin.length;a++){
        theNavsWithin[a].style.width = tabNavWidthPercentage+"%";
    }//end for
}//end for
var tabularMethod = {
    tabularHandler:function(){
        //this is called when a tab is clicked and changes the content to the tab clicked upon..
        var theClickedTabNav = this;

        var theTabularParent = this.parentNode.parentNode;
        var theNumberOfClickedTabNav = theClickedTabNav.id.substr(-1);
        var theIDOfNeededTab = theTabularParent.id+"-tab-"+theNumberOfClickedTabNav;
        //remove the active classname off the currently active tabNav
        theTabularParent.getElementsByClassName("is-activeTabNav")[0].classList.remove("is-activeTabNav");
        //hide the currently active tab
        theTabularParent.getElementsByClassName("is-activeTab")[0].classList.add("is-invisible");
        //remove the active designation from currently active tab
        theTabularParent.getElementsByClassName("is-activeTab")[0].classList.remove("is-activeTab");

        //Add the active class to the tabNav you just clicked.
        theClickedTabNav.classList.add("is-activeTabNav");
        //show the newly clicked tab content
        document.getElementById(theIDOfNeededTab).classList.remove("is-invisible");
        document.getElementById(theIDOfNeededTab).classList.add("is-activeTab");
    }//end tabularfunction
}; //end method

var theTabNavs = document.getElementsByClassName("cel-tabNav");
var theTabs = document.getElementsByClassName("cel-tab");
for (var x=0;x < theTabNavs.length;x++){
    theTabNavs[x].addEventListener("click",tabularMethod.tabularHandler,false);
    var theTabNavParentID = theTabNavs[x].parentNode.parentNode.id;
    theTabNavs[x].id = theTabNavParentID+"-nav-"+x;
}//end for
for(var y=0;y<theTabs.length;y++){
    var theTabParentID = theTabs[y].parentNode.parentNode.id;
    theTabs[y].id = theTabParentID+"-tab-"+y;
}//end for
var clickRevealMethod = {
    revealHandler:function(){
        var getThisElement,theElementIWantTOReveal;
        getThisElement = this.getAttribute("data-reveal-ID");
        //grab that matching element
        theElementIWantTOReveal = document.getElementById(getThisElement);
        //if it's visible (show), if not then (hide).
        if(theElementIWantTOReveal.className === "theReveal is-invisible"){
            theElementIWantTOReveal.className = "theReveal";
        }else{
            theElementIWantTOReveal.className = "theReveal is-invisible";
        }
        //end if
    }//end function
};//end click reveal method

var clickRevealHeaders = document.getElementsByClassName("clickButton");
for(var yz=0;yz<clickRevealHeaders.length;yz++){
    clickRevealHeaders[yz].addEventListener("click",clickRevealMethod.revealHandler,"false");
}//end for
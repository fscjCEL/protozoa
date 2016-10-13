var methods = {
    addDropCaps:function(){
        //collects all the paragraphs classed dropcap and adds the span.
        var paragraphNodes,theFirstCharacter,theRestOfTheParagraph,node;
        paragraphNodes = document.getElementsByClassName("dropCap");
        if (paragraphNodes[0]){
            for(var i=0;i<paragraphNodes.length;i++){
                node = paragraphNodes[i];
                theFirstCharacter = node.innerHTML.substr(0,1);
                theRestOfTheParagraph =  node.innerHTML.substr(1);
                node.innerHTML = "<span class='dropcapCharacter'>"+theFirstCharacter+"</span>"+theRestOfTheParagraph;
            }//end for
        }//end if
    },//end addDropCaps function
    focusAllTheThings:function(){
        //This is so my internal links get keyboard focus (for accessibility's sake)
        //get that link
        var href=this.getAttribute("href");
        //take the hash (#) off
        var theID = href.substr(1);
        //set focus on THAT IDed element.
        document.getElementById(theID).focus();
    },//end function focusAllTheThings
    yellowFlash:function(){

        var slidesLength = methods.countTheSlides();
        for (var i = 0; i < slidesLength; i++) {
            var theActiveSlideElement = document.getElementById("slide"+(i+1));
            var theFirstParagraph = theActiveSlideElement.getElementsByTagName('p')[0];
            if(theFirstParagraph){
                if(theFirstParagraph.parentNode.className !=="figure"){
                    theFirstParagraph = theActiveSlideElement.getElementsByTagName('p')[0];
                }else{
                    theFirstParagraph = theActiveSlideElement.getElementsByTagName('p')[1];
                }//end if
                theFirstParagraph.classList.add("TheFirst");
            }//end if


        }
    },//end yellowFlashFunction
    figureModalHandler: function(){
        //change the class on the modalDialog box so it fills the screen.
        var theModalDialogBox = this.parentNode.parentNode;
        var theFigureBox = this.parentNode;
        var theFigureButton = this;
        var figureEval = theFigureButton.className;
        //open box if closed.

        if(figureEval === "figure-button-is-closed"){
            theModalDialogBox.className = "modal-dialog-is-open";
            theFigureBox.className = "figure-is-open";
            theFigureButton.className = 'figure-button-is-open';
        }

        if(figureEval === "figure-button-is-open"){
            theModalDialogBox.className = "modal-dialog-is-closed";
            theFigureBox.className = "figure-is-closed";
            theFigureButton.className = 'figure-button-is-closed';
        }//end if


    },//end figureModalHandler
    figureButtonInsertion:function(){
        var allTheFigureElements = document.getElementsByClassName("figure");

        //container for clones.
        var figureClonedNode;
        //create a close button node.
        var aCloseButton = document.createElement("a");

        //each Element needs to be transformed into the more complex structure.
        for (var i=(allTheFigureElements.length-1);i>=0;i--) {
            //clone the existing dialog.
            figureClonedNode = allTheFigureElements[i].cloneNode(true);//don’t forget to bring the children along for the ride.
            //figureClonedNode.className = "figure-is-closed";
            //delete the existing child nodes.
            while(allTheFigureElements[i].firstChild){
                allTheFigureElements[i].removeChild(allTheFigureElements[i].firstChild);
            }//end while
            //insert the cloned object to the modalDialog
            allTheFigureElements[i].appendChild(figureClonedNode);
            //change the class on the existing element to modalDialog
            allTheFigureElements[i].className = "modalDialog-is-closed";
            //make another close button
            var anotherCloseButtonCloseButton = aCloseButton.cloneNode(true);
            //id + class this close button
            anotherCloseButtonCloseButton.id = "figure-"+i;
            anotherCloseButtonCloseButton.className = "figure-button-is-closed";
            //add close button to container.
            allTheFigureElements[i].appendChild(anotherCloseButtonCloseButton);
            //add the event listener to the button
            var theFigureButton = document.getElementById("figure-"+i);
            theFigureButton.addEventListener("click", methods.figureModalHandler,false);

            var theFigureBox = theFigureButton.parentNode;
            //add the proper classname to the figure class so I can swap the classname.
            theFigureBox.className = "figure-is-closed";


            //grab the img inside the figurebox and add a classname to it.
            for(var k=(theFigureBox.children.length-1);k>=0;k--){
                var theElementType = theFigureBox.children[k].tagName;
                if(theElementType === "IMG"){
                    theFigureBox.children[k].className = "figure-image"
                }//end if
                if(theElementType === "P"){

                    theFigureBox.children[k].classList.add("figure-description");
                }//end if
            }//end for

        }//end for
    },//end figureButtonInsertion
    populateTheNavMenu: function () {
        //this function is called from main, and adds list items to the nav menu.
        var insertThisListItemElement,navLiParentNode,insertLiBeforeThis,theInitialTarget;
        //how many slides do I have?
        var theInitialSlideCount = methods.countTheSlides();



        //now that I have a target built I can send everything else it's way.
        //NOTE:this loop counts down from the total down to one.
        if(methods.countTheSlides()===1){
            //I just need to use the existing element if there is only one slide.
            //there is only one so treat it as such.
            //
            theInitialTarget = document.getElementById("mainNavList").children[0];
            theInitialTarget.id = "nav1";
            theInitialTarget.className = "activeNavElement";
            theInitialTarget.setAttribute("tabindex","-1");
            theInitialTarget.innerHTML = "1";


        }else{
            //there is more than one, so start ripping.
            //the initial target for insertion is the single empty li child in the mainNavList element
            theInitialTarget = document.getElementById("mainNavList").children[0];
            //give the blank Li an ID
            theInitialTarget.id = "nav"+theInitialSlideCount;
            //these three lines set the attributes of the target element.
            theInitialTarget.className = "navElement";

            theInitialTarget.innerHTML = theInitialSlideCount;
            for(var i=(methods.countTheSlides()-1);i>0;i--){
                //create and build the LI to be inserted
                insertThisListItemElement = document.createElement("li");
                insertThisListItemElement.id = "nav"+i;
                if(i===1){
                    insertThisListItemElement.className = "activeNavElement";
                }else{
                    insertThisListItemElement.className = "navElement";
                }//end if
                insertThisListItemElement.setAttribute("tabindex","-1");
                insertThisListItemElement.innerHTML = i;

                navLiParentNode = document.getElementById("mainNavList");
                insertLiBeforeThis = document.getElementById("nav"+(i+1));

                navLiParentNode.insertBefore(insertThisListItemElement,insertLiBeforeThis);
            }//end for
        }//end if


    },//end populateTheNavMenu
    clickScopeTOC: function () {
        var theIDtoSend, theTOCparentID;
        theTOCparentID = this.parentNode.id;
        //alert(theTOCparentID);
        if (theTOCparentID === "tocClosedState") {
            //This TOC is CLOSED and needs to be OPENED.

            theIDtoSend = this.id;//(theTocTarget)

            methods.openTOC(theIDtoSend);
        }//end if
        if (theTOCparentID === "tocOpenState") {
            //This TOC is OPEN and needs to be CLOSED.

            theIDtoSend = this.id;//(theTocTarget)

            methods.closeTOC(theIDtoSend);
        }//end if
    },//end scopeTOC function
    closeTOC: function (incomingSlideID) {

        var theTOCelement = document.getElementById(incomingSlideID).parentNode.id;//so theTocTarget's parentNode

        document.getElementById(theTOCelement).scrollTop = 0;
        document.getElementById(theTOCelement).className = "TOCs";
        document.getElementById(theTOCelement).id = "tocClosedState";

    },//end justCloseTOC
    openTOC: function (theIDofWHatIClicked) {
        var theTOCelement = document.getElementById(theIDofWHatIClicked).parentNode;
        //add is-cleared to the open menu so it shows everything inside.

        theTOCelement.classList.add = "is-cleared";
        theTOCelement.id = "tocOpenState";

    },//end function
    traverse: function (task, node) {
        var childNode;
        //the arriving "task" is what to you want to do with the "node"
        //"node" needs to be a slide. So RIP through all the slide's children
        for (var xxx = 0; xxx < node.childNodes.length; xxx++) {
            childNode = node.childNodes[xxx];//this one variable is easier to work with.
            task(childNode);//do task to childnode.
            //if this childNode has children then lets go again.
            if (childNode.childNodes.length > 0) {
                methods.traverse(task, childNode);
            }
        }//end for
    },//end function
    tocHandler: function () {
        //called from main...this function reads the headers and subheaders from each slide, and then builds the table of contents List Items based on that.
        //It runs once when the page loads.
        var theNewElement, insertNewBefore, theNumberOfSlides, currentSlideID, currentSlideElement, theCurrentSlide;
        var stopBit = 1;

        function addTheIDToTheTOCElement() {
            var grabMyChild;
            if (document.getElementById("tocClosedState")) {
                grabMyChild = document.getElementById("tocClosedState");
            }
            if (document.getElementById("tocOpenState")) {
                grabMyChild = document.getElementById("tocOpenState");
            }

            grabMyChild.children[0].id = "theTocTarget";//set the ID of the one and only li, to set it up as a landing target for other LIs
            grabMyChild.children[0].className = "TOCtargets";//apply the classname to the same li as above.
            grabMyChild.children[0].style.listStyleType = "none";
        }//end addTheIDToTheTOCElement function
        addTheIDToTheTOCElement();
        function processCapturedNode(type, node) {//process type of "H1" and the actual <h1> element dom object
            //generate a random # to use as a header ID, and to write as an HREF target.
            //this gives me a random, usually 4 digit, number to identify and connect each header/href pair.
            var randomNumforNodes, theHREFiNeed, slideBit, newVar;
            randomNumforNodes = Math.round((Math.random() * 10000));
            //apply the random # to the ID of the header
            node.id = theCurrentSlide + "-" + type + "-" + randomNumforNodes;//apply the ID.
            //add a tabindex so this can be jumped to from the toc and retain keyboard focus
            node.setAttribute("tabindex","-1");
            //used to control the if statement (below) that creates new slide sub lists..
            slideBit = theCurrentSlide.substr(5);
            //this variable used to create the anchor element in the TOC.
            newVar = "nav" + theCurrentSlide.substr(5);
            // build the HREF that is inserted into list item.
            theHREFiNeed = "#" + theCurrentSlide + "-" + type + "-" + randomNumforNodes;
            //build the anchor that is inserted into the list item.
            //todo only pull the slide title out of node.innerHtml and write it to this
            //linkInnerHtml variable where node.innerHTML is written currently
            //so only grab the className of slideTitle as children of node.
            var insertThisTitle;
            if(node.children[0]){//todo this breaks when you put a br into any header
                //grabbing the slide title from the slide header itself
                insertThisTitle = node.children[1].innerHTML;
            }else{
                //nope this is a normal header with no children.
                insertThisTitle = node.innerHTML;
            }


            // create the new list item
            //theNewElement = document.createElement(type);//ex.type=h2 should be <a
            theNewElement = document.createElement("a");
            if (type==="H2"){
                theNewElement.className = "toc-link-header";
                // craft the header element as the innerHTML of the list item.
                theNewElement.innerHTML =  "<span class='is-dormant'>&mdash;jump to slide:"+theCurrentSlide.substr(5)+"&mdash;</span>"+insertThisTitle+"<br>";

            }//endif
            if (type==="H3"){
                theNewElement.className = "toc-link-subheader";
                // craft the header element as the innerHTML of the list item.
                theNewElement.innerHTML =  "<span class='is-dormant'>&mdash;jump to slide:"+theCurrentSlide.substr(5)+"&mdash;</span>&ensp;"+insertThisTitle+"<br>";

            }//endif

            theNewElement.href = theHREFiNeed;
            theNewElement.setAttribute("data-destination", theCurrentSlide);
            theNewElement.setAttribute("data-destinationNavID", newVar);
            //this is here because I want to suppress defeault link behavior in screen readers (which is tabindex=0)
            theNewElement.setAttribute("tabindex", "-1");


            if (stopBit === Number(slideBit)) {
                //Grab the parent I want to insert the list into.
                var theTOCParentMainList;//<--this should remain the same because it is the starter list.

                if (document.getElementById("tocClosedState")) {
                    theTOCParentMainList = document.getElementById("tocClosedState");
                }
                if (document.getElementById("tocOpenState")) {
                    theTOCParentMainList = document.getElementById("tocOpenState");
                }
                // create the child list that will eventually hold actual list items.
                var theSlideTOCList = document.createElement("li");//<--Dont touch.This holds each slides info
                // give the new parent list an ID
                theSlideTOCList.id = "slide" + slideBit + "TOC";
                theSlideTOCList.className = "TOC";
                // adding one span to the new parent to act as a landing pad for others.
                theSlideTOCList.innerHTML = "<span id='slide" + slideBit + "TocTarget'" + " class='hidden'></span>";
                //grab the element that is the landing pad for the new parent list.
                insertNewBefore = document.getElementById("theTocTarget");
                // execute the insertion of the new parent. This acts as a target for the list insertion and changes each time the slide changes.
                // Parent should be main list, element should be created, and insertBefore should ALWAYS be the one IDed element inside the main TOC list.
                theTOCParentMainList.insertBefore(theSlideTOCList, insertNewBefore);
                stopBit++;
            }//end if
            //grab the element for the list within the list.
            var subTocParentELement = document.getElementById("slide" + slideBit + "TOC");
            // the insert before element.
            var TocSubListTarget = document.getElementById("slide" + slideBit + "TocTarget");
            //now that I have everything put it together.
            subTocParentELement.insertBefore(theNewElement, TocSubListTarget);
        }//end processCapturedNode function
        function captureNodes(node) {

            if (node.nodeName === "H2") {
                processCapturedNode("H2", node);
            }//end if
            if (node.nodeName === "H3") {
                processCapturedNode("H3", node);
            }//end if

        }//end captureNodes function


        //RIp through all the elements on each slide to populate all the menus.

        theNumberOfSlides = methods.countTheSlides();//the total amount of slides
        //this is the main loop.
        for (var bbb = 0; bbb < theNumberOfSlides; bbb++) {//for the length of all the slides.
            currentSlideID = "slide" + (bbb + 1);//build the slide ID
            currentSlideElement = document.getElementById(currentSlideID);//grab the slide element object to rip through.
            theCurrentSlide = currentSlideElement.id;//throw the ID of the element into a variable I can use.

            methods.traverse(captureNodes, currentSlideElement);
        }//end for loop
        document.getElementById("slide1TOC").style.marginTop = "45px";


    },//end tocHandler
    givingAccess: function () {
        /* Adding ARIA roles using JS...this is the preferred method as specified in the ARIA standard */
        var allTheLinks, theBodyTag, theForms, moduleHeaders, allTheImages, allTheOrderedLists, allTheUnorderedLists, allTheListItems, theTargetURL, theElementToInsertBefore, theElementsParent, theNewElement, targetBlank;

        //give the body the document role.
        theBodyTag = document.getElementsByTagName("body");
        if (theBodyTag) {
            for (var aa = 0; aa < theBodyTag.length; aa++) {
                theBodyTag[aa].setAttribute("role", "document");
            }//end body tag for loop
        }//end bodyTagIf
        //give all forms the forms role
        theForms = document.getElementsByTagName("form");
        if (theForms) {
            for (var bb = 0; bb < theForms.length; bb++) {
                theForms[bb].setAttribute("role", "form");
            }//end theForms for loop
        }//end theFormsIf
        //give the main nav plus it's items the navigation role.
        document.getElementById("mainNav").setAttribute("role", "navigation");
        document.getElementById("mainNavList").setAttribute("role", "navigation");

        //give the module header the banner role
        moduleHeaders = document.getElementsByTagName("moduleHeader");
        if (moduleHeaders) {
            for (var cc = 0; cc < moduleHeaders.length; cc++) {
                moduleHeaders[cc].setAttribute("role", "banner");
            }//end theForms for loop
        }//end theFormsIf
        //give all images the image role
        allTheImages = document.getElementsByTagName("img");
        if (allTheImages) {
            for (var dd = 0; dd < allTheImages.length; dd++) {
                allTheImages[dd].setAttribute("role", "image");
            }//end allTheImages for loop
        }//end allTheImagesIf
        //give all ordered lists the list role
        allTheOrderedLists = document.getElementsByTagName("ol");
        if (allTheOrderedLists) {
            for (var ee = 0; ee < allTheOrderedLists.length; ee++) {
                allTheOrderedLists[ee].setAttribute("role", "list");
            }//end allTheOrderedLists for loop
        }//end allTheOrderedListsIf
        //give all unordered lists the list role.
        allTheUnorderedLists = document.getElementsByTagName("ul");
        if (allTheOrderedLists) {
            for (var ff = 0; ff < allTheUnorderedLists.length; ff++) {
                if (allTheUnorderedLists[ff].id !== "mainNavList") {
                    allTheUnorderedLists[ff].setAttribute("role", "list");
                }//end if
            }//end allTheUnorderedLists for loop
        }//end allTheUnorderedLists If
        //give all list items the listItem role.
        allTheListItems = document.getElementsByTagName("li");
        if (allTheListItems) {
            for (var gg = 0; gg < allTheListItems.length; gg++) {
                if (allTheListItems[gg].className !== "navElement" && allTheListItems[gg].className !== "activeNavElement") {
                    allTheListItems[gg].setAttribute("role", "listitem");
                }//end if
            }//end allTheListItems for loop
        }//end allTheListItems If
        //add the title attribute to all anchors that open a new window. This lets them know that they are about to leave the page..
        allTheLinks = document.getElementsByTagName("a");
        for (var s = 0; s < allTheLinks.length; s++) {
            targetBlank = allTheLinks[s].getAttribute("target");
            if (targetBlank === "_blank") {
                //take this target URL and strip the http:// part.
                var trimThisUrl = allTheLinks[s].getAttribute("href").substr(7);
                //adding the hover title
                allTheLinks[s].setAttribute("title", "NOTE: This external link will bring you to the following URL: " + trimThisUrl);
                //adding the class that paints the arrow glyph after every link.
                allTheLinks[s].classList.add("cel-link-icon");
            }//end if
        }//end for
    },//end givingAccess function
    countTheSlides: function () {
        var theSlidesClassedActive, theSlidesClassedSlide;
        //gather all the slide elements, and all the activeSlideElements, and add them together give you a total slide count.
        theSlidesClassedSlide = document.getElementsByClassName("slide");
        theSlidesClassedActive = document.getElementsByClassName("activeSlide");
        return theSlidesClassedActive.length + theSlidesClassedSlide.length;
    },//end countTheSlides
    navMenu: function () {
        //this function makes sure the nav menu items line up proper.
        //get the amount of slides(that gives us how many nav items as well)
        var howmanySlides = methods.countTheSlides();
        //figure out how wide each should be as a percentage
        var theWidth = 100/howmanySlides;

        for(var x=0;x < howmanySlides;x++){
            //rip through all the nav elements and apply the width
            var theELementID = "nav"+(x+1);
            document.getElementById(theELementID).style.width = theWidth+"%";
        }//end for

    },//end navMenu function
    audioButtonHandler: function () {
        //This paints the audio player within the audio button.
        //It is only called when someone hits the audio button.
        var audioControlBox, theParentAudioBox, showAudioButton, audioCopy, audioLandingPad, theFreshAudioElement, sourceTag1, sourceTag2, insertAudioControlParent, audioLandingPadID, theDocTitle, theNumberToAppend;
        //establish a baseline parent element.
        theParentAudioBox = this.parentNode;//this is activeAudioBox
        //now loop through all the children and find the audioControls element so I can insert the player into it.
        for (var m = 0; m < theParentAudioBox.children.length; m++) {
            //found it.
            if (theParentAudioBox.children[m].className === "audioControls") {
                //so lets create the audio tag
                //I need a parent, and the element I want to insert it before.
                //here is the parent, how convenient.
                insertAudioControlParent = theParentAudioBox.children[m] || null;
                //where do I want to insert this element.
                audioLandingPadID = insertAudioControlParent.children[0].id;
                audioLandingPad = document.getElementById(audioLandingPadID);
                //easy way to grab the slide #to append to the ID of the audio element.
                theNumberToAppend = audioLandingPadID.substr(15);
                //create the element to insert
                theFreshAudioElement = document.createElement("audio");
                theFreshAudioElement.controls = "yes";//set the control bit
                theFreshAudioElement.id = "audioSlide" + theNumberToAppend;//give it an ID
                //insert a couple source elements into that new audio element.
                theDocTitle = document.title;//this should be set to course#-Module# BIO1000-M2
                //insert the audio element so I can insert sources inside of it.
                insertAudioControlParent.insertBefore(theFreshAudioElement, audioLandingPad);
                //create the source elements which point to the audio file.
                sourceTag1 = document.createElement("source");//for the m4a
                sourceTag2 = document.createElement("source");//for the ogg
                //build the file paths to the local audio files.
                sourceTag1.src = "media/" + theDocTitle + "-S" + theNumberToAppend + ".m4a";
                sourceTag1.type = "audio/mpeg";
                sourceTag2.src = "media/" + theDocTitle + "-S" + theNumberToAppend + ".ogg";
                sourceTag2.type = "audio/ogg";
                //now throw the source elements into the audio tag.
                theFreshAudioElement.appendChild(sourceTag1);
                theFreshAudioElement.appendChild(sourceTag2);
            }//endif
            //this reveals the audio player element, and hides the audio button element.
            if (theParentAudioBox.children[m].className === "audioButton") {
                showAudioButton = theParentAudioBox.children[m];//this is the audio button element.
                //open it.
                //showAudioButton.children[0].className = "openAudioButton";
                for (var o = 0; o < theParentAudioBox.children.length; o++) {
                    //opened
                    //this opens the box that contains the play pause buttons.
                    if (theParentAudioBox.children[o].className === "audioControls") {
                        audioControlBox = theParentAudioBox.children[o];
                        showAudioButton.style.height = "0px";
                        showAudioButton.style.width = "0px";
                    }//end if
                    if (theParentAudioBox.children[o].className === "audioButton") {
                        audioCopy = theParentAudioBox.children[o];
                    }//end if
                }//end for
            }//end if
        }//end for
    },//end audioButtonHandler method
    helpButtonHandler: function () {
        //opens and closed the help menu
        var theHelpBoxElement,theHelpButtonParent;

        theHelpButtonParent = document.getElementById("helpButton").parentNode;
        if (theHelpButtonParent.id === "helpboxOpenState") {
            //opened, and needs to be closed
            theHelpBoxElement = document.getElementById("helpboxOpenState");
            theHelpBoxElement.className = "helpBox";
            theHelpBoxElement.id = "helpboxClosedState";
        }else{
            //closed, and needs to be opened
            theHelpBoxElement = document.getElementById("helpboxClosedState");
            theHelpBoxElement.className += " is-cleared";
            theHelpBoxElement.id = "helpboxOpenState";
        }//end if

    },//end helpButtonHandler method
    changeTheActualSlide: function (destination, destinationNAV, navID, slideID) {
        //change the active slide to pastSlide this needs to occur on the nav and header elements.
        //initialize
        var theActiveSlideElement, theSlideCompareElementID, theOneIAmWorkingON, destinationsChildClassname, theChildsClassname, theActiveSlideHeaderElement, theDestinationSlideElement, INeedTheSlideNumber, allTheAudioElements, theIDforTOC, theTOCParentalID, evaluateThisSlideClassname;


        //this is to hide the header info past slide one, but I need to retain the header size to make up for the buttons located within.
        INeedTheSlideNumber = destination.substr(5);
        if(INeedTheSlideNumber>1){
            //push these styles out to a CSS class.
            //slide 2 or above
            document.getElementById("theCourseIcon").style.height="0px";
            document.getElementById("theCourseIcon").style.width="0px";
            document.getElementById("courseNumber").style.overflow = "hidden";
            document.getElementById("courseNumber").style.opacity = "0";
            document.getElementById("courseNumber").style.width = "0px";
            document.getElementById("courseNumber").style.height = "0px";


            document.getElementById("moduleNumber").style.opacity="0";
            document.getElementById("moduleNumber").style.width="0px";
            document.getElementById("moduleNumber").style.height="0px";
            document.getElementById("moduleNumber").style.overflow="hidden";




            document.getElementById("theModuleHeader").style.height="3.25em";

        }else{
            //slide 1
            document.getElementById("theCourseIcon").style.height="100px";
            document.getElementById("theCourseIcon").style.width="100px";
            document.getElementById("courseNumber").style.opacity="1";
            document.getElementById("courseNumber").style.overflow="visible";
            document.getElementById("courseNumber").style.width="60vw";
            document.getElementById("courseNumber").style.height="auto";


            document.getElementById("moduleNumber").style.opacity="1";
            document.getElementById("moduleNumber").style.overflow="visible";
            document.getElementById("moduleNumber").style.width="70%";
            document.getElementById("moduleNumber").style.height="auto";


            document.getElementById("theModuleHeader").style.height="auto";
        }
        //end if
        //TOC should close
        theIDforTOC = "theTocTarget";
        theTOCParentalID = document.getElementById(theIDforTOC).parentNode.id;
        if (theTOCParentalID === "tocOpenState") {
            //This TOC is OPEN and needs to be CLOSED.
            methods.closeTOC(theIDforTOC);
        }//end if
        //Pause any audio players that might have been started.
        allTheAudioElements = document.getElementsByTagName("audio");
        //making sure there are audio elements to pause
        if (allTheAudioElements.length > 0) {
            for (var p = 0; p < allTheAudioElements.length; p++) {
                allTheAudioElements[p].pause();
            }//end for
        }//end if
        //keyboard focus should change to the destination as well.
        document.getElementById(destination).focus();

        //This is the ID of the current active slide.
        theActiveSlideElement = document.getElementById(slideID);
        //I need to change the href of the skip to content link each time slide is changed
        document.getElementById("skipToContentLink").href = "#"+destination;
        window.location.hash = "#"+destination;
        //i am changing slides, so I need to change the look of the active header to an pastSlideHeader
        for (var g = 0; g < theActiveSlideElement.children.length; g++) {
            theChildsClassname = theActiveSlideElement.children[g].className;
            if (theChildsClassname === "slideHeader is-cleared" || theChildsClassname === "futureSlideHeader is-cleared") {
                theActiveSlideHeaderElement = theActiveSlideElement.children[g];
                theActiveSlideHeaderElement.className = "pastSlideHeader is-cleared";
            }//end if
        }//end for
        //the nav element to past style
        document.getElementById(navID).className = "pastNavElement";

        //apply the active styles to the destination slide, nav, and footer
        theDestinationSlideElement = document.getElementById(destination);
        //hit the slide
        theDestinationSlideElement.className = "activeSlide";
        //now the slidecontent and footer for the mobile view
        for (var h = 0; h < theDestinationSlideElement.children.length; h++) {
            destinationsChildClassname = theDestinationSlideElement.children[h].className;
            if (destinationsChildClassname === "futureSlideHeader is-cleared") {
                theDestinationSlideElement.children[h].className = "slideHeader is-cleared";
            }//end if
            if (destinationsChildClassname === "slideContent") {
                theDestinationSlideElement.children[h].className = "activeSlideContent";
            }//end if
            if (destinationsChildClassname === "slideFooter") {
                theDestinationSlideElement.children[h].className = "activeSlideFooter";
            }//end if
            if (destinationsChildClassname === "audioBox") {
                theDestinationSlideElement.children[h].className = "activeAudioBox";
            }//end if
        }//end for
        //now the nav element
        document.getElementById(destinationNAV).className = "activeNavElement";
        //rip through the slides changing the non-active slides to there default classes. (hiding them)
        for (var i = 0; i < methods.countTheSlides(); i++) {
            theSlideCompareElementID = document.getElementById("slide" + (i + 1)).id;
            //if this slide is NOT the one I JUST marked as "active"
            if (theSlideCompareElementID !== destination) {
                //grab the slide element
                theOneIAmWorkingON = document.getElementById(theSlideCompareElementID);
                //change the slide to a normal slide.
                theOneIAmWorkingON.className = "slide";
                for (var j = 0; j < theOneIAmWorkingON.children.length; j++) {
                    evaluateThisSlideClassname = theOneIAmWorkingON.children[j].className;

                    switch (evaluateThisSlideClassname) {
                        case "pastSlideHeader is-cleared":
                            //These are here because I want to leave these alone. THey need to retain that class.
                            break;
                        case "futureSlideHeader is-cleared":
                            break;
                        case "activeSlideContent":
                            theOneIAmWorkingON.children[j].className = "slideContent";
                            break;
                        case "activeSlideFooter":
                            theOneIAmWorkingON.children[j].className = "slideFooter";
                            break;
                        case "activeAudioBox":
                            theOneIAmWorkingON.children[j].className = "audioBox";
                            break;
                    }//end switch
                }//end for


            }//end if
        }//end for

    },//end changeTheActualSlide Method
    ascertainScope: function (type, theDestination) {
        //the purpose of this function is to send the proper 4 bits of info to the change the actual slide method.
        //maybe in the future combine this with whichInput Method.
        var destinationSlideIDNUM, destinationNavID, destinationNUM, destinationSlideID, theActiveNavID, theActiveNavNumber, theActiveSlideID;
        //the active slide
        theActiveSlideID = document.getElementsByClassName("activeSlide")[0].id;
        //build the corresponding Nav# by using the active slide number.
        theActiveNavNumber = theActiveSlideID.substr(5);
        //the active nav ID
        theActiveNavID = "nav" + theActiveNavNumber;
        //depending on which input passed build the info to send along to change the slide properly.
        switch (type) {
            case "next":
                destinationNUM = Number(theActiveSlideID.substr(5));
                //am I at the last slide?
                if ((destinationNUM + 1) > methods.countTheSlides()) {
                    destinationSlideID = "slide1";//yes I am at the last slide, and will loop back to the beginning.
                    destinationNavID = "nav1";
                    methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                } else {
                    destinationSlideID = "slide" + (destinationNUM + 1);//nope...business as usual.
                    destinationNavID = "nav" + (destinationNUM + 1);
                    methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                }//end  if
                break;
            case "prev":
                destinationNUM = Number(theActiveSlideID.substr(5));
                //am I at the first slide?
                if ((destinationNUM - 1) === 0) {
                    destinationSlideID = "slide1";
                    destinationNavID = "nav1";
                    alert(" You must be mistaken...There is nothing previous to the first slide");//yes I am at the first slide, and
                    methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);// will do nothing
                } else {
                    destinationSlideID = "slide" + (destinationNUM - 1);//nope...business as usual.
                    destinationNavID = "nav" + (destinationNUM - 1);
                    methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                }//end if
                break;
            case "nextButton":
                destinationSlideIDNUM = Number(theDestination.substr(5));//pull off slide from slide# leaving just the number
                destinationSlideID = "slide" + (destinationSlideIDNUM + 1);
                destinationNavID = "nav" + (destinationSlideIDNUM + 1);
                methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                break;
            case "prevButton":
                destinationSlideIDNUM = Number(theDestination.substr(5));
                destinationSlideID = "slide" + (destinationSlideIDNUM - 1);
                destinationNavID = "nav" + (destinationSlideIDNUM - 1);
                methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                break;
            case "navElement":

                destinationSlideIDNUM = Number(theDestination.substr(3));
                destinationSlideID = "slide" + destinationSlideIDNUM;
                destinationNavID = theDestination;
                document.getElementById(destinationSlideID).focus();
                methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                break;
            case "slideHeader":
                destinationSlideIDNUM = Number(theDestination.substr(5));
                destinationSlideID = "slide" + destinationSlideIDNUM;
                destinationNavID = "nav" + destinationSlideIDNUM;
                methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);
                break;
            case "tableOfContentsLink":
                destinationSlideIDNUM = Number(theDestination.substr(5));
                destinationSlideID = "slide" + destinationSlideIDNUM;
                destinationNavID = "nav" + destinationSlideIDNUM;
                methods.changeTheActualSlide(destinationSlideID, destinationNavID, theActiveNavID, theActiveSlideID);

                document.getElementById(destinationSlideID).focus();
                break;
        }//end switch
    },//end ascertainScope method
    whichInput: function (zz) {
        if (this.className === "toc-link-header" || this.className === "toc-link-subheader") {

            methods.ascertainScope("tableOfContentsLink", this.getAttribute("data-destination"));
        }//end if
        //clicked the next button
        if (this.className === "nextButton") {

            methods.ascertainScope("nextButton", this.parentNode.parentNode.parentNode.id);
        }//end if
        //clicked a previous button
        if (this.className === "prevButton") {
            methods.ascertainScope("prevButton", this.parentNode.parentNode.parentNode.id);
        }//end if
        //clicked a nav element
        if (this.className === "navElement" || this.className === "activeNavElement" || this.className === "pastNavElement") {
            methods.ascertainScope("navElement", this.id);
        }//end if

        //clicked a header element
        if (this.className === "slideHeader is-cleared" || this.className === "pastSlideHeader is-cleared" || this.className === "futureSlideHeader is-cleared") {
            methods.ascertainScope("slideHeader", this.parentNode.id);
        }//end if
        if (zz.keyCode === 78) {
            methods.ascertainScope("next", null);
        }//end if

        // Pressed the P key
        if (zz.keyCode === 80) {
            methods.ascertainScope("prev", null);
        }//end if

        // Pressed the UP arrow key
        if (zz.keyCode === 38) {
            //console.log("Top of the page",null);
        }//end if
        return null;
    },//end whichInput Method
    renderTheAudioButtons: function () {
        //this inserts the audio button onto the slides that have the data-hasAudioPlayer attribute set to Yes.
        var theHasAudioPlayerFlag, allTheSectionElements, theAudioInsertionTargetElement, theAudioInsertionParentElement, theAudioBoxElement, theAudioButtonElement, theAudioControlsElement, audioLandingPadElement, theSlideNumberNum, theSlideDOMElement;
        //craft the audioBox Element with all it's children.
        //Gather the section elements into one variable
        allTheSectionElements = document.getElementsByTagName("section");
        //use a loop to rip through each section element one by one.
        for (var m = 0; m < allTheSectionElements.length; m++) {
            //if this section is a slide or is the active slide
            if (allTheSectionElements[m].className === "slide" || allTheSectionElements[m].className === "activeSlide") {
                // READ the data attribute I am looking for.
                theHasAudioPlayerFlag = allTheSectionElements[m].getAttribute("data-hasAudioPlayer");
                //YES this slide is supposed to have audio.
                if (theHasAudioPlayerFlag === "yes") {
                    //now build this --> element parent.insertbefore(insertThisElement, insertItBeforeTHISElement)
                    //grab the slide
                    theSlideDOMElement = document.getElementById(allTheSectionElements[m].id);
                    //within the slide element identify the parent THEN target elements.
                    for (var nn = 0; nn < theSlideDOMElement.children.length; nn++) {
                        //insertion target is the slide header.
                        if (theSlideDOMElement.children[nn].className === "slideFooter" || theSlideDOMElement.children[nn].className === "activeSlideFooter") {

                            theAudioInsertionParentElement = theSlideDOMElement.children[nn];
                            if (theAudioInsertionParentElement.children[0].className === "nextPrevious") {
                                theAudioInsertionTargetElement = theAudioInsertionParentElement.children[0];
                            }//end if
                        }//end if
                        //change this to theSlideDOMElement

                    }//end for
                    //now create the element to insert and perform the insertion

                    theAudioBoxElement = document.createElement("section");
                    if (theAudioInsertionParentElement.id === "slide1") {
                        theAudioBoxElement.className = "activeAudioBox";
                    } else {
                        theAudioBoxElement.className = "audioBox";
                    }//end if

                    theAudioButtonElement = document.createElement("div");
                    theAudioButtonElement.className = "audioButton";
                    theAudioControlsElement = document.createElement("div");
                    theAudioControlsElement.className = "audioControls";
                    audioLandingPadElement = document.createElement("span");
                    theSlideNumberNum = theSlideDOMElement.id.substr(5);
                    audioLandingPadElement.id = "audioLandingPad" + theSlideNumberNum;
                    theAudioControlsElement.appendChild(audioLandingPadElement);
                    theAudioBoxElement.appendChild(theAudioButtonElement);
                    theAudioBoxElement.appendChild(theAudioControlsElement);
                    // This is where the audio player gets inserted into the audioControls element.
                    theAudioInsertionParentElement.insertBefore(theAudioBoxElement, theAudioInsertionTargetElement);


                }//end audioFlag if

            }//end sectionElements if
        }//end for
    },//end renderTheAudioButtons method
    main: function () {

        //this function is limited to mostly adding event listeners. The one exception, as it stands, is rendering the audio buttons on the page. This has extremely low overhead, and is the first of a two step process designed to make page loading more efficient.

        var slideHeaderElements, futureSlideHeaderElements, allTheAudioButtons, allThePreviousSLideButtons, allTheNextSLideButtons, allTheNavElements,tocListHeaders,tocListSubheaders;


        //putting all the elements into the nav menu based on how many slide there are.
        methods.populateTheNavMenu();

        //====================== now add the listeners
        //All the slide headers.


        slideHeaderElements = document.getElementsByClassName("slideHeader is-cleared");
        for (var a = 0; a < slideHeaderElements.length; a++) {
            slideHeaderElements[a].addEventListener("click", methods.whichInput, false);
        }//end for

        futureSlideHeaderElements = document.getElementsByClassName("futureSlideHeader is-cleared");
        for (var o = 0; o < futureSlideHeaderElements.length; o++) {
            futureSlideHeaderElements[o].addEventListener("click", methods.whichInput, false);
        }//end for
        //All the nav elements

        allTheNavElements = document.getElementsByClassName("navElement");
        for (var d = 0; d < allTheNavElements.length; d++) {
            allTheNavElements[d].addEventListener("click", methods.whichInput, false);
        }//end for
        document.getElementsByClassName("activeNavElement")[0].addEventListener("click", methods.whichInput, false);


        //All the next buttons
        allTheNextSLideButtons = document.getElementsByClassName("nextButton");
        for (var f = 0; f < (allTheNextSLideButtons.length - 1); f++) {
            allTheNextSLideButtons[f].addEventListener("click", methods.whichInput, false);
        }//end for

        //All the previous buttons
        allThePreviousSLideButtons = document.getElementsByClassName("prevButton");
        for (var g = 0; g < allThePreviousSLideButtons.length; g++) {
            allThePreviousSLideButtons[g].addEventListener("click", methods.whichInput, false);
        }//end for

        allTheAudioButtons = document.getElementsByClassName("audioButton");


        //Handling Keyboard input

        document.addEventListener('keyup', methods.whichInput, false);

        //the help button
        document.getElementById("helpButton").addEventListener("click", methods.helpButtonHandler, false);

        //now render all the audio buttons on the slides that have the attribute data-hasAudioPlayer="yes"
        methods.renderTheAudioButtons();//first phase
        //and now that they exist in the DOM add the listeners.
        for (var l = 0; l < allTheAudioButtons.length; l++) {//second phase
            allTheAudioButtons[l].addEventListener("click", methods.audioButtonHandler, false);
        }//end for


        //this adds accessibility features to the rendered document.
        methods.givingAccess();
        //this reads each slide, grabs all the headers, then adds those headers to the Table of Contents.
        //essentially building the Table of Contents at the top of each slide.
        methods.tocHandler();

        //the TOC button
        document.getElementById("theTocTarget").addEventListener("click", methods.clickScopeTOC, false);
        //each TOC link
        tocListHeaders = document.getElementsByClassName("toc-link-header");
        for (var ttt = 0; ttt < tocListHeaders.length; ttt++) {
            tocListHeaders[ttt].addEventListener("click", methods.whichInput, false);
        }//end for
        tocListSubheaders = document.getElementsByClassName("toc-link-subheader");
        for (var sss = 0; sss < tocListSubheaders.length; sss++) {
            tocListSubheaders[sss].addEventListener("click", methods.whichInput, false);
        }//end for

        //this creates the nav menu elements.
        methods.navMenu();
        //call the figure build
        methods.figureButtonInsertion();

        //put this into a function if it works.
        document.getElementById("skipToContentLink").addEventListener("click",methods.focusAllTheThings,false);
        document.getElementById("skipToIndexLink").addEventListener("click",methods.focusAllTheThings,false);

        methods.yellowFlash();
        methods.addDropCaps();




    }//end main method
};//end methods object.
window.onload = methods.main();
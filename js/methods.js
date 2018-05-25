var methods = {
    theImagePath:"",
    getActiveNavId: function () {
        return document.getElementsByClassName("nav-item-is-active")[0].id;
    },//end getActiveNavFunction
    countTheSlides: function () {
        //counts then returns the total amount of slides.
        var theSlidesClassedActive, theSlidesClassedSlide;
        theSlidesClassedSlide = document.getElementsByClassName("slide");
        theSlidesClassedActive = document.getElementsByClassName("activeSlide");
        return theSlidesClassedActive.length + theSlidesClassedSlide.length;
    },//end countTheSlides
    getActiveSlideId: function () {
        //this returns the active slide ID (ex. slide1) not the slide node itself.
        return document.getElementsByClassName("activeSlide")[0].id;
    },//end get ActiveSlideId
    openheplBox: function(){
        console.log("I did it")
    },//end openHelp function
    getProgramImgPath: function(){
        //returns the path to the initial icon image that gets loaded as an icon but only on slide 1
        return  methods['theImagePath'];
    },//end function
    setProgramImgPath: function(){
    //stores the path of the icon file being used for the toc menu button on the first slide so I can use it later. .
        methods['theImagePath'] = document.getElementById("toc-button").style.backgroundImage;
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
    },//end traverse function
    tocHandler: function () {
        //called from main...this function reads the headers and subheaders from each slide, and then builds the table of contents List Items based on that.
        //It runs once when the page loads.
        var theNewElement, insertNewBefore, theNumberOfSlides, currentSlideID, currentSlideElement, theCurrentSlide;
        var stopBit = 1;

        function addTheIDToTheTOCElement() {
            var grabMyChild;
            if (document.getElementById("toc-menu")) {
                grabMyChild = document.getElementById("toc-menu");
            }
            if (document.getElementById("toc-menu")) {
                grabMyChild = document.getElementById("toc-menu");
            }

            grabMyChild.children[0].id = "theTocTarget";//set the ID of the one and only li, to set it up as a landing target for other LIs
            grabMyChild.children[0].className = "TOCtargets";//apply the classname to the same li as above.
        }//end addTheIDToTheTOCElement function
        addTheIDToTheTOCElement();

        function processCapturedNode(type, node) {//process type of "H1" and the actual <h1> element dom object
            //generate a random # to use as a header ID, and to write as an HREF target.
            //this gives me a random, usually 4 digit, number to identify and connect each header/href pair.
            var randomNumforNodes, theHREFiNeed, slideBit;
            randomNumforNodes = Math.round((Math.random() * 10000));
            //apply the random # to the ID of the header
            node.id = theCurrentSlide + "-" + type + "-" + randomNumforNodes;//apply the ID.
            //add a tabindex so this can be jumped to from the toc and retain keyboard focus
            node.setAttribute("tabindex", "-1");
            //used to control the if statement (below) that creates new slide sub lists..
            slideBit = theCurrentSlide.substr(5);
            //this variable used to create the anchor element in the TOC.
            //newVar = "nav" + theCurrentSlide.substr(5);
            // build the HREF that is inserted into list item.
            theHREFiNeed = "#" + theCurrentSlide + "-" + type + "-" + randomNumforNodes;
            //build the anchor that is inserted into the list item.
            //linkInnerHtml variable where node.innerHTML is written currently
            //so only grab the className of slideTitle as children of node.
            var insertThisTitle;
            if (node.children[0]) {//this breaks when you put a br into any header
                //grabbing the slide title from the slide header itself
                insertThisTitle = node.children[1].innerHTML;
            } else {
                //nope this is a normal header with no children.
                insertThisTitle = node.innerHTML;
            }


            // create the new list item

            theNewElement = document.createElement("p");
            if (type === "H2") {
                theNewElement.className = "toc-header";
                // craft the header element as the innerHTML of the section.
                theNewElement.innerHTML = "<span class='toc-slide-num'>"+theCurrentSlide.substr(5)+" </span><span class='is-dormant'>&mdash;jump to slide:" + theCurrentSlide.substr(5) + "&mdash;</span>" + insertThisTitle + "<br />";

            }//endif
            if (type === "H3") {
                theNewElement.className = "toc-subheader";
                // craft the header element as the innerHTML of the list item.
                theNewElement.innerHTML = "<span class='is-dormant'>&mdash;jump to slide:" + theCurrentSlide.substr(5) + "&mdash;</span>&ensp;" + insertThisTitle + "<br />";

            }//endif

            theNewElement.href = theHREFiNeed;
            //this is here because I want to suppress default link behavior in screen readers (which is tabindex=0)
            theNewElement.setAttribute("tabindex", "-1");


            if (stopBit === Number(slideBit)) {
                //Grab the parent I want to insert the list into.
                var theTOCParentMainList;//<--this should remain the same because it is the starter list.

                if (document.getElementById("toc-menu")) {
                    theTOCParentMainList = document.getElementById("toc-menu");
                }
                // create the child list that will eventually hold actual list items.
                var theSlideTOCList = document.createElement("section");//<--Dont touch.This holds each slides info
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
            //this scrapes the tags for processing. Process them depending on what you capture.
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


    },//end tocHandler
    toggleTocColumn: function () {
        var theActiveSlide = methods.getActiveSlideId();
        var theColumnElement = document.getElementById("toc-column");
        if (theColumnElement) {
            if (theColumnElement.className === "toc-is-open") {
                //open and needs to be closed.
                theColumnElement.className = "toc-is-closed";
                document.getElementById("toc-button").style.backgroundImage = "url('../img/TOC-default.png')";
            } else {
                //closed and needs opening.
                theColumnElement.className = "toc-is-open";
                if (theActiveSlide !== "slide1") {
                    document.getElementById("toc-button").style.backgroundImage = "url('../img/TOC-default.png')";
                } else {

                    document.getElementById("toc-button").style.backgroundImage = methods.getProgramImgPath();
                }
            }//endif
        }//endif
    },//end toggleTocColumnFunction
    populateTheNavMenu: function () {
        //this function is called from main, and adds list items to the nav menu.
        var insertThisListItemElement, navLiParentNode, insertLiBeforeThis, theInitialTarget;
        var theInitialSlideCount = methods.countTheSlides();
        theInitialTarget = document.getElementById("nav-item-list").children[0];
        //now that I have a target built I can send everything else it's way.
        //NOTE:this loop counts down from the total down to one.
        if (methods.countTheSlides() === 1) {
            //there is only the one, so set the attributes.
            theInitialTarget.id = "nav1";
            theInitialTarget.title = "Jump to Slide 1";
            theInitialTarget.className = "nav-item-is-active";
            theInitialTarget.setAttribute("tabindex", "-1");
        } else {
            //there is more than one, so start ripping.
            theInitialTarget.id = "nav" + theInitialSlideCount;
            theInitialTarget.title = "Jump to Slide " + methods.countTheSlides();
            theInitialTarget.className = "nav-item";
            //theInitialTarget.innerHTML = theInitialSlideCount;
            for (var i = (methods.countTheSlides() - 1); i > 0; i--) {
                //create and build the LI to be inserted
                insertThisListItemElement = document.createElement("li");
                insertThisListItemElement.id = "nav" + i;
                insertThisListItemElement.title = "Jump to Slide " + i;
                if (i === 1) {
                    insertThisListItemElement.className = "nav-item-is-active";
                } else {
                    insertThisListItemElement.className = "nav-item";
                }//end if
                insertThisListItemElement.setAttribute("tabindex", "-1");
                //insertThisListItemElement.innerHTML = i;

                navLiParentNode = document.getElementById("nav-item-list");
                insertLiBeforeThis = document.getElementById("nav" + (i + 1));

                navLiParentNode.insertBefore(insertThisListItemElement, insertLiBeforeThis);
            }//end for
        }//end if


    },//end populateTheNavMenu
    closeTocColumn: function () {
        //made this function just to close th slide when I am using the next and previous menu.
        var theColumnElement = document.getElementById("toc-column");


        //always close the TOC column
        theColumnElement.className = "toc-is-closed";
        //if this is NOT slide one use the default, else use the program icon.

        document.getElementById("toc-button").style.backgroundImage = "url('../img/TOC-default.png')";


    },//end closeTocColumnFunction
    inputHandler: function(theInput){
        if(theInput.keyCode && theInput.keyCode === 38){
            //the N key was pressed.
            window.location = "#module-nav";
            return;
        }
        if(theInput.keyCode && theInput.keyCode === 78){
            //the N key was pressed.
            methods.changeTheSlide("nextButton","nope");
        }
        if(theInput.keyCode && theInput.keyCode === 80){
            //the P key was pressed
            methods.changeTheSlide("prevButton","nope");
        }//end prev key

        if (this.className === "nav-item"){
            methods.changeTheSlide("nav-item",this.id);
        }
        if (this.className === "nav-item-is-active"){
            methods.changeTheSlide("nav-item",this.id);
        }
        if (this.className === "nav-item-visited"){
            methods.changeTheSlide("nav-item",this.id);
        }
        if (this.className === "TOC"){
            methods.changeTheSlide("TOC",this.id);
        }
        if (this.className === "TOC toc-item-is-active"){
            methods.changeTheSlide("TOC",this.id);
        }
        if (this.className === "toc-item-is-active"){
            methods.changeTheSlide("TOC",this.id);
        }
        if (this.className === "nextButton"){
            methods.changeTheSlide("nextButton",this.id);
        }
        if (this.className === "prevButton"){
            methods.changeTheSlide("prevButton",this.id);
        }


    },//end function
    changeTheSlide: function (theClass,theId) {

        var theNextNumber, thePrevNumber;
        //changes the slide based on the class of the item that was clicked.
        // so the item you clicked better have a class name attached.
        var theClassToCheck = theClass;

        //calculate the next/previous slide id's before any normalizing occurs.

        var theCurrentNumber = parseInt(methods.getActiveSlideId().substr(5));
        if (theCurrentNumber < methods.countTheSlides()) {
            theNextNumber = theCurrentNumber + 1;
        } else {
            theNextNumber = 1;
        }//end if
        if (theCurrentNumber === 1) {
            thePrevNumber = 1;
        } else {
            thePrevNumber = theCurrentNumber - 1;
        }//endif

        var theNextSlide = "slide" + theNextNumber;
        var thePreviousSlide = "slide" + thePrevNumber;
        var theNextNav = "nav" + theNextNumber;
        var thePreviousNav = "nav" + thePrevNumber;

        //normalize the active slide and nav elements.
        document.getElementById("slide" + theCurrentNumber).className = "slide";
        document.getElementById("nav" + theCurrentNumber).className = "nav-item-visited";
        document.getElementById("slide" + theCurrentNumber + "TOC").classList.remove("toc-item-is-active");

        //making sure a classname exists
        function makeTocItemActive(theNeededId) {
            var destinationTocItemId = "slide" + theNeededId + "TOC";
            document.getElementById(destinationTocItemId).classList.add("toc-item-is-active");
        }

        //I clicked an item in the nav list.
        if (theClassToCheck === "nav-item" || theClassToCheck === "nav-item-is-active" || theClassToCheck === "nav-item-visited") {

            //apply the active state to the nav item clicked.
            this.className = "nav-item-is-active";
            //apply the active state to the new slide
            var theNavId = theId;
            makeTocItemActive(theNavId.substr(3));
            var destinationSlideId = "slide" + theNavId.substr(3);

            var theDestinationSlide = document.getElementById(destinationSlideId);
            theDestinationSlide.className = "activeSlide";
        }//end if
        //I clicked a next button

        if (theClassToCheck === "nextButton") {
            //change the nav class via contrived nums
            var thatNextNavItem = document.getElementById(theNextNav);
            thatNextNavItem.className = "nav-item-is-active";
            //change the Slide class to change the slide
            var thatNextSlide = document.getElementById(theNextSlide);
            thatNextSlide.className = "activeSlide";

            var theNextToc = theNextSlide.substr(5);
            makeTocItemActive(theNextToc);
        }//endif
        if (theClassToCheck === "prevButton") {
            var thatPrevNavItem = document.getElementById(thePreviousNav);
            thatPrevNavItem.className = "nav-item-is-active";
            var thatPrevSlide = document.getElementById(thePreviousSlide);
            thatPrevSlide.className = "activeSlide";
            var thePrevToc = thePreviousSlide.substr(5);
            makeTocItemActive(thePrevToc);
        }//endif
        if (theClassToCheck === "TOC" || theClassToCheck === "TOC toc-item-is-active") {
            var theTocItemId = theId;

            var theSlideId = theTocItemId.substr(0, theTocItemId.length - 3);
            var theNavID = "nav" + theSlideId.substr(5);
            makeTocItemActive(theSlideId.substr(5));
            var theNavElement = document.getElementById(theNavID);
            theNavElement.className = "nav-item-is-active";
            var theDestinationSlideElement = document.getElementById(theSlideId);

            theDestinationSlideElement.className = "activeSlide";
            window.location = "#module-nav";


        }//endif



        methods.closeTocColumn();
    },
    main: function () {
        //insert nav menu elements.
        methods.populateTheNavMenu();
        //add nav event listeners.
        document.getElementById("help-button").addEventListener("click", methods.openheplBox,false);
        var allTheNavElements = document.getElementsByClassName("nav-item");
        for (var d = 0; d < allTheNavElements.length; d++) {
            allTheNavElements[d].addEventListener("click", methods.inputHandler, false);
        }//end for
        document.getElementsByClassName("nav-item-is-active")[0].addEventListener("click", methods.inputHandler, false);
        document.getElementById("toc-button").addEventListener("click", methods.toggleTocColumn, false);
        //this reads each slide, grabs all the headers, then adds those headers to the Table of Contents.
        //essentially building the Table of Contents at the top of each slide.
        methods.tocHandler();

        var allTheNextButtons = document.getElementsByClassName("nextButton");
        for (var dd = 0; dd < allTheNextButtons.length; dd++) {
            allTheNextButtons[dd].addEventListener("click", methods.inputHandler, false);
            allTheNextButtons[dd].href = "#module-nav";
        }//end for

        var allThePrevButtons = document.getElementsByClassName("prevButton");
        for (var xx = 0; xx < allThePrevButtons.length; xx++) {
            allThePrevButtons[xx].addEventListener("click", methods.inputHandler, false);
            allThePrevButtons[xx].href = "#module-nav";
        }//end for

        var allTocs = document.getElementsByClassName("TOC");
        for (var ii = 0; ii < allTocs.length; ii++) {
            allTocs[ii].addEventListener("click", methods.inputHandler, false);

        }//end for

        document.getElementById("slide1TOC").classList.add("toc-item-is-active");
        //Handling Keyboard input
        document.addEventListener('keyup', methods.inputHandler, false);
        methods.setProgramImgPath();
    }//end main function
};//end methods object.
window.onload = methods.main();
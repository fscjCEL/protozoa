var methods={addDropCaps:function(){var e,t,n,d;if(e=document.getElementsByClassName("dropCap"),e[0])for(var a=0;a<e.length;a++)d=e[a],t=d.innerHTML.substr(0,1),n=d.innerHTML.substr(1),d.innerHTML="<span class='dropcapCharacter'>"+t+"</span>"+n},focusAllTheThings:function(){var e=this.getAttribute("href"),t=e.substr(1);document.getElementById(t).focus()},yellowFlash:function(){for(var e=methods.countTheSlides(),t=0;e>t;t++){var n=document.getElementById("slide"+(t+1)),d=n.getElementsByTagName("p")[0];d&&(d="figure"!==d.parentNode.className?n.getElementsByTagName("p")[0]:n.getElementsByTagName("p")[1],d.classList.add("TheFirst"))}},figureModalHandler:function(){var e=this.parentNode.parentNode,t=this.parentNode,n=this,d=n.className;"figure-button-is-closed"===d&&(e.className="modal-dialog-is-open",t.className="figure-is-open",n.className="figure-button-is-open"),"figure-button-is-open"===d&&(e.className="modal-dialog-is-closed",t.className="figure-is-closed",n.className="figure-button-is-closed")},figureButtonInsertion:function(){for(var e,t=document.getElementsByClassName("figure"),n=document.createElement("a"),d=t.length-1;d>=0;d--){for(e=t[d].cloneNode(!0);t[d].firstChild;)t[d].removeChild(t[d].firstChild);t[d].appendChild(e),t[d].className="modalDialog-is-closed";var a=n.cloneNode(!0);a.id="figure-"+d,a.className="figure-button-is-closed",t[d].appendChild(a);var s=document.getElementById("figure-"+d);s.addEventListener("click",methods.figureModalHandler,!1);var l=s.parentNode;l.className="figure-is-closed";for(var o=l.children.length-1;o>=0;o--){var i=l.children[o].tagName;"IMG"===i&&(l.children[o].className="figure-image"),"P"===i&&l.children[o].classList.add("figure-description")}}},populateTheNavMenu:function(){var e,t,n,d,a=methods.countTheSlides();if(1===methods.countTheSlides())d=document.getElementById("mainNavList").children[0],d.id="nav1",d.className="activeNavElement",d.setAttribute("tabindex","-1"),d.innerHTML="1";else{d=document.getElementById("mainNavList").children[0],d.id="nav"+a,d.className="navElement",d.innerHTML=a;for(var s=methods.countTheSlides()-1;s>0;s--)e=document.createElement("li"),e.id="nav"+s,1===s?e.className="activeNavElement":e.className="navElement",e.setAttribute("tabindex","-1"),e.innerHTML=s,t=document.getElementById("mainNavList"),n=document.getElementById("nav"+(s+1)),t.insertBefore(e,n)}},clickScopeTOC:function(){var e,t;t=this.parentNode.id,"tocClosedState"===t&&(e=this.id,methods.openTOC(e)),"tocOpenState"===t&&(e=this.id,methods.closeTOC(e))},closeTOC:function(e){var t=document.getElementById(e).parentNode.id;document.getElementById(t).scrollTop=0,document.getElementById(t).className="TOCs",document.getElementById(t).id="tocClosedState"},openTOC:function(e){var t=document.getElementById(e).parentNode;t.classList.add="is-cleared",t.id="tocOpenState"},traverse:function(e,t){for(var n,d=0;d<t.childNodes.length;d++)n=t.childNodes[d],e(n),n.childNodes.length>0&&methods.traverse(e,n)},tocHandler:function(){function e(){var e;document.getElementById("tocClosedState")&&(e=document.getElementById("tocClosedState")),document.getElementById("tocOpenState")&&(e=document.getElementById("tocOpenState")),e.children[0].id="theTocTarget",e.children[0].className="TOCtargets",e.children[0].style.listStyleType="none"}function t(e,t){var n,s,l,o;n=Math.round(1e4*Math.random()),t.id=i+"-"+e+"-"+n,t.setAttribute("tabindex","-1"),l=i.substr(5),o="nav"+i.substr(5),s="#"+i+"-"+e+"-"+n;var r;if(r=t.children[0]?t.children[1].innerHTML:t.innerHTML,d=document.createElement("a"),d.className="TOClink",d.href=s,d.setAttribute("data-destination",i),d.setAttribute("data-destinationNavID",o),d.setAttribute("tabindex","-1"),d.innerHTML="<"+e+"><span class='is-dormant'>jump to slide—"+i.substr(5)+"</span>"+r+"</"+e+">",c===Number(l)){var m;document.getElementById("tocClosedState")&&(m=document.getElementById("tocClosedState")),document.getElementById("tocOpenState")&&(m=document.getElementById("tocOpenState"));var u=document.createElement("li");u.id="slide"+l+"TOC",u.className="TOC",u.innerHTML="<span id='slide"+l+"TocTarget' class='hidden'></span>",a=document.getElementById("theTocTarget"),m.insertBefore(u,a),c++}var h=document.getElementById("slide"+l+"TOC"),g=document.getElementById("slide"+l+"TocTarget");h.insertBefore(d,g)}function n(e){"H2"===e.nodeName&&t("H2",e),"H3"===e.nodeName&&t("H3",e)}var d,a,s,l,o,i,c=1;e(),s=methods.countTheSlides();for(var r=0;s>r;r++)l="slide"+(r+1),o=document.getElementById(l),i=o.id,methods.traverse(n,o);document.getElementById("slide1TOC").style.marginTop="45px"},givingAccess:function(){var e,t,n,d,a,s,l,o,i;if(t=document.getElementsByTagName("body"))for(var c=0;c<t.length;c++)t[c].setAttribute("role","document");if(n=document.getElementsByTagName("form"))for(var r=0;r<n.length;r++)n[r].setAttribute("role","form");if(document.getElementById("mainNav").setAttribute("role","navigation"),document.getElementById("mainNavList").setAttribute("role","navigation"),d=document.getElementsByTagName("moduleHeader"))for(var m=0;m<d.length;m++)d[m].setAttribute("role","banner");if(a=document.getElementsByTagName("img"))for(var u=0;u<a.length;u++)a[u].setAttribute("role","image");if(s=document.getElementsByTagName("ol"))for(var h=0;h<s.length;h++)s[h].setAttribute("role","list");if(l=document.getElementsByTagName("ul"),s)for(var g=0;g<l.length;g++)"mainNavList"!==l[g].id&&l[g].setAttribute("role","list");if(o=document.getElementsByTagName("li"))for(var v=0;v<o.length;v++)"navElement"!==o[v].className&&"activeNavElement"!==o[v].className&&o[v].setAttribute("role","listitem");e=document.getElementsByTagName("a");for(var N=0;N<e.length;N++)if(i=e[N].getAttribute("target"),"_blank"===i){var y=e[N].getAttribute("href").substr(7);e[N].setAttribute("title","NOTE: This external link will bring you to the following URL: "+y),e[N].classList.add("cel-link-icon")}},countTheSlides:function(){var e,t;return t=document.getElementsByClassName("slide"),e=document.getElementsByClassName("activeSlide"),e.length+t.length},navMenu:function(){for(var e=methods.countTheSlides(),t=100/e,n=0;e>n;n++){var d="nav"+(n+1);document.getElementById(d).style.width=t+"%"}},audioButtonHandler:function(){var e,t,n,d,a,s,l,o,i,c,r,m;t=this.parentNode;for(var u=0;u<t.children.length;u++)if("audioControls"===t.children[u].className&&(i=t.children[u]||null,c=i.children[0].id,a=document.getElementById(c),m=c.substr(15),s=document.createElement("audio"),s.controls="yes",s.id="audioSlide"+m,r=document.title,i.insertBefore(s,a),l=document.createElement("source"),o=document.createElement("source"),l.src="media/"+r+"-S"+m+".m4a",l.type="audio/mpeg",o.src="media/"+r+"-S"+m+".ogg",o.type="audio/ogg",s.appendChild(l),s.appendChild(o)),"audioButton"===t.children[u].className){n=t.children[u];for(var h=0;h<t.children.length;h++)"audioControls"===t.children[h].className&&(e=t.children[h],n.style.height="0px",n.style.width="0px"),"audioButton"===t.children[h].className&&(d=t.children[h])}},helpButtonHandler:function(){var e,t;t=document.getElementById("helpButton").parentNode,"helpboxOpenState"===t.id?(e=document.getElementById("helpboxOpenState"),e.className="helpBox",e.id="helpboxClosedState"):(e=document.getElementById("helpboxClosedState"),e.className+=" is-cleared",e.id="helpboxOpenState")},changeTheActualSlide:function(e,t,n,d){var a,s,l,o,i,c,r,m,u,h,g,v;if(m=e.substr(5),m>1?(document.getElementById("theCourseIcon").style.height="0px",document.getElementById("theCourseIcon").style.width="0px",document.getElementById("courseNumber").style.overflow="hidden",document.getElementById("courseNumber").style.opacity="0",document.getElementById("courseNumber").style.width="0px",document.getElementById("courseNumber").style.height="0px",document.getElementById("moduleNumber").style.opacity="0",document.getElementById("moduleNumber").style.width="0px",document.getElementById("moduleNumber").style.height="0px",document.getElementById("moduleNumber").style.overflow="hidden",document.getElementById("theModuleHeader").style.height="3.25em"):(document.getElementById("theCourseIcon").style.height="100px",document.getElementById("theCourseIcon").style.width="100px",document.getElementById("courseNumber").style.opacity="1",document.getElementById("courseNumber").style.overflow="visible",document.getElementById("courseNumber").style.width="60vw",document.getElementById("courseNumber").style.height="auto",document.getElementById("moduleNumber").style.opacity="1",document.getElementById("moduleNumber").style.overflow="visible",document.getElementById("moduleNumber").style.width="70%",document.getElementById("moduleNumber").style.height="auto",document.getElementById("theModuleHeader").style.height="auto"),h="theTocTarget",g=document.getElementById(h).parentNode.id,"tocOpenState"===g&&methods.closeTOC(h),u=document.getElementsByTagName("audio"),u.length>0)for(var N=0;N<u.length;N++)u[N].pause();document.getElementById(e).focus(),a=document.getElementById(d),document.getElementById("skipToContentLink").href="#"+e,window.location.hash="#"+e;for(var y=0;y<a.children.length;y++)i=a.children[y].className,("slideHeader is-cleared"===i||"futureSlideHeader is-cleared"===i)&&(c=a.children[y],c.className="pastSlideHeader is-cleared");document.getElementById(n).className="pastNavElement",r=document.getElementById(e),r.className="activeSlide";for(var E=0;E<r.children.length;E++)o=r.children[E].className,"futureSlideHeader is-cleared"===o&&(r.children[E].className="slideHeader is-cleared"),"slideContent"===o&&(r.children[E].className="activeSlideContent"),"slideFooter"===o&&(r.children[E].className="activeSlideFooter"),"audioBox"===o&&(r.children[E].className="activeAudioBox");document.getElementById(t).className="activeNavElement";for(var p=0;p<methods.countTheSlides();p++)if(s=document.getElementById("slide"+(p+1)).id,s!==e){l=document.getElementById(s),l.className="slide";for(var B=0;B<l.children.length;B++)switch(v=l.children[B].className){case"pastSlideHeader is-cleared":break;case"futureSlideHeader is-cleared":break;case"activeSlideContent":l.children[B].className="slideContent";break;case"activeSlideFooter":l.children[B].className="slideFooter";break;case"activeAudioBox":l.children[B].className="audioBox"}}},ascertainScope:function(e,t){var n,d,a,s,l,o,i;switch(i=document.getElementsByClassName("activeSlide")[0].id,o=i.substr(5),l="nav"+o,e){case"next":a=Number(i.substr(5)),a+1>methods.countTheSlides()?(s="slide1",d="nav1",methods.changeTheActualSlide(s,d,l,i)):(s="slide"+(a+1),d="nav"+(a+1),methods.changeTheActualSlide(s,d,l,i));break;case"prev":a=Number(i.substr(5)),a-1===0?(s="slide1",d="nav1",alert(" You must be mistaken...There is nothing previous to the first slide"),methods.changeTheActualSlide(s,d,l,i)):(s="slide"+(a-1),d="nav"+(a-1),methods.changeTheActualSlide(s,d,l,i));break;case"nextButton":n=Number(t.substr(5)),s="slide"+(n+1),d="nav"+(n+1),methods.changeTheActualSlide(s,d,l,i);break;case"prevButton":n=Number(t.substr(5)),s="slide"+(n-1),d="nav"+(n-1),methods.changeTheActualSlide(s,d,l,i);break;case"navElement":n=Number(t.substr(3)),s="slide"+n,d=t,document.getElementById(s).focus(),methods.changeTheActualSlide(s,d,l,i);break;case"slideHeader":n=Number(t.substr(5)),s="slide"+n,d="nav"+n,methods.changeTheActualSlide(s,d,l,i);break;case"tableOfContentsLink":n=Number(t.substr(5)),s="slide"+n,d="nav"+n,methods.changeTheActualSlide(s,d,l,i),document.getElementById(s).focus()}},whichInput:function(e){return"TOClink"===this.className&&methods.ascertainScope("tableOfContentsLink",this.getAttribute("data-destination")),"nextButton"===this.className&&methods.ascertainScope("nextButton",this.parentNode.parentNode.parentNode.id),"prevButton"===this.className&&methods.ascertainScope("prevButton",this.parentNode.parentNode.parentNode.id),("navElement"===this.className||"activeNavElement"===this.className||"pastNavElement"===this.className)&&methods.ascertainScope("navElement",this.id),("slideHeader is-cleared"===this.className||"pastSlideHeader is-cleared"===this.className||"futureSlideHeader is-cleared"===this.className)&&methods.ascertainScope("slideHeader",this.parentNode.id),78===e.keyCode&&methods.ascertainScope("next",null),80===e.keyCode&&methods.ascertainScope("prev",null),38===e.keyCode,null},renderTheAudioButtons:function(){var e,t,n,d,a,s,l,o,i,c;t=document.getElementsByTagName("section");for(var r=0;r<t.length;r++)if(("slide"===t[r].className||"activeSlide"===t[r].className)&&(e=t[r].getAttribute("data-hasAudioPlayer"),"yes"===e)){c=document.getElementById(t[r].id);for(var m=0;m<c.children.length;m++)("slideFooter"===c.children[m].className||"activeSlideFooter"===c.children[m].className)&&(d=c.children[m],"nextPrevious"===d.children[0].className&&(n=d.children[0]));a=document.createElement("section"),"slide1"===d.id?a.className="activeAudioBox":a.className="audioBox",s=document.createElement("div"),s.className="audioButton",l=document.createElement("div"),l.className="audioControls",o=document.createElement("span"),i=c.id.substr(5),o.id="audioLandingPad"+i,l.appendChild(o),a.appendChild(s),a.appendChild(l),d.insertBefore(a,n)}},main:function(){var e,t,n,d,a,s,l;methods.populateTheNavMenu(),t=document.getElementsByClassName("slideHeader is-cleared");for(var o=0;o<t.length;o++)t[o].addEventListener("click",methods.whichInput,!1);n=document.getElementsByClassName("futureSlideHeader is-cleared");for(var i=0;i<n.length;i++)n[i].addEventListener("click",methods.whichInput,!1);l=document.getElementsByClassName("navElement");for(var c=0;c<l.length;c++)l[c].addEventListener("click",methods.whichInput,!1);document.getElementsByClassName("activeNavElement")[0].addEventListener("click",methods.whichInput,!1),s=document.getElementsByClassName("nextButton");for(var r=0;r<s.length-1;r++)s[r].addEventListener("click",methods.whichInput,!1);a=document.getElementsByClassName("prevButton");for(var m=0;m<a.length;m++)a[m].addEventListener("click",methods.whichInput,!1);d=document.getElementsByClassName("audioButton"),document.addEventListener("keyup",methods.whichInput,!1),document.getElementById("helpButton").addEventListener("click",methods.helpButtonHandler,!1),methods.renderTheAudioButtons();for(var u=0;u<d.length;u++)d[u].addEventListener("click",methods.audioButtonHandler,!1);methods.givingAccess(),methods.tocHandler(),document.getElementById("theTocTarget").addEventListener("click",methods.clickScopeTOC,!1),e=document.getElementsByClassName("TOClink");for(var h=0;h<e.length;h++)e[h].addEventListener("click",methods.whichInput,!1);methods.navMenu(),methods.figureButtonInsertion(),document.getElementById("skipToContentLink").addEventListener("click",methods.focusAllTheThings,!1),methods.yellowFlash(),methods.addDropCaps()}};window.onload=methods.main();
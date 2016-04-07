var methods={yellowFlash:function(){for(var e=methods.countTheSlides(),t=0;e>t;t++){var n=document.getElementById("slide"+(t+1)),a=n.getElementsByTagName("p")[0];a="figure"!==a.parentNode.className?n.getElementsByTagName("p")[0]:n.getElementsByTagName("p")[1],a.className="TheFirst"}},figureModalHandler:function(){var e=this.parentNode,t=e.children[1],n=e.children[2],a=e.getAttribute("data-state");"closed"===a&&(e.setAttribute("data-state","open"),e.style.top="0",e.style.bottom="0",e.style.left="0",e.style.right="0",e.style.background="rgba(0,0,0,0.8)",e.style.position="fixed",this.src="img/figureClose.svg","IMG"===t.tagName&&(t.style.overflow="scroll"),"P"===n.tagName&&(n.style.backgroundColor="#FFF")),"open"===a&&(e.setAttribute("data-state","closed"),e.style.top="auto",e.style.bottom="auto",e.style.left="auto",e.style.right="auto",e.style.background="rgba(0,0,0,0)",e.style.position="relative",this.src="img/figureOpen.svg","IMG"===n.tagName&&(n.style.overflow="visible"),"P"===n.tagName&&(n.style.backgroundColor="transparent"))},figureButtonInsertion:function(){for(var e=document.getElementsByClassName("figure"),t=0;t<e.length;t++){var n=document.createElement("img");n.src="img/figureOpen.svg",n.alt="",n.className="fullScreenButton";var a="figureButton"+(t+1);n.id=a;var l=e[t];l.setAttribute("data-state","closed");var d=e[t].getElementsByTagName("img"),s=d[0];l.insertBefore(n,s),document.getElementById(a).addEventListener("click",methods.figureModalHandler,!1)}},populateTheNavMenu:function(){var e=methods.countTheSlides(),t=document.getElementById("mainNavList").children[0];t.id="nav"+e,t.className="navElement",t.innerHTML=e;for(var n=methods.countTheSlides()-1;n>0;n--){var a=document.createElement("li");a.id="nav"+n,1===n?a.className="activeNavElement":a.className="navElement",a.innerHTML=n;var l=document.getElementById("mainNavList"),d=document.getElementById("nav"+(n+1));l.insertBefore(a,d)}},clickScopeTOC:function(){var e,t;t=this.parentNode.id,"tocClosedState"===t&&(e=this.id,methods.openTOC(e)),"tocOpenState"===t&&(e=this.id,methods.closeTOC(e))},closeTOC:function(e){var t=document.getElementById(e).parentNode.id;document.getElementById(t).className="TOCs",document.getElementById(t).id="tocClosedState"},openTOC:function(e){var t=document.getElementById(e).parentNode;t.className+=" clearfix",t.id="tocOpenState"},traverse:function(e,t){for(var n,a=0;a<t.childNodes.length;a++)n=t.childNodes[a],e(n),n.childNodes.length>0&&methods.traverse(e,n)},tocHandler:function(){function e(){var e;document.getElementById("tocClosedState")&&(e=document.getElementById("tocClosedState")),document.getElementById("tocOpenState")&&(e=document.getElementById("tocOpenState")),e.children[0].id="theTocTarget",e.children[0].className="TOCtargets",e.children[0].style.listStyleType="none"}function t(e,t){var n,d,s,o,r;if(n=Math.round(1e4*Math.random()),t.id=i+"-"+e+"-"+n,s=i.substr(5),o="nav"+i.substr(5),d="#"+i+"-"+e+"-"+n,r="<a class='TOClink' data-href='"+d+"'data-destination='"+i+"' data-destinationNavID='"+o+"'>"+t.innerHTML+"</a>",a=document.createElement("li"),a.className="TOC-"+e,a.innerHTML=r,c===Number(s)){var m;document.getElementById("tocClosedState")&&(m=document.getElementById("tocClosedState")),document.getElementById("tocOpenState")&&(m=document.getElementById("tocOpenState"));var u=document.createElement("li");u.id="slide"+s+"TOC",u.innerHTML="<ul><li id='slide"+s+"TocTarget'></li></ul>",l=document.getElementById("theTocTarget"),m.insertBefore(u,l),c++}var h=document.getElementById("slide"+s+"TOC").children[0],g=document.getElementById("slide"+s+"TocTarget");h.insertBefore(a,g)}function n(e){"H1"===e.nodeName&&t("H1",e),"H2"===e.nodeName&&t("H2",e),"H3"===e.nodeName&&t("H3",e),"H4"===e.nodeName&&t("H4",e),"H5"===e.nodeName&&t("H5",e),"H6"===e.nodeName&&t("H6",e)}var a,l,d,s,o,i,c=1;e(),d=methods.countTheSlides();for(var r=0;d>r;r++)s="slide"+(r+1),o=document.getElementById(s),i=o.id,methods.traverse(n,o);document.getElementById("slide1TOC").style.marginTop="45px"},givingAccess:function(){var e,t,n,a,l,d,s,o,i,c,r,m,u;if(t=document.getElementsByTagName("body"))for(var h=0;h<t.length;h++)t[h].setAttribute("role","document");if(n=document.getElementsByTagName("form"))for(var g=0;g<n.length;g++)n[g].setAttribute("role","form");if(document.getElementById("mainNav").setAttribute("role","navigation"),document.getElementById("mainNavList").setAttribute("role","navigation"),a=document.getElementsByTagName("moduleHeader"))for(var v=0;v<a.length;v++)a[v].setAttribute("role","banner");if(l=document.getElementsByTagName("img"))for(var N=0;N<l.length;N++)l[N].setAttribute("role","image");if(d=document.getElementsByTagName("ol"))for(var y=0;y<d.length;y++)d[y].setAttribute("role","list");if(s=document.getElementsByTagName("ul"),d)for(var p=0;p<s.length;p++)"mainNavList"!==s[p].id&&s[p].setAttribute("role","list");if(o=document.getElementsByTagName("li"))for(var f=0;f<o.length;f++)"navElement"!==o[f].className&&"activeNavElement"!==o[f].className&&o[f].setAttribute("role","listitem");e=document.getElementsByTagName("a");for(var E=0;E<e.length;E++)u=e[E].getAttribute("target"),"_blank"===u&&(i=e[E].getAttribute("href"),e[E].setAttribute("title","NOTE: This external link will bring you to the following URL:"+i),c=e[E],r=c.parentNode,m=document.createElement("img"),m.id="link"+E,m.style.width="10px",m.style.height="10px",m.style.margin="0",m.style.padding="0 3px 6px 0",m.src="img/externalLinkIcon.png","celLogoLink"!==e[E].className&&r.insertBefore(m,c))},countTheSlides:function(){var e,t;return t=document.getElementsByClassName("slide"),e=document.getElementsByClassName("activeSlide"),e.length+t.length},navMenu:function(){for(var e=methods.countTheSlides(),t=100/e,n=0;e>n;n++){var a="nav"+(n+1);document.getElementById(a).style.width=t+"%"}},scrollTo:function(e){window.location.href="#"+e},audioButtonHandler:function(){var e,t,n,a,l,d,s,o,i,c,r,m;t=this.parentNode;for(var u=0;u<t.children.length;u++)if("audioControls"===t.children[u].className&&(i=t.children[u]||null,c=i.children[0].id,l=document.getElementById(c),m=c.substr(15),d=document.createElement("audio"),d.controls="yes",d.id="audioSlide"+m,r=document.title,i.insertBefore(d,l),s=document.createElement("source"),o=document.createElement("source"),s.src="media/"+r+"-S"+m+".m4a",s.type="audio/mpeg",o.src="media/"+r+"-S"+m+".ogg",o.type="audio/ogg",d.appendChild(s),d.appendChild(o)),"audioButton"===t.children[u].className){n=t.children[u];for(var h=0;h<t.children.length;h++)"audioControls"===t.children[h].className&&(e=t.children[h],n.style.height="0px",n.style.width="0px"),"audioButton"===t.children[h].className&&(a=t.children[h])}},helpButtonHandler:function(){var e,t;t=document.getElementById("helpButton").parentNode,"helpboxOpenState"===t.id?(e=document.getElementById("helpboxOpenState"),e.className="helpBox",e.id="helpboxClosedState"):(e=document.getElementById("helpboxClosedState"),e.className+=" clearfix",e.id="helpboxOpenState")},changeTheActualSlide:function(e,t,n,a){var l,d,s,o,i,c,r,m,u,h,g,v;if(m=e.substr(5),m>1?(document.getElementById("theCourseIcon").style.height="0px",document.getElementById("theCourseIcon").style.width="0px",document.getElementById("courseNumber").className="visuallyhidden",document.getElementById("moduleNumber").className="visuallyhidden",document.getElementById("theModuleHeader").style.height="3.25em"):(document.getElementById("theCourseIcon").style.height="100px",document.getElementById("theCourseIcon").style.width="100px",document.getElementById("courseNumber").className="",document.getElementById("moduleNumber").className="",document.getElementById("theModuleHeader").style.height="auto"),h="theTocTarget",g=document.getElementById(h).parentNode.id,"tocOpenState"===g&&methods.closeTOC(h),u=document.getElementsByTagName("audio"),u.length>0)for(var N=0;N<u.length;N++)u[N].pause();l=document.getElementById(a);for(var y=0;y<l.children.length;y++)i=l.children[y].className,("slideHeader clearfix"===i||"futureSlideHeader clearfix"===i)&&(c=l.children[y],c.className="pastSlideHeader clearfix");document.getElementById(n).className="pastNavElement",r=document.getElementById(e),r.className="activeSlide";for(var p=0;p<r.children.length;p++)o=r.children[p].className,"futureSlideHeader clearfix"===o&&(r.children[p].className="slideHeader clearfix"),"slideContent"===o&&(r.children[p].className="activeSlideContent"),"slideFooter"===o&&(r.children[p].className="activeSlideFooter"),"audioBox"===o&&(r.children[p].className="activeAudioBox");document.getElementById(t).className="activeNavElement";for(var f=0;f<methods.countTheSlides();f++)if(d=document.getElementById("slide"+(f+1)).id,d!==e){s=document.getElementById(d),s.className="slide";for(var E=0;E<s.children.length;E++)switch(v=s.children[E].className){case"pastSlideHeader clearfix":break;case"futureSlideHeader clearfix":break;case"activeSlideContent":s.children[E].className="slideContent";break;case"activeSlideFooter":s.children[E].className="slideFooter";break;case"activeAudioBox":s.children[E].className="audioBox"}}},ascertainScope:function(e,t){var n,a,l,d,s,o,i;switch(i=document.getElementsByClassName("activeSlide")[0].id,o=i.substr(5),s="nav"+o,e){case"next":l=Number(i.substr(5)),l+1>methods.countTheSlides()?(d="slide1",a="nav1",methods.changeTheActualSlide(d,a,s,i)):(d="slide"+(l+1),a="nav"+(l+1),methods.changeTheActualSlide(d,a,s,i));break;case"prev":l=Number(i.substr(5)),l-1===0?(d="slide1",a="nav1",alert(" You must be mistaken...There is nothing previous to the first slide"),methods.changeTheActualSlide(d,a,s,i)):(d="slide"+(l-1),a="nav"+(l-1),methods.changeTheActualSlide(d,a,s,i));break;case"nextButton":n=Number(t.substr(5)),d="slide"+(n+1),a="nav"+(n+1),methods.changeTheActualSlide(d,a,s,i);break;case"prevButton":n=Number(t.substr(5)),d="slide"+(n-1),a="nav"+(n-1),methods.changeTheActualSlide(d,a,s,i);break;case"navElement":n=Number(t.substr(3)),d="slide"+n,a=t,methods.changeTheActualSlide(d,a,s,i);break;case"slideHeader":n=Number(t.substr(5)),d="slide"+n,a="nav"+n,methods.changeTheActualSlide(d,a,s,i);break;case"tableOfContentsLink":n=Number(t.substr(5)),d="slide"+n,a="nav"+n,methods.changeTheActualSlide(d,a,s,i)}},whichInput:function(e){return"TOClink"===this.className&&methods.ascertainScope("tableOfContentsLink",this.getAttribute("data-destination")),"nextButton"===this.className&&methods.ascertainScope("nextButton",this.parentNode.parentNode.parentNode.id),"prevButton"===this.className&&methods.ascertainScope("prevButton",this.parentNode.parentNode.parentNode.id),("navElement"===this.className||"activeNavElement"===this.className||"pastNavElement"===this.className)&&methods.ascertainScope("navElement",this.id),("slideHeader clearfix"===this.className||"pastSlideHeader clearfix"===this.className||"futureSlideHeader clearfix"===this.className)&&methods.ascertainScope("slideHeader",this.parentNode.id),39===e.keyCode&&methods.ascertainScope("next",null),37===e.keyCode&&methods.ascertainScope("prev",null),78===e.keyCode&&methods.ascertainScope("next",null),80===e.keyCode&&methods.ascertainScope("prev",null),38===e.keyCode,null},renderTheAudioButtons:function(){var e,t,n,a,l,d,s,o,i,c;t=document.getElementsByTagName("section");for(var r=0;r<t.length;r++)if(("slide"===t[r].className||"activeSlide"===t[r].className)&&(e=t[r].getAttribute("data-hasAudioPlayer"),"yes"===e)){c=document.getElementById(t[r].id);for(var m=0;m<c.children.length;m++)("slideFooter"===c.children[m].className||"activeSlideFooter"===c.children[m].className)&&(a=c.children[m],"nextPrevious"===a.children[0].className&&(n=a.children[0]));l=document.createElement("section"),"slide1"===a.id?l.className="activeAudioBox":l.className="audioBox",d=document.createElement("div"),d.className="audioButton",s=document.createElement("div"),s.className="audioControls",o=document.createElement("span"),i=c.id.substr(5),o.id="audioLandingPad"+i,s.appendChild(o),l.appendChild(d),l.appendChild(s),a.insertBefore(l,n)}},main:function(){var e,t,n,a,l,d;methods.populateTheNavMenu(),e=document.getElementsByClassName("slideHeader clearfix");for(var s=0;s<e.length;s++)e[s].addEventListener("click",methods.whichInput,!1);t=document.getElementsByClassName("futureSlideHeader clearfix");for(var o=0;o<t.length;o++)t[o].addEventListener("click",methods.whichInput,!1);d=document.getElementsByClassName("navElement");for(var i=0;i<d.length;i++)d[i].addEventListener("click",methods.whichInput,!1);document.getElementsByClassName("activeNavElement")[0].addEventListener("click",methods.whichInput,!1),l=document.getElementsByClassName("nextButton");for(var c=0;c<l.length-1;c++)l[c].addEventListener("click",methods.whichInput,!1);a=document.getElementsByClassName("prevButton");for(var r=0;r<a.length;r++)a[r].addEventListener("click",methods.whichInput,!1);n=document.getElementsByClassName("audioButton"),document.addEventListener("keyup",methods.whichInput,!1),document.getElementById("helpButton").addEventListener("click",methods.helpButtonHandler,!1),methods.renderTheAudioButtons();for(var m=0;m<n.length;m++)n[m].addEventListener("click",methods.audioButtonHandler,!1);methods.givingAccess(),methods.tocHandler(),document.getElementById("theTocTarget").addEventListener("click",methods.clickScopeTOC,!1);for(var u=document.getElementsByClassName("TOClink"),h=0;h<u.length;h++)u[h].addEventListener("click",methods.whichInput,!1);methods.navMenu(),methods.figureButtonInsertion(),methods.yellowFlash()}};window.onload=methods.main();
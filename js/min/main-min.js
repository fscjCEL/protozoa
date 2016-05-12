var methods={focusAllTheThings:function(){var e=this.getAttribute("href"),t=e.substr(1);document.getElementById(t).focus()},yellowFlash:function(){for(var e=methods.countTheSlides(),t=0;e>t;t++){var n=document.getElementById("slide"+(t+1)),a=n.getElementsByTagName("p")[0];a="figure"!==a.parentNode.className?n.getElementsByTagName("p")[0]:n.getElementsByTagName("p")[1],a.className="TheFirst"}},figureModalHandler:function(){var e=this.parentNode,t=e.children[1],n=e.children[2],a=e.getAttribute("data-state");"closed"===a&&(e.setAttribute("data-state","open"),e.className="figure-open-state",this.src="img/figureClose.svg","IMG"===t.tagName&&(t.style.overflow="scroll"),"P"===n.tagName&&(n.style.backgroundColor="#FFF")),"open"===a&&(e.setAttribute("data-state","closed"),e.className="figure-closed-state",this.src="img/figureOpen.svg","IMG"===n.tagName&&(n.style.overflow="visible"),"P"===n.tagName&&(n.style.backgroundColor="transparent"))},figureButtonInsertion:function(){for(var e=document.getElementsByClassName("figure"),t=0;t<e.length;t++){var n=document.createElement("img");n.src="img/figureOpen.svg",n.alt="",n.className="fullScreenButton";var a="figureButton"+(t+1);n.id=a;var d=e[t];d.setAttribute("data-state","closed");var l=e[t].getElementsByTagName("img"),s=l[0];d.insertBefore(n,s),document.getElementById(a).addEventListener("click",methods.figureModalHandler,!1)}},populateTheNavMenu:function(){var e,t,n,a,d=methods.countTheSlides();if(1===methods.countTheSlides())a=document.getElementById("mainNavList").children[0],a.id="nav1",a.className="activeNavElement",a.setAttribute("tabindex","-1"),a.innerHTML="1";else{a=document.getElementById("mainNavList").children[0],a.id="nav"+d,a.className="navElement",a.innerHTML=d;for(var l=methods.countTheSlides()-1;l>0;l--)e=document.createElement("li"),e.id="nav"+l,1===l?e.className="activeNavElement":e.className="navElement",e.setAttribute("tabindex","-1"),e.innerHTML=l,t=document.getElementById("mainNavList"),n=document.getElementById("nav"+(l+1)),t.insertBefore(e,n)}},clickScopeTOC:function(){var e,t;t=this.parentNode.id,"tocClosedState"===t&&(e=this.id,methods.openTOC(e)),"tocOpenState"===t&&(e=this.id,methods.closeTOC(e))},closeTOC:function(e){var t=document.getElementById(e).parentNode.id;document.getElementById(t).className="TOCs",document.getElementById(t).id="tocClosedState"},openTOC:function(e){var t=document.getElementById(e).parentNode;t.classList.add="clearfix",t.id="tocOpenState"},traverse:function(e,t){for(var n,a=0;a<t.childNodes.length;a++)n=t.childNodes[a],e(n),n.childNodes.length>0&&methods.traverse(e,n)},tocHandler:function(){function e(){var e;document.getElementById("tocClosedState")&&(e=document.getElementById("tocClosedState")),document.getElementById("tocOpenState")&&(e=document.getElementById("tocOpenState")),e.children[0].id="theTocTarget",e.children[0].className="TOCtargets",e.children[0].style.listStyleType="none"}function t(e,t){var n,l,s,o;n=Math.round(1e4*Math.random()),t.id=i+"-"+e+"-"+n,t.setAttribute("tabindex","-1"),s=i.substr(5),o="nav"+i.substr(5),l="#"+i+"-"+e+"-"+n;var r;if(r=t.children[0]?t.children[1].innerHTML:t.innerHTML,a=document.createElement("a"),a.className="TOClink",a.href=l,a.setAttribute("data-destination",i),a.setAttribute("data-destinationNavID",o),a.setAttribute("tabindex","-1"),a.innerHTML="<"+e+"><span class='visuallyhidden'>jump to slide&nbsp;"+i.substr(5)+"</span>"+r+"</"+e+">",c===Number(s)){var m;document.getElementById("tocClosedState")&&(m=document.getElementById("tocClosedState")),document.getElementById("tocOpenState")&&(m=document.getElementById("tocOpenState"));var u=document.createElement("li");u.id="slide"+s+"TOC",u.className="TOC",u.innerHTML="<span id='slide"+s+"TocTarget' class='hidden'></span>",d=document.getElementById("theTocTarget"),m.insertBefore(u,d),c++}var h=document.getElementById("slide"+s+"TOC"),g=document.getElementById("slide"+s+"TocTarget");h.insertBefore(a,g)}function n(e){"H2"===e.nodeName&&t("H2",e),"H3"===e.nodeName&&t("H3",e),"H4"===e.nodeName&&t("H4",e),"H5"===e.nodeName&&t("H5",e),"H6"===e.nodeName&&t("H6",e)}var a,d,l,s,o,i,c=1;e(),l=methods.countTheSlides();for(var r=0;l>r;r++)s="slide"+(r+1),o=document.getElementById(s),i=o.id,methods.traverse(n,o);document.getElementById("slide1TOC").style.marginTop="45px"},givingAccess:function(){var e,t,n,a,d,l,s,o,i,c,r,m,u;if(t=document.getElementsByTagName("body"))for(var h=0;h<t.length;h++)t[h].setAttribute("role","document");if(n=document.getElementsByTagName("form"))for(var g=0;g<n.length;g++)n[g].setAttribute("role","form");if(document.getElementById("mainNav").setAttribute("role","navigation"),document.getElementById("mainNavList").setAttribute("role","navigation"),a=document.getElementsByTagName("moduleHeader"))for(var v=0;v<a.length;v++)a[v].setAttribute("role","banner");if(d=document.getElementsByTagName("img"))for(var N=0;N<d.length;N++)d[N].setAttribute("role","image");if(l=document.getElementsByTagName("ol"))for(var y=0;y<l.length;y++)l[y].setAttribute("role","list");if(s=document.getElementsByTagName("ul"),l)for(var E=0;E<s.length;E++)"mainNavList"!==s[E].id&&s[E].setAttribute("role","list");if(o=document.getElementsByTagName("li"))for(var B=0;B<o.length;B++)"navElement"!==o[B].className&&"activeNavElement"!==o[B].className&&o[B].setAttribute("role","listitem");e=document.getElementsByTagName("a");for(var p=0;p<e.length;p++)u=e[p].getAttribute("target"),"_blank"===u&&(i=e[p].getAttribute("href"),e[p].setAttribute("title","NOTE: This external link will bring you to the following URL:"+i),c=e[p],r=c.parentNode,m=document.createElement("img"),m.id="link"+p,m.alt="",m.style.width="10px",m.style.height="10px",m.style.margin="0",m.style.padding="0 3px 6px 0",m.src="img/externalLinkIcon.png","celLogoLink"!==e[p].className&&r.insertBefore(m,c))},countTheSlides:function(){var e,t;return t=document.getElementsByClassName("slide"),e=document.getElementsByClassName("activeSlide"),e.length+t.length},navMenu:function(){for(var e=methods.countTheSlides(),t=100/e,n=0;e>n;n++){var a="nav"+(n+1);document.getElementById(a).style.width=t+"%"}},audioButtonHandler:function(){var e,t,n,a,d,l,s,o,i,c,r,m;t=this.parentNode;for(var u=0;u<t.children.length;u++)if("audioControls"===t.children[u].className&&(i=t.children[u]||null,c=i.children[0].id,d=document.getElementById(c),m=c.substr(15),l=document.createElement("audio"),l.controls="yes",l.id="audioSlide"+m,r=document.title,i.insertBefore(l,d),s=document.createElement("source"),o=document.createElement("source"),s.src="media/"+r+"-S"+m+".m4a",s.type="audio/mpeg",o.src="media/"+r+"-S"+m+".ogg",o.type="audio/ogg",l.appendChild(s),l.appendChild(o)),"audioButton"===t.children[u].className){n=t.children[u];for(var h=0;h<t.children.length;h++)"audioControls"===t.children[h].className&&(e=t.children[h],n.style.height="0px",n.style.width="0px"),"audioButton"===t.children[h].className&&(a=t.children[h])}},helpButtonHandler:function(){var e,t;t=document.getElementById("helpButton").parentNode,"helpboxOpenState"===t.id?(e=document.getElementById("helpboxOpenState"),e.className="helpBox",e.id="helpboxClosedState"):(e=document.getElementById("helpboxClosedState"),e.className+=" clearfix",e.id="helpboxOpenState")},changeTheActualSlide:function(e,t,n,a){var d,l,s,o,i,c,r,m,u,h,g,v;if(m=e.substr(5),m>1?(document.getElementById("theCourseIcon").style.height="0px",document.getElementById("theCourseIcon").style.width="0px",document.getElementById("courseNumber").style.overflow="hidden",document.getElementById("courseNumber").style.opacity="0",document.getElementById("courseNumber").style.width="0px",document.getElementById("courseNumber").style.height="0px",document.getElementById("moduleNumber").style.opacity="0",document.getElementById("moduleNumber").style.width="0px",document.getElementById("moduleNumber").style.height="0px",document.getElementById("moduleNumber").style.overflow="hidden",document.getElementById("theModuleHeader").style.height="3.25em"):(document.getElementById("theCourseIcon").style.height="100px",document.getElementById("theCourseIcon").style.width="100px",document.getElementById("courseNumber").style.opacity="1",document.getElementById("courseNumber").style.overflow="visible",document.getElementById("courseNumber").style.width="60vw",document.getElementById("courseNumber").style.height="auto",document.getElementById("moduleNumber").style.opacity="1",document.getElementById("moduleNumber").style.overflow="visible",document.getElementById("moduleNumber").style.width="70%",document.getElementById("moduleNumber").style.height="auto",document.getElementById("theModuleHeader").style.height="auto"),h="theTocTarget",g=document.getElementById(h).parentNode.id,"tocOpenState"===g&&methods.closeTOC(h),u=document.getElementsByTagName("audio"),u.length>0)for(var N=0;N<u.length;N++)u[N].pause();document.getElementById(e).focus(),d=document.getElementById(a),document.getElementById("skipToContentLink").href="#"+e,window.location="#"+e;for(var y=0;y<d.children.length;y++)i=d.children[y].className,"slideHeader clearfix"!==i&&"futureSlideHeader clearfix"!==i||(c=d.children[y],c.className="pastSlideHeader clearfix");document.getElementById(n).className="pastNavElement",r=document.getElementById(e),r.className="activeSlide";for(var E=0;E<r.children.length;E++)o=r.children[E].className,"futureSlideHeader clearfix"===o&&(r.children[E].className="slideHeader clearfix"),"slideContent"===o&&(r.children[E].className="activeSlideContent"),"slideFooter"===o&&(r.children[E].className="activeSlideFooter"),"audioBox"===o&&(r.children[E].className="activeAudioBox");document.getElementById(t).className="activeNavElement";for(var B=0;B<methods.countTheSlides();B++)if(l=document.getElementById("slide"+(B+1)).id,l!==e){s=document.getElementById(l),s.className="slide";for(var p=0;p<s.children.length;p++)switch(v=s.children[p].className){case"pastSlideHeader clearfix":break;case"futureSlideHeader clearfix":break;case"activeSlideContent":s.children[p].className="slideContent";break;case"activeSlideFooter":s.children[p].className="slideFooter";break;case"activeAudioBox":s.children[p].className="audioBox"}}},ascertainScope:function(e,t){var n,a,d,l,s,o,i;switch(i=document.getElementsByClassName("activeSlide")[0].id,o=i.substr(5),s="nav"+o,e){case"next":d=Number(i.substr(5)),d+1>methods.countTheSlides()?(l="slide1",a="nav1",methods.changeTheActualSlide(l,a,s,i)):(l="slide"+(d+1),a="nav"+(d+1),methods.changeTheActualSlide(l,a,s,i));break;case"prev":d=Number(i.substr(5)),d-1===0?(l="slide1",a="nav1",alert(" You must be mistaken...There is nothing previous to the first slide"),methods.changeTheActualSlide(l,a,s,i)):(l="slide"+(d-1),a="nav"+(d-1),methods.changeTheActualSlide(l,a,s,i));break;case"nextButton":n=Number(t.substr(5)),l="slide"+(n+1),a="nav"+(n+1),methods.changeTheActualSlide(l,a,s,i);break;case"prevButton":n=Number(t.substr(5)),l="slide"+(n-1),a="nav"+(n-1),methods.changeTheActualSlide(l,a,s,i);break;case"navElement":n=Number(t.substr(3)),l="slide"+n,a=t,document.getElementById(l).focus(),methods.changeTheActualSlide(l,a,s,i);break;case"slideHeader":n=Number(t.substr(5)),l="slide"+n,a="nav"+n,methods.changeTheActualSlide(l,a,s,i);break;case"tableOfContentsLink":n=Number(t.substr(5)),l="slide"+n,a="nav"+n,methods.changeTheActualSlide(l,a,s,i),document.getElementById(l).focus()}},whichInput:function(e){return"TOClink"===this.className&&methods.ascertainScope("tableOfContentsLink",this.getAttribute("data-destination")),"nextButton"===this.className&&methods.ascertainScope("nextButton",this.parentNode.parentNode.parentNode.id),"prevButton"===this.className&&methods.ascertainScope("prevButton",this.parentNode.parentNode.parentNode.id),"navElement"!==this.className&&"activeNavElement"!==this.className&&"pastNavElement"!==this.className||methods.ascertainScope("navElement",this.id),"slideHeader clearfix"!==this.className&&"pastSlideHeader clearfix"!==this.className&&"futureSlideHeader clearfix"!==this.className||methods.ascertainScope("slideHeader",this.parentNode.id),78===e.keyCode&&methods.ascertainScope("next",null),80===e.keyCode&&methods.ascertainScope("prev",null),38===e.keyCode,null},renderTheAudioButtons:function(){var e,t,n,a,d,l,s,o,i,c;t=document.getElementsByTagName("section");for(var r=0;r<t.length;r++)if(("slide"===t[r].className||"activeSlide"===t[r].className)&&(e=t[r].getAttribute("data-hasAudioPlayer"),"yes"===e)){c=document.getElementById(t[r].id);for(var m=0;m<c.children.length;m++)"slideFooter"!==c.children[m].className&&"activeSlideFooter"!==c.children[m].className||(a=c.children[m],"nextPrevious"===a.children[0].className&&(n=a.children[0]));d=document.createElement("section"),"slide1"===a.id?d.className="activeAudioBox":d.className="audioBox",l=document.createElement("div"),l.className="audioButton",s=document.createElement("div"),s.className="audioControls",o=document.createElement("span"),i=c.id.substr(5),o.id="audioLandingPad"+i,s.appendChild(o),d.appendChild(l),d.appendChild(s),a.insertBefore(d,n)}},main:function(){var e,t,n,a,d,l;methods.populateTheNavMenu(),e=document.getElementsByClassName("slideHeader clearfix");for(var s=0;s<e.length;s++)e[s].addEventListener("click",methods.whichInput,!1);t=document.getElementsByClassName("futureSlideHeader clearfix");for(var o=0;o<t.length;o++)t[o].addEventListener("click",methods.whichInput,!1);l=document.getElementsByClassName("navElement");for(var i=0;i<l.length;i++)l[i].addEventListener("click",methods.whichInput,!1);document.getElementsByClassName("activeNavElement")[0].addEventListener("click",methods.whichInput,!1),d=document.getElementsByClassName("nextButton");for(var c=0;c<d.length-1;c++)d[c].addEventListener("click",methods.whichInput,!1);a=document.getElementsByClassName("prevButton");for(var r=0;r<a.length;r++)a[r].addEventListener("click",methods.whichInput,!1);n=document.getElementsByClassName("audioButton"),document.addEventListener("keyup",methods.whichInput,!1),document.getElementById("helpButton").addEventListener("click",methods.helpButtonHandler,!1),methods.renderTheAudioButtons();for(var m=0;m<n.length;m++)n[m].addEventListener("click",methods.audioButtonHandler,!1);methods.givingAccess(),methods.tocHandler(),document.getElementById("theTocTarget").addEventListener("click",methods.clickScopeTOC,!1);for(var u=document.getElementsByClassName("TOClink"),h=0;h<u.length;h++)u[h].addEventListener("click",methods.whichInput,!1);methods.navMenu(),methods.figureButtonInsertion(),document.getElementById("skipToContentLink").addEventListener("click",methods.focusAllTheThings,!1),methods.yellowFlash()}};window.onload=methods.main();
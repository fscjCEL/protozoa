var methods={theImagePath:"",getActiveNavId:function(){return document.getElementsByClassName("nav-item-is-active")[0].id},countTheSlides:function(){var e;return e=document.getElementsByClassName("slide"),document.getElementsByClassName("activeSlide").length+e.length},getActiveSlideId:function(){return document.getElementsByClassName("activeSlide")[0].id},createFlipCards:function(){for(var e=document.getElementsByClassName("flip-deck"),t=0;t<e.length;t++){for(var n=e[t],s=n.children.length/2,a=0;a<n.children.length;a++)if(console.log("evaluate the deck now"),a%2==0){var d=n.children[a],i=n.children[a+1];d.className="card-front",i.className="card-back"}for(var m=1;m<=s;m++){var o=document.createElement("div");o.className="flip-card",theCurrentTerm=n.children[0],theCurrentDesc=n.children[1],"card-front"===theCurrentTerm.className&&(o.appendChild(theCurrentTerm),o.appendChild(theCurrentDesc)),n.appendChild(o)}}},flipTheCard:function(){this.classList.contains("is-flipped")?(this.getElementsByClassName("card-front")[0].style.transform="rotateY(0deg)",this.getElementsByClassName("card-back")[0].style.transform="rotateY(-180deg)",this.classList.remove("is-flipped")):(this.classList.add("is-flipped"),this.getElementsByClassName("card-front")[0].style.transform="rotateY(-180deg)",this.getElementsByClassName("card-back")[0].style.transform="rotateY(0deg)")},openheplBox:function(){console.log("I need to complete this")},getProgramImgPath:function(){return methods.theImagePath},setProgramImgPath:function(){methods.theImagePath=document.getElementById("toc-button").style.backgroundImage},traverse:function(e,t){for(var n,s=0;s<t.childNodes.length;s++)e(n=t.childNodes[s]),0<n.childNodes.length&&methods.traverse(e,n)},tocHandler:function(){function t(e,t){var n,s,a,d;if(n=Math.round(1e4*Math.random()),t.id=u+"-"+e+"-"+n,t.setAttribute("tabindex","-1"),a=u.substr(5),s="#"+u+"-"+e+"-"+n,d=t.children[0]?t.children[1].innerHTML:t.innerHTML,c=document.createElement("p"),"H2"===e&&(c.className="toc-header",c.innerHTML="<span class='toc-slide-num'>"+u.substr(5)+" </span><span class='is-dormant'>&mdash;jump to slide:"+u.substr(5)+"&mdash;</span>"+d+"<br />"),"H3"===e&&(c.className="toc-subheader",c.innerHTML="<span class='is-dormant'>&mdash;jump to slide:"+u.substr(5)+"&mdash;</span>&ensp;"+d+"<br />"),c.href=s,c.setAttribute("tabindex","-1"),h===Number(a)){var i;document.getElementById("toc-menu")&&(i=document.getElementById("toc-menu"));var m=document.createElement("section");m.id="slide"+a+"TOC",m.className="TOC",m.innerHTML="<span id='slide"+a+"TocTarget' class='hidden'></span>",r=document.getElementById("theTocTarget"),i.insertBefore(m,r),h++}var o=document.getElementById("slide"+a+"TOC"),l=document.getElementById("slide"+a+"TocTarget");o.insertBefore(c,l)}function e(e){"H2"===e.nodeName&&t("H2",e),"H3"===e.nodeName&&t("H3",e)}var c,r,n,s,a,u,d,h=1;document.getElementById("toc-menu")&&(d=document.getElementById("toc-menu")),document.getElementById("toc-menu")&&(d=document.getElementById("toc-menu")),d.children[0].id="theTocTarget",d.children[0].className="TOCtargets",n=methods.countTheSlides();for(var i=0;i<n;i++)s="slide"+(i+1),a=document.getElementById(s),u=a.id,methods.traverse(e,a)},toggleTocColumn:function(){var e=methods.getActiveSlideId(),t=document.getElementById("toc-column");t&&("toc-is-open"===t.className?(t.className="toc-is-closed",document.getElementById("toc-button").style.backgroundImage="url('../img/TOC-default.png')"):(t.className="toc-is-open",document.getElementById("toc-button").style.backgroundImage="slide1"!==e?"url('../img/TOC-default.png')":methods.getProgramImgPath()))},populateTheNavMenu:function(){var e,t,n,s,a=methods.countTheSlides();if(s=document.getElementById("nav-item-list").children[0],1===methods.countTheSlides())s.id="nav1",s.title="Jump to Slide 1",s.className="nav-item-is-active",s.setAttribute("tabindex","-1");else{s.id="nav"+a,s.title="Jump to Slide "+methods.countTheSlides(),s.className="nav-item";for(var d=methods.countTheSlides()-1;0<d;d--)(e=document.createElement("li")).id="nav"+d,e.title="Jump to Slide "+d,e.className=1===d?"nav-item-is-active":"nav-item",e.setAttribute("tabindex","-1"),t=document.getElementById("nav-item-list"),n=document.getElementById("nav"+(d+1)),t.insertBefore(e,n)}},closeTocColumn:function(){document.getElementById("toc-column").className="toc-is-closed",document.getElementById("toc-button").style.backgroundImage="url('../img/TOC-default.png')"},inputHandler:function(e){e.keyCode&&38===e.keyCode?window.location="#module-nav":(e.keyCode&&78===e.keyCode&&methods.changeTheSlide("nextButton","nope"),e.keyCode&&80===e.keyCode&&methods.changeTheSlide("prevButton","nope"),"nav-item"===this.className&&methods.changeTheSlide("nav-item",this.id),"nav-item-is-active"===this.className&&methods.changeTheSlide("nav-item",this.id),"nav-item-visited"===this.className&&methods.changeTheSlide("nav-item",this.id),"TOC"===this.className&&methods.changeTheSlide("TOC",this.id),"TOC toc-item-is-active"===this.className&&methods.changeTheSlide("TOC",this.id),"toc-item-is-active"===this.className&&methods.changeTheSlide("TOC",this.id),"nextButton"===this.className&&methods.changeTheSlide("nextButton",this.id),"prevButton"===this.className&&methods.changeTheSlide("prevButton",this.id))},changeTheSlide:function(e,t){function n(e){var t="slide"+e+"TOC";document.getElementById(t).classList.add("toc-item-is-active")}var s,a,d=e,i=parseInt(methods.getActiveSlideId().substr(5)),m="slide"+(s=i<methods.countTheSlides()?i+1:1),o="slide"+(a=1===i?1:i-1),l="nav"+s,c="nav"+a;if(document.getElementById("slide"+i).className="slide",document.getElementById("nav"+i).className="nav-item-visited",document.getElementById("slide"+i+"TOC").classList.remove("toc-item-is-active"),"nav-item"===d||"nav-item-is-active"===d||"nav-item-visited"===d){this.className="nav-item-is-active";var r=t;n(r.substr(3));var u="slide"+r.substr(3);document.getElementById(u).className="activeSlide"}"nextButton"===d&&(document.getElementById(l).className="nav-item-is-active",document.getElementById(m).className="activeSlide",n(m.substr(5)));"prevButton"===d&&(document.getElementById(c).className="nav-item-is-active",document.getElementById(o).className="activeSlide",n(o.substr(5)));if("TOC"===d||"TOC toc-item-is-active"===d){var h=t,g=h.substr(0,h.length-3),v="nav"+g.substr(5);n(g.substr(5)),document.getElementById(v).className="nav-item-is-active",document.getElementById(g).className="activeSlide",window.location="#module-nav"}methods.closeTocColumn()},main:function(){methods.populateTheNavMenu(),document.getElementById("help-button").addEventListener("click",methods.openheplBox,!1);for(var e=document.getElementsByClassName("nav-item"),t=0;t<e.length;t++)e[t].addEventListener("click",methods.inputHandler,!1);document.getElementsByClassName("nav-item-is-active")[0].addEventListener("click",methods.inputHandler,!1),document.getElementById("toc-button").addEventListener("click",methods.toggleTocColumn,!1),methods.tocHandler();for(var n=document.getElementsByClassName("nextButton"),s=0;s<n.length;s++)n[s].addEventListener("click",methods.inputHandler,!1),n[s].href="#module-nav";for(var a=document.getElementsByClassName("prevButton"),d=0;d<a.length;d++)a[d].addEventListener("click",methods.inputHandler,!1),a[d].href="#module-nav";for(var i=document.getElementsByClassName("TOC"),m=0;m<i.length;m++)i[m].addEventListener("click",methods.inputHandler,!1);document.getElementById("slide1TOC").classList.add("toc-item-is-active"),document.addEventListener("keyup",methods.inputHandler,!1),methods.setProgramImgPath(),methods.createFlipCards();for(var o=document.getElementsByClassName("flip-card"),l=0;l<o.length;l++)o[l].addEventListener("click",methods.flipTheCard,!1)}};window.onload=methods.main();
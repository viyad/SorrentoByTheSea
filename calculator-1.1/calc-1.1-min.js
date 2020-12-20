/*!
 * JavaScript Calculator v1.1
 * http://wjbryant.com/projects/javascript-calculator/
 *
 * Copyright (c) 2011 Bill Bryant
 * Licensed under the MIT license
 * http://opensource.org/licenses/mit-license.php
 */
var JSCALC;if(typeof JSCALC!=="object"){JSCALC={}}(function(){"use strict";var d=window,f=d.document,e="1.1",b={},a=d.onunload,h=false,c=0,g=f.getElementsByClassName?function(j){return f.getElementsByClassName(j)}:f.querySelectorAll?function(j){return f.querySelectorAll("."+j)}:f.evaluate?function(l){var j=f.evaluate("//*[contains(concat(' ', @class, ' '), ' "+l+" ')]",f,null,0,null),m=j.iterateNext(),k=[];while(m){k[k.length]=m;m=j.iterateNext()}return k}:function(n){var m,j=f.getElementsByTagName("*"),k=j.length,o=new RegExp("(^|\\s)"+n+"(\\s|$)"),l=[];for(m=0;m<k;m+=1){if(o.test(j[m].className)){l[l.length]=j[m]}}return l};function i(k){var j,n,t,u=0,p,y=true,l=/\./,s=null,r=false,w,x=false,v={},m=c;function q(z){switch(p){case"+":u+=z;break;case"-":u-=z;break;case"*":u*=z;break;case"/":u/=z;break}t.value=u}function o(D){D=D||d.event;var z,B,E,C,A=false;switch(D.type){case"keydown":w=B=D.keyCode;switch(B){case 27:z="C";break;case 8:z="Backspace";break;case 46:z="CE";break;default:return true}break;case"keypress":B=D.charCode||D.keyCode;if(B===13||B===9||w===37||w===39){return true}if(B===27||B===8||w===46){return false}if(w===188){z="."}else{z=String.fromCharCode(B).toLowerCase()}break;case"click":C=D.target||D.srcElement;if(C.tagName==="INPUT"&&C.type==="button"){z=C.value}else{return true}break;case"calculatorPressMethod":z=D.calckey;break;default:return true}E=parseFloat(t.value);switch(z){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case".":if(!(z==="."&&l.test(t.value))){if(y){t.value="";y=false}t.value+=z}break;case"*":case"+":case"-":case"/":if(!x){if(u===0||s!==null){u=E}else{q(E)}s=null;r=true;y=true}p=z;A=true;break;case"C":t.blur();u=0;p="";y=true;s=null;r=false;t.value="0";break;case"CE":t.value="0";y=true;break;case"Backspace":t.value=t.value.slice(0,t.value.length-1);break;case"+/-":t.value=E*-1;break;case"%":if(E){t.value=u*E/100}break;case"sqrt":if(E>=0){t.value=Math.sqrt(E)}else{t.value="Invalid input for function"}break;case"a":case"c":case"v":case"x":if(D.ctrlKey){return true}break;case"1/x":case"r":if(E){t.value=1/E}else{t.value="Cannot divide by zero"}break;case"=":n.onsubmit();break}x=A;t.focus();return false}c+=1;k.innerHTML+='<div class="calcContainer"><form action=""><h1>Calculator</h1><div><input type="text" class="calcDisplay" /><input type="button" value="Backspace" class="calcClear calcFirst calcFunction" /><input type="button" value="CE" class="calcClear calcFunction" /><input type="button" value="C" class="calcClear calcFunction" /><input type="button" value="7" class="calcFirst calcInput" /><input type="button" value="8" class="calcInput" /><input type="button" value="9" class="calcInput" /><input type="button" value="/" class="calcFunction" /><input type="button" value="sqrt" class="calcInput" /><input type="button" value="4" class="calcFirst calcInput" /><input type="button" value="5" class="calcInput" /><input type="button" value="6" class="calcInput" /><input type="button" value="*" class="calcFunction" /><input type="button" value="%" class="calcInput" /><input type="button" value="1" class="calcFirst calcInput" /><input type="button" value="2" class="calcInput" /><input type="button" value="3" class="calcInput" /><input type="button" value="-" class="calcFunction" /><input type="button" value="1/x" class="calcInput" /><input type="button" value="0" class="calcFirst calcInput" /><input type="button" value="+/-" class="calcInput" /><input type="button" value="." class="calcInput" /><input type="button" value="+" class="calcFunction" /><input type="submit" value="=" class="calcFunction" /></div></form></div>';j=k.getElementsByTagName("form");n=j[j.length-1];t=n.getElementsByTagName("input")[0];t.setAttribute("autocomplete","off");t.value="0";t.onkeydown=t.onkeypress=n.onclick=o;n.onsubmit=function(){if(r){s=parseFloat(t.value)||0;r=false}q(s);y=true;t.focus();return false};v.focus=function(){t.focus()};v.press=function(B){var C,z,A;if(typeof B==="number"){C=B.toString().split("")}else{if(typeof B==="string"&&B){C=[B]}else{return this}}z=C.length;for(A=0;A<z;A+=1){o({type:"calculatorPressMethod",calckey:C[A]})}return this};v.remove=function(){t.onkeydown=t.onkeypress=n.onclick=null;k.removeChild(n.parentNode);delete b[m];v=null};v.container=k;b[m]=v;return v}JSCALC.get=function(j){if(!j||j.nodeType!==1){return}var m,l=b,k;for(m in l){if(l.hasOwnProperty(m)){if(j===l[m].container){k=l[m];break}}}return k||false};JSCALC.getCalcs=function(){var l,k=[],j=b;for(l in j){if(j.hasOwnProperty(l)){k[k.length]=j[l]}}return k};JSCALC.init=function(l){var m,s=[],u=false,k,t,r,o,n,j,q,p=[];if(typeof l==="string"){l=f.getElementById(l)}if(typeof l==="object"&&l.nodeType===1){if(l.className){if(l.className.indexOf("calc")===-1){l.className+=" calc"}}else{l.className="calc"}s[0]=l;u=true}else{s=g("calc")}t=s.length;if(t){if(!h){if(!JSCALC.css){o=f.getElementsByTagName("script");n=o.length;for(r=0;r<n;r+=1){j=o[r].src;if(j.indexOf("calc-"+e)!==-1){q=j.lastIndexOf("/");JSCALC.css=(q!==-1?j.slice(0,q+1):"")+"calc-"+e+"-min.css";break}}}if(JSCALC.css){m=f.createElement("link");m.type="text/css";m.rel="stylesheet";m.href=JSCALC.css;(f.head||f.getElementsByTagName("head")[0]).appendChild(m);h=true}}for(r=0;r<t;r+=1){k=s[r];if(!JSCALC.get(k)){p[p.length]=i(k)}}}return u?(p[0]||false):p};JSCALC.removeAll=function(){var k,j=b;for(k in j){if(j.hasOwnProperty(k)){j[k].remove()}}};if(d.attachEvent){d.attachEvent("onunload",JSCALC.removeAll)}else{d.onunload=function(j){JSCALC.removeAll();if(a){return a(j)}}}}());
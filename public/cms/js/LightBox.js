// LightBox.js
// Javascript Behaviour for the LightBox Control
// Copyright (c) by Matthias Hertel, http://www.mathertel.de
// This work is licensed under a BSD style license. See http://www.mathertel.de/License.aspx
// ----- 
// 18.08.2006 18:13:08 created by Matthias Hertel
// 15.09.2006 18:13:08 DOM Leak removed.
// 16.09.2006 context on event-methods is now set to the bound object.

// a singelton Behaviour !
var LightBoxBehavior = {
  obj: null, // a pointer to the lightbox overlay
  dlg: null, // the current displayed dialog element
  
  init: function() {
    if (this.obj != null)
      alert("The LightBox behavior can only be included once!");
    LightBoxBehavior.obj = this;
  }, // init


  term: function() {
    LightBoxBehavior.dlg = null;
    LightBoxBehavior.obj = null;
  },
  

  // open the current Dialog
  open: function(dlg) {
    if (LightBoxBehavior.dlg != null)
      LightBoxBehavior.hide();

    if ((dlg != null) && (dlg.constructor == String))
      dlg = document.getElementById(dlg);
    LightBoxBehavior.dlg = dlg;
    LightBoxBehavior.show();
  }, // open


  // show the current or a new dialog element
  show: function() {
    var obj = LightBoxBehavior.obj;
    var dlg = LightBoxBehavior.dlg;
    
    obj.style.height = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight) + "px";
    obj.style.width = document.documentElement.scrollWidth + "px";

    window.scrollTo(0,0); 
    obj.style.zIndex = 98;
    obj.style.display = "block";

    if (dlg != null) {
      dlg.style.zIndex = 99;
      dlg.style.position = "absolute";
      dlg.style.display = "block";
      
      dlg.style.top = (document.documentElement.clientHeight - dlg.scrollHeight)/2 + "px";
      dlg.style.left = (document.documentElement.offsetWidth - dlg.scrollWidth)/2 + "px";
      dlg.focus();
    } // if
  }, // show


  // hide the current Dialog in msec milliseconds
  autoHide: function(msec) {
    window.setTimeout(LightBoxBehavior.hide, msec);
  }, // autoHide

  // hide the current Dialog
  hide: function() {
    var obj = LightBoxBehavior.obj;
    var dlg = LightBoxBehavior.dlg;
    
    obj.style.display = "none";
    
    if (dlg != null) {
      dlg.style.zIndex = null;
      dlg.style.display = "none";
      dlg.style.position = "";
      LightBoxBehavior.dlg = null;
    } // if
  }, // hide
  
  
  // show the current Dialog
  openUrl: function(url) {
    LightBoxBehavior.dlg.innerHTML = "<p>loading..." + url + "</p>";
    var f = LightBoxBehavior.frame;
    f.src = url;
    f.onreadystatechange = LightBoxBehavior.ready;
    f.onload = LightBoxBehavior.ready;
    LightBoxBehavior.show();
  }, // openUrl


  ready: function () {
    var f = LightBoxBehavior.frame;
    if ((f.readyState == null) || (f.readyState == "complete")) {
      var s = f.contentWindow.document.body.innerHTML;
      LightBoxBehavior.dlg.innerHTML = s;"<p>loading...<br /><br /><br /><br />....</p>";

      var dlg = LightBoxBehavior.dlg;
      dlg.style.width = dlg.scrollWidth;
      dlg.style.top = (document.documentElement.clientHeight - dlg.scrollHeight)/2 + "px";
      dlg.style.left = (document.documentElement.offsetWidth - dlg.scrollWidth)/2 + "px";
      }
    
  } // ready
} // LightBoxBehavior

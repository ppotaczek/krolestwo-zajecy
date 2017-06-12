"use strict";

document.addEventListener("DOMContentLoaded", function(){
  var randomProfiles = [];
  var data = {
    save : function(){
      localStorage.setItem('profiles', JSON.stringify(randomProfiles));
    }
  }

  for (var i = 0; i < 20000; i++){
    var n = Math.random() * 5;
    var r = Math.floor((Math.random() * 10001));
    var p = {};
    p["name"] = n;
    p["carrots"] = r;
    randomProfiles.push(p);
  }
  data.save();
});

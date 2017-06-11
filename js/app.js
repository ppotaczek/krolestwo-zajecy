"use strict";

document.addEventListener("DOMContentLoaded", function(){
  var system = {
    table : document.getElementById('table'),
    profilesList : [],

    addProfile : function(){
      var name = document.getElementById('name').value;
      var carrots = document.getElementById('carrots').value;
      var profile = new Profile(name, carrots);
      this.profilesList.push(profile);
      this.addToTable();
    },

    addToTable : function(){
      this.cleanTable();
      for (var i = 0; i < this.profilesList.length; i++){
        var row = this.table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerText = i+1+".";
        cell2.innerText = this.profilesList[i].name;
        cell3.innerText = this.profilesList[i].carrots;
      }
    },

    cleanTable : function(){
      while(this.table.rows.length > 1) {
        table.deleteRow(1);
      }
    }
  }
  
  var data = {      // Save and get data
    save : function(){
      localStorage.setItem('profiles', JSON.stringify(system.profilesList));
    },
    getData : function(){
      var profiles = localStorage.getItem('profiles');
      system.profilesList = JSON.parse(profiles);

      if(system.profilesList == null){
        system.profilesList = [];
      }
    }
  }

  function Profile(name, carrots) {
    this.name = name;
    this.carrots = carrots;
  }

  function main(){
    system.addProfile();
  }
  document.getElementById('add').addEventListener("click", main);
});

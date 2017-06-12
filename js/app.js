"use strict";

document.addEventListener("DOMContentLoaded", function(){
  var system = {
    table : document.getElementById('table'),
    profilesList : [],
    operationsList : ["- 50", "- 20", "- 10", "- 5", "- 2", "- 1", "+ 1", "+ 2", "+ 5", "+ 10", "+ 20", "+ 50"],
    tip : document.getElementById('tip'),

    addProfile : function(){      // Add and check new profile
      var name = document.getElementById('name');
      var carrots = document.getElementById('carrots');

      for (var i = 0; i < this.profilesList.length; i++){
        if (name.value == this.profilesList[i].name){
          this.tip.innerText = "Profil o takiej nazwie już istnieje!";
          return false;
        }
      }
      var profile = new Profile(name.value, carrots.value);
      this.tip.innerText = "";
      this.profilesList.push(profile);
      name.value = "";
      carrots.value = "";
      this.drawTable();
    },

    sortArray : function(){
      this.profilesList.sort(function(a, b){
        return b.carrots - a.carrots
      });
    },

    drawTable : function(){     // Fill table
      this.sortArray();
      this.cleanTable();
      for (var i = 0; i < this.profilesList.length; i++){
        var row = this.table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerText = i+1+".";
        cell2.innerText = this.profilesList[i].name;
        cell3.innerText = this.profilesList[i].carrots;
        this.addOperations(row);
      }
      this.addOperationsFunc();
      this.addRemoveFunc();
    },

    addOperations : function(line){     // Add buttons to row
      var cell4 = line.insertCell(3);
      var cell5 = line.insertCell(4);
      var newBtn;

      for (var i = 0; i < this.operationsList.length; i++){
        newBtn = document.createElement("button");
        newBtn.classList.add("operation");
        newBtn.innerText = this.operationsList[i];
        cell4.appendChild(newBtn);
      }
      cell5.innerHTML = "<button class='remove'>X</button>";
    },

    addOperationsFunc : function(){     // Add mathematical function to buttons
      var operationBtns = document.getElementsByClassName("operation");

      for (var i = 0; i < operationBtns.length; i++){
        operationBtns[i].addEventListener("click", function(){
          var order = this.parentElement.parentElement.rowIndex;
          var actualVal = system.profilesList[order-1].carrots;
          var btnVal = (this.innerText).replace(' ','');

          actualVal = parseInt(actualVal) + parseInt(btnVal);
          actualVal < 0 ? actualVal = 0: true;
          system.profilesList[order-1].carrots = actualVal;
          system.drawTable();
        });
      }
    },

    addRemoveFunc : function(){     // Add remove function to buttons
      var removeBtns = document.getElementsByClassName("remove");
      for (var i = 0; i < removeBtns.length; i++){
        removeBtns[i].addEventListener("click", function(){
          var order = this.parentElement.parentElement.rowIndex;
          table.deleteRow(order);
          system.profilesList.splice(order-1, 1);
          system.drawTable();
        });
      }
    },

    cleanTable : function(){      // Remove all rows from table
      while(this.table.rows.length > 1) {
        table.deleteRow(1);
      }
    }
  }

  function Profile(name, carrots) {     // Constructor to create new profile object
    this.name = name;
    this.carrots = carrots;
  }

  function add(){
    system.addProfile();
  }

  function main(){
    document.getElementById('add').addEventListener("click", add);
    system.drawTable();
  }

  main();
});

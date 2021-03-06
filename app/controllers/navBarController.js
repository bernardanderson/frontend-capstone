"use strict";

// This simply assigns a navbar heading to a angular url

app.controller("navBarController", function($scope, navBarFactory, localDataStorageFactory){

  $scope.navTitle = navBarFactory.navTitle;

  // Var which holds the current view's nav buttons
  $scope.navButtons = navBarFactory.navButtons;

  // Local holder for the users accounts
  $scope.accountsArray = localDataStorageFactory.currentAccounts;

  // Var for if the speedDial is open by default
  $scope.speedDial = {
    isOpen: false,
  };

  // Var for whether the user has at least one account on file
  $scope.atLeastOneAccount = false;

  // This is exclusively for the initial appChoice view page
  $scope.clickedChoice = function(sentNewView, sentParameters) {

    if (sentParameters === "Edit") {
      localDataStorageFactory.isEditClick = true;
    } else if (sentParameters === "ClearChecks") {
      localDataStorageFactory.selectedLineItemsForPrint.splice(0);
    } else if (sentParameters === "PrintChecks") {
      print();
    }
    navBarFactory.setCurrentView(sentNewView);
  };

  // When an account is selected in the navBar on the displayLedger Page, this executes
  //  Updates the localDataStorageFactory variable selectedAccount
  $scope.sendAccount = function(sentSelectedAccount) {
      if (sentSelectedAccount !== undefined) {
      localDataStorageFactory.addSelectedAccount(sentSelectedAccount);
    }
  };

  //Watches for any click changes in the current "Main Page" view
  $scope.$watch(function() {return navBarFactory.currentView;}, function(newVal, oldVal) {
    if (newVal !== undefined){
      $scope.currentView = newVal;
    }
  });

  // This may not be needed due to the ng-repeat
  //Watches for changes in the current accounts list
  $scope.$watchCollection(function() {return localDataStorageFactory.currentAccounts;}, function(newVal, oldVal) {
    if (newVal.length === 0){
      $scope.atLeastOneAccount = false;
    } else {
      $scope.atLeastOneAccount = true;
    }
  });

});

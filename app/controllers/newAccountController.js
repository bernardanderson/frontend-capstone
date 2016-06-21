app.controller("newAccountController", function($scope, navBarFactory, localDataStorageFactory){

  navBarFactory.setNavButtons([
    {
      buttonLabel: "Cancel Submission",
      viewChange: "accountLedger"
    }
  ]);

  if (localDataStorageFactory.selectedAccount.length > 0 && localDataStorageFactory.isEditClick === true) {
    $scope.newAccount = localDataStorageFactory.selectedAccount[0];
  } else {

    $scope.newAccount = {
      nickName: null,
      bankName: null,
      bankStreet: null,
      bankState: null,
      bankZip: null,
      accountType: null,
      routingNumber: null,
      accountNumber: null,
      comments: null,
      startingAmount: null,
      accountID: null

    };
  }


  // Allows the selection of states from an option box
  $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY').split(' ').map(function(state) {
    return {abbrev: state};
  });

  // For saving a new account during the new account creation
  $scope.saveAccountInfo = (sentNewAccount) => {
    $scope.newAccount = {
      nickName: sentNewAccount.nickName,
      bankName: sentNewAccount.bankName,
      bankStreet: sentNewAccount.bankStreet,
      bankState: sentNewAccount.bankState,
      bankZip: sentNewAccount.bankZip,
      accountType: sentNewAccount.accountType,
      routingNumber: sentNewAccount.routingNumber,
      accountNumber: sentNewAccount.accountNumber,
      comments: sentNewAccount.comments,
      startingAmount: sentNewAccount.startingAmount,
      accountID: localDataStorageFactory.generateUniqueId()
    }

    localDataStorageFactory.addNewAccount({"newAccount": $scope.newAccount});
    localDataStorageFactory.isEditClick = false;
    console.log("Result of newAccount in localDataStorage: ", localDataStorageFactory.currentAccounts);
    navBarFactory.setCurrentView('accountLedger');
  }

});
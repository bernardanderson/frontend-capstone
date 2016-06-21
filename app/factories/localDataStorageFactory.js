app.factory("localDataStorageFactory", function(XHRFactory){

  return {

    currentAccounts: [],

    selectedAccount: [],

    selectedAccountLedgerItems: [],

    // Adds the account information, either from the new Account entry for from XHR pull
    //  to the currentAccounts array for access
    addNewAccount: function(sentAccountInfo) {
      for (var singleAccount in sentAccountInfo) {
        this.currentAccounts.push(sentAccountInfo[singleAccount]);
      }
    },

    // From the navBar dropdown, adds the selected account for manipulation
    addSelectedAccount: function(sentSelectedAccount) {
      this.selectedAccount.splice(0);
      this.selectedAccount.push(sentSelectedAccount);
      this.addSelectedAccountLedgerItems(sentSelectedAccount.accountID)
    },

    // After an account is selected, this pulls the ledger items and adds the
    //  correct ones to the selectedAccountLedgerItems array
    addSelectedAccountLedgerItems: function(sentAccountID) {

      this.selectedAccountLedgerItems.splice(0);

      XHRFactory.pullXHRData("json/basicData.json").then( response => {
        let lineItemObj = response.data.lineItems;
        for (var item in lineItemObj) {
          if (lineItemObj[item].accountID === sentAccountID) {
            this.selectedAccountLedgerItems.push(lineItemObj[item]);
          }
        }
      })
    },

    // This generates a complex unique ID for various purposes
      // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    generateUniqueId: function() {
      let tempUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      return tempUUID;
    }
  }

});
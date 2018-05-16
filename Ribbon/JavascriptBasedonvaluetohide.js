function IsModifyPaymentProfileButtonEnabled() {
    //debugger;
    var retVal = false;
    var entityType = Xrm.Page.data.entity.getEntityName();
    if (Xrm.Page.ui.formSelector != null) {
        var currentFormName = Xrm.Page.ui.formSelector.getCurrentItem().getLabel();
        if (entityType == "new_loancustomer") {
            if (currentFormName == "Information") {
                retVal = true;
            }
        }
      
    }
    return retVal;
}



function IsModifyPaymentProfileButtonEnabledonlyforCustomerType() {
    var retVal = false;
    var CustomerValue = Xrm.Page.getAttribute("new_cutomertype").getValue();
    var CustmerTypeText = Xrm.Page.getAttribute("new_cutomertype").getText();
    if (CustmerTypeText == "Individual") {
        retVal = true;
    }

    return retVal;
}

function refreshRibbonOnFieldChange() {
    Xrm.Page.ui.refreshRibbon();
}




function testingjavascript() {
    alert("this javascript function is calling by Button");
}

function RibbonExample() {
    alert("we are calling from ribbon button");
}
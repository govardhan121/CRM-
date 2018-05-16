// JavaScript source code
//add the function to onsave event
function SetApproval(econtext) {
    //debugger;
    if (confirm("Are you sure you are confirmed the Passport Approval?")) {
        // Actions to perform when 'Ok' is selected:
        //cnr_loanapproved
        var Approval = Xrm.Page.data.entity.attributes.get("new_passportapproval");
        Approval.setValue(1);
        Xrm.Page.data.entity.attributes.get("new_passportapproval").setRequiredLevel("required");
        alert("Approval has been granted - click Ok to update CRM");
        //Xrm.Page.data.entity.save();
    }
    else {
        // Actions to perform when 'Cancel' is selected:
        alert("Action cancelled");
        econtext.getEventArgs().preventDefault();
        var Approval = Xrm.Page.data.entity.attributes.get("new_passportapproval");
        Approval.setValue(0);
    }
}

//open specific Loanofficer form from Loan customer
function PopLoanOfficer() {
    //get LoanID GUID
    var loanOfficerLookupID = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue()[0].id;
    if (loanOfficerLookupID != null) {
           
        Xrm.Utility.openEntityForm("new_laonofficer", loanOfficerLookupID)
        }
    
}
//pass data from loan customer to Loan Officer using Xrm.Utility
function passdata() {

    var parameters = {};

    parameters["new_customeradharnumber"] = Xrm.Page.getAttribute("new_customeradhar").getValue();
    Xrm.Utility.openEntityForm("new_laonofficer", null, parameters);

}

//create new loan officer record 
function CreateLoanOfficer() {
    var checktrue = Xrm.Page.getAttribute("new_createloanofficerrecord").getValue();
    alert(checktrue);
    
    if (Xrm.Page.getAttribute("new_createloanofficerrecord").getValue() == true) {
        Xrm.Utility.openEntityForm("new_laonofficer");//here entity name what ever it may be
        }
   


}
// Get Dirty Fields
//add this function to onsave event
function getIdentifyupdatedfields() {
   
    var attributes = Xrm.Page.data.entity.attributes.get();

    for (var i in attributes) {
        
        var attribute = attributes[i];

        if (attribute.getIsDirty())

            alert("attribute dirty: " + attribute.getName());

    }

}

//you should add this function to onload event of Loan Customer
//How to setup  a lookup using javascript
// JavaScript source code
// *** FUNCTION: SetLookUp
// *** PARAMS:
// ***    fieldName = The name of the lookup field  
// ***    fieldType = The type of field (contact, account etc)
// ***    fieldId = The ID of the value to set (GUID)
// ***    value = the value(name) to set
//function SetLookUp(fieldName, fieldType, fieldId, value) {


function SetLookUp() {
    try {

        var object = new Array();
        object[0] = new Object();

        object[0].id = '{A5416A10-58E1-E711-A955-000D3AF071E4}'; //lookup id or record ID of Loan Officer for Example Karthikeya
        object[0].name = "Chandana"; // lookupname or recprd name
        object[0].entityType = "new_loanofficers"; //entity name

        Xrm.Page.getAttribute("new_loanofficerid").setValue(object);
        //Xrm.Page.getAttribute("new_city").setValue("");
    }
    catch (e) {
        //    alert("Error in SetLookUp: fieldName = " + fieldName + " fieldType = " + fieldType + " fieldId = " + fieldId + " value = " + value + " error = " + e);
    }
}
//create one field example "GUID of Record" in Loan Officer 
//add this function onload event of loan officer and set the guid to the new_guidofrecord fields
function getRecordGUID() {

    var RecordID = Xrm.Page.data.entity.getId(); // this syntax is getting record ID
    Xrm.Page.getAttribute("icici_loanofficerguid").setValue(RecordID);
}

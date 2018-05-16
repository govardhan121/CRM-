// JavaScript source code
function CreateContact() {


   // if (Xrm.Page.getAttribute('new_createcontact').getValue() == true) {

        var name = Xrm.Page.data.entity.attributes.get("name").getValue();

        var createContact = new XrmServiceToolkit.Soap.BusinessEntity("contact");

        createContact.attributes["firstname"] = name;

        createContact.attributes["lastname"] = "Reddy";
        createContact.attributes["middlename"] = "<&>";
        createContact.attributes["gendercode"] = { value: 2, type: "OptionSetValue" };
        createContact.attributes["familystatuscode"] = { value: 1, type: "OptionSetValue" }; // Picklist : Single - 1
        createContact.attributes["creditlimit"] = { value: 2, type: "Money" };
        createContact.attributes["donotemail"] = true;
        createContact.attributes["donotphone"] = false;

        var contactId = XrmServiceToolkit.Soap.Create(createContact);

    }



//}
function updateRecordUsingSOAP() {
    //Update Entity
    
    //if (Xrm.Page.getAttribute('new_updatecontact').getValue() == true) {
  
    var name = Xrm.Page.data.entity.attributes.get("name").getValue();
   // var accountaddress = Xrm.Page.data.entity.attributes.get("address").getValue();

    if (Xrm.Page.data.entity.attributes.get("telephone1") != null) {
        if (Xrm.Page.data.entity.attributes.get("telephone1").getValue() != null) {
            var mainphone = Xrm.Page.data.entity.attributes.get("telephone1").getValue();
        }
    }
    
        var contactGuid = Xrm.Page.data.entity.attributes.get("primarycontactid").getValue()[0].id;
        if (contactGuid != null) {

            var updateEntity = new XrmServiceToolkit.Soap.BusinessEntity("contact", contactGuid);

            updateEntity.attributes["firstname"] = name;//Xrm.Page.data.entity.attributes.get("name").getValue();
            updateEntity.attributes["lastname"] = "nara";
            updateEntity.attributes["middlename"] = "simha";
            updateEntity.attributes["mobilephone"] = mainphone;
            //updateEntity.attributes["address1"] = accountaddress;

            var updateResponse = XrmServiceToolkit.Soap.Update(updateEntity);
            //}
        }
    
}

function deleteRecord() {
    if (Xrm.Page.getAttribute('new_contactdelete').getValue() == true) {
        var contactGuid = Xrm.Page.data.entity.attributes.get("primarycontactid").getValue()[0].id;

        if (contactGuid != null) {

            var deleteResponse = XrmServiceToolkit.Soap.Delete("contact", contactGuid);

        }
    }
}


function changeStatus() {
   // if (Xrm.Page.getAttribute('new_changestatus').getValue() == true) {
        var contactGuid = Xrm.Page.data.entity.attributes.get("primarycontactid").getValue()[0].id;
        setState(contactGuid);
    //}
}

function setState(contactGuid) {


    if (contactGuid != null) {
        var response = XrmServiceToolkit.Soap.SetState("contact", contactGuid, 1, 2);
    }
}

function retrievecontactDetails() {

    //if (Xrm.Page.getAttribute('new_retrievecontact').getValue() == true) {

        var contactGuid = Xrm.Page.data.entity.attributes.get("primarycontactid").getValue()[0].id;

        if (contactGuid != null) {

            var cols = ["firstname", "lastname", "middlename", "familystatuscode", "ownerid", "creditlimit", "birthdate", "donotemail", "donotphone"];


            XrmServiceToolkit.Soap.Retrieve("contact", contactGuid, cols,
function (result) {

    var firstName = result.attributes['firstname'].value;
    var lastName = result.attributes['lastname'].value;

    alert(firstName);
    alert(lastName);
    
})
        }
    }


//}


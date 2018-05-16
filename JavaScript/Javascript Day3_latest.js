//step2  experiement
//is it possible to assign a value to the readonly fields
//just bind this function any onchange event of filed like loan type after only you disabled a filed
function setvaluetoreadonlyfileds() {
    Xrm.Page.getAttribute("icici_pannumber").setValue("Eric1234");
}

//how to read value from read only fileds
//bind this finction onsave event
function readValuefromreadonlyfiled() {
    var cin = Xrm.Page.ui.controls.get("icici_pannumber").getValue();
    alert(cin);
}



//How to get the lookupid and Name // bind this function on any event
function getLookupIdText() {
    //debugger;
    var LoanOfficerID = Xrm.Page.getAttribute("new_loanofficerid").getValue()[0].id;

    alert(LoanOfficerID);
    //PopContact(loanGUID);
    var loanofficerName = Xrm.Page.getAttribute("new_loanofficerid").getValue()[0].name;
    alert(loanofficerName);
    //var entity = Xrm.Page.data.entity.getEntityName();

}
//--------------------------------------------------------Start---------------------------------------------------------------------------

//without context and passing fieldvalues and schemanames within function
//add this function on save or based upon your requireemtn
function specialCharactersRestriction() {

    //debugger;
    if (Xrm.Page.data.entity.attributes.get("new_name") != null) {
        var namevalue = Xrm.Page.data.entity.attributes.get("new_name").getValue();
        checkspecialchar(namevalue, "new_name");
    }
    if (Xrm.Page.data.entity.attributes.get("new_city") != null) {
        var namevalue = Xrm.Page.data.entity.attributes.get("new_city").getValue();
        checkspecialchar(namevalue, "new_city");
    }
}


function checkspecialchar(namevalue, fieldschemaname) {
    if (namevalue != null) {
        var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
        //var name = Xrm.Page.getAttribute("hppscm_othernames").getValue(); //name of the field where u want to check the special character
        var othername = namevalue;
        for (var i = 0; i < othername.length; i++) {
            if (iChars.indexOf(othername.charAt(i)) != -1) {
                alert("Special characters  are not allowed in this field");

                Xrm.Page.getAttribute(fieldschemaname).setValue(null);
                Xrm.Page.getControl(fieldschemaname).setFocus();
            }
        }
    }
}

//--------------------------------------end--------------------------------------

//--------------------------------------start-------------------------------
//with context and passing fieldvalues and schemanames within function
//add this function on save or based upon your requireemtn
function checkspecialcharbypassingmultipleparams(eContext,nameschema,cityschema,BankName) {
    debugger;
    if (Xrm.Page.getAttribute(nameschema).getValue() != null) {
        var NameValue = Xrm.Page.getAttribute(nameschema).getValue();
        checkspecialcharchecking(eContext,NameValue,nameschema);
    }
    if (Xrm.Page.getAttribute(cityschema).getValue() != null) {
        var cityValue = Xrm.Page.getAttribute(cityschema).getValue();
        checkspecialcharchecking(eContext,cityValue,cityschema);
    }
    if (Xrm.Page.getAttribute(BankName).getValue() != null) {
        var nara = Xrm.Page.getAttribute(BankName).getValue();
        checkspecialcharchecking(eContext, nara, BankName);
    }

   


}
function checkspecialcharchecking(eContext, fieldvalue, fieldschemaname) {

    if (fieldvalue != null) {
        var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
        //var name = Xrm.Page.getAttribute("hppscm_othernames").getValue(); //name of the field where u want to check the special character
        var othername = fieldvalue;
        for (var i = 0; i < othername.length; i++) {
            if (iChars.indexOf(othername.charAt(i)) != -1) {
                alert("Special characters  are not allowed in this field");

                Xrm.Page.data.entity.attributes.get(fieldschemaname).setValue(null);
                Xrm.Page.getControl(fieldschemaname).setFocus();

                eContext.getEventArgs().preventDefault();//this line of syntax going to abort the save operation
            }
        }
    }
}

//-------------------------end---------------------------------------------
////if validation failed our record should not be saved whenever user click on save button
    //function spchrestrictabortsave(eContext) {

    //    if (Xrm.Page.data.entity.attributes.get("new_name") != null) {
    //        var namevalue = Xrm.Page.data.entity.attributes.get("new_name").getValue();
    //        checkspecialchar_abortSave(eContext,namevalue, "new_name");
    //    }
    //    if (Xrm.Page.data.entity.attributes.get("new_city") != null) {
    //        var cityvalue = Xrm.Page.data.entity.attributes.get("new_city").getValue();
    //        checkspecialchar_abortSave(eContext, cityvalue, "new_city");
    //    }
    //}
    //function checkspecialchar_abortSave(eContext, fieldvalue, fieldschemaname) {

    // if (fieldvalue != null) {
    //        var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_";
    //        //var name = Xrm.Page.getAttribute("hppscm_othernames").getValue(); //name of the field where u want to check the special character
    //        var othername = fieldvalue;
    //        for (var i = 0; i < othername.length; i++) {
    //            if (iChars.indexOf(othername.charAt(i)) != -1) {
    //                alert("Special characters  are not allowed in this field");

    //                Xrm.Page.data.entity.attributes.get(fieldschemaname).setValue(null);
    //                Xrm.Page.getControl(fieldschemaname).setFocus();

    //                eContext.getEventArgs().preventDefault();
    //            }
    //        }
    //    }
    //}



// user should have to enter only alphabets
function onlyAlphabets(eContext, nameschema, cityschema) {
    if (Xrm.Page.getAttribute(nameschema).getValue() != null) {
        var NameValue = Xrm.Page.getAttribute(nameschema).getValue();
        checkAlphabetsOnlyorNot(eContext, NameValue, nameschema);
    }
    if (Xrm.Page.getAttribute(cityschema).getValue() != null) {
        var cityValue = Xrm.Page.getAttribute(cityschema).getValue();
        checkAlphabetsOnlyorNot(eContext, cityValue, cityschema);
    }

}



function checkAlphabetsOnlyorNot(eContext, fieldValue, fieldschemaname) {

    var regex = /^[a-zA-Z]*$/;
    if (!regex.test(fieldValue)) {
        alert("Please enter only alpha bets");
        Xrm.Page.data.entity.attributes.get(fieldschemaname).setValue(null);
        Xrm.Page.getControl(fieldschemaname).setFocus();
        eContext.getEventArgs().preventDefault();

    }
}

//today date 11/03/2017

//Restricts user to enter only numbers to the specified field like debitcardnumber , phonenumber , adhar number , pin number.
function AllowOnlyNumber() {

    AllowOnlyNumberValidation("new_customerphonenumber");
}
//Validation script
function AllowOnlyNumberValidation(fieldname) {
    var getValue = Xrm.Page.getAttribute(fieldname).getValue();
    if (getValue != null) {
        var isANumber = isNaN(getValue) === false;
        if (!isANumber) {
            Xrm.Page.getAttribute(fieldname).setValue(null);
            Xrm.Page.getControl(fieldname).setFocus();
            alert('This field must be numeric.');

        }
    }
}
///start make generic above function

//Restricts user to enter only numbers to the specified field like debitcardnumber , phonenumber , adhar number , pin number.
function AllowOnlyNumber(eContext,customerphonenumber) {
    var phonenumberdata = Xrm.Page.getAttribute(customerphonenumber).getValue();
    if (phonenumberdata != null) {
        AllowOnlyNumberValidation(eContext,phonenumberdata, customerphonenumber);
    }

}
//Validation script
function AllowOnlyNumberValidation(eContext, fieldname,customerphonenumber) {
   
    if (fieldname != null) {
        var isANumber = isNaN(fieldname) === false;
        if (!isANumber) {
   
            alert('This field must be numeric.');
            Xrm.Page.data.entity.attributes.get(customerphonenumber).setValue(null);
            Xrm.Page.getControl(customerphonenumber).setFocus();
            eContext.getEventArgs().preventDefault();

        }
    }
}

//end

//Restricts user to enter not only integers but user should have to enter  atleast one alphabets like panumber,passport...create fields with single line of text datatype
function AllowLetterpanNumber() {
    var attribute = Xrm.Page.getAttribute("new_pannumber");
    if (attribute != null) {
        //Xrm.Page.getAttribute("axis_firstname").addOnChange(function () { AllowLetterValidation("axis_firstname"); });
        AllowLetterValidation("new_pannumber");
    }
}

//Validation script
function AllowLetterValidation(fieldname) {
    var getValue = Xrm.Page.getAttribute(fieldname).getValue();
    if (getValue != null) {
        var isANumber = isNaN(getValue) === false;
        if (isANumber) {
            Xrm.Page.getAttribute(fieldname).setValue(null);
            alert('This field must be characteristics and please enter atleast one alphabets ');
        }
    }
}


//Please check the whether we can read the value form read only fileds or set the value
//step 1 : add this function to the onload event
function disabledfields() {
    Xrm.Page.ui.controls.get("new_cinnumber").setDisabled(true);
}
//to set the field value when ever you select the customer type is corporate
//onvhange of customer type
function setfieldValuetoreadonlyfileds() {

    Xrm.Page.ui.controls.get("new_cinnumber").setDisabled(true);
}




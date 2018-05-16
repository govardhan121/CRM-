
// JavaScript source code
//Please create the 2 fields like candiddate phone , business phone with datatype single line of text and format is phone number
//bind this function to onsave event of form ,if validation fails then abort the save operation
function PhoneNumberValidation(econtext, candidatephone) {
    //var phone = context.getEventSource().getName();
    //var phoneDesc = Xrm.Page.getControl(context.getEventSource().getName()).getLabel();
    //var ret = true;
    
    var phone1 = Xrm.Page.getAttribute(candidatephone).getValue();
    if (phone1 != null) {
        phonenumbersvalidation(econtext,phone1);
    }
    //var phone2 = Xrm.Page.getAttribute(businessphone).getValue();
    //if (phone2 != null) {
    //    phonenumbersvalidation(econtext, phone2);
    //}
 

    //// First trim the phone number
    //if (phone1 != null) {
    //    var stripPhone = phone1.replace(/[^0-9]/g, '');

    //    if (stripPhone.length < 10) {
    //        alert("The  you entered phone number must be at 10 digits. Please correct the entry.");
    //        //Xrm.Page.ui.controls.get(phone).setFocus();
    //        //ret = false;
    //        econtext.getEventArgs().preventDefault();
    //    }
    //    if (stripPhone.length > 10) {
    //        alert("The  you entered phone number must be at 10 digits not more than. Please correct the entry.");
    //        //Xrm.Page.ui.controls.get(phone).setFocus();
    //        ret = false;
    //        econtext.getEventArgs().preventDefault();
    //    }
    //}
    ////for business phone

    //// First trim the phone number
    //if (businessphone != null) {
    //    var busphone = businessphone.replace(/[^0-9]/g, '');

    //    if (busphone.length < 10) {
    //        alert("The  you entered phone number must be at 10 digits. Please correct the entry.");
    //        //Xrm.Page.ui.controls.get(phone).setFocus();
    //        //ret = false;
    //        econtext.getEventArgs().preventDefault();
    //    }
    //    if (busphone.length > 10) {
    //        alert("The  you entered phone number must be at 10 digits not more than. Please correct the entry.");
    //        //Xrm.Page.ui.controls.get(phone).setFocus();
    //        ret = false;
    //        econtext.getEventArgs().preventDefault();
    //    }
    //}

    ////Xrm.Page.getAttribute(phone).setValue(phone2);
    // return ret;
}




function phonenumbersvalidation(econtext,phone) {
    if (phone != null) {
        var busphone = phone.replace(/[^0-9]/g, '');

        if (busphone.length < 10) {
            alert("The  you entered phone number must be at least 10 digits. Please correct the entry.");
            Xrm.Page.ui.controls.get(phone).setFocus();
            //ret = false;
            econtext.getEventArgs().preventDefault();
        }
        if (busphone.length > 10) {
            alert(phone + "The  you entered phone number must be at 10 digits not more than. Please correct the entry.");
            Xrm.Page.ui.controls.get(phone).setFocus();
            
            //ret = false;
            econtext.getEventArgs().preventDefault();
        }
    }

}

//bind this function to onchange event of passport Expiry Date or Departure Date
function passportexpiryCheckingwithDeparture() {

    //debugger;

    if (Xrm.Page.data.entity.attributes.get("new_passportexpirydate").getValue() != null) {
        var PassPortexpiry = Xrm.Page.data.entity.attributes.get("new_passportexpirydate").getValue();
    }

    if (PassPortexpiry != null) {
        var PassPortexpDate = new Date((PassPortexpiry.getMonth() + 1).toString() + "/" + PassPortexpiry.getDate() + "/" + PassPortexpiry.getFullYear().toString());
    }
    //03/17/2016
    if (Xrm.Page.data.entity.attributes.get("new_departuredate").getValue() != null) {
        var Departure = Xrm.Page.data.entity.attributes.get("new_departuredate").getValue();
    }
    if (Departure != null) {
        var DapartureDate = new Date((Departure.getMonth() + 1).toString() + "/" + Departure.getDate() + "/" + Departure.getFullYear().toString());
    }

    if (PassPortexpDate != null && DapartureDate != null && PassPortexpDate <= DapartureDate) {

        alert("Passport expiry date should be more than departure date.");
        Xrm.Page.getControl("new_passportexpirydate").setFocus();
        Xrm.Page.data.entity.attributes.get("new_passportexpirydate").setValue(null);

    }
}

//today date with expirydate
//this function will be add to the onchange event of passport expirydate
function passportexpiryCheckingwithTodayDate() {
    

    var PassPortexpiry = Xrm.Page.data.entity.attributes.get("new_passportexpirydate").getValue();
    //debugger;
    if (PassPortexpiry != null) {
        var PassPortexpDate = new Date((PassPortexpiry.getMonth() + 1).toString() + "/" + PassPortexpiry.getDate() + "/" + PassPortexpiry.getFullYear().toString());
    }
    var today = new Date();

    if (PassPortexpiry != null) {

        if (PassPortexpDate < today) {
            alert("Your passport ExpiryDate cannot be less than today.");
            Xrm.Page.getControl("new_passportexpirydate").setFocus();
            Xrm.Page.data.entity.attributes.get("new_passportexpirydate").setValue(null);
        }
    }
}
////end

//this function add to the onchange event of returndate
function PassportexpcheckingwithReturnDate() {
    var PassPortexpiry = Xrm.Page.data.entity.attributes.get("new_passportexpiry").getValue();
    
    if (PassPortexpiry == null)
        return true;
    var PassPortexpDate = new Date((PassPortexpiry.getMonth() + 1).toString() + "/" + PassPortexpiry.getDate() + "/" + PassPortexpiry.getFullYear().toString());
    var ReturnDates = Xrm.Page.data.entity.attributes.get("new_returndate").getValue();
    var ReturnDate = new Date((ReturnDates.getMonth() + 1).toString() + "/" + ReturnDates.getDate() + "/" + ReturnDates.getFullYear().toString());
    var _dateTimeNow = new Date();
    var _dateNow = new Date((_dateTimeNow.getMonth() + 1).toString() + "/" + _dateTimeNow.getDate() + "/" + _dateTimeNow.getFullYear().toString());
    if (PassPortexpDate != null && PassPortexpDate <= ReturnDate) {
        //HP.VFS.ShowNotification(HP.VFS.Message.ValidDOB, HP.VFS.NotificationLevel.ERROR, HP.VFS.NotificationUniqueId.DOB);
        alert("Return date should be less than Passport expiry date.");
        Xrm.Page.getControl("new_passportexpiry").setFocus();
        Xrm.Page.data.entity.attributes.get("new_passportexpiry").setValue(null);
        //return false;
    }
}

//this function should have to add the onchange event of Return Date.
function ReturnDatecheckingwithDeparture() {
    if (Xrm.Page.data.entity.attributes.get("new_departuredate").getValue() != null);
    {
        var Departure = Xrm.Page.data.entity.attributes.get("new_departuredate").getValue();
    }
    if (Departure != null) {
        var DapartureDate = new Date((Departure.getMonth() + 1).toString() + "/" + Departure.getDate() + "/" + Departure.getFullYear().toString());
    }

    var ReturnDates = Xrm.Page.data.entity.attributes.get("new_returndate").getValue();
    var ReturnDate = new Date((ReturnDates.getMonth() + 1).toString() + "/" + ReturnDates.getDate() + "/" + ReturnDates.getFullYear().toString());

    if (ReturnDate != null && ReturnDate <= DapartureDate) {
        //HP.VFS.ShowNotification(HP.VFS.Message.ValidDOB, HP.VFS.NotificationLevel.ERROR, HP.VFS.NotificationUniqueId.DOB);
        alert("Return date should be more than departure date.");
        Xrm.Page.getControl("new_returndate").setFocus();
        Xrm.Page.data.entity.attributes.get("new_returndate").setValue(null);

    }
}

//please add this function to onsave event by cheking the context check box
function AgeValidation(econtext) {
    if (Xrm.Page.getAttribute("new_dob").getValue() != null) {
        var birthday = Xrm.Page.getAttribute("new_dob").getValue();
    }
    var currentDate = new Date();
    var customerAge = CalculateAge(birthday, currentDate);
    var age = 17;
    if (customerAge < age) {
        //alert("Customer should be older then " + age);
        //Xrm.Page.getAttribute(birthdayField).setValue();
        //Xrm.Page.getControl("new_dob").setNotification("Customer should be older than " + age);

        Xrm.Page.ui.setFormNotification('Please select the customer age more than 17 years', 'ERROR', '1');

        Xrm.Page.ui.setFormNotification('Remove the date', 'WARNING', '2');

        Xrm.Page.ui.setFormNotification('The age should be more than 17 years', 'Information', '3');
        econtext.getEventArgs().preventDefault();
    }
    else {
        //Xrm.Page.getControl("new_dateofbirth").clearNotification();
        Xrm.Page.getControl("new_dob").clearNotification();
        Xrm.Page.ui.clearFormNotification("1");
        Xrm.Page.ui.clearFormNotification("2");
        Xrm.Page.ui.clearFormNotification("3");
    }

}

function CalculateAge(birthday, ondate) {
    if (ondate == null) {
        ondate = new Date();
    }
    if (ondate < birthday) {
        return 0;
    }
    var age = ondate.getFullYear() - birthday.getFullYear();

    if (birthday.getMonth() > ondate.getMonth() || (birthday.getMonth() == ondate.getMonth() && birthday.getDate() > ondate.getDate())) {
        age--;
    }
    return age;
}


//bind this function to the onchange event of date of birth field
//Home work for 19th Batch
//just bind this function onchange event of DOB
function DOBValidation() {

    var _DOB = Xrm.Page.data.entity.attributes.get("new_dob").getValue();

    if (_DOB == null)
        return true;

    var _DOBDate = new Date((_DOB.getMonth() + 1).toString() + "/" + _DOB.getDate() + "/" + _DOB.getFullYear().toString());

    //here SystemDate
    var _dateTimeNow = new Date();

    var _dateNow = new Date((_dateTimeNow.getMonth() + 1).toString() + "/" + _dateTimeNow.getDate() + "/" + _dateTimeNow.getFullYear().toString());

    if (_DOB != null && _DOB >= _dateNow) {
        alert("Please enter valid date of birth");
        Xrm.Page.data.entity.attributes.get("new_dob").setValue(null);
        Xrm.Page.getControl("new_dob").setFocus();
    }
}





// JavaScript source code


//please validate the passport expiry date , it should not be lessthan today 

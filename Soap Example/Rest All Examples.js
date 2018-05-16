function createAccountusingXrmServiceToolKit() {



    if (Xrm.Page.getAttribute("new_createrecord").getValue() == true) {

        var account = {};

        account.Name = Xrm.Page.getAttribute("fullname").getValue();

        account.Description = "This is Sample Account";
        account.Address1_City = Xrm.Page.getAttribute("address1_city").getValue();
        account.EMailAddress1 = Xrm.Page.getAttribute("emailaddress1").getValue();

        account.PreferredContactMethodCode = { Value: 2 };

        account.Revenue = { Value: "2000000.00" }; //Set Annual Revenue//Set a Boolean value

        account.DoNotPhone = true; //Do Not Allow//Add Two Tasksvar today = new Date();var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3); //Set a date three days in the future.var LowPriTask = { Subject: "Low Priority Task", ScheduledStart: startDate, PriorityCode: { Value: 0} }; //Low Priority Taskvar HighPriTask = { Subject: "High Priority Task", ScheduledStart: startDate, PriorityCode: { Value: 2} }; //High Priority Task



        XrmServiceToolkit.Rest.Create(
                    account, "AccountSet", function (result) {
                        accountId = result.AccountId;

                    },
                     function (error) {
                         equal(true, false, error.message);
                     },
                    false
                );
    }
}



function retrieveAccountDetails() {
    if (Xrm.Page.getAttribute("new_retrieverecord").getValue() == true) {
        var accountLookupID = Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;
        var re;
        XrmServiceToolkit.Rest.Retrieve(
    accountLookupID,
                  "AccountSet",
                  null, null,
                  function (result) {
                      re = result;
                      alert("success");
                  },
                  function (error) {
                      alert("failed");
                  },
                  false
              );
        //debugger;
        alert(re.Name);
        alert(re.AccountId);
        alert(re.Address1_City);
        alert(re.Address1_Line1);
        // Please create a some of the fields related to account in contact entity, and retrieve then set those data to the fileds
        //you have to set the fileds data as below
        //Xrm.Page.getAttribute("new_accountName").setValue(re.Name);
        //Xrm.Page.getAttribute("new_accountCity").setValue(re.Address1_City)
        
    }
}

function Update() {
    if (Xrm.Page.getAttribute("new_updaterecord").getValue() == true) {
        var accountLookupID = Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;

        var account = {};

        account.Name = "SO and Company A1";//Xrm.Page.getAttribute("email").getValue();
        account.Address1_AddressTypeCode = { Value: 3 }; //Address 1: Address Type = Primary
        account.Address1_City = Xrm.Page.getAttribute("address1_city").getValue(); // here you need to use name not schema name
        account.Address1_Line1 = "153 Dunmore Stret";
        


        XrmServiceToolkit.Rest.Update(
            accountLookupID,
            account,
            "AccountSet",
            function () {
                alert("successfully Updated");
            },
            function (error) {
                alert("failed to Update");
            },
            false
        )

    }// JavaScript source code
}


function Delete() {
    if (Xrm.Page.getAttribute("new_deleterecord").getValue() == true) {
        var accountLookupID = Xrm.Page.getAttribute("parentcustomerid").getValue()[0].id;
        //alert("Inside Delete");
        XrmServiceToolkit.Rest.Delete(
                    accountLookupID,
                    "AccountSet",
                    function () {
                        alert("successfully deleted");
                    },
                    function (error) {
                        alert("failed to delete");
                    },
                    false
                );
    }
}


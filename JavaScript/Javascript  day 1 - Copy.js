55function getRecordIDandFormName() {
    //How do i get record ID
    var RecordID = Xrm.Page.data.entity.getId();
    alert(RecordID);
    //How to get entityName
    var entityName = Xrm.Page.data.entity.getEntityName();
    alert(entityName);
    //How do you get formtype
    var formType = Xrm.Page.ui.getFormType();
    alert(formType);
    //how do i get FormID
    var theCurrentFormId = Xrm.Page.ui.formSelector.itemObj.getId();
    alert(theCurrentFormId); 

    var theCurrentFormLabel = Xrm.Page.ui.formSelector.itemObj.getLabel();
    alert(theCurrentFormLabel);

    if (theCurrentFormId == "") {
        //do something
    }

}

function getcityfielddata() {
    //debugger;
    if (Xrm.Page.getAttribute("new_city") != null) //verify the field is presented on the form or not 
    {
        if (Xrm.Page.getAttribute("new_city").getValue() != null)////if the field is presented on the form then check the value of the filed whether value is there ot not
        {
            var cityValue = Xrm.Page.getAttribute("new_city").getValue();
            alert(cityValue);
        }

    }
   
}

//bind the function to onsave if user forget to enter city then by defauly city value should set
function setcityfielddata() {
    var formType = Xrm.Page.ui.getFormType()
    if (formType == 1) {
         if (Xrm.Page.getAttribute("new_city").getValue() == null) {
            Xrm.Page.getAttribute("new_city").setValue("Bangalore");
        }
       
    }
}
//just bind this function Onchange event Of Customer Type
function showandhidesectionsbasedoncustomer() {
    debugger;
    var customertypeValue = Xrm.Page.getAttribute("icici_customertype").getValue();
    var customertypename = Xrm.Page.getAttribute("icici_customertype").getText();


    if (customertypename == "Individual") {
        //here 
        HideShowSection("tab_2", "tab_2_section_2", false);//hide the corporate section
        HideShowSection("tab_2", "tab_2_section_1", true);//show the individual section
    }
    if (customertypename == "Corporate") {
        HideShowSection("tab_2", "tab_2_section_1", false);//hide the individual section
        HideShowSection("tab_2", "tab_2_section_2", true);//show the corporate section
    }

}
//just bind this function Onload Evennt event Of form
//because we don't want load by default untill choose the customer Type
function hidesectionsbydefault() {
        HideShowSection("tab_2", "tab_2_section_2", false);//hide the corporate section
        HideShowSection("tab_2", "tab_2_section_1", false);//hide the individual section
    

}

//add this function to onchange event of loan type
function showandhidesectionsBasedonLoanType() {

    var loanValue = Xrm.Page.getAttribute("new_loantype").getValue();
    alert(loanValue);
    //debugger;
    var LoanName = Xrm.Page.getAttribute("new_loantype").getText();
    alert(LoanName);

    if (LoanName == "Gold") {
        HideShowSection("GeneralTab", "EducationLoanInfo", false);//HIDE THE Education  section

        HideShowSection("GeneralTab", "Goldloansection", true);//show the gold loan section
    }
    if (LoanName == "Vehicle") {
        HideShowSection("GeneralTab", "Goldloansection", false); //hide the gold loan section 

        HideShowSection("GeneralTab", "EducationLoanInfo", true);//show the Education loan section
    }

}

//add this function to onload event if you want hide by defaultly
function hidingthesectionsbydefault() {

    var LoanName = Xrm.Page.getAttribute("new_loantype").getText();
    //whenever user creating a loan record by default loan type blank then don't want show the sections
    //bind this function  to onloadevent
    if (LoanName == null) {
        HideShowSection("GeneralTab", "Goldloansection", false); //hide the gold loan section
        HideShowSection("GeneralTab", "EducationLoanInfo", false);//HIDE THE education  section
    }
   

}


function HideShowSection(tabName, sectionName, visible) {
    try {
        Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName).setVisible(visible);
        //Xrm.Page.ui.tabs.get("tab_2").sections.get("tab_2_section_3").setVisible(false);
    }
    catch (err) { }
}

//bind this function onchange event of loan Type customer type or payment type fields
function hidetabbasedonloantype() {

    var paymenttype = Xrm.Page.getAttribute("new_paymenttype").getText();
    var paymenttypeValue = Xrm.Page.getAttribute("new_paymenttype").getValue();
    alert(paymenttype);
    alert(paymenttypeValue);
  
    if (paymenttype == "Credit Card") {
        HideShowTab("tab_2", false);
    }
}

function HideShowTab(tabName, visible) {
    try {
        Xrm.Page.ui.tabs.get(tabName).setVisible(visible); //How to hide a tab
    }
    catch (err) { }
}
//bind this function to the Customer type or your choice
function hideshowfields() {
    var customertype = Xrm.Page.getAttribute("new_customertype").getText();
    if (customertype == "Individual") {
        Xrm.Page.ui.controls.get("new_tinnumber").setVisible(false);
        Xrm.Page.ui.controls.get("new_pannumber").setVisible(true);
    }
    if (customertype == "Corporate") {
        Xrm.Page.ui.controls.get("new_pannumber").setVisible(false);
        Xrm.Page.ui.controls.get("new_tinnumber").setVisible(true);
    }
}


//Just bind this function to the onchange event of any optionset or what ever
function disabledenabledfields() {
    var customertypeValue = Xrm.Page.getAttribute("new_customertype").getValue();
    var customertypename = Xrm.Page.getAttribute("new_customertype").getText();
    alert(customertypeValue);
    alert(customertypename);
    if (customertypename == "Individual") {
       
        Xrm.Page.ui.controls.get("new_tinnumber").setDisabled(true);
        Xrm.Page.ui.controls.get("new_pannumber").setDisabled(false);
    }
    if (customertypename == "Corporate") {

        Xrm.Page.ui.controls.get("new_pannumber").setDisabled(true);
        Xrm.Page.ui.controls.get("new_tinnumber").setDisabled(false);
    }

}



//How to make a filed as Mandatory based on validations
//bind the function to the onsave event if user forgot to enter the data on pan number then this filed should be mandatory
function setRequirementlevel() {
    var customertypeValue = Xrm.Page.getAttribute("new_customertype").getValue();
    var customertypename = Xrm.Page.getAttribute("new_customertype").getText();
    if (customertypename == "Individual") {
       
        Xrm.Page.getAttribute("new_pannumber").setRequiredLevel("required");//this filed is mandatory
    }
    if (customertypename == "Corporate") {

        Xrm.Page.getAttribute("new_cinnumber").setRequiredLevel("required");
    }
        
    
}
// JavaScript source code

function getLoanOfficerDetails() {

    var loanOfficerLookupId = null;

    var loanOfficer = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue();
    //var loanOfficer = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue()[0].id;
    if (loanOfficer) {
        loanOfficerLookupId = loanOfficer[0].id;
    }
    var _fetchLoanOfficerDetails = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
"  <entity name='new_loanofficer'>" +
"    <attribute name='new_loanofficerid' />" +
"    <attribute name='new_name' />" +
"    <attribute name='createdon' />" +
"    <attribute name='new_loanofficerphone' />" +
"    <attribute name='new_managerid' />" +
"    <attribute name='new_loanofficeremail' />" +
"    <attribute name='new_loanofficercity' />" +
"    <attribute name='new_loanofferaddress' />" +
"    <order attribute='new_name' descending='false' />" +
"    <filter type='and'>" +
"      <condition attribute='new_loanofficerid' operator='eq'  uitype='new_loanofficer' value='" + loanOfficerLookupId + "'/>" +
"    </filter>" +
"  </entity>" +
"</fetch>"
    var fetch_Results = XrmServiceToolkit.Soap.Fetch(_fetchLoanOfficerDetails);
    if (fetch_Results.length > 0) {

        var loanOfficerName = fetch_Results[0].attributes['new_name'].value;
        var loanOfficerphone = fetch_Results[0].attributes['new_loanofficerphone'].value;
        var loanOfficeremail = fetch_Results[0].attributes['new_loanofficeremail'].value;
        var loanOfficercity = fetch_Results[0].attributes['new_loanofficercity'].value;
        var loanOfficeraddress = fetch_Results[0].attributes['new_loanofferaddress'].value;
        var loanOfficermanagerID = fetch_Results[0].attributes['new_managerid'].value;

        // example if you want to set  the data 
        Xrm.Page.getAttribute("new_loanofficername").setValue(loanOfficerName);
        Xrm.Page.getAttribute("new_loanofficerphone").setValue(loanOfficerphone);
        Xrm.Page.getAttribute("new_loanofficeremail").setValue(loanOfficeremail );
        Xrm.Page.getAttribute("new_loanofficeraddress").setValue(loanOfficeraddress );
        //Xrm.Page.getAttribute().setValue(loanOfficerName );
        
    }
}
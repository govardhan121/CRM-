// JavaScript source code

function getLoanOfficerDetails() {

    var loanOfficerLookupId = null;

    var loanOfficer = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue();
    //var loanOfficer = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue()[0].id;
    if (loanOfficer) {
        loanOfficerLookupId = loanOfficer[0].id;
    }
 var _fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "  <entity name='new_laonofficer'>" +
"    <attribute name='new_laonofficerid' />" +
"    <attribute name='new_name' />" +
"    <attribute name='createdon' />" +
"    <attribute name='new_loanofficerphonenumber' />" +
"    <attribute name='new_customeradharnumber' />" +
"    <order attribute='new_name' descending='false' />" +
"    <filter type='and'>" +
"      <condition attribute='new_laonofficerid' operator='eq' uitype='new_laonofficer' value='" + loanOfficerLookupId + "'/>" +
"    </filter>" +
"  </entity>" +
"</fetch>"
    var fetch_Results = XrmServiceToolkit.Soap.Fetch(_fetchXML);
    if (fetch_Results.length > 0) {

        var loanOfficerName = fetch_Results[0].attributes['new_name'].value;
        var loanOfficerphone = fetch_Results[0].attributes['new_loanofficerphonenumber'].value;
        var loanOfficeradhar = fetch_Results[0].attributes['new_customeradharnumber'].value;
    
    // example if you want to set  the data 
      //Xrm.Page.getAttribute().setvalue(loanOfficerName );
        alert(loanOfficerName);
        alert(loanOfficerphone);
        alert(loanOfficeradhar);
    }
}

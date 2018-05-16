// JavaScript source code

function getBranchManagerDetails() {
    var BranchmanagerLookupID = null;

    var branchmanager = Xrm.Page.data.entity.attributes.get("icici_branchmanagerid").getValue();
    //var loanOfficer = Xrm.Page.data.entity.attributes.get("new_loanofficerid").getValue()[0].id;
    if (branchmanager) {
        BranchmanagerLookupID = branchmanager[0].id;
    }

    var _fetchManagerquery = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
"  <entity name='icici_branchmanager'>" +
"    <attribute name='icici_branchmanagerid' />" +
"    <attribute name='icici_name' />" +
"    <attribute name='createdon' />" +
"    <attribute name='icici_phone' />" +
"    <attribute name='icici_email' />" +
"    <attribute name='icici_branchmanagercity' />" +
"    <order attribute='icici_name' descending='false' />" +
"    <filter type='and'>" +
"      <condition attribute='icici_branchmanagerid' operator='eq' uitype='icici_branchmanager' value='" + BranchmanagerLookupID + "'/>" +
"    </filter>" +
"  </entity>" +
"</fetch>"

    var fetch_Results = XrmServiceToolkit.Soap.Fetch(_fetchManagerquery);
    if (fetch_Results.length > 0) {

        var BranchManagerName = fetch_Results[0].attributes['icici_name'].value;
        var BranchManagerphone = fetch_Results[0].attributes['icici_phone'].value;
        var branchManagerEmail = fetch_Results[0].attributes['icici_email'].value;

        
        Xrm.Page.data.entity.attributes.get("icici_branchmanagerphone").setValue(BranchManagerphone);
        alert(BranchManagerName);
        alert(BranchManagerphone);
        alert(branchManagerEmail);
    }
    
}

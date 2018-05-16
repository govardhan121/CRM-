//JavaScript source code
//single Retrieve
function getcityandState() {
    var picodeGUIDs = Xrm.Page.getAttribute("icici_pincodeid").getValue()[0].id;
    pincodeGUID = picodeGUIDs.substring(1, 37);
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/icici_pincodeses(" + pincodeGUID + ")?$select=_icici_cityid_value,icici_name,_icici_stateid_value", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var _icici_cityid_value = result["_icici_cityid_value"];
                var _icici_cityid_value_formatted = result["_icici_cityid_value@OData.Community.Display.V1.FormattedValue"];
                var _icici_cityid_value_lookuplogicalname = result["_icici_cityid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var icici_name = result["icici_name"];

                var _icici_stateid_value = result["_icici_stateid_value"];
                var _icici_stateid_value_formatted = result["_icici_stateid_value@OData.Community.Display.V1.FormattedValue"];
                var _icici_stateid_value_lookuplogicalname = result["_icici_stateid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                SetLookUp(_icici_cityid_value, _icici_cityid_value_formatted, _icici_cityid_value_lookuplogicalname, "icici_cityid");
                SetLookUp(_icici_stateid_value, _icici_stateid_value_formatted, _icici_stateid_value_lookuplogicalname, "icici_stateid");

            } else {

                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();

}

function SetLookUp(guid, looupname, entityname, fieldSchema) {
    try {

        var object = new Array();
        object[0] = new Object();
        object[0].id = guid; //lookup id or record ID
        object[0].name = looupname; // lookupname or recprd name
        object[0].entityType = entityname; //entity name

        Xrm.Page.getAttribute(fieldSchema).setValue(object);
    }
    catch (e) {
        //    alert("Error in SetLookUp: fieldName = " + fieldName + " fieldType = " + fieldType + " fieldId = " + fieldId + " value = " + value + " error = " + e);
    }
}



// JavaScript source code

function updatepincodedetails() {

    var picodeGUIDs = Xrm.Page.getAttribute("icici_pincodeid").getValue()[0].id;
    pincodeGUID = picodeGUIDs.substring(1, 37);

    var entity = {};
    entity.icici_noofpostoffice = "99";
    entity.icici_population = "9000";

    var req = new XMLHttpRequest();
    req.open("PATCH", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/icici_pincodeses(" + pincodeGUID + ")", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
                //Success - No Return Data - Do Something
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(entity));

}


function deletePincodeRecord() {

    var picodeGUIDs = Xrm.Page.getAttribute("icici_pincodeid").getValue()[0].id;
    pincodeGUID = picodeGUIDs.substring(1, 37);

    var req = new XMLHttpRequest();
    req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/icici_pincodeses(" + pincodeGUID + ")", true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204 || this.status === 1223) {
                //Success - No Return Data - Do Something
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}


// JavaScript source code
//below example is retrieve multiple
//Example is we want retrieve the accounts who do not have primary contact ID
function getretrieveaccounts() {
    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v8.2/accounts?$select=name&$filter=_primarycontactid_value eq null", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    var name = results.value[i]["name"];
                    alert(name);
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
}
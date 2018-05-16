// JavaScript source code
//add this function to country filed onchange
function getContryDetails() {

    var countryLookupId = null;

    var countryID = Xrm.Page.data.entity.attributes.get("new_countryid").getValue();

    if (countryID) {
        countryLookupId = countryID[0].id;
    }
    var _fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
        "  <entity name='new_country'>" +
        "    <attribute name='new_countryid' />" +
        "    <attribute name='new_name' />" +
        "    <attribute name='createdon' />" +
        "    <attribute name='new_minimumage' />" +
        "    <attribute name='new_maximumage' />" +
        "    <order attribute='new_name' descending='false' />" +
        "    <filter type='and'>" +
        "    <condition attribute='new_countryid' operator='eq' uitype='new_country' value='" + countryLookupId + "' />" +
        "</filter>" +
        "</entity>" +
        "</fetch>";
 var fetch_Results = XrmServiceToolkit.Soap.Fetch(_fetchXML);

    if (fetch_Results.length > 0) {
        var CountryName = fetch_Results[0].attributes['new_name'].value;
        var MinAge = fetch_Results[0].attributes['new_minage'].value;
        var MaxAge = fetch_Results[0].attributes['new_maxage'].value;

        //alert(CountryName);

        //alert(MinAge);

        //alert(MaxAge);

        if (Xrm.Page.getAttribute("new_dob").getValue() != null) {
            var birthdayDate = Xrm.Page.getAttribute("new_dob").getValue();
            var currentDate = new Date();

            var customerAge = CalculateAge(birthdayDate, currentDate);
        }

        var countryminage = MinAge;

        if (customerAge < countryminage) {
            alert("Customer age should be more  than " + countryminage);
            Xrm.Page.getAttribute("new_dob").setValue();

        }
       
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
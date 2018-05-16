// JavaScript source code
function SampleOnload() {

    alert("Hi this is Onload Event Example");
}

function SampleOnSave() {

    alert("Hi this is OnSave Event Example");
}

function SampleOnchange() {
    alert("Hi this is OnChange Event Example");
}

function getcityfielddata() {
    //debugger;
    if (Xrm.Page.getAttribute("icici_loanofficercity") != null) //verify the field is presented on the form or not 
    {
        if (Xrm.Page.getAttribute("icici_loanofficercity").getValue() != null)////if the field is presented on the form then check the value of the filed whether value is there ot not
        {
            var cityValue = Xrm.Page.getAttribute("icici_loanofficercity").getValue();

            alert(cityValue);
        }

    }

}

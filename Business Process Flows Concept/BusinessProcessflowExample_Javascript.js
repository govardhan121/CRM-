// JavaScript source code bnid this function onload event of form
function registerProcessEvent() {

    //add OnStageChange event handlers for the business process flow control.

   
    Xrm.Page.data.process.addOnStageChange(onStageChange);
    //Xrm.Page.data.process.addOnStageSelected(onStageSelected);

    //add OnStageSelected event handlers for the business process flow control.

    Xrm.Page.data.process.addOnStageSelected(getSelectedStage);

    //Xrm.Page.data.process.getSelectedStage(getSelectedStage);

}

function onStageChange() {

    alert("On stage change event");
  
}

//event handler for Stage Selected

function onStageSelected() {

    alert("On stage Selected event");
    //retrieveActiveProcess();
    //getSelectedStage();
}
//add the function to the onload.....
function retrieveActiveStage() {

    //Get active stage

    var activeStage = Xrm.Page.data.process.getActiveStage();

    var stageName = activeStage.getName();

    var stageID = activeStage.getId();

    alert("Acitve stage is " + stageName + " ID = " + stageID);

}
//add the function to the onload..... based up on your business requireemmnt
function retrieveActiveProcess() {

    //Get active process

    var activeProcess = Xrm.Page.data.process.getActiveProcess();

    var processName = activeProcess.getName();

    var processID = activeProcess.getId();

    alert("Acitve process is " + processName + " ID = " + processID);

}
//bind this function to the event handlers of Onstageselected refere the first function
function getSelectedStage() {

    alert("Hi");
    var stageObj = Xrm.Page.data.process.getSelectedStage();

    var stageCategoryNumber = stageObj.getCategory().getValue();
    alert(stageCategoryNumber);
    var stageEntityName = stageObj.getEntityName();
    alert(stageEntityName);
    var stageId = stageObj.getId();
    alert(stageId);
    var stageName = stageObj.getName();
    alert(stageName);
    if (stageName == "Approval") {
        alert("Hi this is approval Stage");
    }
    var stageStatus = stageObj.getStatus();
    alert(stageStatus);
   
}


function hideBusinessProcessFlow() {
    Xrm.Page.ui.process.setVisible(false);
}

function showBusinessProcessFlow() {
    Xrm.Page.ui.process.setVisible(true);
}

function showHideBusinessProcessFlow() {
    if (Xrm.Page.getAttribute("new_loanapproved").getValue() == true) {
        showBusinessProcessFlow();
    }
    else {
        hideBusinessProcessFlow();
    }
}

//collapase and expand
//add this function where ever you want if you want expand and collapsed
//for Example based up on customer type
function bpfcollapseandexpand() {
    //Xrm.Page.ui.process.setDisplayState(string)
    Xrm.Page.ui.process.setDisplayState("collapsed")
    //string: "expanded"  or "collapsed" are the two variables that can be passed.

}



//var GUID = "15322A8F-67B8-47FB-8763-13A28686C29D";
Xrm.Page.data.process.setActiveStage(GUID, function (result) {
    if (result == "success") {
        alert("Success");
    } else {
        alert("Invalid");
    }
});


//how to hide a header filed

function hideheaderfield() {
    Xrm.Page.getControl("header_prioritycode").setDisabled(true);//this line of synta is if you want disabled a header fields
    Xrm.Page.getControl("prioritycode").setDisabled(true);//on formlevel
}
//how do i disabled a fields or hide a fileds in bPF
function disabledfieldinbpf() {

    var priority = Xrm.Page.getControl("header_process_prioritycode").getAttribute().getText(); // *** Use this instead
    alert(priority);
    Xrm.Page.getControl("header_process_prioritycode").setDisabled(true);

    
}
//how do i get step name and step ID
function getstepID() {
    if (Xrm.Page.getAttribute("new_loanapproval").getValue() == true) {
        alert("hi");
        var stageID = Xrm.Page.getAttribute("stageid").getValue();
        var stageObj = Xrm.Page.data.process.getSelectedStage();
        var stepsCollection = stageObj.getSteps();
               //Number of steps
        var stepsLength = stepsCollection.getLength();
        alert("Steps Length: " + stepsLength);

        stepsCollection.forEach(function (step, i) {

            //step name it is display name of Field
            var stepName = step.getName();
            alert("stepName:" + stepName);

            //step attribute nothing but like "new_email"
            var stepAttribute = step.getAttribute();
            alert("stepAttribute:" + stepAttribute);

            var businessphone = Xrm.Page.getControl("header_process_new_pannumber").getAttribute().getValue();
            alert(businessphone);
            Xrm.Page.getControl("header_process_new_pannumber").setDisabled(true);
            //step is required
            var stepIsRequired = step.isRequired();
            alert("stepIsRequired:" + stepIsRequired);
        });

    }
}

function stageOnChange() {
    stage = Xrm.Page.data.process.getActiveStage();
    alert("The stage has changed to " + stage.getName());
}

function stageSelected() {
    stage = Xrm.Page.data.process.getSelectedStage();
    alert("Selected stage is " + stage.getName());
}
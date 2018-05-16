function allexamplesofBPF() {
    Xrm.Page.ui.process.setDisplayState("collapsed");
    // ** Now you see it
    Xrm.Page.ui.process.setVisible(true); // ** Or false

    // **getActiveProcess
    var activeProcess = Xrm.Page.data.process.getActiveProcess();

    alert("ID of the process: " + activeProcess.getId());
    alert("Name of the process: " + activeProcess.getName());

    // ** getStages
    var StageCollection = activeProcess.getStages();

    StageCollection.forEach(function (stage, n) {
        //stage index
        var stageIndex = n;
        alert("Stage Index: " + stageIndex);

        //stage category number
        var stageCategory = stage.getCategory().getValue();
        alert("Stage Category: " + stageCategory);

        //stage id
        var stageId = stage.getId();
        alert("Stage Id:" + stageId);

        //stage entity name
        var stageEntityName = stage.getEntityName();
        alert("Stage Entity ID: " + stageEntityName);

        //stage name
        var stageName = stage.getName();
        alert("Stage Name :" + stageName);

        //stage status
        var stageStatus = stage.getStatus();
        alert("Stage Status: " + stageStatus);

        //steps collections
        var stepsCollection = stage.getSteps();

        //Number of steps
        var stepsLength = stepsCollection.getLength();
        alert("Steps Length: " + stepsLength);

        stepsCollection.forEach(function (step, i) {

            //step name
            var stepName = step.getName();
            alert("stepName:" + stepName);

            //step attribute
            var stepAttribute = step.getAttribute();
            alert("stepAttribute:" + stepAttribute);

            //step is required
            var stepIsRequired = step.isRequired();
            alert("stepIsRequired:" + stepIsRequired);
        });

    });

    // ** Now you don't see it!
    Xrm.Page.ui.process.setVisible(false); // ** Or true
}


// JavaScript source code
//just bind this function Onload Evennt event Of form
//because we don't want load by default untill choose the customer Type
function hidesectionsbydefault() {
    alert("Hi");
    var formTypecreate = Xrm.Page.ui.getFormType();
    if (formTypecreate == 1) {
        HideShowSection("tab_2", "tab_2_section_2", false);//hide the corporate section
        HideShowSection("tab_2", "tab_2_section_1", false);//hide the individual section
        //Xrm.Page.ui.tabs.get("tab_2").sections.get("tab_2_section_2").setVisible(false);
    }
    if (formTypecreate == 2) {
        HideShowSection("tab_2", "tab_2_section_2", true);//hide the corporate section
        HideShowSection("tab_2", "tab_2_section_1", true);//hide the individual section
        //Xrm.Page.ui.tabs.get("tab_2").sections.get("tab_2_section_2").setVisible(false);
    }


}

function showandhidesectionsbasedoncustomer() {
    
    var customertypeValue = null;
    var customertypename = null;
    //this block of code will execute onload event of Form
    if (Xrm.Page.getAttribute("new_customertype").getValue() != null) {
        customertypeValue = Xrm.Page.getAttribute("new_customertype").getValue();
    }
    if (Xrm.Page.getAttribute("new_customertype").getText() != null) {
        customertypename = Xrm.Page.getAttribute("new_customertype").getText();
    }
    if (customertypeValue == null || customertypename == null) {
        HideShowSection("tab_2", "tab_2_section_2", false);//hide the corporate section
        HideShowSection("tab_2", "tab_2_section_1", false);
    }
    //this block of code will execute onchange event of Customer Type
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

function HideShowSection(tabName, sectionName, visible) {
    try {
        Xrm.Page.ui.tabs.get(tabName).sections.get(sectionName).setVisible(visible);
        //Xrm.Page.ui.tabs.get("tab_2").sections.get("tab_2_section_3").setVisible(false);
    }
    catch (err) { }
}


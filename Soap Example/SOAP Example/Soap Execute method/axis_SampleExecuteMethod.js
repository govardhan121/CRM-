// JavaScript source code

function qualifyleadprocess() {

    if (Xrm.Page.getAttribute("new_qualifythelead").getValue() == true) {

        var request = ""

        request += "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";

        request += "  <s:Body>";

        request += "    <Execute xmlns=\"http://schemas.microsoft.com/xrm/2011/Contracts/Services\" xmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">";

        request += "      <request i:type=\"b:QualifyLeadRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\" xmlns:b=\"http://schemas.microsoft.com/crm/2011/Contracts\">";

        request += "        <a:Parameters xmlns:c=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">";

        request += "          <a:KeyValuePairOfstringanyType>";

        request += "            <c:key>LeadId</c:key>";

        request += "            <c:value i:type=\"a:EntityReference\">";

        request += "              <a:Id>" + Xrm.Page.data.entity.getId() + "</a:Id>";

        request += "              <a:LogicalName>lead</a:LogicalName>";

        request += "              <a:Name i:nil=\"true\" />";

        request += "            </c:value>";

        request += "          </a:KeyValuePairOfstringanyType>";



        request += "          <a:KeyValuePairOfstringanyType>";

        request += "            <c:key>CreateAccount</c:key>";

        request += "            <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">false</c:value>";

        request += "          </a:KeyValuePairOfstringanyType>";



        request += "          <a:KeyValuePairOfstringanyType>";

        request += "            <c:key>CreateContact</c:key>";

        request += "            <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">true</c:value>";

        request += "          </a:KeyValuePairOfstringanyType>";



        request += "          <a:KeyValuePairOfstringanyType>";

        request += "            <c:key>SuppressDuplicateDetection</c:key>";

        request += "            <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">true</c:value>";

        request += "          </a:KeyValuePairOfstringanyType>";



        request += "          <a:KeyValuePairOfstringanyType>";

        request += "            <c:key>CreateOpportunity</c:key>";

        request += "            <c:value i:type=\"d:boolean\" xmlns:d=\"http://www.w3.org/2001/XMLSchema\">false</c:value>";

        request += "          </a:KeyValuePairOfstringanyType>";



        request += "          <a:KeyValuePairOfstringanyType>";

        request += "            <c:key>Status</c:key>";

        request += "            <c:value i:type=\"a:OptionSetValue\">";

        request += "              <a:Value>3</a:Value>";

        request += "            </c:value>";

        request += "          </a:KeyValuePairOfstringanyType>";

        request += "        </a:Parameters>";

        request += "        <a:RequestId i:nil=\"true\" />";

        request += "        <a:RequestName>QualifyLead</a:RequestName>";

        request += "      </request>";

        request += "    </Execute>";

        request += "  </s:Body>";

        request += "</s:Envelope>";

        //send set state request

        $.ajax({

            type: "POST",

            contentType: "text/xml; charset=utf-8",

            datatype: "xml",

            url: Xrm.Page.context.getClientUrl() + "/XRMServices/2011/Organization.svc/web",

            data: request,

            beforeSend: function (XMLHttpRequest) {

                XMLHttpRequest.setRequestHeader("Accept", "application/xml, text/xml, */*");

                XMLHttpRequest.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute  ");

            },

            success: function (data, textStatus, XmlHttpRequest) {

                var parentaccountid = null;

                parentaccountid = Xrm.Page.getAttribute("parentaccountid").getValue();

                if (parentaccountid != null) {



                }



                else {



                    // CreateAccountLead();

                }



            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {



                alert(errorThrown) + 'Lead';

            }

        });
    }



}

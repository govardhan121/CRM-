<%@ Page Language="c#" %>
<%--
    /**
    * Unit test for XrmSvcToolkit v0.2, a small JavaScript library that helps access 
    * Microsoft Dynamics CRM 2011 web service interfaces (SOAP and REST)
    *
    * @copyright    Copyright (c) 2011 - 2013, KingswaySoft (http://www.kingswaysoft.com)
    * @license      Microsoft Public License (Ms-PL)
    * @developer    Daniel Cai (http://danielcai.blogspot.com)
    * @contributor  George Doubinski
    *
    * THIS SOFTWARE IS PROVIDED BY KingswaySoft ''AS IS'' AND ANY
    * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    * DISCLAIMED. IN NO EVENT SHALL KingswaySoft BE LIABLE FOR ANY
    * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    *
    */
--%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>XRM Service Toolkit Test</title>
    <link rel="stylesheet" href="/ISV/XrmSvcToolkit/qunit/qunit.css" type="text/css" media="screen" />
    <script type="text/javascript" src="../../_common/ClientGlobalContext.js.aspx"></script>
    <script type="text/javascript" src="/ISV/XrmSvcToolkit/qunit/qunit.js"></script>
    <script type="text/javascript" src="/ISV/XrmSvcToolkit/json2.js"></script>
    <script type="text/javascript" src="/ISV/XrmSvcToolkit/XrmSvcToolkit.js?ver=<% = DateTime.Now.Ticks %>"></script>
    <script type="text/javascript">
        var guidExpr = /^(\{)?([0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{12})(\})?$/;
        var contactId,
            accountId,
            birthDate = new Date(1955, 1, 20),
            currentUserId = XrmSvcToolkit.context.getUserId();
            
        // Utility method to compare two GUID strings, return true if the GUID's are actually equal.
        var compareGuid = function(guid1, guid2) {
            if (guid1 === null && guid2 === null)
                return true;

            if (guid1 === null || guid2 === null)
                return false;

            guid1 = guid1.toLowerCase(guid1);
            guid2 = guid2.toLowerCase(guid2);

            if (!guidExpr.test(guid1) || !guidExpr.test(guid2))
                return false;

            guid1 = guid1.replace(guidExpr, "$2");
            guid2 = guid2.replace(guidExpr, "$2");

            if (guid1 === guid2)
                return true;

            return false;
        };        

        // A dummy contact record to be used for testing.
        var foo = {
            FirstName: "Joe",
            MiddleName: "%<*>&", // Special characters
            LastName: 'Foo',
            GenderCode: { Value: 2 },
            FamilyStatusCode: { Value: 1 },
            CreditLimit: { Value: "3000.0000" },
            BirthDate: birthDate,
            DoNotEMail: false,
            DoNotPhone: true
        };

        test("Test XrmSvcToolkit.createRecord() method to create a CRM record (contact)", function () {
            XrmSvcToolkit.createRecord({
                entityName: "Contact",
                entity: foo,
                async: false,
                successCallback: function (result) {
                    contactId = result.ContactId;
                    ok(guidExpr.test(contactId), "Creating a contact should return the new record's ID in GUID format. ");
                    equals(result.FirstName, foo.FirstName, "FirstName matches");
                    equals(result.MiddleName, foo.MiddleName, "MiddleName matches");
                    equals(result.LastName, foo.LastName, "LastName matches");
                    equals(result.GenderCode.Value, foo.GenderCode.Value, "GenderCode matches");
                    equals(result.FamilyStatusCode.Value, foo.FamilyStatusCode.Value, "FamilyStatusCode matches");
                    equals(result.CreditLimit.Value, foo.CreditLimit.Value, "CreditLimit matches");
                    ok(result.BirthDate - foo.BirthDate == 0, "BirthDate matches");
                    equals(result.DoNotEMail, foo.DoNotEMail, "DoNotEMail matches");
                    equals(result.DoNotPhone, foo.DoNotPhone, "DoNotPhone matches");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });
        
        test("Test XrmSvcToolkit.createRecord() method to create a CRM record (account)", function () {
            XrmSvcToolkit.createRecord({
                entityName: "Account",
                entity: { Name: "A test account created by XrmSvcToolkit"},
                async: false,
                successCallback: function (result) {
                    accountId = result.AccountId;
                    ok(guidExpr.test(accountId), "Creating an account should return the new record's ID in GUID format. ");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.updateRecord() method to update a CRM record (contact)", function () {
            foo.CreditLimit.Value = "5000.0000";

            XrmSvcToolkit.updateRecord({
                entityName: "Contact",
                id: contactId,
                entity: foo,
                async: false,
                successCallback: function (result) {
                    equals(result, null, "Update should return no result");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.associate() method to associate two CRM records (contact - account)", function () {
            XrmSvcToolkit.associate({
                entity1Name: "Contact",
                entity1Id: contactId,
                entity2Name: "Account",
                entity2Id: accountId,
                relationshipName: "account_primary_contact",
                async: false,
                successCallback: function (result) {
                    ok(true, "The records should have now been associated.");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.disassociate() method to disassociate two CRM records (contact - account)", function () {
            XrmSvcToolkit.disassociate({
                entity1Name: "Contact",
                entity1Id: contactId,
                entity2Name: "Account",
                entity2Id: accountId,
                relationshipName: "account_primary_contact",
                async: false,
                successCallback: function (result) {
                    ok(true, "The records should have now been disassociated.");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.retrieve() method to retrieve a CRM record (contact)", function () {

            XrmSvcToolkit.retrieve({
                entityName: "Contact",
                id: contactId,
                select: ["ContactId", "FirstName", "MiddleName", "LastName", "GenderCode", "FamilyStatusCode", "CreditLimit", "BirthDate", "DoNotEMail", "DoNotPhone", "contact_owning_user/SystemUserId", "contact_owning_user/FullName"],
                expand: ["contact_owning_user"],
                async: false,
                successCallback: function (result) {
                    equals(result.ContactId, contactId, "Retrieved contact's ContactId should be the same as the Id used to retreive the record. ");
                    equals(result.FirstName, foo.FirstName, "FirstName matches");
                    equals(result.MiddleName, foo.MiddleName, "MiddleName matches");
                    equals(result.LastName, foo.LastName, "LastName matches");
                    equals(result.GenderCode.Value, foo.GenderCode.Value, "GenderCode matches");
                    equals(result.FamilyStatusCode.Value, foo.FamilyStatusCode.Value, "FamilyStatusCode matches");
                    equals(result.CreditLimit.Value, foo.CreditLimit.Value, "CreditLimit matches");
                    ok(result.BirthDate - foo.BirthDate == 0, "BirthDate matches");
                    equals(result.DoNotEMail, foo.DoNotEMail, "DoNotEMail matches");
                    equals(result.DoNotPhone, foo.DoNotPhone, "DoNotPhone matches");
					ok(compareGuid(result.contact_owning_user.SystemUserId, currentUserId), "contact_owning_user/SystemUserId matches the current user id");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.retrieveMultiple() method to retrieve a CRM record (contact)", function () {
            XrmSvcToolkit.retrieveMultiple({
                entityName: "Contact",
                odataQuery: "$select=BirthDate,ContactId,CreditLimit,DoNotEMail,DoNotPhone,FamilyStatusCode,FirstName,GenderCode,LastName,MiddleName&$filter=ContactId eq guid'" + contactId + "'",
                async: false,
                successCallback: function (results) {
                    equals(results.length, 1, "We are retrieving only one contact record. ");
                    equals(results[0].ContactId, contactId, "Retrieved contact's ContactId should be the same as the Id used to retreive the record. ");
                    equals(results[0].FirstName, foo.FirstName, "FirstName matches");
                    equals(results[0].MiddleName, foo.MiddleName, "MiddleName matches");
                    equals(results[0].LastName, foo.LastName, "LastName matches");
                    equals(results[0].GenderCode.Value, foo.GenderCode.Value, "GenderCode matches");
                    equals(results[0].FamilyStatusCode.Value, foo.FamilyStatusCode.Value, "FamilyStatusCode matches");
                    equals(results[0].CreditLimit.Value, foo.CreditLimit.Value, "CreditLimit matches");
                    ok(results[0].BirthDate - foo.BirthDate == 0, "BirthDate matches");
                    equals(results[0].DoNotEMail, foo.DoNotEMail, "DoNotEMail matches");
                    equals(results[0].DoNotPhone, foo.DoNotPhone, "DoNotPhone matches");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.fetch() method to retrieve a CRM record (contact)", function () {

            var fetchXml =
"<fetch mapping='logical'>" +
   "<entity name='contact'>" +
      "<attribute name='contactid' />" +
      "<attribute name='firstname' />" +
      "<attribute name='lastname' />" +
      "<attribute name='middlename' />" +
      "<attribute name='gendercode' />" +
      "<attribute name='familystatuscode' />" +
      "<attribute name='ownerid' />" +
      "<attribute name='creditlimit' />" +
      "<attribute name='birthdate' />" +
      "<attribute name='accountrolecode' />" +
      "<attribute name='donotemail' />" +
      "<attribute name='donotphone' />" +
      "<filter>" +
         "<condition attribute='contactid' operator='eq' value='" + contactId + "' />" +
      "</filter>" +
   "</entity>" +
"</fetch>";

            XrmSvcToolkit.fetch({
                fetchXml: fetchXml,
                async: false,
                successCallback: function (result) {
                    equals(result.entities.length, 1, "only last created contact should be found");
                    equals(result.entities[0].contactid, contactId, "Retrieved contact's ContactId should be the same as the Id used to retreive the record. ");
                    equals(result.entities[0].firstname, foo.FirstName, "FirstName matches");
                    equals(result.entities[0].middlename, foo.MiddleName, "MiddleName matches");
                    equals(result.entities[0].lastname, foo.LastName, "LastName matches");
                    equals(result.entities[0].gendercode.Value, foo.GenderCode.Value, "GenderCode matches");
                    equals(result.entities[0].familystatuscode.Value, foo.FamilyStatusCode.Value, "FamilyStatusCode matches");
                    equals(result.entities[0].creditlimit.Value, foo.CreditLimit.Value, "CreditLimit matches");
                    ok(result.entities[0].birthdate - foo.BirthDate == 0, "BirthDate matches");
                    equals(result.entities[0].donotemail, foo.DoNotEMail, "DoNotEMail matches");
                    equals(result.entities[0].donotphone, foo.DoNotPhone, "DoNotPhone matches");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.fetch() method to do an aggregation query", function () {

            var fetchXml =
"<fetch mapping='logical' aggregate='true' version='1.0'>" +
	"<entity name='contact'>" +
		"<attribute name='accountrolecode' aggregate='count' alias='count' />" +
		"<filter>" +
			"<condition attribute='contactid' operator='eq' value='" + contactId + "' />" +
		"</filter>" +
	"</entity>" +
"</fetch>";
            XrmSvcToolkit.fetch({
                fetchXml: fetchXml,
                async: false,
                successCallback: function (result) {
                    equals(result.entities.length, 1, "only one record should be returned when count aggregation is used");
                    equals(result.entities[0]['count'], 1, "only one count of contact record should be found");
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.setState() method to update a CRM record's state", function () {
            XrmSvcToolkit.setState({
                entityName: "contact",
                id: contactId,
                stateCode: 1,
                statusCode: -1,
                async: false,
                successCallback: function (result) {
                },
                errorCallback: function (error) {
                    throw error;
                }
            });
        });

        test("Test XrmSvcToolkit.deleteRecord() method to delete a CRM record (contact)", function () {
            XrmSvcToolkit.deleteRecord({
                entityName: "Contact",
                id: contactId,
                async: false
            });
        });

    </script>
</head>
<body>
    <div id="qunit-header">
        <h1>XRM Service Toolkit Tests</h1>
    </div>
    <h2 id="qunit-banner"></h2>
    <div id="qunit-testrunner-toolbar"></div>
    <h2 id="qunit-userAgent"></h2>
    <ol id="qunit-tests"></ol>
</body>
</html>

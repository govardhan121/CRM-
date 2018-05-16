﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace UpdateContacts
{
    public class UpdateAccountContacts:IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            //Extract the tracing service for use in debugging sandboxed plug-ins.
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));


            // Obtain the execution context from the service provider.
            IPluginExecutionContext context = 
                (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));


            // Obtain the organization service reference.
            IOrganizationServiceFactory serviceFactory = 
                (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = 
                serviceFactory.CreateOrganizationService(context.UserId);
            try
            {

                if (context.InputParameters.Contains("Target") &&
                   context.InputParameters["Target"] is Entity)
                {
                    // Obtain the target entity from the input parameters.
                    Entity entity = (Entity)context.InputParameters["Target"];
                    // Verify that the target entity represents an account.
                    // If not, this plug-in was not registered correctly.
                    if (entity.LogicalName != "account")
                        return;
                    Guid accountId = context.PrimaryEntityId;
                    string Name = entity.GetAttributeValue<string>("name");
                    if (accountId != Guid.Empty)
                    {
                        EntityCollection contactRecords = getAllRelatedContacts(accountId, service);
                        foreach (Entity contact in contactRecords.Entities)
                        {
                            contact["firstname"] = "Eswar";
                            contact["lastname"] = "Reddy";
                            service.Update(contact);
                        }
                    }
                }
            }
            catch (Exception Ex)
            {
            }
        }

        public EntityCollection getAllRelatedContacts(Guid accountId, IOrganizationService service)
        {
            var _fetchXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                                    "<entity name='contact'>" +
                                            "<attribute name='fullname' />" +
                                            "<attribute name='contactid' />" +
                                            "<attribute name='birthdate' />" +
                                            "<attribute name='telephone1' />" +
                                            "<attribute name='parentcustomerid' />" +
                                            "<attribute name='address1_city' />" +
                                            "<order attribute='fullname' descending='false' />" +
                                            "<filter type='and'>" +
                                        "<condition attribute='address1_city' operator='eq' value='Bangalore' />"+
                                        "<condition attribute='parentcustomerid' operator='eq' uitype='account' value='" + accountId + "' />" +
                                        "</filter>" +
                                    "</entity>" +
                                "</fetch>";
            EntityCollection contacts = service.RetrieveMultiple(new FetchExpression(_fetchXML));

            return contacts;
        }
    }
}


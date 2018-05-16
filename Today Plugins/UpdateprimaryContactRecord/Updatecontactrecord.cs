using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using System.Runtime.Serialization;
using System.ServiceModel;

namespace UpdateprimaryContactRecord
{
    public class Updatecontactrecord : IPlugin
    {

        //Entity = Account,Message = Update , stage = preoperation and synchronous
        public void Execute(IServiceProvider serviceProvider)
        {

            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = (IOrganizationService)serviceFactory.CreateOrganizationService(context.UserId);
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            if (context.InputParameters.Contains("Target") & context.InputParameters["Target"] is Entity)
            {
                // Obtain the target entity from the input parameters.
                Entity entity = (Entity)context.InputParameters["Target"];

                // Verify that the target entity represents an account.
                // If not, this plug-in was not registered correctly.
                if (entity.LogicalName != "account")
                    return;

                try
                {

                    if (entity.Attributes.Contains("primarycontactid"))
                    {

                        //// Get the primary contactid;

                        EntityReference contactId = (EntityReference)entity.Attributes["primarycontactid"];
                        Guid primaryContactGUID = contactId.Id;

                        //var primaryContactGUID = entity.GetAttributeValue<EntityReference>("primarycontactid");
                        // var primaryContactGUID = ((EntityReference)entity["primarycontactid"]).Id;
                        // EntityReference erCustomerId = (entity.Attributes["primarycontactid"] as EntityReference);



                        Entity contact = new Entity("contact");


                        contact["address1_city"] = "Kadapa";


                        contact["emailaddress1"] = "narasimha.loukireddy@gmail.com";


                        contact["contactid"] = primaryContactGUID;
                        // Update the account.
                        service.Update(contact);
                    }

                }
                catch (FaultException<Microsoft.Xrm.Sdk.OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in the FollowupPlugin plug-in.", ex);
                }

                catch (Exception ex)
                {
                    tracingService.Trace("FollowupPlugin: {0}", ex.ToString());
                    throw;
                }
            }
        }
    }
}

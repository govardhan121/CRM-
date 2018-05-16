using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace Creating_Task
{
    public class CreatingTaskAfterAccount:IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            //Extract the tracing service for use in debugging sandboxed plug-ins.
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));


            // Obtain the execution context from the service provider.
            IPluginExecutionContext context = (IPluginExecutionContext)
            serviceProvider.GetService(typeof(IPluginExecutionContext));


            // Obtain the organization service reference.
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
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
                  EntityReference taskRegarding = null;
                  if (context.OutputParameters.Contains("id"))
                  {
                      //below line of code is getting the GUID of account record which ever the account 
                      //record is created recently why because we need to create a task and then assign this 
                      //task to that Accout record
                      Guid regardingobjectId = new Guid(context.OutputParameters["id"].ToString());

                      string regardingobjectidType = "account";

                      taskRegarding = new EntityReference(regardingobjectidType, regardingobjectId);

                      Guid createdRecordId = createEntityRecord("task", taskRegarding, service);
                  }

                }
            }
            catch (Exception ex)
            {

            }
        }

        public Guid createEntityRecord(string entityName, EntityReference regardingObject, IOrganizationService crmService)
        {
            // Create a task activity to follow up with the account customer in 7 days. 
            Entity followup = new Entity(entityName);

            followup["subject"] = "Send e-mail to the new customer.";
            followup["description"] = "Follow up with the customer. Check if there are any new issues that need resolution.";
            followup["scheduledstart"] = DateTime.Now.AddDays(7);
            followup["scheduledend"] = DateTime.Now.AddDays(7);
            followup["category"] = regardingObject.LogicalName;
            followup["regardingobjectid"] = regardingObject;

            return crmService.Create(followup);
            

        }
    }
}

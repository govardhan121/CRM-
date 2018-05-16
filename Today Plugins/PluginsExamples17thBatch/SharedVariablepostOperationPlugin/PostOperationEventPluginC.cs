using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace SharedVariablepostOperationPlugin
{

    /// <summary>
    /// Post-Operation Plugin.
    /// A plug-in that receives data from another plug-in through the SharedVariables property of IPluginExecutionContext.
    /// This plugin verifies and retrieves a SharedVariable named PrimaryContact from context.SharedVariables
    /// and create a follow up task.
    /// </summary>
    /// <remarks>
    /// Register the PostEventPluginC plug-in on a Pre-Operation event.
    /// Message: Create
    /// Primary Entity: account
    /// Event Pipeline Stage: Post-Operation
    /// </remarks>

    public class PostOperationEventPluginC:IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the execution context from the service provider.
            var context = (Microsoft.Xrm.Sdk.IPluginExecutionContext)
                serviceProvider.GetService(typeof(Microsoft.Xrm.Sdk.IPluginExecutionContext));
            
            // Obtain the contact from the execution context shared variables.
            if (context.SharedVariables.Contains("PrimaryContact"))
            {
                var contactId = new Guid((string)context.SharedVariables["PrimaryContact"]);
                if (contactId != Guid.Empty)
                {
                    //Create a FollowUp task
                    var followup = new Entity("task");

                    followup["subject"] = "Send e-mail to the new customer.";
                    followup["description"] =
                        "Follow up with the customer. Check if there are any new issues that need resolution.";
                    followup["scheduledstart"] = DateTime.Now.AddDays(7);
                    followup["scheduledend"] = DateTime.Now.AddDays(7);
                    followup["category"] = context.PrimaryEntityName;
                    // Refer to the account in the task activity.
                    string regardingobjectidType = "contact";
                    followup["regardingobjectid"] = new EntityReference(regardingobjectidType, contactId);

                    // Obtain the organization service reference.
                    var serviceFactory =
                        (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                    var service = serviceFactory.CreateOrganizationService(context.UserId);

                    // Create the task in Microsoft Dynamics CRM.
                    service.Create(followup);
                }

            }
        }

    }
}

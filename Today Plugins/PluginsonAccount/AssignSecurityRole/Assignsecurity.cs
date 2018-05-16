using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;
using Microsoft.Xrm.Sdk;

namespace AssignSecurityRole
{
    //message - Associate, Preoperation , here no entity
    //https://stackoverflow.com/questions/40527220/dynamics-crm-2016-plugin-triggered-when-user-role-assignments-are-changed
    public class Assignsecurity : IPlugin
    {
        string relationshipName = "";
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
                //// The InputParameters collection contains all the data passed in the message request.
                //if (context.InputParameters.Contains("Target") &&
                //    context.InputParameters["Target"] is Entity)
                //{
                //    // Obtain the target entity from the input parameters.
                //    Entity entity = (Entity)context.InputParameters["Target"];
                //    // Verify that the target entity represents an account.
                //    // If not, this plug-in was not registered correctly.

                //    if (entity.LogicalName != "account")
                //        return;
                //}
                
                if (context.InputParameters.Contains("Relationship"))
                {
                    relationshipName = context.InputParameters["Relationship"].ToString();
                }

                // Check the “Relationship Name” with your intended one
                if (relationshipName != "systemuserroles_association")
                {
                    return;
                }

                if (context.MessageName == "Associate")
                {
                    //logic when role added
                }
                if (context.MessageName == "Disassociate")
                {
                    //logic when role removed
                }
                else
                {
                    //not interested
                }
            }
            catch (Exception ex)
            {
            }
        }
    }
}


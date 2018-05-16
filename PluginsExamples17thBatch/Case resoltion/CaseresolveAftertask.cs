using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using System.Runtime.Serialization;

namespace Case_resoltion
{
    public class CaseresolveAftertask:IPlugin
    {
        //register this plugin as close message and incident entity
        public void Execute(IServiceProvider serviceProvider)
        {
             // Obtain the execution context from the service provider.
            IPluginExecutionContext context = (IPluginExecutionContext)
            serviceProvider.GetService(typeof(IPluginExecutionContext));
            // Obtain the organization service reference.
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            if (context.InputParameters.Contains("IncidentResolution"))
            {
                Entity incidentResolution = (Entity)context.InputParameters["IncidentResolution"];
                Guid relatedIncidentGuid = ((EntityReference)incidentResolution.Attributes["incidentid"]).Id;
                DateTime actualEnd = DateTime.Now;
                if (incidentResolution.Contains("actualend"))
                {
                    actualEnd = (DateTime)incidentResolution.Attributes["actualend"];
                }
                
                try
                {



                    Entity followup = new Entity("task");

                    followup["subject"] = "this task will create by case plugin"; ;
                    followup["description"] =
                        "Follow up with the customer. Check if there are any new issues that need resolution.";
                    followup["scheduledstart"] = DateTime.Now.AddDays(7);
                    followup["scheduledend"] = DateTime.Now.AddDays(7);
                    followup["category"] = context.PrimaryEntityName;


                    Guid regardingobjectid = relatedIncidentGuid;
                    string regardingobjectidType = "incident";


                    followup["regardingobjectid"] = new EntityReference(regardingobjectidType, regardingobjectid);


                    service.Create(followup);


                    //Entity Note = new Entity("annotation");

                    //Note["notetext"] = "Hello!! Created a note";

                    //Note["ObjectId"] = new EntityReference(context.PrimaryEntityName, new Guid(context.PrimaryEntityId.ToString()));

                    //Note["Subject"] = "Your Title";

                    //Guid annotationId = service.Create(Note);
                }
                catch (Exception ex)
                {
                    throw new InvalidPluginExecutionException(ex.Message.ToString());
                }

            }
        }
    }
}

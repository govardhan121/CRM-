using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace ImagesExample
{
    public class Preimageexamples:IPlugin
    {
        Entity preMessageImage;
        Entity postMessageImage;

        //message = update , stage - post operation
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

            IOrganizationService service = serviceFactory.CreateOrganizationService(null);




            // The InputParameters collection contains all the data passed in the message request.
            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                // Obtain the target entity from the input parameters.
                Entity entity = (Entity)context.InputParameters["Target"];
                // Verify that the target entity represents an account.
                // If not, this plug-in was not registered correctly.
                if (entity.LogicalName != "account")
                    return;
                
                //if(context.Depth ==1)
                //{
                    if (context.PreEntityImages.Contains("PreImage") && context.PreEntityImages["PreImage"] is Entity)
                    {

                        preMessageImage = (Entity)context.PreEntityImages["PreImage"];

                        string oldValuecity = (String)preMessageImage.Attributes["address1_city"];

                        string currentValueCity = entity.Attributes.Contains("address1_city").ToString();

                        if (entity.Attributes.Contains("address1_city").ToString() == oldValuecity.ToString())
                        {
                            throw new InvalidPluginExecutionException("The city value are not changed");
                        }

                        //if (entity.Attributes.Contains("address1_city").ToString() != oldValuecity.ToString())
                        //{
                        //    throw new InvalidPluginExecutionException("The city value are changed");
                        //}
                        //Guid AccountID = context.PrimaryEntityId;

                        //Entity accountupdate = new Entity("account");

                        //accountupdate.Attributes["address1_city"] = oldValuecity;
                        //accountupdate.Attributes["accountid"] = AccountID;
                        //service.Update(accountupdate);


                    }


                    if (context.PostEntityImages.Contains("PostImage") && context.PostEntityImages["PostImage"] is Entity)
                    {

                        postMessageImage = (Entity)context.PostEntityImages["PostImage"];

                        string oldValuecity = (String)postMessageImage.Attributes["address1_city"];

                        string currentValueCity = entity.Attributes.Contains("address1_city").ToString();
                    }
                    //}
                    else
                    {
                        return;
                    }
                
               
                //Suppose you registered the Plugin and added a Image with name “PostImage ”

                //if (context.PostEntityImages.Contains("PostImage") && context.PostEntityImages["PostImage"] is Entity)

                //{

                //      postMessageImage = (Entity)context.PostEntityImages["PostImage"];

                //    string  accountnumber = (String)postMessageImage.Attributes["accountnumber"];

                // }

            }
        }

    }
}

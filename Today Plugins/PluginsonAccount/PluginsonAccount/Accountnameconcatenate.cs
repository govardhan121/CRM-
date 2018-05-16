using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace PluginsonAccount
{
    public class Accountnameconcatenate:IPlugin
    {
        //post operation ,message = create,Entity = Account
        public void Execute(IServiceProvider serviceProvider)
        {
            try
            {
                IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

                if (!context.InputParameters.Contains("Target")
                    || !(context.InputParameters["Target"] is Entity)
                    || !context.MessageName.ToUpper().Equals("CREATE")
                    || !context.PrimaryEntityName.Equals("account"))
                { return; }

                Entity target = (Entity)context.InputParameters["Target"];

                // Validate the Plugin execution to run only if the Target entity is of type "account" and the message(event) is "Create"
                if (target == null)
                    return;

                IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = factory.CreateOrganizationService(context.UserId);
                
                concatenateAccountName(target, context, service);


            }
            
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException("An error occured in create plugin:" + ex.ToString());
            }
        }

        public void concatenateAccountName(Entity target, IPluginExecutionContext context, IOrganizationService service)
        {

            

                string accountName = (string)target.Attributes["name"];
                string legalName = (string)target.Attributes["sbi_legalname"];
                string country = (string)target.Attributes["address1_county"];

                if (accountName != null)
                {
                    accountName = null;
                    target.Attributes["name"] = legalName + "-" + country;
                    //target.Attributes["name"] = legalName + "-" + accountName;
                    service.Update(target);


                }


            


        }
    }
}

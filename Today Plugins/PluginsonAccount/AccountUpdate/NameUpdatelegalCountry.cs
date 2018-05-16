using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
namespace AccountUpdate
{
    public class NameUpdatelegalCountry:IPlugin
    {
        string legalName;
        string country;
        //update - post operation
        public void Execute(IServiceProvider serviceProvider)
        {
            try
            {
                IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

                if (!context.InputParameters.Contains("Target")
                    || !(context.InputParameters["Target"] is Entity)
                    || !context.MessageName.ToUpper().Equals("UPDATE")
                    || !context.PrimaryEntityName.Equals("account"))
                { return; }

                Entity target = (Entity)context.InputParameters["Target"];

                // Validate the Plugin execution to run only if the Target entity is of type "account" and the message(event) is "Create"
                if (target == null)
                    return;

                IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = factory.CreateOrganizationService(context.UserId);
                Guid AccountID = context.PrimaryEntityId;
                //checking null on fields
                if (target.Attributes.Contains("sbi_legalname").ToString() != null)
                {
                    legalName = target.GetAttributeValue<string>("sbi_legalname");
                }

                if (target.Attributes.Contains("address1_county").ToString() != null)
                 {
                     country = target.GetAttributeValue<string>("address1_county");
                
                 }

                if (context.Depth == 1)
                {
                    UpdateAccountName(target, context, service, legalName, country, AccountID);
                }
                else
                {
                return;
                }

            }
          
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException("An error occured in create plugin:" + ex.ToString());
            }
        }

        public void UpdateAccountName(Entity target, IPluginExecutionContext context, IOrganizationService service,string legalName,string country,Guid AccountID)
        {

                      Entity accountupdate = new Entity("account");
                      accountupdate.Attributes["name"] = legalName + "-" + country;
                      accountupdate.Attributes["accountid"] = AccountID;
                      service.Update(accountupdate);
        }
   
    }
}

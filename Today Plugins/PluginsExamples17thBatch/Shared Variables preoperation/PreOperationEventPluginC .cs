using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;

namespace Shared_Variables_preoperation
{
    /// <summary>
    /// Pre-Operation Plugin.
    /// A plug-in that sends data to another plug-in through the SharedVariables property of IPluginExecutionContext.
    /// This plugin assigns a valid ContactId value to a SharedVariable named PrimaryContact.
    /// </summary>
    /// <remarks>
    /// Register the PreEventPluginC for a Pre-Operation event.
    /// Message: Create
    /// Primary Entity: account
    /// Event Pipeline Stage: Pre-Operation
    /// </remarks>

    public class PreOperationEventPluginC:IPlugin
    {

        public void Execute(IServiceProvider serviceProvider)
        {

            // Obtain the execution context from the service provider.
            var context = (Microsoft.Xrm.Sdk.IPluginExecutionContext)serviceProvider.GetService(typeof(Microsoft.Xrm.Sdk.IPluginExecutionContext));

            //Change contactId value with a valid Id from your environment.
            var contact = new Guid("6DA0E5B9-88DF-E311-B8E5-6C3BE5A8B200");
           

            // Pass the data to the post event plug-in in an execution context shared
            // variable named PrimaryContact.
            context.SharedVariables.Add("PrimaryContact", (Object)contact.ToString());

        }
    }
}

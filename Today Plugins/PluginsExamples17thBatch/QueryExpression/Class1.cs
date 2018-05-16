using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace QueryExpression
{
    public class Class1:IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
             //Construct query
    // Condition where task attribute equals account id. 
    ConditionExpression condition = new ConditionExpression();
    condition.AttributeName = "regardingobjectid";
    condition.Operator = ConditionOperator.Equal;
    condition.Values.Add(acctId.ToString());

    //Create a column set.
    ColumnSet columns = new ColumnSet("subject");

    // Create query expression.
    QueryExpression query1 = new QueryExpression();
    query1.ColumnSet = columns;
    query1.EntityName = "task";
    query1.Criteria.AddCondition(condition);

    EntityCollection result1 = _serviceProxy.RetrieveMultiple(query1);
            
            //or

        }
    }
}

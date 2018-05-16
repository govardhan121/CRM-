using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk.Workflow;
using System.Activities;
using Microsoft.Xrm.Sdk;
using System.ServiceModel;


namespace CustomworkflowsExample
{
   public sealed  class AppointmentGenerator : CodeActivity
    {
        [Input("Day Start")]
        public InArgument<DateTime> DayStart { get; set; }

        [Input("Day End")]
        public InArgument<DateTime> DayEnd { get; set; }

        [Input("Doctor")]
        [ReferenceTarget("icici_doctor")]
        public InArgument<EntityReference> Doctor { get; set; }

        [Output("Total Appointments")]
        public OutArgument<int> TotalAppointments { get; set; }

        protected override void Execute(CodeActivityContext executionContext)
        {
            // Create the tracing service
            ITracingService tracingService = executionContext.GetExtension<ITracingService>();

            if (tracingService == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve tracing service.");
            }

            tracingService.Trace("Entered AppointmentGenerator.Execute(), Activity Instance Id: {0}, Workflow Instance Id: {1}",
                executionContext.ActivityInstanceId,
                executionContext.WorkflowInstanceId);

            // Create the context
            IWorkflowContext context = executionContext.GetExtension<IWorkflowContext>();

            if (context == null)
            {
                throw new InvalidPluginExecutionException("Failed to retrieve workflow context.");
            }

            tracingService.Trace("AppointmentGenerator.Execute(), Correlation Id: {0}, Initiating User: {1}",
                context.CorrelationId,
                context.InitiatingUserId);

            IOrganizationServiceFactory serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            try
            {
                tracingService.Trace("Start : {0}, End : {1} , Doctor : {2} - ", DayStart.Get<DateTime>(executionContext),
                                            DayEnd.Get<DateTime>(executionContext), context.PrimaryEntityId, context.PrimaryEntityName);

                int appointments = GenerateAppointments(DayStart.Get<DateTime>(executionContext),
                                             DayEnd.Get<DateTime>(executionContext), new EntityReference(context.PrimaryEntityName, context.PrimaryEntityId),
                                             service, tracingService);

                TotalAppointments.Set(executionContext, appointments);
            }
            catch (FaultException<OrganizationServiceFault> e)
            {
                tracingService.Trace("Exception: {0}", e.ToString());

                throw;
            }

            tracingService.Trace("Exiting AppointmentGenerator.Execute(), Correlation Id: {0}", context.CorrelationId);
        }
        public int GenerateAppointments(DateTime start, DateTime end, EntityReference doctor, IOrganizationService service, ITracingService tracingService)
        {
            int count = 0;
            int duration = 60;

            if (start != null && end != null && doctor != null)
            {
                try
                {
                    //for (DateTime DateStart = start; end.CompareTo(DateStart) > 0; DateStart.AddMinutes(duration))
                    while (start.CompareTo(end) < 0)
                    {
                        tracingService.Trace("Start Time : ", start);

                        Entity appointment = new Entity("icici_patientappointments");
                        appointment["icici_appointmenttime"] = start;
                        appointment["icici_duration"] = duration;
                        appointment["icici_doctorid"] = doctor;
                        appointment["icici_name"] = "Appointment Number : " + (count + 1);

                        service.Create(appointment);

                        tracingService.Trace("Appointment Created {0} : ", (count + 1));
                        start = start.AddMinutes(duration);
                        count++;
                    }
                }
                catch (Exception ex)
                {
                    tracingService.Trace("Faiiled creating Appointment - {0} ", ex.Message);

                    //throw new InvalidPluginExecutionException("Error occured on creating Appointments :" + ex.Message);
                }
            }

            return count;
        }
   }
}


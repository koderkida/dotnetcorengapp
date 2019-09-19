using System;
using Microsoft.Extensions.DependencyInjection;
using GKDOTNETNGAPP.services;

namespace GKDOTNETNGAPP.Email
{
    public static class SendGridExtensions
    {
        public static IServiceCollection AddSendGridEmailSender(this IServiceCollection services) 
        {
            services.AddTransient<IEmailSender, SendGridEmailSender>();

            return services;
         }
    }
}
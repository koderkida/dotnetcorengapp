using System;
using System.Threading.Tasks;

namespace GKDOTNETNGAPP.Email
{
    public interface IEmailSender
    {
        Task<SendEmailResponse> SendEmailAsync(string userEmail, string emailSubject, string message);
    } 
     
}
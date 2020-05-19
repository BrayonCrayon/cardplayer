using System;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace CardPlayer.Services
{
    public class EmailSender : IEmailSender
    {
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }
        
        public AuthMessageSenderOptions Options { get; } 
        
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            await Execute(Environment.GetEnvironmentVariable("SENDGRID_API_KEY"), subject, message, email);
        }

        public async Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("support@thecodecovecards.ca", Options.SendGridUser),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message,
            };
            msg.AddTo(new EmailAddress(email));
            
            msg.SetClickTracking(false, false);
            await client.SendEmailAsync(msg);
        }
    }
}
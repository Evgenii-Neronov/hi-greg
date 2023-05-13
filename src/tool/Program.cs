using lib.Gmail.Credentials;
using lib.Gmail.MessageHandlers;

internal class Program
{
    private static readonly string ApplicationName = "Gmail API .NET Quickstart";

    private static void Main(string[] args)
    {

        var credential = new CredentialFactory().CreateDefault();
        var gmailService = new GmailServiceFactory().Create(credential, ApplicationName);
        
        var request = gmailService.Users.Messages.List("me");
        request.Q = "is:unread"; 
        
        var messages = request.Execute().Messages;
        Console.WriteLine("Unread messages: ");
        if (messages != null && messages.Count > 0)
        {
            var messageHandler = new MessageHandler(gmailService);
            foreach (var messageItem in messages) messageHandler.Handle(messageItem);
        }
        else
        {
            Console.WriteLine("No new messages.");
        }

        Console.Read();
    }
}
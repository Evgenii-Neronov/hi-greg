using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using lib.Gmail.Credentials;
using lib.Gmail.MessageHandlers;

internal class Program
{
    private static readonly string cred =
        @"E:\api-keys\hi.greg.strartup\client_secret_704919781782-7qjijba1213ccke7ieah1cnhhreai243.apps.googleusercontent.com.json";

    private static readonly string[] Scopes = { GmailService.Scope.GmailReadonly };
    private static readonly string ApplicationName = "Gmail API .NET Quickstart";

    private static void Main(string[] args)
    {
        UserCredential credential;
        var credentialFactory = new CredentialFactory();

        using (var stream = new FileStream(cred, FileMode.Open, FileAccess.Read))
        {
            credential = credentialFactory.Create(stream, Scopes, "hi.greg.startup@gmail.com", CancellationToken.None);
            Console.WriteLine("Credential file saved to: token.json");
        }

        var gmailService = new GmailServiceFactory().Create(credential, ApplicationName);

        // Define parameters of request.
        var request = gmailService.Users.Messages.List("me");
        request.Q = "is:unread"; // Only get unread messages

        // List messages.
        IList<Message> messages = request.Execute().Messages;
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
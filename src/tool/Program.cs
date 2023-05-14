using lib.Gmail;
using lib.Gmail.Credentials;
using lib.Gmail.MessageHandlers;
using lib.Helpers;

internal class Program
{
    private static readonly string ApplicationName = "hi-greg tool";

    private static async Task Main(string[] args)
    {
        var credential = new CredentialFactory().CreateDefault();
        var gmailService = new GmailServiceFactory().Create(credential, ApplicationName);

        var request = gmailService.Users.Messages.List("me");
        //request.Q = "is:unread"; 

        var messages = request.Execute().Messages;

        var messageHandler = new MessageHandler(gmailService);

        var gmailServiceHelper = new GmailServiceHelper(gmailService);

        foreach (var messageItem in messages)
        {
            messageHandler.Handle(messageItem);

            Console.WriteLine(" - - - - -");
            Console.WriteLine(messageHandler.Subject);
            Console.WriteLine(messageHandler.Body);
            Console.WriteLine(" - - - - -");

            var cats = await ApiHelper.Cat(messageHandler.Subject);
            var labelName = cats.outputData.GetMaxScoreValue();

            var labels = gmailServiceHelper.GetLabels();

            var superLabel = labels.FirstOrDefault(x => x.Name == labelName);

            if (superLabel == null) superLabel = gmailServiceHelper.CreateLabel(labelName);

            var labelAlreadyExists = messageItem.LabelIds?.Contains(superLabel.Id) ?? false;
            

            if (!labelAlreadyExists) gmailServiceHelper.AddLabelToMessage(messageItem.Id, superLabel.Id);
        }
        
        Console.Read();
    }
}
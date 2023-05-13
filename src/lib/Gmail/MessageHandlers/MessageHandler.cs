using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using lib.Helpers;

namespace lib.Gmail.MessageHandlers;

public class MessageHandler : IMessageHandler
{
    private readonly GmailService _service;

    public MessageHandler(GmailService service)
    {
        _service = service;
    }

    public void Handle(Message message)
    {
        var emailInfoReq = _service.Users.Messages.Get("me", message.Id);
        var emailInfoResponse = emailInfoReq.Execute();

        if (emailInfoResponse != null)
        {
            var headerHandler = new DateHeaderHandler(
                new FromHeaderHandler(
                    new SubjectHeaderHandler(null)));

            foreach (var mParts in emailInfoResponse.Payload.Headers) headerHandler.Handle(mParts);
            
            var body = "";
            if (emailInfoResponse.Payload.Parts == null)
            {
                if (emailInfoResponse.Payload.Body != null)
                    body = emailInfoResponse.Payload.Body.Data.DecodeBase64String();
            }
            else
            {
                body = GetNestedBodyParts(emailInfoResponse.Payload.Parts, "");
            }

            Console.WriteLine("Body: " + body);
        }
    }

    private static string GetNestedBodyParts(IList<MessagePart> part, string curr)
    {
        var str = curr;

        if (part == null) return str;

        foreach (var parts in part)
        {
            if (parts.MimeType == "text/plain")
            {
                // This is the text
                str += parts.Body.Data.DecodeBase64String();
            }
            else if (parts.MimeType == "text/html")
            {
                // But you can choose the html text instead
                // str = DecodeBase64String(parts.Body.Data);
            }

            if (parts.Parts != null)
                // Call this method again to see if there's more text
                str = GetNestedBodyParts(parts.Parts, str);
        }

        return str;
    }
}
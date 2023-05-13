using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail.MessageHandlers;

public class SubjectHeaderHandler : HeaderHandler
{
    public SubjectHeaderHandler(HeaderHandler successor) : base(successor)
    {
    }

    public override void Handle(MessagePartHeader header)
    {
        if (header.Name == "Subject")
            Console.WriteLine("Subject: " + header.Value);
        else if (_successor != null) _successor.Handle(header);
    }
}
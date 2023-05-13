using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail.MessageHandlers;

public class DateHeaderHandler : HeaderHandler
{
    public DateHeaderHandler(HeaderHandler successor) : base(successor)
    {
    }

    public override void Handle(MessagePartHeader header)
    {
        if (header.Name == "Date")
            Console.WriteLine("Date: " + header.Value);
        else if (_successor != null) _successor.Handle(header);
    }
}
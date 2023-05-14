using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail.MessageHandlers;

public class FromHeaderHandler : HeaderHandler
{
    public FromHeaderHandler(HeaderHandler successor) : base(successor)
    {
    }

    public override string Handle(MessagePartHeader header)
    {
        if (header.Name == "From")
            Console.WriteLine("From: " + header.Value);
        else if (_successor != null) _successor.Handle(header);

        return header.Value;
    }
}
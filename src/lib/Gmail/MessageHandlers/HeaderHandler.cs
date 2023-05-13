using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail.MessageHandlers;

public abstract class HeaderHandler
{
    protected HeaderHandler _successor;

    public HeaderHandler(HeaderHandler successor)
    {
        _successor = successor;
    }

    public abstract void Handle(MessagePartHeader header);
}
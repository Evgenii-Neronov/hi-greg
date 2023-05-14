using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail.MessageHandlers;

public interface IMessageHandler
{
    public string Subject { get; set; }
    public string Body { get; set; }
    void Handle(Message message);
}
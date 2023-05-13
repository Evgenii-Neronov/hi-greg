using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail.MessageHandlers;

public interface IMessageHandler
{
    void Handle(Message message);
}
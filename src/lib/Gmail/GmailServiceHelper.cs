using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;

namespace lib.Gmail;

public class GmailServiceHelper
{
    private readonly GmailService _service;

    public GmailServiceHelper(GmailService service)
    {
        _service = service;
    }


    public Label CreateLabel(string labelName)
    {
        var newLabel = new Label
        {
            Name = labelName,
            LabelListVisibility = "labelShow",
            MessageListVisibility = "show"
        };

        var request = _service.Users.Labels.Create(newLabel, "me");
        return request.Execute();
    }

    public void AddLabelToMessage(string messageId, string labelId)
    {
        var modifyRequest = new ModifyMessageRequest();
        modifyRequest.AddLabelIds = new List<string> { labelId };

        var request = _service.Users.Messages.Modify(modifyRequest, "me", messageId);
        request.Execute();
    }

    public IList<Label> GetLabels()
    {
        var request = _service.Users.Labels.List("me");
        var labels = request.Execute().Labels;
        return labels;
    }
}
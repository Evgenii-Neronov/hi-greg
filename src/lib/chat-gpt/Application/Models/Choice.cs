using Newtonsoft.Json;

public class Choice
{
    [JsonProperty("text")] public string Text { get; set; }

    [JsonProperty("finish_reason")] public string FinishReason { get; set; }

    [JsonProperty("index")] public string Index { get; set; }

    [JsonProperty("logprobs")] public string Logprobs { get; set; }
}
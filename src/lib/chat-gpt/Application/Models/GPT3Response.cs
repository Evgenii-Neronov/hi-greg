using Newtonsoft.Json;

public class GPT3Response
{
    [JsonProperty("id")] public string Id { get; set; }

    [JsonProperty("object")] public object Object { get; set; }

    [JsonProperty("created")] public string Created { get; set; }

    [JsonProperty("model")] public string Model { get; set; }

    [JsonProperty("choices")] public List<Choice> Choices { get; set; }
}
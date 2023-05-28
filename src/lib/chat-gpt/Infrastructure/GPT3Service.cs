using System.Text;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace ChatGpt.Application
{
    public class GPT3Service : IGPT3Service
    {
        private const string Endpoint = "";
        private readonly string _openAiKey = Environment.GetEnvironmentVariable("OPEN_AI_KEY") ?? "";
        private readonly HttpClient _client;
        private readonly ILogger<GPT3Service> _logger;

        public GPT3Service(ILogger<GPT3Service> logger)
        {
            _logger = logger;
            _client = new HttpClient();
        }

        public async Task<string> AskGPT3(string prompt)
        {
            var requestBody = JsonConvert.SerializeObject(new
            {
                prompt = prompt,
                max_tokens = 60
            });

            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(Endpoint),
                Headers =
                {
                    { "Authorization", $"Bearer {_openAiKey}" },
                },
                Content = new StringContent(requestBody, Encoding.UTF8, "application/json")
            };

            var response = await _client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var gptResponse = JsonConvert.DeserializeObject<GPT3Response>(content);
                return gptResponse.Choices[0].Text.Trim();
            }
            else
            {
                _logger.LogError("ai chat error: " + response.StatusCode);
                return string.Empty;
            }
        }
    }
}
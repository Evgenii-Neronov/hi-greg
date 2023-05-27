using ChatGpt.Application;
using Grpc.Core;

namespace ai.Services;

public class CatService : Categorizer.CategorizerBase
{
    private readonly IGPT3Service _GPT3Service;
    private readonly ILogger<CatService> _logger;
    public CatService(ILogger<CatService> logger, IGPT3Service gpt3Service)
    {
        _logger = logger;
        _GPT3Service = gpt3Service;
    }

    public override async Task<CatEmailReplay> Cat(CatEmailRequest request, ServerCallContext context)
    {
        _logger.LogInformation("get cat");

        var category = await _GPT3Service.AskGPT3(request.Subject);

        return new CatEmailReplay
        {
            Category = category
        };
    }
}
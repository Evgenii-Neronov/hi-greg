using Grpc.Core;

namespace ai.Services;

public class CatService : Categorizer.CategorizerBase
{
    private readonly ILogger<GreeterService> _logger;
    public CatService(ILogger<GreeterService> logger)
    {
        _logger = logger;
    }

    public override Task<CatEmailReplay> Cat(CatEmailRequest request, ServerCallContext context)
    {
        _logger.LogInformation("get cat");

        return Task.FromResult(new CatEmailReplay
        {
            Category = "test cat"
        });
    }
}
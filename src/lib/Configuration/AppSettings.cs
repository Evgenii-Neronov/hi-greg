using Microsoft.Extensions.Configuration;

public static class AppSettings
{
    private static readonly IConfiguration _configuration;

    static AppSettings()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", false, true);

        _configuration = builder.Build();
    }

    public static string CredentialPath => _configuration["CredentialPath"];
}
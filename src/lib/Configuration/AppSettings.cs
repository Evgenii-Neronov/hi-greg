using Microsoft.Extensions.Configuration;

public static class AppSettings
{
    private static IConfiguration _configuration;

    static AppSettings()
    {
        var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

        _configuration = builder.Build();
    }

    public static string CredentialPath => _configuration["CredentialPath"];
}
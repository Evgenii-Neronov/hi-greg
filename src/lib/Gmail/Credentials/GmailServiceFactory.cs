using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;

namespace lib.Gmail.Credentials;

public class GmailServiceFactory
{
    public GmailService Create(UserCredential credential, string applicationName)
    {
        return new GmailService(new BaseClientService.Initializer
        {
            HttpClientInitializer = credential,
            ApplicationName = applicationName
        });
    }
}
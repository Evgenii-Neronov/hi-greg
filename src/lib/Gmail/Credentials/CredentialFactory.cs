using Google.Apis.Auth.OAuth2;
using Google.Apis.Util.Store;

namespace lib.Gmail.Credentials;

public class CredentialFactory
{
    public UserCredential Create(Stream stream, string[] scopes, string userName, CancellationToken cancellationToken)
    {
        var secrets = GoogleClientSecrets.Load(stream).Secrets;

        return GoogleWebAuthorizationBroker.AuthorizeAsync(
            secrets,
            scopes,
            userName,
            cancellationToken,
            new FileDataStore("token.json", true)).Result;
    }
}
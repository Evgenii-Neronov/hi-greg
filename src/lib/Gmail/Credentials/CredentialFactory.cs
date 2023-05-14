using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Util.Store;

namespace lib.Gmail.Credentials;

public class CredentialFactory
{
    private static readonly string[] Scopes = { GmailService.Scope.GmailModify };
    private static readonly string UserName = "hi.greg.startup@gmail.com";

    public UserCredential CreateDefault()
    {
        using var stream = new FileStream(AppSettings.CredentialPath, FileMode.Open, FileAccess.Read);

        var secrets = GoogleClientSecrets.Load(stream).Secrets;

        return GoogleWebAuthorizationBroker.AuthorizeAsync(
            secrets,
            Scopes,
            UserName,
            CancellationToken.None,
            new FileDataStore("token.json", true)).Result;
    }
}
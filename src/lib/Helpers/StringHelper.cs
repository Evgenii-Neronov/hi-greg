using System.Text;

namespace lib.Helpers;

public static class StringHelper
{
    public static string DecodeBase64String(this string s)
    {
        var ts = s.Replace("-", "+");
        ts = ts.Replace("_", "/");
        var bc = Convert.FromBase64String(ts);
        var tts = Encoding.UTF8.GetString(bc);

        return tts;
    }
}
namespace lib.Helpers;

public static class DictionaryHelper
{
    public static string GetMaxScoreValue(this Dictionary<string, double> dictionary)
    {
        return dictionary.OrderByDescending(x => x.Value).FirstOrDefault().Key;
    }
}
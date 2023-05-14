using Newtonsoft.Json;

public static class ApiHelper
{
    public static async Task<CatResponse> Cat(string inputData)
    {
        var url = $"http://192.168.0.140:5000/cat?inputData={inputData}";

        using var client = new HttpClient();
        var response = await client.GetAsync(url);

        if (response.IsSuccessStatusCode)
        {
            var json = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<CatResponse>(json);
            return data;
        }

        throw new Exception($"Failed to get data from API: {response.StatusCode}");
    }
}
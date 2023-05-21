namespace ChatGpt.Application;

public interface IGPT3Service
{
    Task<string> AskGPT3(string prompt);
}
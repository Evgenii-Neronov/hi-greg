using ChatGpt.Application;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal.Infrastructure;
using portal.Models.Cat;

namespace portal.Controllers;

[Authorize]
[ApiController]
[Route("api/cat/")]
public class CatController : ControllerBase
{
    private readonly IGPT3Service _GPT3Service;

    public CatController(IGPT3Service gpt3Service)
    {
        _GPT3Service = gpt3Service;
    }

    [HttpGet]
    [FirebaseAuthentication]
    public async Task<CatResponse> Cat([FromQuery] CatRequest request)
    {
        var cats = request.cats.Select(x => $"\"{x}\"");
        var answer = await _GPT3Service.AskGPT3($"There is some categories: {string.Join(", ", cats)}. Please choose one most suitable category for this text: <<{request.text}>>.");

        var cat = request.cats.FirstOrDefault(x => answer.ToLower().Contains(x.ToLower())) ?? "no one";

        return new CatResponse(cat.Replace("\"", ""));
    }
}
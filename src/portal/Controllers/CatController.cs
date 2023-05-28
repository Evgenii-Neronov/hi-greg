using System.Security.Claims;
using ChatGpt.Application;
using common.Models;
using CrmApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using portal.Models.Cat;

namespace portal.Controllers;

[Authorize]
[ApiController]
[Route("api/cat/")]
public class CatController : ControllerBase
{
    private readonly CrmDbContext _context;
    private readonly IGPT3Service _GPT3Service;
    private readonly ILogger<CatController> _logger;

    public CatController(IGPT3Service gpt3Service, ILogger<CatController> logger, CrmDbContext context)
    {
        _GPT3Service = gpt3Service;
        _logger = logger;
        _context = context;
    }

    private static string PromptCat(CatRequest request, IEnumerable<string> cats)
    {
        return
            $"There is some categories: {string.Join(", ", cats)}. Please choose one most suitable category for this text: <<{request.text}>>.";
    }

    private static bool MagicCompare(string answer, string x)
    {
        return answer.ToLower().Contains(x.ToLower());
    }

    [HttpGet]
    [Authorize]
    public async Task<CatResponse> Cat([FromQuery] CatRequest request)
    {
        var cats = request.cats.Select(x => $"\"{x}\"");
        var answer = await _GPT3Service.AskGPT3(PromptCat(request, cats));
        var cat = request.cats.FirstOrDefault(x => MagicCompare(answer, x)) ?? "no one";
        var response = new CatResponse(cat.Replace("\"", ""));

        await SaveHistory(answer, request, response);

        return response;
    }

    [HttpGet("list")]
    [Authorize]
    public async Task<ActionResult<PagedResult<CatHistory>>> GetCatHistories(int currentPage = 1, int pageSize = 30)
    {
        var query = _context.CatHistory
            .OrderByDescending(x => x.Id)
            .AsQueryable();

        var totalItems = await query.CountAsync();

        var pager = new Pager<CatHistory>(currentPage, totalItems, pageSize);
        var pagedCatHistories = pager.GetPagedItems(query);

        var result = new PagedResult<CatHistory>(pagedCatHistories, totalItems);

        return Ok(result);
    }

    private Task SaveHistory(string answer, CatRequest request, CatResponse response)
    {
        var requestJson = JsonConvert.SerializeObject(request);
        _logger.LogInformation($"[Cat] request is <<{requestJson}>>");
        _logger.LogInformation($"[Cat] answer is <<{answer}>>");

        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        _context.CatHistory.Add(new CatHistory
        {
            UserId = userId,
            CreatedDate = DateTime.UtcNow,
            Answer = answer,
            Request = requestJson,
            Response = JsonConvert.SerializeObject(response)
        });

        return _context.SaveChangesAsync();
    }
}
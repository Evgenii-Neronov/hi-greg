using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal.Models.Cat;

namespace portal.Controllers;

[Authorize]
[ApiController]
[Route("api/cat/")]
public class CatController : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Cat(CatRequest request)
    {
        return Ok("oh my cat");
    }
}

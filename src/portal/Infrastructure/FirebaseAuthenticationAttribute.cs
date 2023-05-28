using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace portal.Infrastructure;

public class FirebaseAuthenticationAttribute : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        string authHeader = context.HttpContext.Request.Headers["Authorization"];
        if (authHeader != null && authHeader.StartsWith("Bearer "))
        {
            string idToken = authHeader.Substring("Bearer ".Length).Trim();

            try
            {
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance
                    .VerifyIdTokenAsync(idToken);
                context.HttpContext.Items["User"] = decodedToken.Uid;
            }
            catch (FirebaseAuthException)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
        }
        else
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        await next();
    }
}

// Q1_HelloWorld.cs
// Create a simple ASP.NET Core API endpoint that returns "Hello, World!"

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Hello, World!" });
    }
}

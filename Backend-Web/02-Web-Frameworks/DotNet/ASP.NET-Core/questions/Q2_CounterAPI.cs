// Q2_CounterAPI.cs
// Create a Counter API with increment and decrement endpoints

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CounterController : ControllerBase
{
    private static int count = 0;

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { count = count });
    }

    [HttpPost("increment")]
    public IActionResult Increment()
    {
        count++;
        return Ok(new { count = count });
    }

    [HttpPost("decrement")]
    public IActionResult Decrement()
    {
        count--;
        return Ok(new { count = count });
    }

    [HttpPost("reset")]
    public IActionResult Reset()
    {
        count = 0;
        return Ok(new { count = count });
    }
}

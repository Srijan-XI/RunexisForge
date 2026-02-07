// Q3_TodoAPI.cs
// Create a Todo API with CRUD operations

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

public class Todo
{
    public int Id { get; set; }
    public string Text { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private static List<Todo> todos = new List<Todo>();

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(todos);
    }

    [HttpPost]
    public IActionResult Create([FromBody] string text)
    {
        var todo = new Todo { Id = todos.Count + 1, Text = text };
        todos.Add(todo);
        return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var todo = todos.FirstOrDefault(t => t.Id == id);
        if (todo == null)
            return NotFound();

        todos.Remove(todo);
        return NoContent();
    }
}

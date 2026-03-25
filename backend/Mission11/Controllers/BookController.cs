using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.Models;

namespace Mission11.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController : ControllerBase
{
    public BookstoreContext _bookstoreContext;
    
    public BookController(BookstoreContext tempContext)
    {
        _bookstoreContext = tempContext;
    }

    [HttpGet]
    public IActionResult GetBooks(int pageSize = 10, int pageNumber = 1, string sortOrder = "asc", [FromQuery] List<string>? category = null)
    {
        IQueryable<Book> query = _bookstoreContext.Books.AsQueryable();
        if (category != null && category.Any())
        {
            query = query.Where(p => category.Contains(p.Category));
        }
        
        query = sortOrder.ToLower() == "desc"
            ? query.OrderByDescending(b => b.Title)
            : query.OrderBy(b => b.Title);
        var totalCount = query.Count();

        var books = query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return Ok(new
        {
            Books = books,
            TotalCount = totalCount
        });
    }

    [HttpGet("GetCategories")]
    public IActionResult GetCategories()
    {
        var categories = _bookstoreContext.Books
            .Select(p => p.Category)
            .Distinct()
            .ToList();
        return Ok(categories);
    }
}
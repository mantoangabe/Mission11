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
    public IActionResult GetBooks(int pageSize = 10, int pageNumber = 1, string sortOrder = "asc")
    {
        var booksQuery = _bookstoreContext.Books.AsQueryable();

        booksQuery = sortOrder.ToLower() == "desc"
            ? booksQuery.OrderByDescending(b => b.Title)
            : booksQuery.OrderBy(b => b.Title);

        var books = booksQuery.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        var totalCount = _bookstoreContext.Books.Count();
        return Ok(new
            {
        Books = books,
        TotalCount = totalCount});
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
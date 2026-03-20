using Microsoft.AspNetCore.Mvc;
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
    public IActionResult GetBooks(int pageSize = 10, int pageNumber = 1)
    {
        var books = _bookstoreContext.Books.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        var totalCount = _bookstoreContext.Books.Count();
        return Ok(new
            {
        Books = books,
        TotalCount = totalCount});
}
}
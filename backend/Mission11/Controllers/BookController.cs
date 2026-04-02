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
    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book book)
    {
        _bookstoreContext.Books.Add(book);
        _bookstoreContext.SaveChanges();
        return Ok(book);
    }

    [HttpPost("UpdateBook/{bookId}")]
    public IActionResult UpdateBook([FromBody] Book book)
    {
        var existingBook = _bookstoreContext.Books.Find(book);
        existingBook.Title =  book.Title;
        existingBook.Author = book.Author;
        existingBook.Publisher = book.Publisher;
        existingBook.Isbn =  book.Isbn;
        existingBook.Classification = book.Classification;
        existingBook.Category = book.Category;
        existingBook.PageCount = book.PageCount;
        existingBook.Price = book.Price;
        _bookstoreContext.SaveChanges();
        return Ok(book);
    }

    [HttpPost("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId)
    {
        var book = _bookstoreContext.Books.Find(bookId);
        if (book == null)
        {
            return NotFound();
        }
        _bookstoreContext.Books.Remove(book);
        _bookstoreContext.SaveChanges();
        return NoContent();
    }
    
}
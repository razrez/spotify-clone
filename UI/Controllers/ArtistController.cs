using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers;

public class ArtistController : Controller
{
    public IActionResult Index(int id = 0)
    {
        return View();
    }
}
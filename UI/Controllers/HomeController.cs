using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using UI.Models;

namespace UI.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [Route("/")]
    [Route("Home/")]
    [Route("Home/Index")]
    public IActionResult Index()
    {
        return View();
    }
    
    public IActionResult Search()
    {
        return View();
    }

    public IActionResult IndexPartial()
    {
        var client = new HttpClient();
        var res = client.GetAsync("https://localhost:7030//playlists/random");
        return PartialView("HomePartial/IndexPartial");
    }

    public IActionResult SearchPartial()
    {
        return PartialView("HomePartial/SearchPartial");
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
    }
}
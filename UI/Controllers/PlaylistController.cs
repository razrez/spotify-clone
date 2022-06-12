using Microsoft.AspNetCore.Mvc;
namespace UI.Controllers;

public class PlaylistController : Controller
{
    [Route("playlist/{id}")]
    public async Task<ViewResult> Index(int id)
    {
        return View();
    }
    
    public IActionResult IndexPartial()
    {
        return PartialView("PlaylistPartial/IndexPartial");
    }
}
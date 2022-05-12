using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using UI.Models;

namespace UI.Controllers;

public class AccountController : Controller
{
    
    public IActionResult Overview()
    {
        return View();
    }

    public IActionResult Plans()
    {
        return View();
    }
    
    [HttpGet]
    public IActionResult LogIn()
    {
        return View();
    }
    
    [HttpPost]
    public IActionResult LogIn(string email, string password, bool remember)
    {

        var client = new HttpClient();
        var values = new Dictionary<string, string>()
        {
            {"grant_type", "password"},
            {"username", "user01@gmail.com"},
            {"password", "qWe!123"},
        };
        var content = new FormUrlEncodedContent(values);
        var res = client.PostAsync($"https://localhost:7030/login", content);
        if (res.Result.StatusCode == HttpStatusCode.OK)
        {
            return RedirectToAction("Index", "Home");
        }
        return View();
    }

    public IActionResult SignUp()
    {
        return View();
    }

    public IActionResult About()
    {
        return View();
    }

    public IActionResult ChangePassword() => View();
}
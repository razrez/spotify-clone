using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    public async Task<IActionResult> LogIn(string email, string password, bool remember)
    {
        var client = new HttpClient();
        var values = new Dictionary<string, string>()
        {
            {"grant_type", "password"},
            {"username", email},
            {"password", password},
        };
        var content = new FormUrlEncodedContent(values);
        var res = client.PostAsync($"https://localhost:7030/login", content);

        if (res.Result.StatusCode == HttpStatusCode.OK)
        {
            var jsonString = await res.Result.Content.ReadAsStringAsync();
            var token = JsonConvert.DeserializeObject<ResponseType>(jsonString)!.access_token;
            HttpContext.Response.Cookies.Append(".AspNetCore.Application.Id", value: token,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromMinutes(60)
                });
            return RedirectToAction("Index", "Home");
        }

        // TODO wrong login or password 
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

public class ResponseType
{
    public string access_token;
    public string token_type;
    public int expires_in;
}
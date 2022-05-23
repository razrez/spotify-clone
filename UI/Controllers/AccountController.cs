using System.Diagnostics;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UI.Models;

namespace UI.Controllers;

public class AccountController : Controller
{
    public IActionResult Overview() => View();

    public IActionResult Plans() => View();
    
    public IActionResult About() => View();

    public IActionResult ChangePassword() => View();
    
    #region PartialViews Render

    public IActionResult OverviewPartial() => PartialView("AccountPartial/OverviewPartial");

    public IActionResult PlansPartial() => PartialView("AccountPartial/PlansPartial");

    public IActionResult ChangePasswordPartial() => PartialView("AccountPartial/ChangePasswordPartial");

    #endregion
    

    #region Login Signup etc..
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
    #endregion
    
}

public class ResponseType
{
    public string access_token;
    public string token_type;
    public int expires_in;
}
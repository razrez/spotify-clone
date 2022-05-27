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
        var res = client
            .PostAsync($"https://localhost:7030/api/auth/login", content).Result;

        if (res.StatusCode == HttpStatusCode.OK)
        {
            var jsonString = await res.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<ResponseType>(jsonString)!;
            var accessToken = response.access_token;
            var refreshToken = response.refresh_token;
            HttpContext.Response.Cookies.Append(".AspNetCore.Connection.Token", value: accessToken,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromSeconds(response.expires_in),
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                });
            HttpContext.Response.Cookies.Append(".AspNetCore.Connection.Refresh", value: refreshToken,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromSeconds(response.expires_in),
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                });
            return RedirectToAction("Index", "Home");
        }

        if (res.StatusCode == HttpStatusCode.BadRequest)
        {
            return View(model: "Invalid username and/or password");
        }

        return View();
    }

    [HttpGet]
    public IActionResult SignUp()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> SignUp(string email, string password, string name, 
        int birthYear, int birthMonth, int birthDay)
    {
        var client = new HttpClient();
        var values = new Dictionary<string, string>()
        {
            {"grant_type", "password"},
            {"username", email},
            {"password", password},
            {"Name", name},
            {"BirthYear", birthYear.ToString()},
            {"BirthMonth", birthMonth.ToString()},
            {"BirthDay", birthDay.ToString()},
            {"Country", "Russia"},
            {"ProfileImg", "None"}
        };
        var content = new FormUrlEncodedContent(values);
        var res = client
            .PostAsync($"https://localhost:7030/api/auth/signup", content).Result;
        
        if (res.StatusCode == HttpStatusCode.OK)
        {
            var jsonString = await res.Content.ReadAsStringAsync();
            var response = JsonConvert.DeserializeObject<ResponseType>(jsonString)!;
            var accessToken = response.access_token;
            var refreshToken = response.refresh_token;
            HttpContext.Response.Cookies.Append(".AspNetCore.Connection.Token", value: accessToken,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromSeconds(response.expires_in),
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                });
            HttpContext.Response.Cookies.Append(".AspNetCore.Connection.Refresh", value: refreshToken,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromSeconds(response.expires_in),
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                });
            return RedirectToAction("Index", "Home");
        }

        if (res.StatusCode == HttpStatusCode.BadRequest)
        {
            return View(model: "Unable to create new user");
        }

        return View();
    }
    #endregion
    
}

public class ResponseType
{
    public string access_token;
    public string token_type;
    public int expires_in;
    public string scope;
    public string refresh_token;
}
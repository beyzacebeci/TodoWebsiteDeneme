using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Reflection.Metadata;
using System.Security.Claims;
using TodoWebsite.Controller;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Pages
{
    
    public class LoginModel : PageModel
    {
        [BindProperty]
        public string Username  { get; set; }

        [BindProperty]
        public string Password { get; set; }
        [BindProperty]
        public string ErrorMessage { get; set; }=String.Empty;

        public IActionResult OnPost()
        {
            AuthController authController = new AuthController();
            if (String.IsNullOrEmpty(Username) || String.IsNullOrEmpty(Password))
            {
                ErrorMessage = "Lütfen tüm alanlarý doldurunuz";

            }
            ResultModel resultModel = authController.Login(Username, Password);
            ErrorMessage = resultModel.message;

            if (resultModel.success)
            {
                return RedirectToPage("home");
            }
            return null;

        }
    } 
}

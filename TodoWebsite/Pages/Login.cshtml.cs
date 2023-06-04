using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Controller;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Pages
{

    public class LoginModel : PageModel
    {
        private readonly IHttpContextAccessor _accessor;

        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }
        [BindProperty]
        public string ErrorMessage { get; set; } = String.Empty;

        public LoginModel(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }
        public IActionResult OnPost()
        {
            AuthController authController = new AuthController();
            if (String.IsNullOrEmpty(Username) || String.IsNullOrEmpty(Password))
            {
                ErrorMessage = "Please fill in all fields";

            }
            ResultWithCookie resultModel = authController.Login(_accessor, Username, Password);
            ErrorMessage = resultModel.message;
            if (resultModel.success)
            {
                return RedirectToPage("home");
            }
            return null;
        }
    }
}

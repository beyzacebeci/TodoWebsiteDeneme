using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Controller;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Pages
{
    public class RegisterModel : PageModel
    {
        private readonly IHttpContextAccessor _accessor;

        public RegisterModel(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }
        [BindProperty]
        public string Name { get; set; }

        [BindProperty]
        public string Surname { get; set; }

        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string NewPassword { get; set; }

        [BindProperty]
        public string NewPasswordAgain { get; set; }

        public string ErrorMessage { get; set; } = String.Empty;
        public string ErrorPassword { get; set; } = String.Empty;

        public IActionResult OnPost()
        {
            AuthController authController = new AuthController();
            if (String.IsNullOrEmpty(Name) || String.IsNullOrEmpty(Surname) || String.IsNullOrEmpty(Username) || String.IsNullOrEmpty(NewPassword) || String.IsNullOrEmpty(NewPasswordAgain))
            {

                ErrorMessage = "Please fill in all fields";
                return null;

            }
            if (NewPassword.Length<8)
            {
                ErrorMessage = "Password must be greather than 8 characters ";

            }
            if (NewPassword.ToString() != NewPasswordAgain.ToString())
            {
                ErrorPassword = "The two passwords do not match";
                return null;
            }

            ResultWithCookie resultModel = authController.Register(_accessor, Name, Surname, Username, NewPassword);
            ErrorMessage = resultModel.message;

            if (resultModel.success)
            {
                return RedirectToPage("home");
            }
            return null;


        }


    }
}
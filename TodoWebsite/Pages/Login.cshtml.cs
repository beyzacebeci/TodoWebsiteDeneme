using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Controller;

namespace TodoWebsite.Pages
{
    
    public class LoginModel : PageModel
    {
        [BindProperty]
        public string Username  { get; set; }

        [BindProperty]
        public string Password { get; set; }
        
        public void OnPost()
        {
            Console.WriteLine("test");
            Console.WriteLine(Username);
            Console.WriteLine(Password);
            AuthController authController = new AuthController();
            authController.Register();
        }
    } 
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;

namespace TodoWebsite.Pages
{
    public class RegisterModel : PageModel
    {
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

        public void OnPost()
        {
            Console.WriteLine("fsgggggtgt");
            Console.WriteLine(Name);
            Console.WriteLine(Surname);
            Console.WriteLine(Username);
            Console.WriteLine(NewPassword);
            Console.WriteLine(NewPasswordAgain);

       
        }
    }
}
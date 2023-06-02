using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using TodoWebsite.Controller;
using TodoWebsite.Models.ResultModels;

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

        public string ErrorMessage { get; set; } = String.Empty;
        public string ErrorPassword { get; set; } = String.Empty;

        public IActionResult OnPost()
        {
            AuthController authController = new AuthController();
            if (String.IsNullOrEmpty(Name) || String.IsNullOrEmpty(Surname) || String.IsNullOrEmpty(Username) || String.IsNullOrEmpty(NewPassword) || String.IsNullOrEmpty(NewPasswordAgain))
            {

                ErrorMessage = "Lütfen tüm alanları doldurunuz";
                return null;

            }
            if (NewPassword.ToString()!=NewPasswordAgain.ToString())
            {
                ErrorPassword = "Girilen iki şifre aynı değil";
                return null;
            }

            ResultModel resultModel = authController.Register(Name, Surname,Username, NewPassword);
            ErrorMessage = resultModel.message;

            if (resultModel.success)
            {
                return RedirectToPage("home");
            }
            return null;


        }


	}
}
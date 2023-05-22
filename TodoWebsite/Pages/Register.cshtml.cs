using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Models;


namespace TodoWebsite.Pages
{
    public class RegisterModel : PageModel
    {
        private readonly ILogger<RegisterModel> _logger;
        public List<UniversityModel> universityList;

        public RegisterModel(ILogger<RegisterModel> logger)
        {
            
        }

        [BindProperty]
        public string country { get; set; }

     
    }
}
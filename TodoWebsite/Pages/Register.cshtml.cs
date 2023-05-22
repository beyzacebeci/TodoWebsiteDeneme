using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Models;


namespace TodoWebsite.Pages
{
    public class RegisterModel : PageModel
    {
    
        public List<UniversityModel> universityList;


        [BindProperty]
        public string country { get; set; }

     
    }
}
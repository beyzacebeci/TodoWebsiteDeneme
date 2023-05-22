using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Models;
using TodoWebsite.Services;

namespace TodoWebsite.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public List<UniversityModel> universityList;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
            universityList = new List<UniversityModel>();
        }

        [BindProperty]
        public string country { get; set; }

        public void OnPostUniversityRequest(UniversityService universityService)
        {
            universityList = universityService.GetUniversityList(country);
        }
    }
}
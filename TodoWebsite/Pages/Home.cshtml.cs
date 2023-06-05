using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Controller;
using TodoWebsite.Models.EntityModels;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Pages.Shared
{
    public class HomeModel : PageModel
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        [BindProperty]
        public DataResultModel<List<ListeEntity>> UserTodoresult { get; set; } = default;
        [BindProperty]
        public string id { get; set; }
        public HomeModel(IHttpContextAccessor _httpContextAccessor)
        {
            this._httpContextAccessor = _httpContextAccessor;


        }
        public IActionResult OnGet()
        {
            string auth;

            bool check = true;

            var result = _httpContextAccessor.HttpContext.Request.Cookies;
            foreach (var cookie in result.Keys)
            {
                if (cookie == ".AspNetCore.cookie")
                {
                    check = false;
                    break;
                }
            }

            if (check)
            {
                return Redirect("/login");
            }
            else
            {
                ListController listController = new ListController();


                this.UserTodoresult = listController.GetAllList(_httpContextAccessor);

            }

            return null;

        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TodoWebsite.Pages.Shared
{
    public class HomeModel : PageModel
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HomeModel(IHttpContextAccessor _httpContextAccessor)
        {
            this._httpContextAccessor = _httpContextAccessor;



            //if (check)
            //{
            //    _httpContextAccessor.HttpContext.Response.Redirect("/login");
            //}
            //var authenticate = result.TryGetValue(ClaimTypes.NameIdentifier, out auth);

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
                }
            }

            if (check)
            {
                return Redirect("/login");
            }

            return null;

        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Controller;
using TodoWebsite.Models.EntityModels;

namespace TodoWebsite.Pages
{
    public class NotesModel : PageModel
    {
        private readonly IHttpContextAccessor _accessor;
        [BindProperty]
        public string UserId { get; set; } = String.Empty;

        [BindProperty]
        public string Notes { get; set; }
        [BindProperty]
        public string Content { get; set; }
        [BindProperty]
        public List<NoteEntity> UserNotes { get; set; } = null;
        NoteController NoteController { get; set; }
        public NotesModel(IHttpContextAccessor accessor, NoteController noteController)
        {
            this.NoteController = noteController;
            _accessor = accessor;
        }
        public IActionResult OnGet()
        {

            bool check = true;

            var CookieCheck = _accessor.HttpContext.Request.Cookies;
            foreach (var cookie in CookieCheck.Keys)
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
                var result = NoteController.GetAllList(_accessor);
                if (result.success)
                {
                    UserNotes = result.data;
                }
                ListController listController = new ListController();
                var answer = listController.GetUserID(_accessor);
                this.UserId = answer.data.ToString();
            }

            return null;
        }

        public void OnPost(object parameter)
        {
        }
    }
}

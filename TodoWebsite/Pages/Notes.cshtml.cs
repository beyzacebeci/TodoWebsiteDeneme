using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TodoWebsite.Pages
{
    public class NotesModel : PageModel
    {
        private readonly IHttpContextAccessor _accessor;

        [BindProperty]
        public string Notes { get; set; }
        [BindProperty]
        public string Content { get; set; }
        public NotesModel(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }
        public void OnGet()
        {
          
            
        }
        
        public void OnPost()
        {
            Console.WriteLine("rere");
           // Console.WriteLine(Notes);

            if (!String.IsNullOrEmpty(Notes) && !String.IsNullOrEmpty(Content))
            {
                Console.WriteLine(Notes);
                Console.WriteLine(Content);

                return;

            }
        }
    }
}

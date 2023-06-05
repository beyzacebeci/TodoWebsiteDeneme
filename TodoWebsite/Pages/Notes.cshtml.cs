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
        public string Notes { get; set; }
        [BindProperty]
        public string Content { get; set; }
        [BindProperty]
        public List<NoteEntity> UserNotes { get; set; } = null;
        NoteController NoteController { get; set; }
        public NotesModel(IHttpContextAccessor accessor,NoteController noteController)
        {
            this.NoteController = noteController;
            _accessor = accessor;
        }
        public void OnGet()
        {
            var result=NoteController.GetAllList(_accessor);
            if (result.success)
            {
                UserNotes = result.data;
            }
            
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

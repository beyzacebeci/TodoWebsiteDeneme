using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TodoWebsite.Controller;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Pages.Shared
{
    public class HomeModel : PageModel
    {
        public IActionResult OnGet()
        {
            ListController listController = new ListController();
            DataResultModel dataresultModel = listController.GetAllList();
           
            return null;

        }
    }
}

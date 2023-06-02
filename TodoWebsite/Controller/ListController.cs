using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Controller
{
    public class ListController
    {
        public DataResultModel GetAllList(IHttpContextAccessor accessor)
        {
            return HTTPRequestHandler<DataResultModel>.Get(accessor, "https://webtodoapi.azurewebsites.net/getall");


        }
    }
}

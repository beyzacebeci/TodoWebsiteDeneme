using TodoWebsite.Models.EntityModels;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Controller
{
    public class ListController
    {
        public DataResultModel<List<ListeEntity>> GetAllList(IHttpContextAccessor accessor)
        {
            return HTTPRequestHandler<DataResultModel<List<ListeEntity>>>.Get(accessor, "https://mongodbinfra20230605150723.azurewebsites.net/List/getall");


        }
        public DataResultModel<string> GetUserID(IHttpContextAccessor accessor)
        {
            return HTTPRequestHandler<DataResultModel<string>>.Get(accessor, "https://mongodbinfra20230605150723.azurewebsites.net/Auth/resolve");


        }
    }
}

using TodoWebsite.Models.EntityModels;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Controller
{
    public class NoteController
    {
        public DataResultModel<List<NoteEntity>> GetAllList(IHttpContextAccessor accessor)
        {
            return HTTPRequestHandler<DataResultModel<List<NoteEntity>>>.Get(accessor, "https://mongodbinfra20230605150723.azurewebsites.net/Note/GetAll");


        }
    }
}

using TodoWebsite.Models.EntityModels;

namespace TodoWebsite.Models.ResultModels
{
    public class DataResultModel<T>
    {
        public T data { get; set; }
        public bool success { get; set; }
        public string message { get; set; }

    }
}

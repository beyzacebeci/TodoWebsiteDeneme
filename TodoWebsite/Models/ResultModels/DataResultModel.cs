using TodoWebsite.Models.EntityModels;

namespace TodoWebsite.Models.ResultModels
{
    public class DataResultModel
    {
        public DataEntity data { get; set; }
        public bool success { get; set; }
        public string message { get; set; }

    }
}

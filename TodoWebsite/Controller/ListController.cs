using RestSharp;
using System.Text.Json;
using TodoWebsite.Models;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Controller
{
    public class ListController
    {
        public DataResultModel GetAllList()
        {
            var client = new RestClient("https://webtodoapi.azurewebsites.net/getallbyuserid?id=64777a1ebf1558dc1234a729");
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            var response = client.Get(request);
            var content = response.Content;
            DataResultModel result = JsonSerializer.Deserialize<DataResultModel>(content);
            return result;

        }
    }
}

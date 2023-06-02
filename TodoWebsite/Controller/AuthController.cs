using RestSharp;
using System.Text.Json;
using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Controller
{
    public class AuthController
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        public ResultModel Register(string Name, string Surname, string Username, string NewPassword)
        {


            var client = new RestClient("https://webtodoapi.azurewebsites.net/api/Auth/register");
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddBody(new
            {

                name = Name,
                surname = Surname,
                username = Username,
                password = NewPassword
            });


            var response = client.Post(request);
            var content = response.Content; // Raw content as string
            ResultModel result = JsonSerializer.Deserialize<ResultModel>(content);
            return result;
            //   var response2 = client.Post<Object>(request);



        }
        public ResultWithCookie Login(IHttpContextAccessor accessor, string Username, string Password)
        {

            var result = HTTPRequestHandler<ResultWithCookie>.Post(accessor, "https://webtodoapi.azurewebsites.net/api/Auth/login", new
            {
                username = Username,
                password = Password
            });
            return result;

        }

        //protected HttpCookie cookie;







    }
}

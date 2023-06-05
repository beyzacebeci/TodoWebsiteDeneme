using TodoWebsite.Models.ResultModels;

namespace TodoWebsite.Controller
{
    public class AuthController
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        public ResultWithCookie Register(IHttpContextAccessor accessor, string Name, string Surname, string Username, string NewPassword)
        {

            var result = HTTPRequestHandler<ResultWithCookie>.Post(accessor, "https://mongodbinfra20230605150723.azurewebsites.net/Auth/register", new
            {

                name = Name,
                surname = Surname,
                username = Username,
                password = NewPassword
            });
            return result;

        }
        public ResultWithCookie Login(IHttpContextAccessor accessor, string Username, string Password)
        {

            var result = HTTPRequestHandler<ResultWithCookie>.Post(accessor, "https://mongodbinfra20230605150723.azurewebsites.net/Auth/login", new
            {
                username = Username,
                password = Password
            });
            return result;

        }

        //protected HttpCookie cookie;







    }
}

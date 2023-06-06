using RestSharp;
using System.Text.Json;

namespace TodoWebsite.Controller
{
    public class HTTPRequestHandler<T>
    {
        public static T Get(IHttpContextAccessor accessor, string url)
        {
            string authCookie;

            var cookieResult = accessor.HttpContext.Request.Cookies.TryGetValue(".AspNetCore.cookie", out authCookie);

            var client = new RestClient(url);
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            if (authCookie != null)
            {
                request.AddHeader("Cookie", ".AspNetCore.cookie=" + authCookie);
            }
            var response = client.Get(request);
            T result = default(T);
            if (response.Content != null)
            {
                var content = response.Content;

                result = JsonSerializer.Deserialize<T>(content);
            }

            return result;
        }
        public static T Post(IHttpContextAccessor accessor, string url, Object body)
        {
            string authCookie;
            var cookieResult = accessor.HttpContext.Request.Cookies.TryGetValue(".AspNetCore.cookie", out authCookie);

            var client = new RestClient(url);
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            if (authCookie != null)
            {
                request.AddHeader("Cookie", ".AspNetCore.cookie=" + authCookie);
            }
            request.AddBody(body);
            var response = client.Post(request);

            var content = response.Content;

            T result = JsonSerializer.Deserialize<T>(content);
            if (typeof(T).ToString() == "TodoWebsite.Models.ResultModels.ResultWithCookie")
            {
                foreach (var cookie in response.Cookies)
                {
                    if (cookie.ToString().Contains(".AspNetCore.cookie"))
                    {
                        accessor.HttpContext.Response.Cookies.Append(".AspNetCore.cookie", cookie.ToString().Split("=")[1]);
                    }
                }
            }
            return result;
        }
    }
}

using System.IO;
using System;
using TodoWebsite.Models;
using RestSharp;
using TodoWebsite.Pages;
using TodoWebsite.Models.ResultModels;
using System.Text.Json;
using System.Net;

namespace TodoWebsite.Controller
{
    public class AuthController
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        public ResultModel Register(string Name, string Surname,string Username, string NewPassword)
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
            }) ;
     
           
            var response = client.Post(request);
            var content = response.Content; // Raw content as string
            ResultModel result = JsonSerializer.Deserialize<ResultModel>(content);
            return result;
         //   var response2 = client.Post<Object>(request);
            


        }
        public ResultModel Login(string Username, string Password)
        {
            var client = new RestClient("https://webtodoapi.azurewebsites.net/api/Auth/login");
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddBody(new
            {
                username = Username,
                password = Password
            });
            var response = client.Post(request);
            var content = response.Content;
            ResultModel result = JsonSerializer.Deserialize<ResultModel>(content);
            return result;

        }

        //protected HttpCookie cookie;







    }
}

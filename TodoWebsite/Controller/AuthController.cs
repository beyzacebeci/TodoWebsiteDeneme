using System.IO;
using System;
using TodoWebsite.Models;
using RestSharp;

namespace TodoWebsite.Controller
{
    public class AuthController
    {
        private static readonly HttpClient _httpClient = new HttpClient();
        public async void Register()
        {

             
            var client = new RestClient("https://webtodoapi.azurewebsites.net/api/auth");
  
            var request = new RestRequest();
            //request.AddParameter("name", "beyza");
            //request.AddParameter("surname", "cidc");
            //request.AddParameter("username", "dss");
            //request.AddParameter("password", "sdssd");

            request.AddHeader("Accept", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddBody(new
            {

                name = "beyza",
                surname = "idle",
                username = "haha",
                password = "saaas"
            }) ;
     
           
            var response = client.Post(request);
            var content = response.Content; // Raw content as string
         //   var response2 = client.Post<Object>(request);
            Console.WriteLine(content);


        }
    }
}

using System.Net;
using System.Text.Json;
using TodoWebsite.Models;

namespace TodoWebsite.Services
{
    public class UniversityService
    {
        public List<UniversityModel> GetUniversityList(string CountryName)
        {
            string url = string.Concat("http://universities.hipolabs.com/search?country=", CountryName);
            var stringData = new WebClient().DownloadString(url);
            var data = JsonSerializer.Deserialize<List<UniversityModel>>(stringData);
            return data;
        }



    }
}

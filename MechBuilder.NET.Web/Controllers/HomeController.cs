using Microsoft.AspNetCore.Mvc;

namespace MechBuilder.NET.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET
        public IActionResult Index()
        {
            return View();
        }
    }
}
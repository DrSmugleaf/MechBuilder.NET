using System.Collections.Immutable;
using AngleSharp.Html.Parser;
using MechBuilder.NET.Web.Views.Home;
using MechParser.NET.Extensions;
using MechParser.NET.Mechs.Weapons;
using MechParser.NET.Smurfy;
using Microsoft.AspNetCore.Mvc;

namespace MechBuilder.NET.Web.Controllers
{
    public class HomeController : Controller
    {
        private static readonly ImmutableList<Weapon> Weapons;

        static HomeController()
        {
            var stream = System.IO.File.OpenRead("Resources/weapons");
            var html = GZipExtensions.Decompress(stream);
            var document = new HtmlParser().ParseDocument(html);
            Weapons = SmurfyWeaponImporter.ParseDocument(document).ToImmutableList();
        }

        // GET
        public IActionResult Index()
        {
            var view = View();
            view.ViewData.Model = new Index {Weapons = Weapons};

            return view;
        }
    }
}

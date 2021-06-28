using System.Collections.Immutable;
using MechParser.NET.Mechs.Weapons;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MechBuilder.NET.Web.Views.Home
{
    public class Index : PageModel
    {
        public ImmutableList<Weapon> Weapons { get; set; }
    }
}

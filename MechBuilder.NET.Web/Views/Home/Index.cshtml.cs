using System;
using System.Collections.Immutable;
using MechParser.NET.Mechs.Slots;
using MechParser.NET.Mechs.Weapons;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MechBuilder.NET.Web.Views.Home
{
    public class Index : PageModel
    {
        public ImmutableList<Weapon> Weapons { get; set; }

        public string GetWeaponClass(HardpointType type)
        {
            return type switch
            {
                HardpointType.Energy => "energy-weapon",
                HardpointType.Ballistic => "ballistic-weapon",
                HardpointType.Missile => "missile-weapon",
                HardpointType.Ams => "ams-weapon",
                HardpointType.Ecm => "ecm-weapon",
                _ => throw new ArgumentOutOfRangeException(nameof(type), type, null)
            };
        }
    }
}

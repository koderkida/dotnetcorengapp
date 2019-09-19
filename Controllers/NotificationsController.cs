using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace GKDOTNETNGAPP.Controllers
{
    [Route("kk/[controller]")]
    public class NotificationsController : Controller
    {
        [HttpGet("[action]")]
        public IActionResult EmailConfirmed(string userId, string code) 
        {
             
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                return Redirect("/login");

            }
 

            return View();
         }
    }
}

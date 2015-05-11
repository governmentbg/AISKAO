using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.DataAccess;

namespace TechnoLogica.Eservices.Public.Core.IServices
{
    public interface IAdministrationService
    {
        WEB_ADM_INFORMATIONS GetAdministrationInfo();
    }
}

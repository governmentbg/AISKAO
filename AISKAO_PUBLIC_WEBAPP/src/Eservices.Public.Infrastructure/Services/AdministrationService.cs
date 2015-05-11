using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;

namespace TechnoLogica.Eservices.Public.Infrastructure.Services
{
    public class AdministrationService : IAdministrationService
    {
        private IRepository<WEB_ADM_INFORMATIONS> _repository { get; set; }

        public AdministrationService(IRepository<WEB_ADM_INFORMATIONS> repository)
        {
            this._repository = repository;
        }
        public IRepository<WEB_ADM_INFORMATIONS> Repository
        {
            get
            {
                return this._repository;
            }
        }

        public WEB_ADM_INFORMATIONS GetAdministrationInfo()
        {
            return _repository.GetAll().FirstOrDefault();
        }
    }
}

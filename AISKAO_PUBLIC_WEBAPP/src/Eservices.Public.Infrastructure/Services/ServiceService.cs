using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechnoLogica.Eservices.Public.Core.IServices;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Infrastructure.Repositories;

namespace TechnoLogica.Eservices.Public.Infrastructure.Services
{
    public class ServiceService : IServiceService
    {
        public IRepository<WEB_SRVC_TYPE_PUBLIC_INFO> ServiceTypePublicInfoRepo { get; set; }
        public IRepository<WEB_SERVICE_TYPES_V> ServiceTypeRepo { get; set; }
        public IRepository<WEB_SRVC_INF_BIT_TYPES> ServiceInfoBitTypes { get; set; }
        public IRepository<WEB_SRVC_TYPE_INF_BITS> ServiceTypeInfoBits { get; set; }

        public ServiceService(DbContext context)
        {
            ServiceTypePublicInfoRepo = new SQLRepository<WEB_SRVC_TYPE_PUBLIC_INFO>(context);
            ServiceTypeRepo = new SQLRepository<WEB_SERVICE_TYPES_V>(context);
            ServiceInfoBitTypes = new SQLRepository<WEB_SRVC_INF_BIT_TYPES>(context);
            ServiceTypeInfoBits = new SQLRepository<WEB_SRVC_TYPE_INF_BITS>(context);
        }

        public IQueryable<WEB_SERVICE_TYPES_V> GetServices()
        {
            return ServiceTypeRepo.GetAll();
        }

        public WEB_SRVC_TYPE_PUBLIC_INFO GetServiceDetails(int serviceId)
        {

            return ServiceTypePublicInfoRepo.GetAll().Include("WEB_SERVICE_TYPES_V").FirstOrDefault(a => a.ID == serviceId);
            //.FindSingle(a => a.ID.Equals(serviceId));
        }

        public IQueryable<WEB_SRVC_TYPE_INF_BITS> GetServiceTypesInfo(int serviceId)
        {
            //return ServiceTypeInfoBits.GetAll().Include("WEB_SRVC_INF_BIT_TYPES").Where(a => a.SERVICE_TYPE_ID == serviceId).OrderBy(a => a.SERVICE_INF_BIT_TYPE_CODE)
            //    .ThenBy(a => a.APPEARANCE_ORDER);
            var typeBits = ServiceTypeInfoBits.GetAll();
            var infoBits = ServiceInfoBitTypes.GetAll();
            var serviceTypeInfo = from tb in typeBits
                                  join ib in infoBits on tb.SERVICE_INF_BIT_TYPE_CODE equals ib.CODE
                                  where tb.SERVICE_TYPE_ID.Equals(serviceId)
                                  orderby tb.SERVICE_INF_BIT_TYPE_CODE, tb.APPEARANCE_ORDER
                                  select tb;
            return serviceTypeInfo;

        }

        public IQueryable<WEB_SERVICE_TYPES_V> ListServices(string serviceName)
        {
            return ServiceTypeRepo.GetAll();
        }
    }
}

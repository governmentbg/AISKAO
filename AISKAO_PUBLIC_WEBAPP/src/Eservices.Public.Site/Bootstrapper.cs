using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using TechnoLogica.Eservices.Public.Core.DTOs;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Site.Models.Administration;
using TechnoLogica.Eservices.Public.Site.Models.ElectronicService;
using TechnoLogica.Eservices.Public.Site.Models.Service;

namespace TechnoLogica.Eservices.Public.Site
{
    public static class Bootstrapper
    {
        public static void ConfigureAutoMapper()
        {
            
            Mapper.CreateMap<WEB_ADM_INFORMATIONS, GetAdministrationInfoViewModel>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(origin => origin.NAME))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(origin => origin.ADDRESS))
                .ForMember(dest => dest.Bulstat, opt => opt.MapFrom(origin => origin.BULSTAT))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(origin => origin.EMAIL))
                .ForMember(dest => dest.WebSiteAddress, opt => opt.MapFrom(origin => origin.WEB_SITE));

            Mapper.CreateMap<WEB_SERVICE_TYPES_V, ServiceViewModel>()
                .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(origin => origin.ID))
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(origin => origin.NAME))
                .ForMember(dest=> dest.URI, opt => opt.MapFrom(origin => origin.URI))
                .ForMember(dest => dest.XSDName, opt => opt.MapFrom(origin => origin.ROOT_XSD_ELEMENT_NAME));

            Mapper.CreateMap<WEB_SRVC_TYPE_PUBLIC_INFO, GetServiceDetailsViewModel>()
                .ForMember(dest => dest.ServiceId, opt => opt.MapFrom(origin => origin.ID))
                .ForMember(dest => dest.PublicInformationDescription, opt => opt.MapFrom(origin => origin.DESCRIPTION))
                .ForMember(dest => dest.PublicInformationCompetentAuthority, opt => opt.MapFrom(origin => origin.COMPETENT_AUTHORITY))
                .ForMember(dest => dest.PublicInformationApplicant, opt => opt.MapFrom(origin => origin.APPLICANT))
                .ForMember(dest => dest.PublicInformationPaymentAndTermDescription, opt=> opt.MapFrom(origin => origin.PAYMENT_AND_TERM_DESCRIPTION))
                .ForMember(dest => dest.PublicInformationServiceResponsible, opt => opt.MapFrom(origin => origin.SERVICE_RESPONSIBLE))
                .ForMember(dest => dest.PublicInformationRefusalAppealProcedureDescription, opt => opt.MapFrom(origin => origin.REFUSAL_APPEAL_PROCEDURE_DESCR))
                .ForMember(dest => dest.PublicInformationResultDesription, opt => opt.MapFrom(origin => origin.RESULT_DESCRIPTION));

            Mapper.CreateMap<WEB_SERVICE_TYPES_V, SearchResultServicesViewModel>()
                .ForMember(dest => dest.ServiceName, opt => opt.MapFrom(origin => origin.NAME));

            Mapper.CreateMap<WEB_SRVC_TYPE_INF_BITS, ServiceTypeInfoBitsViewModel>()
                //.ForMember(dest => dest.Name, opt => opt.MapFrom(origin => origin.WEB_SRVC_INF_BIT_TYPES.NAME))
                .ForMember(dest => dest.Code, opt => opt.MapFrom(origin => origin.SERVICE_INF_BIT_TYPE_CODE))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(origin => origin.DESCRIPTION));


            Mapper.CreateMap<OfficialDocumentsDTO, OfficialDocumentViewModel>()
               .ForMember(dest => dest.DocumentId, opt => opt.MapFrom(origin => origin.DocumentId))
               .ForMember(dest => dest.URI, opt => opt.MapFrom(origin => origin.URI))
               .ForMember(dest => dest.DocumentName, opt => opt.MapFrom(origin => origin.DocumentName))
               .ForMember(dest => dest.DocumentCreatedOn, opt => opt.MapFrom(origin => origin.DocumentCreatedOn))
               .ForMember(dest => dest.IsXMLDoc, opt => opt.MapFrom(origin => origin.IsXMLDoc));


            Mapper.CreateMap<WEB_E_SERVICE_STATUS_V, ElectronicServiceStageViewModel>()
                .ForMember(dest => dest.ServiceStageType, opt => opt.MapFrom(origin => origin.STAGE_STATUS))
                .ForMember(dest => dest.ServiceStageTypeName, opt => opt.MapFrom(origin => origin.STAGE_NAME))
                .ForMember(dest => dest.CompletedOn, opt => opt.MapFrom(origin => origin.ACTUAL_COMPLETION_DATE))
                .ForMember(dest => dest.SequenceNumber, opt => opt.MapFrom(origin => origin.ORDER_SEQ));

            Mapper.CreateMap<WEB_SERVICE_TYPES_V, GetEServiceDetailsViewModel>()
                .ForMember(dest => dest.InitialDocumentURI, opt => opt.MapFrom(origin => origin.INIT_DOCUMENT_TYPE_URI))
                .ForMember(dest => dest.ServiceTypeName, opt => opt.MapFrom(origin => origin.NAME))
                .ForMember(dest => dest.ServiceTypeDescription, opt => opt.MapFrom(origin => origin.DESCRIPTION));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StructureMap;
using TechnoLogica.Eservices.AIS.Core.IServices;
using TechnoLogica.Eservices.Common.SigningUtils;

namespace Eservices.AISClient
{
    public class SignService
    {
        //private ISignService GetSignService()
        //{
        //    ISignService signService = ObjectFactory.GetInstance<ISignService>();
        //    return signService;
        //}

        public XMLDigitalSignature GetXMLDigitalSignatureInfo(string document)
        {
            ISignService signService = ObjectFactory.GetInstance<ISignService>();
            var signInfo = signService.GetXMLDigitalSignatureInfo(document);

            return signInfo;
        }

        public bool Verify(string document)
        {
            ISignService signService = ObjectFactory.GetInstance<ISignService>();
            return signService.Verify(document);
        }
    }
}

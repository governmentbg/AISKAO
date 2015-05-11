using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.OData;
using System.Xml;
using System.Xml.Schema;
using Microsoft.Data.OData;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.Common;
using TechnoLogica.Eservices.DocumentEditor.Infrastructure.DataPackages.Models;

namespace TechnoLogica.Eservices.DocumentEditor.Web.Controllers
{
    public class DocumentsController : EntitySetController<Document, int>
    {
        [HttpPost]
        public HttpResponseMessage ValidateXML(ODataActionParameters parameters)
        {
            if (!ModelState.IsValid || !parameters.ContainsKey("documentContent"))
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            try
            {
                var data = (string)parameters["documentContent"];
                XmlDocument xmlDocument = new XmlDocument();
                xmlDocument.LoadXml(data);
                // TODO: Тук може да се прочете Header-a на заявлението и да се определи типа на заявлението (DocumentTypeURI)
                // Използвайки УРИ-то във валидацията още тук ще се връща съобщение, че не се потвърждава.
                // Ако няма Header ще се използва Namespace-a.

                string rootNamespaceURI = xmlDocument.DocumentElement.NamespaceURI;
                string documentName = xmlDocument.DocumentElement.Name;
                Regex rx = new Regex(@"[\d|\w]{1,4}-\d{4,6}$$");
                string documentUri = rx.Match(rootNamespaceURI).ToString();
                //string documentUri = "0009-000146";

                string codeBase = System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);//remove "File:" prefix
                string uriPath = Uri.UnescapeDataString(uri.Path);
                string path = Path.GetDirectoryName(uriPath);

                string documentNamePrefix = documentUri.Length > 0 ? documentUri + "_" : "";
                string documentFileName = documentNamePrefix + documentName + ".xsd";
                //Uri documentXMLUri = new Uri(ConfigurationManager.AppSettings["XSDDirectoryPath"].ToString() + documentFileName);

                Uri documentXMLUri = new Uri(path + "\\" + documentFileName);
                EservicesXmlResolver xmlResolver = new EservicesXmlResolver();

                using (var reader = new XmlTextReader((StringReader)xmlResolver.GetEntity(documentXMLUri, null, null)))
                {
                    XmlSchemaSet schemaSet = new XmlSchemaSet();
                    schemaSet.XmlResolver = xmlResolver;
                    schemaSet.Add(rootNamespaceURI, reader);
                    schemaSet.Compile();

                    xmlDocument.Schemas.Add(schemaSet);
                    xmlDocument.Validate(null);
                }

                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (XmlException)
            {
                throw new HttpResponseException(
                 this.Request.CreateResponse(
                     HttpStatusCode.OK,
                     new ODataError
                     {
                         Message = "0006-000069: Невалидна структура на обекта съгласно XML дефиницията му, вписана в регистъра на информационните обекти.",
                         MessageLanguage = "bg-BG",
                         ErrorCode = "0006-000069"
                     }
                 )
                );
            }
            catch (XmlSchemaValidationException)
            {
                throw new HttpResponseException(
                  this.Request.CreateResponse(
                      HttpStatusCode.OK,
                      new ODataError
                      {
                          Message = "0006-000069: Невалидна структура на обекта съгласно XML дефиницията му, вписана в регистъра на информационните обекти.",
                          MessageLanguage = "bg-BG",
                          ErrorCode = "0006-000069"
                      }
                  )
                );
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
    }
}

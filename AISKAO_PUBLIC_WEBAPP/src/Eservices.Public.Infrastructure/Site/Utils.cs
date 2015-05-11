using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace TechnoLogica.Eservices.Public.Infrastructure.Site
{
    public static class Utils
    {

        //Осигурява включването на правилно разширение на името на файл, спрямо подадения MIME-тип.
        //Наименованието на файла с добавено разширение.
        public static string EnsureFileNameExtension(string fileName, string fileType)
        {
            string extension = "txt";

            if (String.IsNullOrWhiteSpace(fileType))
            {
                fileType = "text/xml";
            }

            switch (fileType)
            {
                case "text/plain":
                    extension = "txt";
                    break;
                case "application/pdf":
                    extension = "pdf";
                    break;
                case "application/msword":
                    extension = "doc";
                    break;
                case "application/excel":
                    extension = "xls";
                    break;
                case "message/rfc822":
                    extension = "eml";
                    break;
                case "application/pkcs7-signature":
                    extension = "p7s";
                    break;
                case "application/ats":
                    extension = "ats";
                    break;
                case "application/vnd.sun.xml.writer":
                    extension = "sxw";
                    break;
                case "application/rtf":
                    extension = "rtf";
                    break;
                case "image/jpeg":
                    extension = "jpg";
                    break;
                case "image/pjpeg":
                    extension = "jpg";
                    break;
                case "image/jpx":
                    extension = "jpx";
                    break;
                case "image/jp2":
                    extension = "jp2";
                    break;
                case "image/png":
                    extension = "png";
                    break;
                case "image/tiff":
                    extension = "tiff";
                    break;
                case "application/x-zip-compressed":
                    extension = "zip";
                    break;
                case "text/xml":
                case "application/xml":
                    extension = "xml";
                    break;
                case "application/octet-stream":
                    extension = "";
                    break;
            }
            if (!String.IsNullOrEmpty(extension) && !fileName.EndsWith(extension))
            {
                return String.Format("{0}.{1}", fileName, extension);
            }
            else
            {
                return fileName;
            }
        }

        //Извлича байтов масив от низ, който представлява съдържание на документ.
        //Низ със съдържанието на документа.
        //Флаг, който показва дали документът е структуриран.
        public static byte[] GetByteArrayFromDocumentContent(string s, bool isXml = true)
        {
            if (s != null)
            {
                if (isXml)
                {
                    var encoding = new UTF8Encoding();
                    return encoding.GetBytes(s);
                }
                else
                {
                    return Convert.FromBase64String(s);
                }
            }
            else
            {
                return null;
            }
        }

        // Кодира низ за употреба в уеб браузър.
        public static string GetBrowserEncodedString(string s)
        {
            return HttpUtility.UrlEncode(s).Replace("+", "%20").Replace("%2f", "/");
        }

    }
}

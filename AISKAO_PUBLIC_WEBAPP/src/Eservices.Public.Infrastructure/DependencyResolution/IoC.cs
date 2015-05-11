// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IoC.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------


using StructureMap;
using System.Data.Entity;
using TechnoLogica.Eservices.Public.Core.Repositories;
using TechnoLogica.Eservices.Public.DataAccess;
using TechnoLogica.Eservices.Public.Infrastructure.Repositories;

namespace TechnoLogica.Eservices.Public.Infrastructure.DependencyResolution
{
    public static class IoC
    {
        public static IContainer Initialize()
        {
            ObjectFactory.Configure(x =>
                        {
                            x.Scan(scan =>
                                    {
                                        scan.AssembliesFromApplicationBaseDirectory(a => a.FullName.StartsWith("Eservices"));
                                        scan.WithDefaultConventions();
                                        scan.LookForRegistries();
                                    });
                            x.For<DbContext>().HttpContextScoped().Use(() => new AISWebEntities());
                            x.For<IRepository<WEB_ADM_INFORMATIONS>>().Use<SQLRepository<WEB_ADM_INFORMATIONS>>();
                            x.For<IRepository<WEB_SRVC_TYPE_PUBLIC_INFO>>().Use<SQLRepository<WEB_SRVC_TYPE_PUBLIC_INFO>>();
                            x.For<IRepository<WEB_SERVICE_TYPES_V>>().Use<SQLRepository<WEB_SERVICE_TYPES_V>>();
                            x.For<IRepository<WEB_SERVICE_STAGES_V>>().Use<SQLRepository<WEB_SERVICE_STAGES_V>>();
                            x.For<IRepository<WEB_SRVC_INF_BIT_TYPES>>().Use<SQLRepository<WEB_SRVC_INF_BIT_TYPES>>();
                            x.For<IRepository<WEB_SRVC_TYPE_INF_BITS>>().Use<SQLRepository<WEB_SRVC_TYPE_INF_BITS>>();
                            x.For<IRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V>>().Use<SQLRepository<WEB_CASE_OFFICIAL_DOCUMENTS_V>>();
                            x.For<IRepository<WEB_REGISTERED_DOCUMENTS_V>>().Use<SQLRepository<WEB_REGISTERED_DOCUMENTS_V>>();
                           

                        });

            return ObjectFactory.Container;
        }
    }
}
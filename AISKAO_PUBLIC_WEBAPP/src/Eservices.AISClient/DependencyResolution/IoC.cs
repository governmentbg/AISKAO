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
using TechnoLogica.Eservices.AIS.Core.IServices;
using TechnoLogica.Eservices.AIS.Infrastructure.Site.Utils;
using WolfeReiter.AntiVirus;
namespace Eservices.AISClient.DependencyResolution
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
                                scan.TheCallingAssembly();
                                scan.WithDefaultConventions();
                            });
                            //                x.For<IExample>().Use<Example>();
                            x.For<ISignService>().Use(() => new SignUtils());
                            //TODO
                            x.For<IVirusScanAgent>()
                                       .HybridHttpOrThreadLocalScoped()
                                       .Use(() => new ClamdStreamAgent(
                                           "127.0.0.1",
                                           3310,
                                           VirusScanAgent.ThreadingModel.SynchronousSingleThread,
                                           false));
                            
                        });
            return ObjectFactory.Container;
        }
    }
}
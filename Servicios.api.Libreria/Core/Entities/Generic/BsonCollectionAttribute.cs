using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Core.Entities
{
	[AttributeUsage(AttributeTargets.Class, Inherited = false)]
	public class BsonCollectionAttribute: Attribute
	{
		public BsonCollectionAttribute(string CollectionName)
		{
			this.CollectionName = CollectionName;
		}
		public string CollectionName { get; }
	}
}

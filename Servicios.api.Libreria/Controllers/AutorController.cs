using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Servicios.api.Libreria.Core.Entities;
using Servicios.api.Libreria.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servicios.api.Libreria.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AutorController : ControllerBase
	{
		private readonly IMongoRepository<AutorEntity> _autorRepository;
		public AutorController(IMongoRepository<AutorEntity> autorRepository)
		{
			_autorRepository = autorRepository;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<AutorEntity>>> Get() =>
			Ok(await _autorRepository.GetAll());

		[HttpGet("{id}")]
		public async Task<ActionResult<AutorEntity>> GetById(string Id) =>
			Ok(await _autorRepository.GetById(Id));
		
		[HttpPost]
		public async Task Post(AutorEntity autorEntity)
		{
			await _autorRepository.InsertDocument(autorEntity);
		}
		
		[HttpPut]
		public async Task Put(AutorEntity autorEntity)
		{
			await _autorRepository.UpdateDocument(autorEntity);
		}
		
		[HttpDelete]
		public async Task Delete(string Id)
		{
			await _autorRepository.DeleteById(Id);
		}

		[HttpPost("pagination")]
		public async Task<ActionResult<Pagination<AutorEntity>>> PostPagination(Pagination<AutorEntity> pagination)
		{
			var result = await _autorRepository.PaginationByFilter(pagination);
			return Ok(result);
		}
	}
}

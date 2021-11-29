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
	public class LibroController : ControllerBase
	{
		private readonly IMongoRepository<LibroEntity> _repository;
		public LibroController(IMongoRepository<LibroEntity> repository)
		{
			_repository = repository;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<LibroEntity>>> Get() =>
			Ok(await _repository.GetAll());

		[HttpGet("{id}")]
		public async Task<ActionResult<LibroEntity>> GetById(string Id) =>
			Ok(await _repository.GetById(Id));

		[HttpPost("pagination")]
		public async Task<ActionResult<Pagination<LibroEntity>>> PostPagination(Pagination<LibroEntity> pagination) =>
			Ok(await _repository.PaginationByFilter(pagination));

		[HttpPost]
		public async Task Post(LibroEntity libro) =>
			await _repository.InsertDocument(libro);

		[HttpPut]
		public async Task Put(LibroEntity libro) =>
			await _repository.UpdateDocument(libro);

		[HttpDelete]
		public async Task Delete(string Id) =>
			await _repository.DeleteById(Id);
	}
}

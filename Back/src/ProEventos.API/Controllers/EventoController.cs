

namespace ProEventos.API.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Back.src.ProEventos.API.Models;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class EnventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento = new Evento[]
            {
                new Evento(){
                    EventoId = 1,
                    Local = "Belo Horizonte",
                    DataEvento = DateTime.Now.AddDays(2).ToString(),
                    Tema = "Angular 11 e .Net 5",
                    QtdPessoas = 250,
                    Lote = "1° Lote",
                    ImagemURL ="foto.png"
                },
                new Evento(){
                    EventoId = 2,
                    Local = "São Paulo",
                    DataEvento = DateTime.Now.AddDays(2).ToString(),
                    Tema = "Angular e suas Novidades",
                    QtdPessoas = 350,
                    Lote = "3° Lote",
                    ImagemURL ="foto1.png"
                }
            };
        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }
        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _evento.Where(evento => evento.EventoId == id);
        }


    }
}
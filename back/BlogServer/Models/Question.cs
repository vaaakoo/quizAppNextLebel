﻿using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string? Text { get; set; }
    }
}

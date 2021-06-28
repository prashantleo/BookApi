using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookApi.Models
{
    public class Books
    {
        [Key]
        public int BookId { get; set; }
        [Column(TypeName="nvarchar(100)")]
        public string BookName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Author { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Category { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Description { get; set; }

        public DateTime Date { get { return DateTime.Now; } }





    }
}

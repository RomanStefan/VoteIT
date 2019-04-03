using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IronOcr;
using Tesseract;

namespace OCR
{
    class Program
    {
        static void Main(string[] args)
        {
            var img = new Bitmap("D://WorkSpace//C#//OCR//OCR//images//buletin.bmp");
            var engine = new TesseractEngine("./tessdata", "ron", EngineMode.Default);
            var page = engine.Process(img, PageSegMode.Auto);
            string result = page.GetText();
            var IDROUindex = result.IndexOf("IDROU");
            var informationBar = result.Substring(IDROUindex, 63);
            System.Console.WriteLine(IDROUindex);


            System.Console.WriteLine(informationBar);
            for (int i = 0; i < informationBar.Length; i++)
                Console.WriteLine("Informationbar[{0}] = {1} ", i, informationBar[i]);
           

        }
    }

}

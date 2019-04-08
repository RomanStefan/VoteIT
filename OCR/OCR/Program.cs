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

        static string getCNP(string informationBar)
        {
            var cnp = new StringBuilder();
            switch(informationBar[57])
            {
                case 'M':
                    cnp.Append(1);
                    break;
                case 'F':
                    cnp.Append(2);
                    break;
                default:
                    break;
            }

            cnp.Append(informationBar.Substring(50, 6));
            cnp.Append(informationBar.Substring(66, 6));

            return cnp.ToString();
        }

        static void Main(string[] args)
        {
            var img = new Bitmap("D://WorkSpace//C#//OCR//OCR//images//buletin.bmp");
            var engine = new TesseractEngine("./tessdata", "ron", EngineMode.Default);
            var page = engine.Process(img, PageSegMode.Auto);
            string result = page.GetText();

            var IDROUindex = result.IndexOf("IDROU");
            var informationBar = result.Substring(IDROUindex, 63);

            //Prelucam bara cu date pentru a putea extrage numele si prenumele
            informationBar = informationBar.Replace("«", "<<");
            var nameEndPosition = informationBar.IndexOf("<<");
            System.Console.WriteLine(informationBar);

            //Luam indecsii de start si final a numelui
            var nameStartIndex = 5;
            var name = informationBar.Substring(nameStartIndex, nameEndPosition - nameStartIndex);
            System.Console.WriteLine("Name: {0}", name);
            
            //Aflarea indecsilor pentru prenume si prelucrarea acestuia
            var firstLineEnd = informationBar.IndexOf("\n");
            var lastNameStartPosition = nameEndPosition;
            var lastName = informationBar.Substring(lastNameStartPosition, firstLineEnd - lastNameStartPosition);
            lastName = lastName.Replace("<", "");
            System.Console.WriteLine("lastName: {0}", lastName);


            //Formarea cnp-ului
            string CNP = getCNP(informationBar);
            Console.WriteLine("CNP:{0}", CNP);
        }
    }

}

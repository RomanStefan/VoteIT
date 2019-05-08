using System;
using System.Drawing;
using System.Text;
using Tesseract;

namespace VoteIT.Controllers
{
    public class OCR
    {
        private string _path;
        private string _firstName;
        private string _lastName;
        private string _cnp;

        public string FirstName
        {
            get
            {
                return _firstName;
            }
        }

        public string LastName
        {
            get
            {
                return _lastName;
            }
        }

        public string Cnp
        {
            get
            {
                return _cnp;
            }
        }

        public OCR(string path)
        {
            _path = path;
            ReceivePersonalInformations();
        }

        static string getCNP(string informationBar)
        {
            var cnp = new StringBuilder();
            switch (informationBar[57])
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

        static bool validateCNP(string cnp)
        {
            const string a = "279146358279";
            long suma = 0;

            if (cnp.Length != 13)
                return false;

            for (int i = 0; i < 12; i++)
                suma += long.Parse(cnp.Substring(i, 1)) * long.Parse(a.Substring(i, 1));

            long rest = suma - 11 * (int)(suma / 11);
            rest = rest == 10 ? rest : 1;

            if (long.Parse(cnp.Substring(12, 1)) != rest)
                return false;
            return true;
        }

        private void ReceivePersonalInformations()
        {
            var img = Pix.LoadFromFile(_path);
            var engine = new TesseractEngine("D://VoteIT//VoteIT//VoteIT//tessdata", "ron", EngineMode.Default);
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
            _firstName = informationBar.Substring(nameStartIndex, nameEndPosition - nameStartIndex);
            //System.Console.WriteLine("Name: {0}", name);

            //Aflarea indecsilor pentru prenume si prelucrarea acestuia
            var firstLineEnd = informationBar.IndexOf("\n");
            var lastNameStartPosition = nameEndPosition;
            _lastName = informationBar.Substring(lastNameStartPosition, firstLineEnd - lastNameStartPosition);
            _lastName = _lastName.Replace("<", "");
            //System.Console.WriteLine("lastName: {0}", lastName);


            //Formarea cnp-ului si verificarea validitatii lui
            _cnp = getCNP(informationBar);
            bool valideCNP = validateCNP(_cnp);
            //Console.WriteLine("CNP:{0} valid: {1}", CNP, valideCNP);
        }
    }
} 

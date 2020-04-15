using System;
using System.Text;

namespace CardPlayer.Helpers
{
    public static class StringHelpers
    {

        public static string randomString(int size, bool lowerCase)
        {
            var builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (var i = 0; i < size; ++i)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));  
                builder.Append(ch);  
            }

            return lowerCase ? builder.ToString().ToLower() : builder.ToString();
        }
    }
}
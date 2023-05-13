using System;
using MailKit.Net.Imap;
using MailKit.Search;
using MailKit;
using MimeKit;

class Program
{
    public static void Main(string[] args)
    {
        using (var client = new ImapClient())
        {
            client.ServerCertificateValidationCallback = (s, c, h, e) => true;

            client.Connect("imap.gmail.com", 993, true);
            
            client.Authenticate("hi.greg.test.01", "");

            // Команда Inbox открывает почтовый ящик Inbox
            var inbox = client.Inbox;
            inbox.Open(FolderAccess.ReadOnly);

            Console.WriteLine("Total messages: {0}", inbox.Count);
            Console.WriteLine("Recent messages: {0}", inbox.Recent);

            for (int i = 0; i < inbox.Count; i++)
            {
                var message = inbox.GetMessage(i);
                Console.WriteLine("Subject: {0}", message.Subject);
            }

            client.Disconnect(true);
        }
    }
}
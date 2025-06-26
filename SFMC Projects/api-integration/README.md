Salesforce Marketing Cloud Project Portfolio
Project: CloudPage Data Capture with External Tool (Postman)
Author: Sisendar Reddy Kaipu

As part of my hands-on experience with Salesforce Marketing Cloud (SFMC), I developed a small project that demonstrates integration between SFMC and an external API testing tool — Postman. The goal was to use a CloudPage in SFMC to receive subscriber data and securely store it in a Data Extension (DE), while testing the integration using various POST request formats from Postman.
Objective
The objective was to allow external systems to send data to SFMC securely using a CloudPage and store it in a Data Extension. The integration was tested using Postman by sending both URL-encoded form data and raw JSON data.
Tools & Technologies Used
- Salesforce Marketing Cloud
- CloudPages
- Server-Side JavaScript (SSJS)
- Data Extensions (DE)
- Postman


Implementation Steps
1. Created a Data Extension (PublicationListDE) with fields: EmailAddress, FirstName, and SubmittedDate.
2. Built a CloudPage using Server-Side JavaScript that accepts data from external POST requests.
3. Implemented secret key validation to ensure only authorized requests are processed.
4. Tested the integration using Postman with both `x-www-form-urlencoded` and `application/json` POST methods.


CloudPage SSJS Code
<script runat="server">
Platform.Load("core", "1.1");
var secretkey = "sasi@123";
var email = Request.GetFormField("email");
var fname = Request.GetFormField("fname");
var Asecretkey = Request.GetFormField("secretkey");
var now = new Date();
if (secretkey == Asecretkey) {
    try {
        var de = DataExtension.Init("PublicationListDE");
        de.Rows.Add({
            "EmailAddress": email,
            "FirstName": fname,
            "SubmittedDate": now
        });
        Write("Success: You are authorized and data has been added.");
    } catch (e) {
        Write("Error: " + Stringify(e));
    }
} else {
    Write("Unauthorized: Invalid secret key.");
}
</script>


Postman Testing
The CloudPage was tested in Postman using a POST request with the following settings:
- URL: https://your-cloudpage-url.com
- Method: POST
- Headers: Content-Type: application/x-www-form-urlencoded
- Body:
    email = test@example.com
    fname = Sasi
    secretkey = sasi@123
Conclusion
This project demonstrates how CloudPages can be securely used to accept and process external data in SFMC. Using Postman for testing allowed simulation of real-world integration scenarios for marketing automation use cases.
Original Code Document Screenshots




Salesforce Marketing Cloud Project
Customer Feedback Capture with AMPscript & SSJS
Author: SISENDAR REDDY KAIPU 

1. Project Overview
This Salesforce Marketing Cloud project demonstrates a working feedback capture system using AMPscript
and Server-Side JavaScript (SSJS). The journey begins with an email sent to customers after an order. The
email contains a personalized link to a CloudPage where the customer can leave feedback and a rating. The
system checks for duplicate submissions and stores the feedback securely in a Data Extension.

2. CloudPage Code (SSJS + Form)
cloud page code

<script runat="server">
Platform.Load("Core", "1.1");
try {
var email = Request.GetQueryStringParameter("email");
var fname = Request.GetQueryStringParameter("FirstName");
var orderid = Request.GetQueryStringParameter("OrderID");
if (Request.Method == "POST") {
var feedback = Request.GetFormField("feedback");
var rating = Request.GetFormField("rating");
var submittedDate = Platform.Function.Now();
var rows = Platform.Function.LookupRows("OrderFeedback Data Extension", "EmailAddress", email);
if (rows && rows.length > 0) {
Write("<h2>You already submitted feedback. Thanks!</h2>");
} else {
var de = DataExtension.Init("OrderFeedback Data Extension");
var result = de.Rows.Add({
"EmailAddress": email,
"FirstName": fname,
"OrderID": orderid,
"Feedback": feedback,
"Rating": rating,
"SubmittedDate": submittedDate
});
Write("<h2> Thank you for your feedback!</h2>");
}
}
} catch (e) {
Write("<h2>Error: " + Stringify(e) + "</h2>");
}
</script>
<!-- Feedback Form -->
<h2>Hello %%=RequestParameter("FirstName")=%%</h2>
<p>Please rate your experience for Order ID:
<strong>%%=RequestParameter("OrderID")=%%</strong></p>
<form method="POST">
<label>Your Feedback:</label><br>
<textarea name="feedback" rows="5" cols="50" required=""></textarea><br><br>
<label>Rating (15):</label><br>
<input type="number" name="rating" min="1" max="5" required=""><br><br>
<input type="submit" value="Submit Feedback">
</form>
<script runat="server">
}


3.  Email Content (AMPscript + HTML)
/* Pull subscriber details from Data Extension */
SET @email = AttributeValue("EmailAddress")
SET @fname = AttributeValue("FirstName")
SET @orderid = AttributeValue("OrderID")
/* Generate personalized CloudPage URL */
SET @url = CloudPagesURL(528994, "email", @email, "FirstName", @fname, "OrderID", @orderid)
]%%
<!-- Email HTML Body -->
<html>
<body style="font-family: Arial, sans-serif;">
<p>Hi %%=v(@fname)=%%,</p>
<p>Thanks for your recent order (<strong>%%=v(@orderid)=%%</strong>).</p>
<p>Wed love to hear your thoughts!</p>
<p>
<a href="%%=RedirectTo(@url)=%%" target="_blank">Click here to leave feedback</a>
</p>
<p>Thanks,<br>Your Company Team</p>
</body>
</html>
<table cellpadding="2" cellspacing="0" width="600" ID="Table5" Border=0><tr><td><font face="verdana"
size="1" color="#444444">This email was sent by:
<b>%%Member_Busname%%</b><br>%%Member_Addr%% %%Member_City%%, %%Member_State%%,
%%Member_PostalCode%%, %%Member_Country%%<br><br></font></td></tr></table><a


href="%%unsub_center_url%%" alias="Unsubscribe">Unsubscribe</a><a href="%%profile_center_url%%"
alias="Update Profile">Update Profile</a>
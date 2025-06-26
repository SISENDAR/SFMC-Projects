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
      Write("<h2>✅ Thank you for your feedback!</h2>");
    }
  }
} catch (e) {
  Write("<h2>Error: " + Stringify(e) + "</h2>");
}
</script>

<!-- Feedback Form -->

  
    <h2>Hello %%=RequestParameter("FirstName")=%%</h2>
    <p>Please rate your experience for Order ID: <strong>%%=RequestParameter("OrderID")=%%</strong></p>

    <form method="POST">
      <label>Your Feedback:</label><br>
      <textarea name="feedback" rows="5" cols="50" required=""></textarea><br><br>

      <label>Rating (1–5):</label><br>
      <input type="number" name="rating" min="1" max="5" required=""><br><br>

      <input type="submit" value="Submit Feedback">
    </form>
  


<script runat="server">
}
</script>

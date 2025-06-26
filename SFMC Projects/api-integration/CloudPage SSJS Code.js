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

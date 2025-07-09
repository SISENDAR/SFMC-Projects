==============================
PROJECT: Triggered Email CloudPage – Salesforce Marketing Cloud (SFMC)
==============================

📌 Project Summary:
Built and deployed a real-time triggered email automation using AMPscript and CloudPages. The user submits a form with Name and Email, which triggers a personalized confirmation email and stores the data in a sendable Data Extension.

📄 Page 1 – Form (CloudPage HTML):
- Collects: First Name, Email
- Method: POST
- Action: Page 2 URL (CloudPage)

📄 Page 2 – Processing (AMPscript CloudPage):
- Uses AMPscript to:
  - Receive form data via RequestParameter()
  - Create TriggeredSend object
  - Set Subscriber info (EmailAddress, SubscriberKey)
  - Add "FirstName" as Attribute
  - Trigger email using Triggered Send Definition
  - Show Thank-You page with personalized message

🗃️ Data Extension:
- Sendable: Yes
- Fields: FirstName, SubscriberKey, EmailAddress
- Send Relationship: SubscriberKey


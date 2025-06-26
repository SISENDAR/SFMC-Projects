Salesforce Marketing Cloud Project Portfolio

Birthday Wishes Journey

Prepared by: Sisendar Reddy Kaipu
Date: June 19, 2025



Salesforce Marketing Cloud Project Portfolio

Project Overview
This Salesforce Marketing Cloud project implements an automated Birthday Wishes Journey. It
leverages SQL automation, Data Extensions, and Journey Builder logic to send personalized
messages to contacts on their birthdays, enhancing engagement and customer satisfaction.

Data Extensions
- BirthdayContacts: Contains all contacts with their DOB and personal details.
- TodaysBirthdayContacts: Stores only the contacts whose birthday matches today.
These DEs are marked Sendable with 'EmailAddress' as the subscriber key.

SQL Query Activities
1. BirthdayTodayQuery:
SELECT EmailAddress, FirstName, DOB,
RIGHT('0' + CAST(MONTH(DOB) AS VARCHAR), 2) + RIGHT('0' + CAST(DAY(DOB) AS
VARCHAR), 2) AS Birth_MMDD
FROM BirthdayContacts

2. TodayBirthdayQuery2:
SELECT EmailAddress, FirstName, DOB
FROM BirthdayContacts
WHERE Birth_MMDD = FORMAT(GETDATE(), 'MMdd')

Automation Studio
Automation Name: BirthdayAutomationWishes
- Step 1: Run BirthdayTodayQuery to update Birth_MMDD.
- Step 2: Run TodayBirthdayQuery2 to filter today's birthdays.
- Step 3: Inject results into Journey Builder.



The automation is scheduled daily and must be activated.

Journey Builder
Journey Name: BirthdayWishesJourney2
- Entry Source: TodaysBirthdayContacts
- Step 1: Send Birthday Email
- Step 2: Wait 10 minutes
- Step 3: Engagement Split - If Opened, Send Offer Email. If Not, Send Reminder Email.
- Step 4: Wait 1 day to end journey.
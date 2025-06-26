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
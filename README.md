# CCS Research Repository

## Get amazon s3 bucket access key

1. Create an amazon aws account
2. Create an aws user and get credentials. Follow the steps [here.](https://app.tango.us/app/workflow/Creating-an-s3-user-and-getting-access-key-and-secret-key-f18104b8813a4319b46aac12693b707f)
3. Create an s3 bucket. Follow the steps [here.](https://app.tango.us/app/workflow/Creating-an-S3-bucket-0ece5bee1e6f4ebe87cc40ec6a67a81a)
4. Make your s3 bucket publicly accessible. Follow the steps [here.](https://app.tango.us/app/workflow/Make-your-bucket-publicly-accessible-4c4e4ea4bf7146adb5532f9024515faf)

## Before running the program

1. Fill up all `.env` credentials. `.env` format can be found at the `.env.sample` file.

## How to Run

1. Run `npm install` to download required dependencies.
2. To start the server run `npm run start`.
3. Run the server at `localhost:3000`

## Account Details

| Role      | Email                       | Password |
| --------- | --------------------------- | -------- |
| Moderator | mod@mod.com                 | 123456   |
| User      | tyrone.stamaria35@gmail.com | 123456   |

### Features

- [x] Log-in
- [x] Log-out
- [x] Register
- [x] View Account
- [x] Edit Account
- [x] Delete Account
- [x] View Articles
- [x] Search Articles
- [x] View Article
- [x] Add Article to Favorites
- [x] View Article in Favorites
- [x] Remove Article in Favorites
- [x] Add article to repository
- [x] Approve added article
- [x] Delete article
- [x] Reject added articles
- [x] Add articles to featured articles list

# [User Creepin'](https://limitless-waters-9904.herokuapp.com)  
Creep on other users, favorite the ones you wanna stalk!

*Created by: [Virsaviya Efraim](https://twitter.com/VirsaviyaEfraim), Ray Kim, [Paul Richter](https://twitter.com/paulgoblin), Ed Song*  
*Upadted on: January 15, 2016*

### The Assignment

Focus on your collaboration skills, ability to plan out and create an entire MEAN stack application, and applying all the knowledge you have already accumulated. NO jQuery - harness the power of Angular!

Steps to complete this:
1) Create mockups/wireframes - I don't care what you use to do this. Create mockups for each view, and really think about how a user will look at your app. It should be simple and easy to use.

2) Pseudo code/data structuring/project planning - You need to figure out what your schemas will look like, how your app will be structured, and who will be in charge of what parts.

3) Code! - Get your hands dirty and start building. DON'T WORK ON THE MASTER BRANCH. All code should be committed to a different branch and merged into master. You will most likely run into merge conflicts - Good! Don't be scared (most people are terrified of these). You will continue to run into these forever, so learn how to deal with them.

One member of your group should create a GitHub repo and get the app started. All tasks need to be added as issues. The more you break it down into smaller tasks, the easier it will be to continue moving forward.

As you encounter bugs or recognize features missing, report them on GitHub. All issues should be properly labeled and assigned when somebody is working on them.

You should have a scrum every day - including days that you are mentoring. 

One person from your group should email me the minutes from your meeting (who did what yesterday, who is doing what today, what you are stuck on, the overall state of the project, and anything else) before 1pm.

This should be deployed and ready to present on Monday at 9am. Also send me an email with a link to the deployed app and the GitHub repo (so I can review and grade)

### MVP:

- user auth (email/password), and 2 types of users: users and admins.
- Users can edit their profile, which consists of 
    * name
    * email
    * address
    * phone
    * an avatar image which is saved via image upload and saved to Mongo.
- Users can view a searchable list (specifically, a text box using an angular filter) of all users and favorite them
- Users can view and edit their favorites
- Admins can view searchable list of all users, and edit/delete any user (but they can’t delete themself!)
- No hash in URLs
- Form validation (email addresses, empty input boxes, etc) on all inputs. This means error messages (i.e. "Please enter a valid email" or "This is required")
- Responsive design
- Protected routes: only admins can delete users or edit another user

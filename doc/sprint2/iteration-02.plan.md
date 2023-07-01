# GOGO

## Iteration 02

 * Start date: 28/06/2023
 * End date: 06/07/2023

## Process

Quick Introduction to the process

#### Changes from previous iteration

List the most significant changes you made to your process (if any).

 * At most 3 items
 * Start with the most significant change
 * For each change, explain why you are making it and what you are hoping to achieve from it
 * Ideally, for each change, you will define a clear success metric (i.e. something you can measure at the end of the iteration to determine whether the change you made was successful)

 > *Note:* If you are not making any changes to your process, it means that you are happy with all of the decisions you made in the previous iterations.
 > In this case, list what you consider to be the most significant process decisions your team made. For each decision, explain why you consider it successful, and what success metric you are using (or could use) to assert that the decision is successful.

 - We agree to post best practices on the "Industry-standard" channel so that the team has a common coding/practices standard to refer back to. In previous sprints, there were several last minute changes because team members discovered potential improvements in coding standards, API naming conventions etc. With this change, we hope that we can improve our code quality while ensuring consistency with the rest of the team. We will measure success with the amount of time we spend for the final review.

 - We agree that everyone will do the work only relevant to the Jira linked to the git branch in that branch. All other changes should be made in separate branches. This will reduce the risk of unnecessary merge conflicts as well as ensure a clean commit history. We will measure success with the amount of merge conflicts we encounter.


#### Roles & responsibilities

Describe the different roles on the team and the responsibilities associated with each role.

We expect everyone on the team to be full-stack developers.


#### Events

Describe meetings (and other events) you are planning to have:

 * When and where? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync' meeting online, etc.

We will meet every two days starting from Thursday June 29, 2023 on Zoom. The purpose of the meeting is to discuss progress, what to do next, identify blockers, and keep the team informed.

We are not planning on having any other meeting but if a team member is blocked on an issue and needs help, at least some members of the team will schedule a coding session to help the blocked team member.

#### Artifacts

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-do lists, Task boards, schedule(s), etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?

We will use Jira for project management.
We will discuss priorities and assign tasks to team members in the planning meeting on Jira. Then team members can move the user stories/tasks to the appropriate stage so that everyone can track progress.

#### Git / GitHub workflow

Describe your Git / GitHub workflow.     
Essentially, we want to understand how your team members share a codebase and avoid conflicts.

 * Be concise, yet precise.      
For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? Etc.

 * If applicable, specify any naming conventions or standards you decide to adopt.

 * Don't forget to **explain why** you chose this workflow.

We will use git flow. We have a main branch which contains the project completed in the last sprint. The main branch branches off to the develop branch, which contains the approved changes to the project for the current sprint. Finally, we have feature branches which are off the format "DEV-CGP-X", where X is the Jira number.

We will prepend each commit message with "DEV-CGP-X:", where X is the Jira number.

We will use pull-requests(PR) for changes from feature branch to develop branch. The PR will be reviewed by an assigned reviewer. Once the reviewer and author are satisfied with the changes the author will merge the changes to the develop branch.

Once all the feature branches have been approved, merged to the develop branch and demo-ed, we will create another pull request to merge the develop branch to the main branch. This will be reviewed by the whole team in a meeting and merged by random selection.

This workflow lets us seperate working code from the previous iteration from the changes linked to the current sprint. In the event that our changes break project functionality, we can fall back to the code from the previous iteration. Having seperate branches for each feature ensures that each contributor can work on their feature independently. The develop branch is our staging area for changes to be deployed to main.

## Product

_This entire section is mandatory._


#### Goals and tasks

 * Describe your goals for this iteration and the tasks that you will have to complete in order to achieve these goals.
 * Order the items from most to least important.
 * Feel free (but not obligated) to specify some/all tasks as user stories.

 We will aim to implement the request functionality so that users can request event creators to attend events with them. We will also aim to give event creators the ability to manage requests and track attendence. We will also add more functionality to customise user profiles. We will do our best to complete the following user stories ordered from most to less important:

 - As a logged-in user, I want to send invites to other people to accompany me to an event listed on the app, so that I have a buddy to attend the event with.

 - As a logged-in user interested in attending an event, I want to see all the events I requested to attend so that I can track my requests better.

 - As a logged-in user, I want to see the events I created so that I can better manage my events.

 - As a logged-in user, I want to be able to accept or reject an invitation so that I can notify the requesting user of my choice.

 - As a logged-in user, I want to edit my profile picture so that other users get to see my latest pictures. 

 - As a logged-in user, I want to chat with the user I accepted to go to the event with so that I can communicate with them.

#### Artifacts

List/describe the artifacts you will produce in order to present your project idea.

 * Artifacts can be text, code, images, videos, interactive mock-ups and/or any other useful artifact you can think of.
 * Make sure to explain the purpose of each artifact (i.e. Why is it on your to-do list? Why is it useful for your team?)
 * Be concise, yet precise.         
   For example: "Build the website" is not precise at all, but "Build a static home page and upload it somewhere, so that it is publicly accessible" is much clearer.

We will produce a demo video of the functionality we listed above and post it on our github repo in sprint2 folder.

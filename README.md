SWC Journeys API

A community website which allows users to form communities to learn and share new skills. It allows users to save any blog read online and share among communities and recommends related content to users. A timeline feature in which users can keep track of their journey of the project or skill they started and share them with others. 

# How you can contribute:
You can join our discussions and keep up with us on [Discord channel #swc-journeys](https://discord.gg/ME6mWhjF)!

1.Using the issue tracker.

2.Claim issue.

3.Changing the code-base.

4.Submit pull request.

5.Suggest design improvements for our apps.

6.Review our projects’ pull requests.

7.Help others contribute by answering their questions and participate on GitHub.

# Guidance on how to contribute

## USING THE ISSUE TRACKER: 

Use the issue tracker to suggest feature requests, report bugs, and ask questions. This is also a great way to connect with the developers of the project as well as others who are interested in this solution.
Use the issue tracker to find ways to contribute. Find a bug or a feature, mention in the issue that you will take on that effort, then follow the Changing the code-base guidance below.

Click [here](https://www.stevejgordon.co.uk/working-on-your-first-github-issue) to learn more

## CLAIM ISSUE:

Claim the issue by commenting. If someone else has claimed it, ask if they've opened a pull request already and if they're stuck -- maybe you can help them solve a problem or move it along!.
Unless the issue is marked as reserved for someone, you can just say "I'd like to try this!" and then you've claimed it - no need to wait for someone to assign it to you. Just be sure you link [your pull request](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) (PR) to this issue so we can see where your solution is.

## CHANGING CODE BASE:

You should [fork this repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo), make changes in your own fork. All new code should have associated unit tests that validate implemented features and the presence or lack of defects. 

## SUBMIT PULL REQUEST:

Submit a pull request after making changes. Check if all tasks are completed under the issue. Your changes will be reviewed and decided if it needs to be merged in the main branch.

PROJECT BRIEF: 

SAVE URL:
Users can save any blog by providing the URL. A thumbnail feature is implemented which fetches the title name, image, short description, date and time and related tags using Beautiful Soup.

![image](https://user-images.githubusercontent.com/63365275/149313972-190d3704-cbac-4baa-93c2-24538df01f30.png)

![image](https://user-images.githubusercontent.com/63365275/149314048-312936d5-9444-46aa-bc4f-462d9d01afe6.png)


TAGS:
For every blog that the user saves, we have provided a list of relatable tags. The tags are found from the blogs using Open Calais API which uses Natural Language processing to search relatable tags from the blog and the tag feature is implemented using Django’s Taggable Manager. 



DISCOVER SECTION:
In the discover section, the users can discover new content or blogs based on the ones that they have saved.  Based on the tags that the users have saved, it uses Google’s News API to suggest new content to the user.

![image](https://user-images.githubusercontent.com/63365275/149313769-d73f5912-0a7f-486a-8dd0-4e47eef3ec14.png)

![image](https://user-images.githubusercontent.com/63365275/149313883-1e3f45c5-a5d9-410d-932b-6da5738a91b9.png)


FAVOURITES SECTION:
The users can save the blogs that they find more important than the rest or the ones that they frequently use in the favourites section.

![image](https://user-images.githubusercontent.com/63365275/149313679-aa2764d8-d91b-4e84-a385-92d21299cc35.png)


TIMELINE FEATURE:
A timeline feature in which users can keep track of their journey of the project or skill they started and share them with others. Whenever a developer starts a new project, he/she searches for resources to study from and comes across many blogs. They can save the blogs and can also add them to the timeline to keep track of how and in what order the particular resources were accessed by the user.
These timelines can also be shared among various communities such that other users can also get to know about these resources and avail advantage from them.



![image](https://user-images.githubusercontent.com/63365275/149313224-aab3a82a-f3e5-40eb-b301-d846e2b0c59c.png)


![image](https://user-images.githubusercontent.com/63365275/149313558-844ca3e2-d5ea-47b3-bc35-3e50188f1a49.png)



COMMUNITIES:
The users can form communities of their own or get added to existing communities so that similar minds come together and interact with each other and help each other by learning and sharing. Post and comment features have been implemented. There are features of chatting and upvote and asking doubts within communities. Timelines can also be shared within communities. Multiple communities can be joined for ex. There can be a community of React, ML, AI, Development etc.



CHROME EXTENSION AND CONTEXT MENU:
The website also has a chrome extension built using JavaScript using which the blogs are saved. Also, the chrome’s context menu is updated so that blog’s can also be saved using the right click option.

![image](https://user-images.githubusercontent.com/58564764/126083994-c27ec350-20ea-4909-a2ba-7e52df874599.png)

![image](https://user-images.githubusercontent.com/63365275/149314762-b2e9962a-5e9d-41f5-aea8-2376ed0cac9e.png)




REST API:
We also have a Rest API for our website created using Django Rest Framework. We used Swagger for describing RESTful APIs expressed using JSON, documentation, code generation, and test-case generation. This API was also used in making the chrome extension.

![image](https://user-images.githubusercontent.com/63365275/149312381-b533ca5b-0957-4b84-a716-b40416a66835.png)

![image](https://user-images.githubusercontent.com/63365275/149312752-f2480d26-2867-4496-bc3d-3b8c5d63da7e.png)

![image](https://user-images.githubusercontent.com/58564764/126124302-6d13ec9b-d830-4116-9aff-28f7e3feda49.png)

![image](https://user-images.githubusercontent.com/58564764/126124479-7768c8d6-1a2d-4636-bb4b-0773cb7b4361.png)


SEARCH: Bookmarks can be searched from their title name.

PAGINATION: Pagination is implemented using DRF.


## Installation steps

1. Ensure you have python3 installed

2. Clone the repository
3. create a virtual environment using `virtualenv venv`
4. Activate the virtual environment by running `source venv/bin/activate`

- On Windows use `source venv\Scripts\activate`

5. Install the dependencies using `pip install -r requirements.txt`

6. Migrate existing db tables by running `python manage.py migrate`

7. Run the django development server using `python manage.py runserver`


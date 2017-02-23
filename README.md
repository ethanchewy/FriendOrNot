<div>

  <h2>Inspiration</h2>

<p>Given the increasing number of social media platforms, it comes as no surprise that friendships have become ever more complicated. Never before has befriending someone from a different state, country, or even continent, become so easy. With this low barrier of entry for friendship, identifying true friends has become drastically more challenging. The average Facebook user, for instance, has 338 friends, an overwhelming number of relationships to maintain. Countless posts and messages between friends on social media platforms renders monitoring the closeness of friendships a near impossible task. As such, there is a need for a platform that quantifies the closeness of friendships and provides actionable insight. In an age of information, knowing your closest friends is indispensable. With this knowledge, you can understand who your best friends are and why you two share a close relationship.</p>

<h2>What it does</h2>

<p>The user first grants FriendTrend access to their Facebook profile so that FriendTrend can analyze their friends list. Through a logistic regression model, FriendTrend calculates a probability that represents the closeness of the friendship for every friend. After completing these analyses, FriendTrend displays a list of friends by closeness, displays the probability that they want to keep the friend, and shows the complete methodology behind the calculations for the probability.</p>

<h2>How we built it</h2>

<p>At the heart of our application is the machine learning model. We chose to use machine learning because we knew there was a concrete set of factors we wanted to consider, but did not know the weights assigned to each of these features in determining the closeness of a friendship. These factors—likes and comments on posts, message quantity, and message sentiment—were designated as features in our model, on which we conducted gradient descent to minimize our cost function. We implemented a <a href="https://youtu.be/OdUQ76uwCpM" rel="nofollow">supervised learning</a> approach, calculating the feature metrics on our Facebook friendlist and manually classifying closeness for our friends. This allowed the model to adjust and learn how the features interacted with each other to indicate the closeness of the friendship. The scikit-learn Python library was used to conduct the regression analysis and IBM’s Watson API was used to conduct the sentiment analysis for the messages.</p>

<h2>What's next for FriendTrend</h2>

<p>We intend on expanding FriendTrend to include Facebook pages. By providing data on closest customers, businesses that have Facebook pages can identify core customer segments and loyal customers. Marketing has rapidly shifted towards the Internet, making social media an increasingly important marketing tool. FriendTrend wishes to continue contributing to the plethora of extant social media analytics tools out there.</p>

</div>

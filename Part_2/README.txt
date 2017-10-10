Author: Perrin Jones (paj2117)

----------PURPOSE---------
To display US health insurance coverage information to a user based on a location and filters

----------DESIGN PROCESS----------
I started with a bootstrap skeleton, because I wanted my program to be scalable 
onto multiple devices. Centering the information worked well for the initial design, 
since it kept the users visability of the system and its status in sight. I did my best
to match other Address form boxes to improve the ease on the user. Keeping this 
consistency and standard also allows for auto-fill to work on my form.

This is when I tested the geocoding API and got it working. I orginally had a line 2 for address, 
but decided to remove it at this point. This was to prevent the user from getting errors 
with more complex street configuration and also provided a more minimalist design. 
As a user, I have an address that is two line, but am often asked to put it one one line. 
Matching between system and the real world, I am able to put down my address into
that one line and still have it be valid. This is useful, since the user is less likely
to get an error with the API if forced to place street in one line. If for some reason
the address does come back invalid, it will notify the user below the form and allow them
to enter in another value. This gives the user more control and helps them recognize,
diagnose, and recover from errors. They have the option to edit the form if it is a small 
mistake or clear the form to start over. The user can always clear the form to start over
if they mess up at any time.

While connecting to the API (and facing errors), I created a catch to let the user know
if the program can not connect to the API. This is important for communicating when
the API is down and allowing users understand why the program can not run. Also, if the
API does not have enough data for one of the searches, ot will notify below the form
that there is not enough data for the search.

Lastly, I added in the multi-selection filters with a little note on how to work them. This little
separation keeps multi-selection apart from the one entered address. I selected
the most up to date year, since users usually want the most up to date information when
conducting searches. For the rest of the parameters, I selected the option that covered the 
most range to get the best overview of the overall US demographics.

Everything fits on one page on a laptop to allow visualization of the entire search. I kept spacing
high for a minimalist design that doesn't overwhelme the user with data as well.

I hope you enjoy searching on my program!
*See disclaimer*

---------HOW TO RUN----------
Download zip and run index.html in a web browser

---------DISCLAIMER---------
I did my best to get the multiple filter to work, but in the end I couldn't get past a couple of errors
The javascript code is built with a few functions and the html allows for multiselection of filter 
parameters and informs the user on how to do so. The front end is finished, I just couldn't get
the back end to work. For now, to demonstrate the best functionality, I use the top most select 
filter variable and run the program. It display the one result below the form. The form is not 
cleared, with data cached, so that the user can view what they searched along with the results. 
If my multi-filter implementation worked, I would have split the results into a table and display the 
table sorted below. This would allow for effiencent use and understanding of the data. 
# funNytimes
NyTimes Tunnel Chrome Extension

This is a chrome extension that allows you to read unlimited Nytimes articles without having to continually clear your cache.
It takes advantage of a nytimes.com loophole where the content of articles are completely downloaded, even if a paywall is erected.

## How It Works
Upon activation (only on nytimes website), the paywall (document node with a certain id) is searched for and removed.  Then the article is found and placed at the top of the body.
Just in case the paywall is dynamically added after initial document load, the paywall node will be searched for a few times after page load until it is found.

## Other Fun Options.
Any references to [Mr.][President][Donald][Trump] are replaced with 'Florida Man'.  Any section titles e.g. Politics, are appended with the suffix, 'Yo'.  And ads are removed from articles pages.

## Options
The main paywall tunnel and other fun options can all be enabled/disabled from extensions options sub-menu.  (Click on the extension icon to access the options sub-menu).
All content modifications can be changed.  For example, rather than replace 'Donald Trump' with 'Florida Man'.  You can replace with "World's Most Honest Man".


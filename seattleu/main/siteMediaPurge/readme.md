## To Do
* Collect media Ids from cms.com/welcome
  * https://cms.seattleu.edu/terminalfour/preview/32/en/204337/6146617/text/media/usage 
  * Requires web scraping since all of the entries are embeded inside of a script block.
  * Web API will always return 500 error code :/
* Check media usage and type (Needs to be image and PDFs. No js)
  * usage collected from above endpoint
  * Individual usage data (https://cms.seattleu.edu/terminalfour/rs/media/${id}/smxx/usage)
* Mark unused media as inactive
  * Only if ~~`mediaCategoryPublishRuleDTOs[n].publishRuleID =! 20`~~ there aren't any rules for the specific
  type in the category.
* Purge media
  * Same as content purge (https://cms.seattleu.edu/terminalfour/rs/content/purge)
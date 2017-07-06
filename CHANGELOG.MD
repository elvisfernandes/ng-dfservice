1.0.1 (July 06, 2017)
- BugFix: post and delete methods are now more flexible to support requests for login and logout.

1.0.0 (June 28, 2017)
- Angular 4 compatibility
- Library name changed from ng2-dfservice to ng-dfservice (you know, Angular team don't want numbers in front of their product's name anymore, let stick to this rule). 
- NPM package named ng2-dfservice is now deprecated.

0.0.5 
- The last bugfix don't really fix the bug, which is not really a bug. Just install typings and you're good to go.

0.0.4
- BugFix: require typings as a development requirement (fixes bug [#1](https://github.com/elvisfernandes/ng2-dfservice/issues/1))

0.0.3
- Uses DataStore to manage communication with the server
- New feature: extend DFDataStore to simplify access to data that came from server and to send data as well.
- New feature: set query options in DFResource. All retrieved records will be added to the DFDataStore.
- New feature: create objects for models from server and parse them to/from JSON. 

0.0.2
- Improvement on session management
- Bug fix: The session_token is stored locally in a per-DF-app basis (you can be logged in to different apps in the same browser).  
- BREAKING CHANGE: Now you need to inject an object containing DFResources used in your code to your module.

0.0.1
- Initial version
- Basic CRUD operations on DreamFactory tables.
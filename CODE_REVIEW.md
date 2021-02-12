# Code Smells
- Methods addBookToReadingList/searchExample/searchBooks/removeFromReadingList in book-search.component.ts and  
  reading-list.component.ts  do not have return type which reduces the performance since the parser needs to parse it multiple times. **Fixed**
- Component name is inappropriate in describe function in book-search.component.spec.ts. Updated the name as 
  per the best practice. **Fixed**
- Removed formatDate method and used built-In date pipe to display date in required format.Functions execute
  every time there's a change detected because that's the only way to know if it has changed.Pure pipe, on the other hand, only executes when the input has actually changed. **Fixed**
- Using of the subscribe() introduces complementary need to unsubscribe at the end of the component life-cycle
  to avoid memory leaks.So changed books as observable in book-search.component.ts and used Async pipe in book-search.component.html.To return the latest value emitted and to unsubscribe automatically. **Fixed**
# Improvements
- Application can be made responsive for small screens. This will make the site mobile-friendly and improve the 
  UX on small screens.
- To improve user experience loader can be added while making api calls. It makes user experience much more
  smoother, as the user is aware that the view is loading and there is some processing happening in the background.
- In case of API failure we can show an error modal with a message like - "Sorry our servers are experiencing
  some problem at the moment. Please try after some time.", in order to improve the UX and make the webpage more appealing to the user.
- Instead of join() method in book-search.component.html and reading-list.component.html we can use custom pure
  pipe. A pure pipe only run when the input changes.Functions have to be run every time there's a change detection cycle because that's the only way to know if it has changed.  
# Accessibility Issues
## Issues found using lighthouse:
- Buttons do not have an accessible name - search button in book-search.component.html. Added label for the
  button. **Fixed**
- Background and foreground color do not have a sufficient contrast ratio. Changed the background color.   
  **Fixed**
## Manual check for accessibility issues.
- 'Try searching for a topic, for example "JavaScript"' is not accessible by keyboard. Enabled it by changing   
  anchor tag to button and adding aria-label to make it readable. **Fixed**
- Book details are not accessible by keyboard. Added tabindex to enable it. **Fixed**
- Total count is not readable by the screen-reader. Enabled it by adding aria-label and aria-live="polite".
  Total count value will change dynamically so the aria-live attribute with polite value tells the screen reader to wait until the user is idle in order to announce updates. **Fixed**
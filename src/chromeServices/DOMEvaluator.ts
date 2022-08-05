import { DOMMessage, DOMMessageResponse } from '../types';
 
// Function called when a new message is received
const messagesFromReactAppListener = (
   msg: DOMMessage,
   sender: chrome.runtime.MessageSender,
   sendResponse: (response: DOMMessageResponse) => void) => {
  
   console.log('[content.js]. Message received', msg);
 
   const headlines = Array.from(document.getElementsByTagName<"h1">("h1"))
                       .map(h1 => h1.innerText);
   const secheadlines = Array.from(document.getElementsByTagName<"h2">("h2"))
                       .map(h2 => h2.innerText);
    const terheadlines = Array.from(document.getElementsByTagName<"h3">("h3"))
                       .map(h3 => h3.innerText);

                        
    // Prepare the response object with information about the site
   const response: DOMMessageResponse = {
       title: document.title,
       headlines,
       secheadlines,
       terheadlines
   };

 
   sendResponse(response);
}
 
/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);
  const [secheadlines, setSecheadlines] = React.useState<string[]>([]);
  const [terheadlines, setTerheadlines] = React.useState<string[]>([]);

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  React.useEffect(() => {
    getCurrentTab().then(tab => {
      console.log(tab);
    }).catch(err => {
      console.log(err);
    })

    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      console.log(tabs[0].id);
      chrome.tabs.sendMessage(
        tabs[0].id || 0,

        { type: 'GET_DOM' } as DOMMessage,


        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
          setSecheadlines(response.secheadlines);
          setTerheadlines(response.terheadlines);
        },
      );
      // console.log({ type: 'GET_DOM' } as DOMMessage);

    });
  }, []);

  return (
    <div className="App">
      <h1>Here are your titles and headings</h1>

      <ul className="SEOForm">
        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Title: </span>
            <span className={`SEOValidationFieldStatus ${title.length < 30 || title.length > 65 ? 'Error' : 'Ok'}`}>
              {title.length + " "}  characters
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            {title}
          </div>
        </li>

        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Main Headings</span>
            <span className={`SEOValidationFieldStatus ${headlines.length !== 1 ? 'Error' : 'Ok'}`}>
              {headlines.length}
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            <ul>
              {headlines.map((headline, index) => (<li key={index}>{headline}</li>))}
            </ul>
          </div>
        </li>

        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Secondary Headings</span>
            <span className={`SEOValidationFieldStatus ${secheadlines.length === 1 ? 'Error' : 'Ok'}`}>
              {secheadlines.length}
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            <ul>
              {secheadlines.map((secheadline, index) => (<li key={index}>{secheadline}</li>))}

            </ul>
          </div>
        </li>
        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Other Headings</span>
            <span className={`SEOValidationFieldStatus ${terheadlines.length === 1 ? 'Error' : 'Ok'}`}>
              {terheadlines.length}
            </span>
          </div>
          <div className="SEOVAlidationFieldValue">
            <ul>
              {terheadlines.map((terheadline, index) => (<li key={index}>{terheadline}</li>))}

            </ul>
          </div>
        </li>




      </ul>
    </div>
  );
}

export default App;
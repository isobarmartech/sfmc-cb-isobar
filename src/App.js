import React from "react";
import { Card } from "@salesforce/design-system-react";

function App() {
  return (
    <Card hasNoHeader={true} bodyClassName="slds-card__body_inner">
      <ul>
        <li>
          <a href="/header">Header</a>
        </li>
        <li>
          <a href="/imageArticle">Image Article</a>
        </li>
        <li>
          <a href="/twoColumns">Two Columns</a>
        </li>
        <li>
          <a href="/doubleStory">Double Story</a>
        </li>
        <li>
          <a href="/informationBullets">Information Bullets</a>
        </li>
        <li>
          <a href="/program">Program</a>
        </li>
        <li>
          <a href="/ctaGroup">CTA Group</a>
        </li>
        <li>
          <a href="/footer">Footer</a>
        </li>
      </ul>
    </Card>
  );
}

export default App;

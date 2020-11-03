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
      </ul>
    </Card>
  );
}

export default App;

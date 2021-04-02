import Main from "../lib/layout";
import Header from "../components/Header";

export default props => (
  <Main>
    <Header />
    <article>
      <h1>Idea behind test case</h1>
      <p>
        This web application is intended to convert currencies, by getting
        current currency quotes. Unfortunatly there are some limitations to the
        free tier of the GraphQL backend server (https://swop.cx/). Only the
        base currency of EUR is permitted to convert against other currencies.
      </p>
      <p>
        In this simple example, we integrate Apollo seamlessly with{" "}
        <a href="https://github.com/zeit/next.js">Next</a> by wrapping our pages
        inside a{" "}
        <a href="https://facebook.github.io/react/docs/higher-order-components.html">
          higher-order component (HOC)
        </a>
        . Using the HOC pattern we're able to pass down a central store of query
        result data created by Apollo into our React component hierarchy defined
        inside each page of our Next application.
      </p>
    </article>
  </Main>
);

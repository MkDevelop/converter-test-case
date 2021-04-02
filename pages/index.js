import Main from "../lib/layout";
import Header from "../components/Header";
import CurrencyConverter from "../components/CurrencyConverter";
import withApollo from "../lib/apollo";

const Home = props => {
  return (
    <Main>
      <Header />
      <CurrencyConverter />
    </Main>
  );
};

export default withApollo({ ssr: true })(Home);

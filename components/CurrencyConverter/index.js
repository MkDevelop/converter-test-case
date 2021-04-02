import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Form, H1, Input, Select, Option, Container } from "./styles";

const GET_LATEST_QUOTE = gql`
  query LatestQuote($baseCurrency: String!, $quoteCurrency: String!) {
    latest(baseCurrency: $baseCurrency, quoteCurrencies: [$quoteCurrency]) {
      date
      baseCurrency
      quoteCurrency
      quote
    }
  }
`;

const GET_CURRENCIES = gql`
  query allCurrencies {
    currencies {
      code
      name
    }
  }
`;

const GET_HISTORY_QUOTE = gql`
  query historyQuote($baseCurrency: String!, $quoteCurrency: String!) {
    historical(baseCurrency: $baseCurrency, quoteCurrencies: [$quoteCurrency]) {
      date
      baseCurrency
      quoteCurrency
      quote
    }
  }
`;

export default function CurrencyConverter() {
  const [valueBase, setValueBaseCurrency] = useState(1);
  const [valueQuote, setValueQuoteCurrency] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [quoteCurrency, setQuoteCurrency] = useState("USD");
  const [quote, setQuote] = useState(0);
  const baseOnChange = event => {
    setValueBaseCurrency(Number(event.target.value));
  };

  const quoteOnChange = event => {
    setValueQuoteCurrency(Number(event.target.value));
  };

  const quoteCurrencyChange = event => {
    setQuoteCurrency(event.target.value);
  };

  const baseCurrencyChange = event => {
    setBaseCurrency(event.target.value);
  };

  const priceQuote = (valueBase * quote).toFixed(2);

  const { error, loading, data: currencyData } = useQuery(GET_CURRENCIES, {
    notifyOnNetworkStatusChange: true
  });

  const {
    error: quoteError,
    loading: quoteLoading,
    data: quoteData,
    refetch
  } = useQuery(GET_LATEST_QUOTE, {
    variables: { baseCurrency, quoteCurrency },
    notifyOnNetworkStatusChange: true
  });

  if (loading) return <p>Loading Currencies</p>;
  if (error) return <p>Error</p>;

  function handleSubmit(e) {
    e.preventDefault();
    refetch();
  }

  useEffect(() => {
    if (quoteData) {
      const { latest } = quoteData;
      const { quote } = latest[0];
      setQuote(quote);
    }
  }, [quoteData]);

  const currencies = "";
  console.log(currencies);
  return (
    <>
      <H1>Convert Currency</H1>
      <Container>
        {!error &&
          !loading &&
          currencyData &&
          currencyData.currencies.length > 0 && (
            <div>
              <Select value={baseCurrency} onChange={baseCurrencyChange}>
                <Option key="EUR">EUR</Option>
              </Select>
            </div>
          )}
        <div>
          <Input
            name="baseCurrency"
            value={valueBase}
            type="number"
            min="1"
            step="1"
            onChange={baseOnChange}
          />
        </div>
      </Container>

      <Container>
        {!error &&
          !loading &&
          currencyData &&
          currencyData.currencies.length > 0 && (
            <div>
              <Select value={quoteCurrency} onChange={quoteCurrencyChange}>
                {currencyData.currencies.map(currency => {
                  const { code, name } = currency;
                  const selected = code === baseCurrency;
                  return (
                    <>
                      <Option key={code}>{code}</Option>
                    </>
                  );
                })}
              </Select>
            </div>
          )}
        <div>
          <Input
            name="quoteCurrency"
            value={priceQuote}
            onChange={quoteOnChange}
          />
        </div>
      </Container>
    </>
  );
}

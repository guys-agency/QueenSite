// import { observer } from "mobx-react";
import React from "react";
import Helmet from "react-helmet";

const HelmetHead = (props) => {
  const meta = [
    { name: "description", content: props.description },
    {
      property: "og:title",
      content: props.title,
    },
    {
      property: "og:description",
      content: props.description,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:site_name",
      content: "Queen of Bohemia",
    },
  ];

  if (props.keywords) {
    meta.push({ name: "keywords", content: props.keywords });
  }

  return <Helmet title={props.title} meta={meta} />;
};

export default HelmetHead;

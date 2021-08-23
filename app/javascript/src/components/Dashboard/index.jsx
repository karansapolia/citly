import React, { useState, useEffect } from "react";
import { isNil, isEmpty, either } from "ramda";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Form from "components/Form";
import LinksList from "components/LinksList";
import linksApi from "apis/links";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const compare = (a, b) => {
    if (a.pinned < b.pinned) {
      return 1;
    }
    if (a.pinned > b.pinned) {
      return -1;
    }
    return new Date(b.created_at) - new Date(a.created_at);
  };

  const addLink = newLink => {
    const linksCopy = links;
    if (linksCopy.find(link => link.id === newLink.id)) {
      return;
    } else {
      linksCopy.push(newLink);
    }

    setLinks(linksCopy.sort(compare));
  };

  const updateLinks = updateLink => {
    setLinks(
      links
        .map(link => {
          return link.id === updateLink.id ? updateLink : link;
        })
        .sort(compare)
    );
  };

  const fetchLinks = async () => {
    try {
      const response = await linksApi.list();
      setLinks(response.data.links);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(async () => {
    await fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <Form loading={loading} setLoading={setLoading} addLink={addLink} />
      {either(isNil, isEmpty)(links) ? (
        <h1 className="text-xl leading-5 text-center">
          No links created yet 😔
        </h1>
      ) : (
        <LinksList
          links={links}
          setLoading={setLoading}
          loading={loading}
          updateLinks={updateLinks}
        />
      )}
    </Container>
  );
};

export default Dashboard;

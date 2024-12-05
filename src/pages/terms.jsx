import { useEffect } from "react";
import client from "../cms/client";
import { useLocation } from "react-router-dom";

const Terms = () => {
  const { state } = useLocation();

  const BASE_URL = "https://cdn.contentful.com";
  const SPACE_ID = "0d44yafkqnik";
  const ACCESS_TOKEN = "WrV3p4MV6bygtIBQgkE2ug5y-e1hqnOzMcZDqPXO5Ik";
  const ENVI_ID = "master";
  const ENTRY_ID = state.entryId;

  useEffect(() => {
    const fetchContentFul = async () => {
      try {
        //const entry = await client.getEntry(ENTRY_ID);
        const entryData = await fetch(
          `${BASE_URL}/spaces/${SPACE_ID}/environments/${ENVI_ID}/entries/${ENTRY_ID}?access_token=${ACCESS_TOKEN}`
        );
        const entryResponseData = await entryData.json();
        console.log(entryResponseData);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchContentFul();
  }, []);
  return <div>Terms</div>;
};

export default Terms;

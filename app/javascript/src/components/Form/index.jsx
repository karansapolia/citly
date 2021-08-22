import React, { useState } from "react";

import linksApi from "apis/links";

const Form = ({ loading, addLink, setLoading }) => {
  const [link, setLink] = useState("");

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await linksApi.create({
        link: { original: link }
      });
      if (res.data.notice) {
        logger.info("new link: ", res.data.link);
        addLink(res.data.link);
        setLink("");
      }
    } catch (error) {
      logger.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-between w-4/6 p-4 my-4 mx-auto">
      <div className="flex-grow">
        <form
          className="w-full flex shadow rounded text-sm"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <input
              className="bg-white appearance-none border-2 rounded-l border-white w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Enter a URL to shorten..."
              onChange={e => setLink(e.target.value)}
              value={link}
              required
            />
          </div>
          <div>
            <input
              className={`${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } rounded-r bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 cursor-pointer`}
              type="submit"
              value="Shorten!"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;

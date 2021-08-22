import React from "react";
import LinkCard from "components/LinkCard";

export default function LinksList({ links, loading, setLoading, updateLinks }) {
  return (
    <section className="my-4 w-4/6 p-4 my-0 mx-auto">
      <ul className="shadow rounded">
        <li className="flex items-center justify-between bg-purple-600 mb-px p-4 text-white text-lg rounded-t">
          <p className="w-2/5 flex justify-center">Original</p>
          <p className="w-2/5 flex justify-center">Short Url</p>
        </li>
        {links.map(link => (
          <LinkCard
            link={link}
            key={link.id}
            loading={loading}
            setLoading={setLoading}
            updateLinks={updateLinks}
          />
        ))}
      </ul>
    </section>
  );
}

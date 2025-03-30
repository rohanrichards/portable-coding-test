import { useQuery } from "@tanstack/react-query";
import logo from "../logo.svg";
import { useState } from "react";

const server = "http://localhost:5000/api/v1";

const Search: React.FC = () => {
  const getSearch = async (term: string) => {
    const res = await fetch(`${server}/search?term=${term}`);
    const data = await res.json();
    console.log(data.results);
    return data.results;
  };
  const [queryTerm, setQueryTerm] = useState("");
  const query = useQuery({
    queryKey: ["search", queryTerm],
    queryFn: () => getSearch(queryTerm),
  });
  return (
    <>
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            onChange={(event) => setQueryTerm(event.target.value)}
          ></input>
          <p>
            {query.data &&
              query.data?.map((item: any) => {
                return (
                  <>
                    <p>{item.webTitle}</p>
                  </>
                );
              })}
          </p>
        </header>
      </div>
    </>
  );
};

export default Search;

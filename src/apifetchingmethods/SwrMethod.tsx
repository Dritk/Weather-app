import useSWR from "swr";

const fetcher = (url: string): Promise<Country[]> =>
  fetch(url).then((res) => res.json());

interface Country {
  name: string;
  flags: {
    png: string;
  };
}
const swrMethod: React.FC = () => {
  const {
    data: countries,
    error,
    isValidating,
  } = useSWR<Country[]>("https://restcountries.com/v2/all", fetcher);

  if (error) return <div className="failed">failed to load</div>;
  if (isValidating) return <div className="Loading">Loading.......</div>;

  return (
    <div className="">
      {countries &&
        countries.map((country, index) => (
          <img
            key={index}
            src={country.flags.png}
            alt={country.name}
            width={100}
          />
        ))}
    </div>
  );
};

export default swrMethod;

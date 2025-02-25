import DisplayWeather from "./components/DisplayWeather";

const App = () => {
  return (
    <div>
      <div className="flex flex-row space-x-8 p-4">
        <DisplayWeather />
      </div>
    </div>
  );
};

export default App;

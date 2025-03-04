import DisplayWeather from "./components/DisplayWeather";

const App = () => {
  return (
    <div>
      <div className="flex flex-row justify-center  p-4 bg-[#1E1E1E] ">
        <DisplayWeather />
      </div>
    </div>
  );
};

export default App;

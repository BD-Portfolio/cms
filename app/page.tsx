import AvailablePluginCard from "./components/AvailablePluginCard";

export default function Home() {

  return (
    <>
      <div className="mt-[100px] text-2xl font-bold">
        <div className="flex justify-center items-center">
          <p className="text-blue-600 mr-2">Content Management System</p>
          <span> made easy </span>
        </div>
        <div className="flex justify-center items-center">
          Use plugin architecture and make the system scalability
        </div>
      </div>

      <div className="flex justify-evenly mt-[100px]">
        <AvailablePluginCard />
      </div>
    </>
  );
}

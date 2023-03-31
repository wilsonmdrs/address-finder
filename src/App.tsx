import React from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SearchFinder } from "./components/SearchFinder";
import { DataProvider, useData } from "./hooks/useData";

function App() {
  const dataMethods = useData({
    defaultValues: {
      searchTerm: "",
      postCodes: [],
      recentPostCodes: [],
    },
  });
  return (
    <div className="flex w-[100vw] h-[100vh] m-0 p-0 flex-col">
      <DataProvider {...dataMethods}>
        <Header />
        <SearchFinder />
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;

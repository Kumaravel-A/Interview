import { useState } from "react";
import "./App.scss";
import Audience from "./pages/audience/Audience";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Audience />
      {/* Toastr */}
      <ToastContainer
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        // closeButton={CloseButton}
      />
    </>
  );
}

export default App;

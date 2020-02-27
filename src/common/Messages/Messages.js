import React from "react";
import ReduxToastr from "react-redux-toastr";
import "../../../node_modules/react-redux-toastr/lib/css/react-redux-toastr.min.css";

export default function Messages(props) {
  return (
    <ReduxToastr
      timeout={5000}
      newestOnTop={false}
      preventDuplicates={true}
      position="top-center"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
    />
  );
}

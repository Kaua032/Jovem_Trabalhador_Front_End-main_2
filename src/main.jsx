import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import { GlobalStyled } from "./GlobalStyled";
import College from "./pages/Colleges/College.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import Party from "./pages/Partys/Party.jsx";
import { ListGroupItem } from "react-bootstrap";
import ListRemoteStudent from "./pages/ListRemoteStudents/ListRemoteStudents.jsx";
import ListLocalStudents from "./pages/ListLocalStudents/ListLocalStudents.jsx";
import GenerateStudentList from "./pages/GenerateStudentList/GenerateStudentList.jsx";
import ExportCSV from "./pages/ExportCSV/ExportCSV.jsx";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/college",
    element: <College />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/party",
    element: <Party />,
  },
  {
    path: "/remoteStudents",
    element: <ListRemoteStudent />,
  },
  {
    path: "/localStudents",
    element: <ListLocalStudents />,
  },
  {
    path: "/generateList",
    element: <GenerateStudentList />,
  },
  {
    path: "/exportCSV",
    element: <ExportCSV />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <RouterProvider router={router} />
  </React.StrictMode>
);

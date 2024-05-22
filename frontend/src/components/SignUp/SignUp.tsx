import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import useSignup from "../../hooks/useSignup";
import { Input } from "@chakra-ui/react";

interface SignUpInputs {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  pic: string;
}

const SignIn: React.FC = () => {
  const initialValues: SignUpInputs = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    pic: "",
  };

  const { loading, signup } = useSignup();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    // pic: Yup.string().required("Picture is required"),
  });

  const handleSubmit = (values: SignUpInputs) => {
    console.log(values);
    signup(values);
  };

  const postDetails = (pic: any) => {
    setPicLoading(true);
    if (pic === undefined) {
      console.log("ERROR PICTURE");

      return;
    }
    console.log(pic);
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      setPicLoading(false);
      return;
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Create an account</h2>
        <p style={{ fontSize: "12px" }}>Welcome to Toly ^^</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group">
              <Field type="text" id="name" name="name" placeholder="Name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <Input
                type="file"
                id="pic"
                name="pic"
                placeholder="Picture"
                onChange={(e: any) => postDetails(e.target.files[0])}
              />
              <ErrorMessage
                name="pic"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Sign Up{" "}
              <ArrowRightOutlined
                style={{ marginLeft: "0.5rem", fontWeight: "bold" }}
              />
            </button>
          </Form>
        </Formik>

        <div
          style={{
            width: "108%",
            textAlign: "center",
            borderBottom: "1px solid #ccc",
            lineHeight: "0.1em",
            margin: "20px 0",
          }}
        >
          <span
            style={{
              background: "#f5f5f5",
              padding: "0 10px",
              color: "#243666",
            }}
          >
            or
          </span>
        </div>
        <GoogleButton
          style={{
            background: "#ffffff",
            borderRadius: "5px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            color: "rgba(0, 0, 0, 0.54)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            marginLeft: "10px",
          }}
          onClick={() => {
            console.log("Google button clicked");
          }}
        />

        <div className="signin">
          Don't have an account?{" "}
          <Link className="signin-link" to="/signin">
            Register
          </Link>
        </div>
      </div>

      <div className="login-image">
        <img
          src="https://images.unsplash.com/photo-1552068751-34cb5cf055b3?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Image"
        />
      </div>
    </div>
  );
};

export default SignIn;

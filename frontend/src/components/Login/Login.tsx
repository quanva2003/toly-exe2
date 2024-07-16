import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

interface LogInInputs {
  email: string;
  password: string;
  position: {
    lat: number;
    lng: number;
  };
}

const Login: React.FC = () => {
  const initialValues: LogInInputs = {
    email: "",
    password: "",
    position: {
      lat: 0,
      lng: 0,
    },
  };

  const { login } = useLogin();
  const [loading, setLoading] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 10.7941,
    longitude: 106.7216,
    zoom: 16,
  });
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: LogInInputs, { setFieldValue }) => {
    setLoading(true);
    if (currentLocation) {
      values.position = currentLocation;
    }
    await login(values.email, values.password, values.position);
    setTimeout(() => {
      setLoading(false);
    }, 5000); // Set loading to false after 5 seconds
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setViewport((prevViewport) => ({
            ...prevViewport,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setCurrentLocation({ lat: 10, lng: 106 });
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Sign In</h2>
        <p style={{ fontSize: "12px" }}>
          If you are already a member, easily log in
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-group-login">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group-login">
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
            <Link to="/forgot" className="forgot-password">
              Forgot your password?
            </Link>
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </Form>
        </Formik>

        <div className="signin">
          Don't have an account?{" "}
          <Link className="signin-link" to="/signup">
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

export default Login;

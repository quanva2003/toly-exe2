import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Contact.css"; // Import your CSS file for styling
import React from "react";

const ContactUs: React.FC = () => {
  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required("Required"),
    user_email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string().required("Required"),
  });

  return (
    <div className="contact-container">
      <Formik
        initialValues={{ user_name: "", user_email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Send email logic here
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="contact-form">
            <label>Name</label>
            <Field type="text" name="user_name" />
            <ErrorMessage
              name="user_name"
              component="div"
              className="error-message"
            />

            <label>Email</label>
            <Field type="email" name="user_email" />
            <ErrorMessage
              name="user_email"
              component="div"
              className="error-message"
            />

            <label>Message</label>
            <Field as="textarea" name="message" />
            <ErrorMessage
              name="message"
              component="div"
              className="error-message"
            />

            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>

      {/* Right side contact information */}
      <div className="contact-info">
        <h2>Contact Information:</h2>
        <p>Address Line 1</p>
        <p>Address Line 2</p>
        <p>Phone Number</p>
        <p>Email Address</p>
      </div>
    </div>
  );
};

export default ContactUs;

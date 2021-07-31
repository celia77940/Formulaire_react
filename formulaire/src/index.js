import React from "react";
import ReactDom from "react-dom";
import { Formik } from "formik";
import * as Yup from 'yup';

class App extends React.Component {

  userShema = Yup.object().shape({
    name : Yup.string().min(3, 'trop court').max(7, 'trop long').required('required') ,
    email : Yup.string().email('mauvaise email').required('required'),
    password : Yup.string().min(5, 'trop court')
  })

  submit = (values, actions) => {
    console.log(values);
    console.log(actions);
    actions.setSubmitting(false);
  }


  render() {
    return (
      <div
        className="container-fluid p-5 bg-light 
      d-flex flex-column justify-content-center align-items-center"
      >
        <Formik
          onSubmit={this.submit}
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={this.userShema}
          
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            errors,
            touched
          }) => (
            <form
              onSubmit={handleSubmit}
              className="bg-white border p-5 d-flex flex-column"
            >
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name ?(
                  <div className="text-danger">{ errors.name }</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Adresse email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email ?(
                  <div className="text-danger">{ errors.email }</div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password ?(
                  <div className="text-danger">{ errors.password }</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Envoyer
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));

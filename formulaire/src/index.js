import React from "react";
import ReactDom from "react-dom";
import { Formik } from "formik";

class App extends React.Component {

  submit = (values, actions) => {
    console.log(values);
    console.log(actions);
    actions.setSubmitting(false);
  }

  validate(values){
    console.log({values});
    let errors = {};
    if(!values.name){
      errors.name= 'required'
    }
    else if (values.name.length < 3){
      errors.name = 'trop court';
    }

    return errors;
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
          validate= {this.validate}
          validateOnBlur={false}
          validateOnChange={false}
          
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

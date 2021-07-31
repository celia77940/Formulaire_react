import React from "react";
import ReactDom from "react-dom";
import { Formik, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const CustomInput = ({field, form, ...props}) => {
  return(
      <div className="form-group">
      <label>{ field.name }</label>
      <input 
      {...field}
      {...props}
      type="text"
      className="form-control"
      />
      </div>
  )
}

const CustomError = (props) => {
  return(
    <div className="text-danger">{props.children}</div>
  )

}



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
            <form onSubmit={handleSubmit} className="bg-white border p-5 d-flex flex-column">
                <Field name="name" component={ CustomInput }/>
                <ErrorMessage name="name" component={ CustomError }/>

                <Field name="email" type="email" component={ CustomInput }/>
                <ErrorMessage name="email" component={ CustomError }/>

                <Field name="password" component={ CustomInput }/>
                <ErrorMessage name="password" component={ CustomError }/>

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

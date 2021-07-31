import React from "react";
import ReactDom from "react-dom";
import { Formik, Field, ErrorMessage, FieldArray} from "formik";
import * as Yup from 'yup';

const CustomInput = ({field, form, ...props}) => {
  return(
      <div className="form-group">
      <label>{ props.displayname? props.displayname : field.name }</label>
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
    password : Yup.string().min(5, 'trop court'),
    items: Yup.array().of(Yup.object().shape({
        name: Yup.string().required('required name'),
        quantity: Yup.number().typeError('doit etre un nombre').min(5, 'trop faible')
    }))
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
          initialValues={{ name: "", email: "", password: "", items: [] }}
          validationSchema={this.userShema}
          
        >
          {({
            handleSubmit,
            isSubmitting,
            values
          }) => (
            <form onSubmit={handleSubmit} className="bg-white border p-5 d-flex flex-column">
                <Field name="name" component={ CustomInput }/>
                <ErrorMessage name="name" component={ CustomError }/>

                <Field name="email" type="email" component={ CustomInput }/>
                <ErrorMessage name="email" component={ CustomError }/>

                <Field name="password" component={ CustomInput }/>
                <ErrorMessage name="password" component={ CustomError }/>

                <FieldArray name="items">
                  { arrayHelpers => {
                    return(
                    <div>
                      { values.items && values.items.length ?(
                        values.items.map((item, index) => (
                          <div key={index}>
                            <div>Item : {index}</div>
                            <hr className='w-100'></hr>
                            <Field name={`items.${index}.name`} displayname="name" component={ CustomInput }/>
                            <ErrorMessage name={`items.${index}.name`}  component={ CustomError }/>
                            <Field name={`items.${index}.quantity`}displayname="quantity" component={ CustomInput }/>
                            <ErrorMessage name={`items.${index}.quantity`}  component={ CustomError }/>
                            <button type="button" className="btn btn-small btn-danger" onClick={() => arrayHelpers.remove(index)}>delete</button>
                          </div>
                        ))
                      ): null}
                      <button type="button" className="w-100 btn-small btn-success" onClick={ () => arrayHelpers.push({
                        name: '',
                        quantity: 0
                      })}>Add items</button>
                    </div>
                  )}}
                </FieldArray>

              <button
                type="submit"
                className="my-3 btn btn-primary"
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

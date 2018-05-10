import React from "react"
import styled from "styled-components"
import { Formik, FormikProps } from "formik"

import {
  ChangeMode,
  FormContainer as Form,
  GrayFacebookButton,
} from "./commonElements"

import { LoginValidator } from "./Validators"
import Input from "../Input"
import Text from "../Text"
import Colors from "../../Assets/Colors"
import { FormComponentType, InputValues } from "./Types"
import Checkbox from "../Checkbox"
import { garamond } from "../../Assets/Fonts"
import Button from "../Buttons/Inverted"

const ForgotPasswordLink = styled(ChangeMode)`
  margin-left: auto;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LoginText = styled(Text).attrs({
  color: Colors.grayDark,
  align: "center",
})`
  margin-top: 0;
  ${garamond("s14")};
`

const LoginButton = styled(Button).attrs({
  type: "submit",
  block: true,
})`
  margin: auto 0 10px 0;
`

export const LoginForm: FormComponentType = props => {
  return (
    <Formik
      initialValues={props.values}
      onSubmit={props.handleSubmit}
      validationSchema={LoginValidator}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
      }: FormikProps<InputValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Input
              block
              quick
              error={touched.email && errors.email}
              placeholder="Enter your email address"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              block
              quick
              error={touched.password && errors.password}
              placeholder="Enter your password"
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Row>
              <Checkbox
                type="checkbox"
                name="remember-me"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <Text color={Colors.grayDark}>Remember me</Text>
              </Checkbox>
              <ForgotPasswordLink
                onClick={() => props.handleChangeMode("reset_password")}
              >
                Forgot Password?
              </ForgotPasswordLink>
            </Row>
            <LoginButton disabled={isSubmitting}>Log In</LoginButton>
            <GrayFacebookButton>Sign In with Facebook</GrayFacebookButton>
            <LoginText>
              Don't have an account?{" "}
              <ChangeMode onClick={() => props.handleChangeMode("register")}>
                Sign Up
              </ChangeMode>
            </LoginText>
          </Form>
        )
      }}
    </Formik>
  )
}

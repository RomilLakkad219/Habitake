//CONSTANTS
import { WEB_SERVICE } from "../constants";

//HTTPS
import graphQlClient from './gqlClient'
import { getRequest, postRequest, putRequest } from "./https";

//PACKAGES
import { gql } from "graphql-request";

async function register(params: any) {
  // let url = WEB_SERVICE.sign_up
  // const result = await postRequest(url, params)
  // return result
  const REGISTER_MUTATION = gql`
    mutation RegisterNewUser(
    $username: String!
    $password: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $dateOfBirth: String!
    $gender: String!
    $nationality: String!
    $street: String!
    $city: String!
    $state: String!
    $zipCode: String!
    $country: String!
    $kycStatus: String!
    $role: String!
  ) {
    registerUser(
      input: {
        username: $username
        password: $password
        email: $email
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        dateOfBirth: $dateOfBirth
        gender: $gender
        nationality: $nationality
        address: {
          street: $street
          city: $city
          state: $state
          zipCode: $zipCode
          country: $country
        }
        kycStatus: $kycStatus
        role: $role
      }
    ) {
      success
      message
      userId
      username
      email
    }
  }
`;

  const result = graphQlClient.request(REGISTER_MUTATION, params)
  return result
}

async function emailVerification(params: any) {
  // let url = WEB_SERVICE.verify_email
  // const result = await postRequest(url, params)
  // return result
  const VERIFY_EMAIL_MUTATION = gql`
    mutation VerifyUserEmail($username: String!, $confirmationCode: String!) {
    verifyEmailCode(input: { username: $username, confirmationCode: $confirmationCode }) {
      success
      message
    }
  }
`;

  const result = graphQlClient.request(VERIFY_EMAIL_MUTATION, params)
  return result
}

async function userLogin(params: any) {
  // let url = WEB_SERVICE.login
  // const result = await postRequest(url, params)
  // return result

  const LOGIN_MUTATION = gql`
      mutation Login($email: String!, $password: String!) {
        loginUser(input: { email: $email, password: $password }) {
          success
          message
          accessToken
          idToken
          refreshToken
          session
          challengeName
          errorCode
          role
          userId
        }
      }
    `;

  const result = graphQlClient.request(LOGIN_MUTATION, params)
  return result
}

async function resendOtp(params: any) {
  // let url = WEB_SERVICE.resend_otp
  // const result = await postRequest(url, params)
  // return result

  const RESEND_OTP_MUTATION = gql`
    mutation ResendVerificationCode($username: String!) {
    resendVerificationCode(input: { username: $username }) {
      success
      message
    }
  }
`;

  const result = graphQlClient.request(RESEND_OTP_MUTATION, params)
  return result
}

async function forgotPassword(params: any) {
  // let url = WEB_SERVICE.forgot_password
  // const result = await postRequest(url, params)
  // return result
  const FORGOT_PASSWORD_MUTATION = gql`
    mutation RequestPasswordReset($email: String!) {
    forgotPassword(input: { email: $email }) {
      success
      message
      errorCode
    }
  }
`;

  const result = graphQlClient.request(FORGOT_PASSWORD_MUTATION, params)
  return result
}

async function resetPassword(params: any) {
  let url = WEB_SERVICE.reset_password
  const result = await postRequest(url, params)
  return result
}

async function getUserProfile(params: any) {
  // let url = WEB_SERVICE.user_profile + `?user_id=${params.user_id}`
  // const result = await getRequest(url, params)
  // return result
  const GET_USER_PROFILE_QUERY = gql`
    query GetUser($userId: ID!) {
      getUser(userId: $userId) {
        success
        message
        data {
          userId
          username
          email
          firstName
          lastName
          role
          kycStatus
          agencyId
          profilePicture
          createdAt
        }
      }
    }
  `;

  const result = graphQlClient.request(GET_USER_PROFILE_QUERY, params)
  return result
}

async function editUserProfile(params: any) {
  // let url = WEB_SERVICE.update_user_profile + `?user_id=${params.user_id}`
  // const result = await putRequest(url, params)
  // return result
  const UPDATE_USER = gql`
   mutation TestUpdateUser($userId: ID!, $input: UserUpdateInput!) {
    updateUser(userId: $userId, input: $input) {
      success
      message
      data {
        userId
        firstName
        lastName
        phoneNumber
        status
        profilePicture
      }
    }
  }
`;

  const result = graphQlClient.request(UPDATE_USER, params)
  return result
}

async function logOut(params: any) {
  // let url = WEB_SERVICE.user_logout
  // const result = await postRequest(url, params)
  // return result
  const LOGOUT_MUTATION = gql`
    mutation LogoutCurrentUser($userId: ID!, $session: String) {
      logoutUser(input: { userId: $userId, session: $session }) {
        success
        message
        errorCode
      }
    }
  `;

  const result = graphQlClient.request(LOGOUT_MUTATION, params)
  return result
}

async function otpVerification(params: any) {
  let url = WEB_SERVICE.verify_otp
  const result = await postRequest(url, params)
  return result
}

async function getHomeProperty(params: any) {
  // let url = WEB_SERVICE.get_properties
  // const result = await getRequest(url, params)
  // return result
  const LIST_PROPERTIES = gql`
  query ListAllProperties($limit: Int=null) {
    listProperties(limit: $limit) {
      success
      count
      data {
        id
        userId
        agentId
        title
        description
        address
        city
        state
        zipCode
        country
        propertyType
        price
        bedrooms
        bathrooms
        squareFeet
        lotSize
        yearBuilt
        amenities
        images
        status
        approvalStatus
        isFeatured
        viewsCount
        visitsCount
        createdAt
        updatedAt
        approvedAt
        approvedBy
        category
        condition
        seoOptimized
        totalFloors
        floorNumber
        parkingSpots
        district
        firstName
        lastName
        email
        phoneNumber
        documents {
          id
          name
          fileUrl
          documentType
        }
        visits {
          id
          visitorName
          visitDate
          status
        }
      }
    }
  }
`;
  const result = graphQlClient.request(LIST_PROPERTIES, params)
  return result
}

async function propertyIncrementViews(params: any) {
  const INCREMENT_VIEW_COUNT = gql`
  mutation IncrementTheViewCount($propertyId: ID!) {
    incrementPropertyViews(propertyId: $propertyId) {
      success
      data {
        message
        propertyId
        incrementedAt
      }
    }
  }
`;

  const result = graphQlClient.request(INCREMENT_VIEW_COUNT, params)
  return result

}


export {
  register,
  emailVerification,
  userLogin,
  resendOtp,
  forgotPassword,
  resetPassword,
  getUserProfile,
  editUserProfile,
  logOut,
  otpVerification,
  getHomeProperty,
  propertyIncrementViews
}
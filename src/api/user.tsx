//CONSTANTS
import { WEB_SERVICE } from "../constants";

//HTTPS
import graphQlClient from './gqlClient'
import { getRequest, postRequest, putRequest } from "./https";

//PACKAGES
import { gql } from "graphql-request";

async function register(params: any) {
  const REGISTER_MUTATION = gql`
    mutation RegisterNewUser($input: UserRegistrationInput!) {
      registerUser(input: $input) {
        success
        message
        userId
        username
        email
      }
    }
  `;

  const result = await graphQlClient.request(REGISTER_MUTATION, {
    input: params,
  });

  return result;
}

async function emailVerification(params: any) {
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
  const RESET_PASSWORD_MUTATION = gql`
    mutation ConfirmPasswordReset($input: ResetPasswordInput!) {
      resetPassword(input: $input) {
        success
        message
        errorCode
      }
    }
  `;

  const result = await graphQlClient.request(RESET_PASSWORD_MUTATION, {
    input: params,
  });

  return result;
}

async function getUserProfile(params: any) {
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
  const LIST_PROPERTIES = gql`
  query ListAllProperties(
    $nextToken: String
    $limit: Int
    $propertyType: PropertyType,
    $city: String,
    $state: String,
    $approvalStatus: ApprovalStatus
  ) {
    listProperties(nextToken: $nextToken, limit: $limit, propertyType: $propertyType,city:$city,state:$state,approvalStatus:$approvalStatus) {
      success
      count
      nextToken
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
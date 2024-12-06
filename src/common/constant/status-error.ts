const statusError = {
  400: {
    title: "Oops! Bad Request",
    message:
      "Something went wrong with your request. Please check and try again.",
  },
  401: {
    title: "Oops! Unauthorized",
    message: "You need to log in to access this resource. Please sign in.",
  },
  403: {
    title: "Oops! Forbidden",
    message: "You don't have permission to access this resource.",
  },
  404: {
    title: "Oops! Not Found",
    message:
      "We couldn't find what you're looking for. Please check the URL or try again later.",
  },
  500: {
    title: "Oops! Something Went Wrong",
    message:
      "An error occurred on our side. We're working to fix it. Please try again later.",
  },
  network: {
    title: "No Network Connection",
    message:
      "It seems like you're not connected to the internet. Please check your connection and try again.",
  },
  unknown: {
    title: "Oops! Something Went Wrong",
    message:
      "An error occurred on our side. We're working to fix it. Please try again later.",
  },
} as const;

export type StatusErrorVariantType = keyof typeof statusError;
export default statusError;

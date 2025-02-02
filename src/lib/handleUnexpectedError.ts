export const handleUnexpectedError = (error: unknown) => {
  return {
    success: false,
    message: "Internal Server Error",
    error: error instanceof Error ? error.message : "Unknown error",
  };
};

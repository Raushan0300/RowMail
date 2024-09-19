const emailContent = (email) => {
  if (!email) return null;

  try {
    if (email?.payload?.mimeType === "text/html") {
      const htmlPart = email?.payload?.body?.data;
      if (htmlPart) {
        return htmlPart;
      }
    } else {
      if (
        email?.payload?.parts?.find((part) => part.mimeType === "text/html")
      ) {
        const htmlPart = email?.payload?.parts?.find(
          (part) => part.mimeType === "text/html"
        );
        if (htmlPart && htmlPart.body && htmlPart.body.data) {
          return htmlPart.body.data;
        }
      } else {
        const htmlPart = email?.payload?.parts
          ?.find((part) => part.mimeType.startsWith("multipart/"))
          ?.parts?.find((part) => part.mimeType === "text/html");
        if (htmlPart && htmlPart.body && htmlPart.body.data) {
          return htmlPart.body.data;
        }
      }
    }

    if (email?.payload?.mimeType === "text/plain") {
      const textPart = email?.payload?.body?.data;
      if (textPart) {
        return textPart;
      }
    } else {
      if (
        email?.payload?.parts?.find((part) => part.mimeType === "text/plain")
      ) {
        const textPart = email?.payload?.parts?.find(
          (part) => part.mimeType === "text/plain"
        );
        if (textPart && textPart.body && textPart.body.data) {
          return textPart.body.data;
        }
      } else {
        const textPart = email?.payload?.parts
          ?.find((part) => part.mimeType === "multipart/alternative")
          ?.parts?.find((part) => part.mimeType === "text/plain");
        if (textPart && textPart.body && textPart.body.data) {
          return textPart.body.data;
        }
      }
    }

    return null;
  } catch (error) {
    console.log(error);
    return "Error in decoding email content";
  }
};

module.exports = { emailContent };

import { APP_CONSTANTS } from "@/constants";

export const validateContent = (
  content: string
): { isValid: boolean; error?: string } => {
  if (!content.trim()) {
    return { isValid: false, error: "내용을 입력해주세요" };
  }

  if (content.length > APP_CONSTANTS.MAX_CONTENT_LENGTH) {
    return {
      isValid: false,
      error: `내용은 ${APP_CONSTANTS.MAX_CONTENT_LENGTH}자를 초과할 수 없습니다`
    };
  }

  return { isValid: true };
};

export const validateTitle = (
  title: string
): { isValid: boolean; error?: string } => {
  if (!title.trim()) {
    return { isValid: false, error: "제목을 입력해주세요" };
  }

  if (title.length > APP_CONSTANTS.MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `제목은 ${APP_CONSTANTS.MAX_TITLE_LENGTH}자를 초과할 수 없습니다`
    };
  }

  return { isValid: true };
};
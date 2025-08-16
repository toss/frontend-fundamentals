// 리액션 관련 원격 API 함수

import { graphqlRequest } from "../client";
import { ADD_REACTION_MUTATION, REMOVE_REACTION_MUTATION } from "../graphql/reactions";

export type ReactionContent = "THUMBS_UP" | "HEART" | "HOORAY" | "ROCKET" | "EYES" | "LAUGH";

export interface AddReactionParams {
  discussionId: string;
  content?: ReactionContent;
  accessToken: string;
}

export interface RemoveReactionParams {
  discussionId: string;
  content?: ReactionContent;
  accessToken: string;
}

export async function addReaction({
  discussionId,
  content = "THUMBS_UP",
  accessToken
}: AddReactionParams) {
  const data = await graphqlRequest(ADD_REACTION_MUTATION, {
    subjectId: discussionId,
    content
  }, accessToken);
  return data.data?.addReaction;
}

export async function removeReaction({
  discussionId,
  content = "THUMBS_UP",
  accessToken
}: RemoveReactionParams) {
  const data = await graphqlRequest(REMOVE_REACTION_MUTATION, {
    subjectId: discussionId,
    content
  }, accessToken);
  return data.data?.removeReaction;
}
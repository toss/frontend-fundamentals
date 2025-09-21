// GitHub Reaction 유틸리티 함수들

export interface ReactionNode {
  content: string;
  user: {
    login: string;
  };
}

export interface ReactionsData {
  totalCount: number;
  nodes?: ReactionNode[];
}

/**
 * 특정 reaction type의 개수를 계산합니다
 */
export function getReactionCount(
  reactions: ReactionsData,
  reactionType: string
): number {
  if (!reactions.nodes) return 0;
  return reactions.nodes.filter((reaction) => reaction.content === reactionType)
    .length;
}

/**
 * 사용자가 특정 reaction을 했는지 확인합니다
 */
export function hasUserReacted(
  reactions: ReactionsData,
  userLogin: string,
  reactionType: string
): boolean {
  if (!reactions.nodes || !userLogin) return false;
  return reactions.nodes.some(
    (reaction) =>
      reaction.user.login === userLogin && reaction.content === reactionType
  );
}

/**
 * HEART와 THUMBS_UP 개수를 함께 반환하는 편의 함수
 */
export function getHeartAndUpvoteCounts(reactions: ReactionsData) {
  return {
    heartCount: getReactionCount(reactions, "HEART"),
    upvoteCount: getReactionCount(reactions, "THUMBS_UP"),
    totalCount: reactions.totalCount
  };
}

/**
 * 사용자의 HEART와 THUMBS_UP reaction 상태를 함께 반환하는 편의 함수
 */
export function getUserReactionStates(
  reactions: ReactionsData,
  userLogin?: string
) {
  if (!userLogin) {
    return {
      hasLiked: false,
      hasUpvoted: false
    };
  }

  return {
    hasLiked: hasUserReacted(reactions, userLogin, "HEART"),
    hasUpvoted: hasUserReacted(reactions, userLogin, "THUMBS_UP")
  };
}

/**
 * 특정 reaction type으로 반응한 사용자들을 반환합니다
 */
export function getUsersWhoReacted(
  reactions: ReactionsData,
  reactionType: string
): ReactionNode[] {
  if (!reactions.nodes) return [];
  return reactions.nodes.filter(
    (reaction) => reaction.content === reactionType
  );
}

export function WeeklyTop5() {
  const weeklyTopPosts = [
    {
      id: 1,
      rank: 1,
      author: "User Kim",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      description:
        "안녕하세요! 리액트로 코드를 작성하다가 보면 조건부 렌더링을 할 일이 정말 많아..."
    },
    {
      id: 2,
      rank: 2,
      author: "Anonymous",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      description:
        "안녕하세요! 리액트로 코드를 작성하다가 보면 조건부 렌더링을 할 일이 정말..."
    },
    {
      id: 3,
      rank: 3,
      author: "User Han",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      description:
        "안녕하세요! 리액트로 코드를 작성하다가 보면 조건부 렌더링을 할 일이 정말..."
    },
    {
      id: 4,
      rank: 4,
      author: "User Jung",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      description:
        "안녕하세요! 리액트로 코드를 작성하다가 보면 조건부 렌더링을 할 일이 정말..."
    },
    {
      id: 5,
      rank: 5,
      author: "User Kim",
      title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
      description:
        "안녕하세요! 리액트로 코드를 작성하다가 보면 조건부 렌더링을 할 일이 정말..."
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">
          Weekly Top 5
        </h2>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          8월 2째주 인기글
        </span>
      </div>

      <div className="space-y-2">
        {weeklyTopPosts.map((post) => (
          <div key={post.id} className="flex items-start gap-2">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {post.rank}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {post.author}
                </span>
              </div>

              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight mb-0.5">
                {post.title}
              </h3>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 leading-tight">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

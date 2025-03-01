export default async function handler(request, response) {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");

    if (!res.ok) {
      throw new Error(`API 응답 오류: ${res.status}`);
    }

    const data = await res.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error("서버리스 함수 오류:", error);
    return response.status(500).json({
      error: "데이터를 가져오는 중 오류가 발생했습니다.",
      message: error.message
    });
  }
}

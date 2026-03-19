export async function generateQuestions(topic, count = 10) {
  try {
    const response = await fetch('https://genquiz-backend.onrender.com/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, count }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate questions from backend');
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch questions from backend:", error);
    throw new Error(error.message || "Failed to generate valid questions.");
  }
}
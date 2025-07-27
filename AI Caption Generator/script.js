async function generateCaption() {
  const prompt = document.getElementById("themeInput").value;

  try {
    const res = await fetch("http://127.0.0.1:5000/generate-caption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
    console.log("Response", res); 

    if (!res.ok) throw new Error("Server responded with error");

    const data = await res.json();
    document.getElementById("output").innerText = data.caption;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("output").innerText = "Error generating caption.";
  }
}


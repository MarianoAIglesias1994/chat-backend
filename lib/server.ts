import app from "./app";
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Chat BackEnd listening on port ${PORT}!`);
});

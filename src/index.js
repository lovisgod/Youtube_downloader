////////////////////////////////
// Hi there!                  //
///////////////////////////////
// This is a YouTube downloader I made!
// It uses url queries and youtube-dl to download youtube vids!
// Here's the bookmarklet version: (Copy paste the whole line, then remove the comment at the beggining.)
// javascript: {var url=window.location.href;if(/https:\/\/(www|)\.youtube\.com\/watch\?v=[A-Za-z0-9]+/i.test(url)){var newurl=`https://4n8hm.sse.codesandbox.io/download?URL=${url}&format=${prompt("What format would you like to download?","mp4")||"cancel"}&quality=${prompt("What quality would you like to download? (highest, lowest, highestaudio, lowestaudio, highestvideo, lowestvideo)","highest")||"cancel"}`;newurl.includes("cancel")?alert("You canceled the download"):window.location.href=newurl}else alert("Invalid url!");}

// Or from github gist:
// https://gist.github.com/Explosion-Scratch/117c72618132b8835f497b970c939e98

// Start of the code!
// -----------------------
// Require stuff lol
const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const app = express();

// Cors
app.use(cors());

// Listen on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Download video
app.get("/download", (req, res) => {
  var URL = req.query.URL;
  res.header(
    "Content-Disposition",
    `attachment; filename="Video.${req.query.format || "mp4"}"`
  );
  try {
    if (req.query.quality === "highest") {
      console.log("Downloading highest format");
      ytdl(URL, {
        format: req.query.format.toLowerCase() || "mp4"
      }).pipe(res);
    } else {
      console.log("Downloading custom format");
      ytdl(URL, {
        format: req.query.format.toLowerCase() || "mp4",
        quality: req.query.quality || "highest"
      }).pipe(res);
    }
  } catch (err) {
    console.log("There was an error, attempting to download still.");
    ytdl(URL, {
      format: "mp4"
    }).pipe(res);
  }
});

// Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

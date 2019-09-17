const fs = require("fs-extra"),
  path = require("path"),
  request = require("request"),
  wallpaper = require("wallpaper");

var download = function(uri, filename, callback) {
  request.head(uri, function() {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

const wallpaperSet = [
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/19083812/FutureOfMusic_Season02_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/19084898/Note_10_88MPH_landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/18940900/The_Verge_Wallpaper_08_07_19_landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/18369339/The_Verge_Wallpaper_07_30_19_landscape.0.jpg",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/18313466/The_Verge_Wallpaper_07_16_19_landscape.0.jpg",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/18279716/Verge_Wallpaper_070319.0.jpg",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/16311032/The_Verge_wallpaper_053119.1.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/16282419/The_Verge_GOT_Landscape_Wallpaper.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/13730532/acastro_190117_dekstop_wallpaper.0.jpg",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/13713698/_The_Verge_Wallpaper_01-25-19_landscape.0.jpeg",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/10675355/The_Verge_Cubeometry_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/10675371/The_Verge_Houndstooth_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/13272831/The_Verge_Hysteresis_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/13107653/The_Verge_Pathways_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/13318597/The_Verge_Pathways_XR_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/10675381/The_Verge_Pixel_Falls_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/10675415/The_Verge_Seismic_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/10675419/The_Verge_Singularity_Wallpaper_Landscape.0.png",
  "https://cdn.vox-cdn.com/uploads/chorus_asset/file/13609300/The_Verge_Subsurface_Wallpaper_Landscape.0.png"
];

setInterval(function() {});
const index = Math.floor(Math.random() * wallpaperSet.length);

const wallpaperDir = `.wallpapers`;

fs.mkdirpSync(wallpaperDir);

setInterval(() => {
  console.log(`Setting wallpaper #${index}!`);
  var wallpaperToSet = wallpaperSet[index];
  var wallpaperFilename = path.basename(wallpaperToSet);
  var wallpaperLocalPath = path.join(wallpaperDir, wallpaperFilename);

  (async () => {
    if (fs.existsSync(wallpaperLocalPath)) {
      console.log("Wallpaper already downloaded, applying..");
      setWallpaper();
    } else {
      console.log("Wallpaper not yet downloaded, downloading..");
      download(wallpaperToSet, wallpaperLocalPath, setWallpaper);
    }
  })();

  function setWallpaper() {
    wallpaper.set(wallpaperLocalPath).then(function() {
      console.log("Wallpaper set!");
    });
  }
}, 300000);

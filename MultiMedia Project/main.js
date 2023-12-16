
const img = document.getElementById("canvasResult")
const overlayedimg = document.getElementById("result")
const chosenPicture = document.querySelector("input");
const thresholdSlider = document.querySelector(".ThersholdSlider")


function displayPhoto(){
    let ctx = img.getContext("2d");
    overlayedimg.style.display = "none"
    img.style.display= "block"
    ctx.clearRect(0, 0,600,600);
    let newImage = new Image();
    newImage.src = URL.createObjectURL(chosenPicture.files[0]);
    newImage.onload = function(){
        console.log()
        let ratio = newImage.width/newImage.height;
        let n = (1/ratio)*600
        ctx.drawImage(newImage, 0, 0,600,n);
    }
    return;
}
chosenPicture.onchange = displayPhoto;




thresholdSlider.addEventListener("change",(e)=>{
    //Averaging Blue
    let src = cv.imread(img);
    let dst = new cv.Mat();
    let ksize = new cv.Size(Number(e.target.value),Number(e.target.value));
    let anchor = new cv.Point(-9, -1);
    cv.blur(src, dst, ksize, anchor, cv.BORDER_DEFAULT);
    cv.imshow('result', dst);
    src.delete(); dst.delete();
    //Gaussian Blur
    // let src = cv.imread(img);
    // let dst = new cv.Mat();
    // let ksize = new cv.Size(Number(e.target.value),Number(e.target.value));
    // cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    // cv.imshow('result', dst);
    // src.delete(); dst.delete();
    overlayedimg.style.display = "block"
    img.style.display= "none"
} )






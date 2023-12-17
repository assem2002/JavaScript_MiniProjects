
const oringinalImage = document.getElementById("oringinalImage");
const chosenPicture = document.querySelector("input");

const blurKenralSize = document.getElementById("blurKenralSize");
const blurSlider = document.querySelector(".ThersholdSlider");

const thresholdSimpleSlider = document.querySelector(".thresholdvalue"); 
const thrsholdSimpleCanvas = document.getElementById("ThresholdSimple");

const sobeldxSlider = document.querySelector(".sobelksize") ;
const sobeldxCanvas= document.getElementById("sobeldxCanvas");

const  LaplacianSlider = document.querySelector(".laplacianKsize");
const LaplacianCanvas = document.getElementById("LaplacianksizeCanvas") ;

const imageCannySlider =document.querySelector(".threshold1");
const imageCannyCanvas = document.getElementById("ImageCanny1");


const imageCannySlider2 =document.querySelector(".threshold2");
const imageCannyCanvas2 = document.getElementById("ImageCanny2");

const imageCannyِaperatureSlider =document.querySelector(".Aperturesize");
const imageCannyaperatureCanvas= document.getElementById("aperature");

const histogramShowButton = document.querySelector(".button1");
const histogramShowCanvas = document.getElementById("ShowHistogram");

const histoEqulizebutton = document.querySelector(".button2")
const histoEqulizeCanvas = document.getElementById("equlaizeHistogram")

const resetButton =document.querySelector(".button0")

const downloadButton = document.querySelector(".button3")
let functionsDoneBefore = new Set(); // A set to save the function applied so far.
let lastCanvas=0; //knows which filter was applied last, so the called function would paint on it. 

function redoThings(notToDo){
    lastCanvas = oringinalImage;
    histogramShowCanvas.style.display = "none"
    for (let func of functionsDoneBefore){
        console.log(func);
        if(func[0] === notToDo){
            functionsDoneBefore.delete(func);
            continue;
        }
        if (func[0] === displayPhoto){
            displayPhoto();
        }
        else{
            func[0](-1,0,func[1]);
        }
    }
}

function displayPhoto(){
    //clear if there's photos displayed before this new one.
    if(lastCanvas !=0) lastCanvas.style.display ="none";
    functionsDoneBefore.clear()
    //set a canvas element to draw the image on.
    let ctx = oringinalImage.getContext("2d");
    lastCanvas =oringinalImage;
    lastCanvas.style.display= "block";
    histogramShowCanvas.style.display = "none"
    ctx.clearRect(0, 0,700,700);//clears the canvas element from previously painted images.
    //create new image object to passs it the canvas element for further operation like (filters).
    let newImage = new Image();
    newImage.src = URL.createObjectURL(chosenPicture.files[0]);
    //when the image load it starts drawing.
    newImage.onload = function(){
        let width = 700
        if (window.innerWidth <450) width = 320
        let ratio = newImage.width/newImage.height;
        let n = (1/ratio)*width
        if( n>400){
            n=400
            width =320
        }
        console.log(n);
        oringinalImage.width = width
        oringinalImage.height = n
        ctx = oringinalImage.getContext("2d");
        ctx.drawImage(newImage, 0, 0,width,n);
    }
}
chosenPicture.onchange = displayPhoto;

//BLUR FUNCTION
function blur(e,flag=1,fakeone=-1){ //flag == 0 means it's a call from another function,flag ==1 means a call from itself.
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(blur); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([blur,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        blurKenralSize.style.display = "block"
    }
    console.log("value of the blur applied is : ",valuePassed)
    document.querySelectorAll(".grayScale span")[1].innerHTML =valuePassed; //change span value.

    let src = cv.imread(lastCanvas);
    let dst = new cv.Mat();
    let ksize = new cv.Size(Number(valuePassed),Number(valuePassed));
    let anchor = new cv.Point(-9, -1);
    cv.blur(src, dst, ksize, anchor, cv.BORDER_DEFAULT);
    cv.imshow('blurKenralSize', dst);
    src.delete(); dst.delete();
    lastCanvas = blurKenralSize; // to preserve the last occurance of the canvas drawing.
}
blurSlider.addEventListener("change",blur);


//THRESHOLD FUNCTION 
function thresholdSimple(e,flag =1 , fakeone =-1){
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(thresholdSimple); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([thresholdSimple,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        console.log(thrsholdSimpleCanvas)
        thrsholdSimpleCanvas.style.display = "block"
    }
    console.log("value of the threshold applied is : ",valuePassed)//just a message for debugging 
    //change span value.
    document.querySelector(".thresholdspan +span").innerHTML =valuePassed;

    //thresholdsimple Function
    let src = cv.imread(lastCanvas);
    let dst = new cv.Mat();
    cv.threshold(src, dst, Number(valuePassed), 200, cv.THRESH_BINARY);
    cv.imshow('ThresholdSimple', dst);
    src.delete();
    dst.delete();

    lastCanvas = thrsholdSimpleCanvas; // to preserve the last occurance of the canvas drawing.
    
}
thresholdSimpleSlider.addEventListener("change",thresholdSimple)

//Sobel dx
function sobelDx(e,flag =1 , fakeone =-1){
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(sobelDx); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([sobelDx,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        console.log(sobeldxCanvas)
        sobeldxCanvas.style.display = "block"
    }
    console.log("value of the sobel applied is : ",valuePassed)//just a message for debugging 
    //change span value.
    document.querySelector(".imageGradients +span").innerHTML =valuePassed;
    //Sobel ksize funtion 
    let src = cv.imread(lastCanvas);
    let dstx = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    cv.Sobel(src, dstx, cv.CV_8U, 1, 0, Number(valuePassed), 1, 0, cv.BORDER_DEFAULT);
    cv.imshow('sobeldxCanvas', dstx);
    src.delete(); dstx.delete();
    lastCanvas = sobeldxCanvas; // to preserve the last occurance of the canvas drawing.
}    
sobeldxSlider.addEventListener("change",sobelDx)


//Laplacian Function
function Laplacian (e,flag =1 , fakeone =-1){
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(Laplacian); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([Laplacian,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        console.log(LaplacianCanvas)
        LaplacianCanvas.style.display = "block"
    }
    console.log("value of the laplacian applied is : ",valuePassed)//just a message for debugging 
    //change span value.
    document.querySelector(".laplacianKsizeSpan +span").innerHTML =valuePassed;

    //Laplacian  funtion 
    let src = cv.imread(lastCanvas);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Laplacian(src, dst, cv.CV_8U, Number(valuePassed), 1, 0, cv.BORDER_DEFAULT);
    cv.imshow(LaplacianksizeCanvas, dst);
    src.delete(); dst.delete();
    lastCanvas = LaplacianCanvas;
}    
LaplacianSlider.addEventListener("change",Laplacian)



//Image Canny Function
function ImageCanny (e,flag =1 , fakeone =-1){
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(ImageCanny); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([ImageCanny,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        console.log(imageCannyCanvas)
        imageCannyCanvas.style.display = "block"
    }
    console.log("value of the image canny threshold1 applied is : ",valuePassed)//just a message for debugging 
    //change span value.
    document.querySelector(".threshold1Span +span").innerHTML =valuePassed;

    //Laplacian  funtion 
    let src = cv.imread(lastCanvas);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Canny(src, dst, Number(valuePassed), Number(imageCannySlider2.value), 3, false);
    cv.imshow(imageCannyCanvas, dst);
    src.delete(); dst.delete();
    lastCanvas = imageCannyCanvas;
}    
imageCannySlider.addEventListener("change",ImageCanny)

//image canny threshold2
function ImageCanny2 (e,flag =1 , fakeone =-1){
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(ImageCanny2); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([ImageCanny2,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        console.log(imageCannyCanvas2)
        imageCannyCanvas2.style.display = "block"
    }
    console.log("value of the image canny threshold2 applied is : ",valuePassed)//just a message for debugging 
    //change span value.
    document.querySelector(".threshold2Span +span").innerHTML =valuePassed;

    //Laplacian  funtion 
    let src = cv.imread(lastCanvas);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Canny(src, dst, Number(imageCannySlider.value), Number(valuePassed), 3, false);
    cv.imshow(imageCannyCanvas2, dst);
    src.delete(); dst.delete();
    lastCanvas = imageCannyCanvas2;
}    
imageCannySlider2.addEventListener("change",ImageCanny2)

//image canny apreature Size
function apreature (e,flag =1 , fakeone =-1){
    let valuePassed; //whether it comes from the slider or the 'redothing' function.
    if (flag===0)  {
        valuePassed =fakeone;
    }
    if(flag===1){
        valuePassed =e.target.value
        redoThings(apreature); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([apreature,e.target.value]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        console.log(imageCannyaperatureCanvas)
        imageCannyaperatureCanvas.style.display = "block"
    }
    console.log("value of the image canny threshold2 applied is : ",valuePassed)//just a message for debugging 
    //change span value.
    document.querySelector(".AperturesizeSpan +span").innerHTML =valuePassed;

    //Laplacian  funtion 
    let src = cv.imread(lastCanvas);
    let dst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
    // You can try more different parameters
    cv.Canny(src, dst, Number(imageCannySlider.value), Number(imageCannySlider2.value), Number(imageCannyِaperatureSlider.value), false);
    cv.imshow(imageCannyaperatureCanvas, dst);
    src.delete(); dst.delete();
    lastCanvas = imageCannyaperatureCanvas;
}    
imageCannyِaperatureSlider.addEventListener("change",apreature)


function showhistogram(e){
    lastCanvas.style.display= "none"
    histogramShowCanvas.style.display = "block"
    console.log("worked")
    let src = cv.imread(lastCanvas);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    let srcVec = new cv.MatVector();
    srcVec.push_back(src);
    let accumulate = false;
    let channels = [0];
    let histSize = [256];
    let ranges = [0, 255];
    let hist = new cv.Mat();
    let mask = new cv.Mat();
    let color = new cv.Scalar(255, 255, 255);
    let scale = 2;
    // You can try more different parameters
    cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
    let result = cv.minMaxLoc(hist, mask);
    let max = result.maxVal;
    let dst = new cv.Mat.zeros(src.rows, histSize[0] * scale,
                            cv.CV_8UC3);
    // draw histogram
    for (let i = 0; i < histSize[0]; i++) {
        let binVal = hist.data32F[i] * src.rows / max;
        let point1 = new cv.Point(i * scale, src.rows - 1);
        let point2 = new cv.Point((i + 1) * scale - 1, src.rows - binVal);
        cv.rectangle(dst, point1, point2, color, cv.FILLED);
    }
    cv.imshow(histogramShowCanvas, dst);
    src.delete(); dst.delete(); srcVec.delete(); mask.delete(); hist.delete();

} 
histogramShowButton.addEventListener("click",showhistogram) 

function equalizeHistogram(e ,flag =1 ,fakeone =-1){

    if(flag===1){
        redoThings(equalizeHistogram); //redo everything but don't do bluring as I would make a new blur effect.
        functionsDoneBefore.add([equalizeHistogram,-1]); //adds the new blur function to the set with value of the blur kernal size.
        //switch the display of the canvas element.
        lastCanvas.style.display= "none"
        histoEqulizeCanvas.style.display = "block"
    }
    let src = cv.imread(lastCanvas);
    let equalDst = new cv.Mat();
    let claheDst = new cv.Mat();
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.equalizeHist(src, equalDst);
    let tileGridSize = new cv.Size(8, 8);
    // You can try more different parameters
    let clahe = new cv.CLAHE(40, tileGridSize);
    clahe.apply(src, claheDst);
    cv.imshow('equlaizeHistogram', equalDst);
    src.delete(); equalDst.delete(); claheDst.delete(); clahe.delete();
    lastCanvas = histoEqulizeCanvas;

    
}
histoEqulizebutton.addEventListener("click",equalizeHistogram) 

resetButton.addEventListener("click",(e)=>{
    displayPhoto()
})

downloadButton.addEventListener("click",()=>{
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = lastCanvas.toDataURL()
    link.click();
})

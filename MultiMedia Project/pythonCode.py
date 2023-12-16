import cv2
import numpy as np
from pyscript import window, document,PyWorker
img = document.querySelector(".imagePlace")
chosenPicture = document.querySelector("input")

# def func(event):
#     print(chosenPicture.files[0])
#     print(img)
#     img.src = "Book about software engineering.png"
#     oo = document.createElement("a")
#     oo.href = img.src
#     oo.download = "adaf.png"
#     document.body.append(oo)
#     oo.click()
#     PyWorker. URL.createObjectURL()

# chosenPicture.onchange = func

thresholdSlider = document.querySelector(".ThersholdSlider")
def changeThreshold(thresholdSliderValue):
    image = cv2.imread("Programming Language Table.png", cv2.IMREAD_GRAYSCALE)

    threshold_value = thresholdSliderValue
    height, width = image.shape
    binary_image = np.zeros((height, width), dtype=np.uint8)

    for y in range(height):
        for x in range(width):
            pixel_value = image[y, x]
            if pixel_value >= threshold_value:
                binary_image[y, x] = 255
            else:
                binary_image[y, x] = 0

    cv2.imwrite('binary_image.jpg', binary_image)
    # cv2.imshow('Binary Image', binary_image)
    # cv2.waitKey(0)
    img.src = "binary_image.jpg"


thresholdSlider.onchange = changeThreshold(thresholdSlider.value)


# print("hello world")
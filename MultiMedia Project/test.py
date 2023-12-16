# import numpy as np
# import cv2
# img=cv2.imread("Programming Language Table.png")
# print(img.shape)
# [a,b,c]=img.shape
# img_b= np.zeros((img.shape),dtype=np.int8)
# img_r= np.zeros((img.shape),dtype=np.int8)
# img_g= np.zeros((img.shape),dtype=np.int8)
# [i,j,c]=img.shape
# for i in range (0,399):
#     for j  in range (0,599) :
#         img_b[i,j,0] = img[1,j,0]
#         img_g[i,j,0] = img[1,j,1]
#         img_r[i,j,0] = img[1,j,2]
# cv2.imshow("img",img)
# cv2.imshow("image_b", img_b)
# cv2.imshow("image_g", img_g)
# cv2.imshow("imag_r", img_r)
# cv2.waitKey(0)


# import cv2
# import numpy as np

# image = cv2.imread(r"Programming Language Table.png")

# blue_channel, green_channel, red_channel = cv2.split(image)

# cv2.imshow("Original Image", image)
# cv2.imshow("Blue Channel", blue_channel)
# cv2.imshow("Green Channel", green_channel)
# cv2.imshow("Red Channel", red_channel)

# cv2.waitKey(0)
# cv2.destroyAllWindows()

import cv2
import numpy as np

image = cv2.imread("Programming Language Table.png", cv2.IMREAD_GRAYSCALE)

threshold_value = 128
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
# cv2.imshow('original', image)
# cv2.imshow('Binary Image', binary_image)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
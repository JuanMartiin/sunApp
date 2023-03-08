# import the necessary packages
from imutils import contours
from skimage import measure
import numpy as np
import imutils
import cv2
import sys

from google.colab.patches import cv2_imshow

image = cv2.imread(sys.argv[1], cv2.IMREAD_COLOR)
h, w, c = image.shape
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
blurred = cv2.GaussianBlur(gray, (11, 11), 0)

# threshold the image to reveal light regions in the
# blurred image
thresh = cv2.threshold(blurred, 235, 255, cv2.THRESH_BINARY)[1]

# perform a series of erosions and dilations to remove
# any small blobs of noise from the thresholded image
thresh = cv2.erode(thresh, None, iterations=2)
thresh = cv2.dilate(thresh, None, iterations=4)

# Apply Hough transform on the blurred image.
detected_circles = cv2.HoughCircles(thresh, 
                   cv2.HOUGH_GRADIENT, 1, w, param1=50,param2=20,minRadius=0,maxRadius=w)

centerX = w/2.0
centerY = h/2.0
desX = 0
desY = 0
# Draw circles that are detected.
if detected_circles is not None:
  
    # Convert the circle parameters a, b and r to integers.
    detected_circles = np.uint16(np.around(detected_circles))
  
    for pt in detected_circles[0, :]:
        a, b, r = pt[0], pt[1], pt[2]
  
        # Draw the circumference of the circle.
        cv2.circle(image, (a, b), r, (0, 255, 0), 2)
  
        desX = a - centerX 
        desY = b - centerY 
        # Draw a small circle (of radius 1) to show the center.
        cv2.circle(image, (a, b), 1, (0, 0, 255), 3)
        cv2.waitKey(0)
print(desX, desY)
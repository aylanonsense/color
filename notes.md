# Notes
## Perception
Human eyes have three types of cones that detect different wavelengths of color:
* "Small" cones detect ~425 nm to ~475 nm wavelengths (violet to blue)
* "Middle" cones detect ~475 nm to ~600 nm wavelengths (cyan to yellow)
* "Large" cones detect ~500 nm to ~650 nm wavelengths (green to red)

Human eyes also have rod cells that play little role in the perception of color but are primarily reponsible for vision in low-light environments.

### Luminance and Chromaticity
An intuitive way of thinking about color is to distinguish between luminance and chromaticity.

Luminance can be thought of as the brightness or intensity of a color, or as the total level of stimulation of cones in the eye.

Chromaticity is the quality of a color independent of its luminance. Where luminance can be measured along a single dimension, chromaticity can be thought of as a combination of two dimensions: hue and saturation. Hue being a quality of color that most are familiar with (red, blue, yellow), and saturation being how much that color deviates from white at the given luminance.

### Gamma Correction
Human eyes perceive luminance non-linearly, and more easily detect changes in luminance at low luminance levels than at high ones. Gamma corrected color spaces are those that allow for easy manipulation of perceived luminance rather than actual luminance.

### Abney Effect
Human eyes perceive a shift in hue when white light is added to a colored light. Some color spaces may correct for this effect.

## Color Space
A color space is a means of quantifying and describing colors objectively. There are many reasons and purposes for constructing a color space.

For color spaces intended for human manipulation, it would be ideal to allow for colors to be expressed in terms that humans find most intuitive:
* Hue: how red vs yellow vs... the color is
* Saturation: how colorful the color is
* Luminance: how bright the color is

Additionally, it would be ideal for a color space to be perceptually uniform, meaning the distance between two colors in the color space is proportional to the perceived difference between those colors.

Because human eyes have three types of cones responsible for colors, color spaces that attempt to map most or all perceivable colors will also have three dimensions. (A monochrome color space would be an example of a single dimension color space, in that it just measures luminance with chromaticity held constant. A chromaticity space would be the opposite: a two dimensional color space with luminance held constant.)

### LMS
The color space that most directly models human perception. The values **L**, **M**, and **S** are directly proportional to the level of stimulation of the Large, Middle, and Small cones in the eye, respectively. These are referred to as **tristimulus values**.

Note that not all combinations of L, M, and S are physically possible. For example, there's no way to stimulate M cones that wouldn't also stimulate L or S cones. Therefore, the point at { 0, 1, 0 } is unreproducible in the physical world.

Because the LMS color space is measuring the eye's *reaction* to light, there is no perceived color that exists outside the LMS color space. For the same reason, two different profiles of light combinations could theoretically produce the same reaction in the eye, and thus they would both be described as the same point in the LMS color space.

### CIE RGB
Researchers leveraged the fact that the human eye can react identically to two different profiles of colored light by asking test subjects to combine red, green, and blue light to reproduce a test color. In cases where it was impossible to reproduce the test color by combining red, green, and blue light (which occurred with certain teals and greens), the test subject was allowed to add red, green, or blue light to the test color, which was recorded as a negative amount of light.

### CIE XYZ
Bescause negative light is impossible to reproduce and therefore an undesirable property for a color space, CIE RGB was transformed to represent combinations of three *imaginary* colors that are physically impossible but allowed all perceivable colors to be represented using non-negative values. The CIE XYZ color space was made from these results with other desirable transformation, such as transforming the color space so that the Y dimension would represent luminance.

Because it can represent all perceivable colors, this color space is used as a basis for almost all other color spaces.

### Device-Dependent Color Spaces
Most digital devices combine red, green, and blue light to produce colors. The gamut of the device (the possible chromaticities producible with those specific red, green, and blue lights) is the triangle produced by those three colors on the CIE XYZ chromaticity diagram

### sRGB

The sRGB color space transforms the CIE XYZ color space to account for perceived luminance.


## References
* http://www2.lawrence.edu/fast/GREGGJ/CMSC420/chapter19/color_theory.pdf
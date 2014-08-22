# jquery-image-quickview

Makes links to images create a simple lightbox instead of navigating the browser

## Installation

1. Include jquery_image_quickview.js and jquery_image_quickview.css on your page.
2. Create some links to images on the page like this:

```html
<a href="my_image_large.jpg">
	<img src="my_image_small.jpg" />
</a>
```

When clicked, the large version of the image will open in a lightbox. 

## Behavior

**Close Lightbox**
- Click on the image
- Click on the gray area
- Press the escape key

**Open Lightbox**
- Triggered when a link is clicked which points to an image file on any server

**Bypass Lightbox**
- Hold down a modifier key like ctrl to open the image in a new tab, instead of a lightbox

# Envato 3D Images & 360-Degree Views

**Created:** Monday, November 10, 2025 at 08:28:32 EDT
**Last Updated:** Monday, November 10, 2025 at 08:28:32 EDT

> **Make your tools look AMAZING!** Use professional 3D images from Envato Elements to show your resources in photorealistic mockups, just like professional product photos.

## What is This?

Instead of boring regular photos, you can use **3D-rendered images** that look like they came from a professional product catalog. You can even make them **spin around** so people can see them from all angles!

## Step-by-Step Guide (Super Simple!)

### Step 1: Get Your 3D Image

1. Go to [Envato Elements](https://elements.envato.com)
2. Search for your tool (like "drill" or "saw")
3. Find a 3D image you like
4. Download it
5. Upload it to your website or image hosting

**Example:** If you have a drill, search "cordless drill 3d" and download a cool 3D image.

### Step 2: Add the Image to Your Resource

Open your resource JSON file (like `drill-cordless.json`) and add this:

```json
{
  "title": "Cordless Drill",
  "type": "tool",
  "image": {
    "url": "https://your-website.com/images/drill-3d.jpg",
    "is3D": true
  }
}
```

**That's it!** The `is3D: true` tells the system "Hey, this is a 3D image, make it look cool!"

### Step 3: Watch the Magic Happen! ✨

When you view your resource card, the system will:
- ✅ Put your image in a photorealistic mockup (like a toolbox or workspace)
- ✅ Add cool 3D effects (depth, shadows, lighting)
- ✅ Make it look professional

## Making It Spin (360-Degree View)

Want people to be able to **spin your tool around** to see all sides? Here's how:

### Step 1: Get Multiple Images

Take or download **8-12 pictures** of your tool from different angles:
- Front
- Front-Right
- Right
- Back-Right
- Back
- Back-Left
- Left
- Front-Left

**Tip:** The more images you have, the smoother the spin will look!

### Step 2: Upload All Images

Upload all your images to your website or image hosting. Make sure you have the URLs for each one.

### Step 3: Add to Your Resource

Add this to your resource JSON file:

```json
{
  "title": "Cordless Drill",
  "type": "tool",
  "image": {
    "url": "https://your-website.com/images/drill-front.jpg",
    "is3D": true,
    "view360": {
      "enabled": true,
      "images": [
        "https://your-website.com/images/drill-front.jpg",
        "https://your-website.com/images/drill-front-right.jpg",
        "https://your-website.com/images/drill-right.jpg",
        "https://your-website.com/images/drill-back-right.jpg",
        "https://your-website.com/images/drill-back.jpg",
        "https://your-website.com/images/drill-back-left.jpg",
        "https://your-website.com/images/drill-left.jpg",
        "https://your-website.com/images/drill-front-left.jpg"
      ],
      "autoplay": true
    }
  }
}
```

### Step 4: How People Use It

When someone views your resource:
- **Click the arrows** (← →) to spin it manually
- **Drag with mouse** to spin it around
- **Click play** (▶) to make it auto-spin
- **Click pause** (⏸) to stop auto-spin

## Complete Example

Here's a complete example for a drill:

```json
{
  "id": "drill-cordless",
  "title": "Cordless Drill Driver",
  "type": "tool",
  "category": "power-tool",
  "purpose": "Drilling holes and driving screws",
  "image": {
    "url": "https://your-website.com/images/drill-3d-main.jpg",
    "is3D": true,
    "envatoId": "12345",
    "envatoUrl": "https://elements.envato.com/item/cordless-drill-3d/12345",
    "view360": {
      "enabled": true,
      "images": [
        "https://your-website.com/images/drill-001.jpg",
        "https://your-website.com/images/drill-002.jpg",
        "https://your-website.com/images/drill-003.jpg",
        "https://your-website.com/images/drill-004.jpg",
        "https://your-website.com/images/drill-005.jpg",
        "https://your-website.com/images/drill-006.jpg",
        "https://your-website.com/images/drill-007.jpg",
        "https://your-website.com/images/drill-008.jpg"
      ],
      "autoplay": false
    },
    "mockup": {
      "enabled": true,
      "type": "toolbox",
      "showBadge": true,
      "showLabel": true,
      "animated": true
    }
  }
}
```

## What Each Part Does

### Basic 3D Image

```json
"image": {
  "url": "https://...",  ← Where your image is stored
  "is3D": true           ← Tells system "this is 3D!"
}
```

### 360-Degree View

```json
"view360": {
  "enabled": true,       ← Turn on spinning
  "images": [...],       ← List of all angle images
  "autoplay": true       ← Auto-spin on/off
}
```

### Mockup Settings

```json
"mockup": {
  "enabled": true,       ← Show in cool mockup
  "type": "toolbox",     ← Which mockup style
  "showBadge": true,     ← Show category badge
  "showLabel": true,     ← Show title label
  "animated": true       ← Add animation
}
```

## Quick Reference

### Just Want a Simple 3D Image?

```json
{
  "image": {
    "url": "https://your-image.jpg",
    "is3D": true
  }
}
```

### Want It to Spin?

```json
{
  "image": {
    "url": "https://your-image.jpg",
    "is3D": true,
    "view360": {
      "enabled": true,
      "images": ["url1", "url2", "url3", ...],
      "autoplay": true
    }
  }
}
```

## Where to Get Images

1. **Envato Elements** - Best quality, requires subscription
   - Go to: https://elements.envato.com
   - Search: "tool name 3d"
   - Download: High-quality 3D renders

2. **Free Alternatives**
   - Take photos yourself from multiple angles
   - Use free 3D model sites
   - Use product photos from manufacturer websites

## Troubleshooting

### Image Not Showing?

- ✅ Check the URL is correct (copy/paste it in browser)
- ✅ Make sure image is uploaded and accessible
- ✅ Check for typos in the JSON file

### 360 View Not Working?

- ✅ Make sure you have at least 4 images
- ✅ Check all image URLs work
- ✅ Make sure `"enabled": true` is set

### Mockup Not Showing?

- ✅ Make sure `"is3D": true` is set
- ✅ Check `"mockup.enabled": true`
- ✅ Verify image URL is correct

## Tips & Tricks

1. **More Images = Smoother Spin**
   - 8 images = Good
   - 12 images = Great
   - 16+ images = Perfect!

2. **Name Your Images Clearly**
   - `drill-front.jpg`
   - `drill-right.jpg`
   - `drill-back.jpg`
   - Makes it easier to organize!

3. **Use Consistent Angles**
   - Take photos at same distance
   - Keep lighting the same
   - Makes it look professional

4. **Test Before Publishing**
   - Check all images load
   - Test the 360 spin
   - Make sure it looks good!

## Examples by Resource Type

### Tool (Drill, Saw, etc.)
```json
{
  "type": "tool",
  "image": {
    "url": "https://...",
    "is3D": true,
    "mockup": { "type": "toolbox" }
  }
}
```

### Person/Contact
```json
{
  "type": "person",
  "image": {
    "url": "https://...",
    "is3D": true,
    "mockup": { "type": "idcard" }
  }
}
```

### Equipment
```json
{
  "type": "equipment",
  "image": {
    "url": "https://...",
    "is3D": true,
    "mockup": { "type": "device" }
  }
}
```

## That's It!

You now know how to make your resources look amazing with 3D images! 🎉

**Remember:**
- Get a 3D image
- Add `"is3D": true`
- Optionally add `view360` for spinning
- Watch the magic happen!

Need help? Check the examples above or ask for assistance!

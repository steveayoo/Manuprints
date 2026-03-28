const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "manuprints",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit", quality: "auto" }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET all products — public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single product — public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add product — admin only
router.post("/", auth, upload.array("images", 3), async (req, res) => {
  try {
    const imageURLs = req.files ? req.files.map((f) => f.path) : [];
    const { name, category, price, delivery, description, fabric, sizes, featured } = req.body;

    const product = new Product({
      name,
      category,
      price: parseFloat(price),
      delivery: parseFloat(delivery) || 0,
      description,
      fabric,
      sizes: sizes ? JSON.parse(sizes) : [],
      images: imageURLs,
      featured: featured === "true",
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update product — admin only
router.put("/:id", auth, upload.array("images", 3), async (req, res) => {
  try {
    const { name, category, price, delivery, description, fabric, sizes, featured, existingImages } = req.body;
    const newImageURLs = req.files ? req.files.map((f) => f.path) : [];
    const existing = existingImages ? JSON.parse(existingImages) : [];
    const allImages = [...existing, ...newImageURLs];

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name, category,
        price: parseFloat(price),
        delivery: parseFloat(delivery) || 0,
        description, fabric,
        sizes: sizes ? JSON.parse(sizes) : [],
        images: allImages,
        featured: featured === "true",
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE product — admin only
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from Cloudinary
    for (const imageUrl of product.images) {
      const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
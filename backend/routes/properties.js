import express from 'express';
import multer from 'multer';
import path from 'path';
import Property from '../models/Property.js';

const router = express.Router();

// --- MULTER CONFIGURATION (No changes) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- ROUTES ---

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server error while fetching properties.' });
  }
});

// POST a new property
router.post('/', upload.array('images', 10), async (req, res) => {
    // ... (Your existing POST logic remains here, no changes needed)
    try {
        const { title, description, propertyType, price, units, bedrooms, bathrooms, furnishing, possession, builtYear, locality, city, lat, lng, amenities, videoUrls, submittedBy } = req.body;
        const rawImagePaths = req.files.map(file => file.path);
        const images = rawImagePaths.map(p => p.replace(/\\/g, '/'));
        const parsedAmenities = amenities ? JSON.parse(amenities) : [];
        const parsedVideoUrls = videoUrls ? JSON.parse(videoUrls) : [];
        const newPropertyData = {
            title, description, propertyType, price,
            area: parseInt(units, 10),
            bedrooms: bedrooms ? parseInt(bedrooms, 10) : 0,
            bathrooms: bathrooms ? parseInt(bathrooms, 10) : 0,
            furnishing, possession,
            builtYear: builtYear ? parseInt(builtYear, 10) : null,
            locality, city,
            location: `${locality}, ${city}`,
            locationCoords: { lat: lat ? parseFloat(lat) : null, lng: lng ? parseFloat(lng) : null },
            amenities: parsedAmenities,
            videoUrls: parsedVideoUrls,
            images: images,
            submittedBy,
            agent: "60d0fe4f5311236168a109ca" // Remember to replace this placeholder
        };
        const property = new Property(newPropertyData);
        await property.save();
        res.status(201).json({ message: "Property created successfully!", property });
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: 'Server error while creating property.' });
    }
});

// ✅ NEW ROUTE: GET a single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching single property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
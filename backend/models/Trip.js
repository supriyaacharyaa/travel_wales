import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,

    country: {
      type: String,
      enum: ["Nepal", "Bhutan", "Tibet"],
      required: true,
    },

    heroImage: {
      url: String,
      public_id: String,
    },

    galleryImages: [
      {
        url: String,
        public_id: String,
      },
    ],

    overview: String,

    // NEW FIELDS YOU NEED
    difficulty: String,
    activity: String,
    maxAltitude: String,
    bestSeason: String,
    startPoint: String,
    endPoint: String,
    meals: String,
    accommodation: String,

    duration: Number,
    price: Number,
    oldPrice: Number,

    // PACKING LIST (VERY IMPORTANT ADDITION)
    packingList: {
      general: [String],
      upperBody: [String],
      torso: [String],
      lowerBody: [String],
      hands: [String],
      feet: [String],
    },

    highlights: [String],
    includes: [String],
    excludes: [String],

    packages: [
      {
        name: String,
        price: Number,
        oldPrice: Number,
        description: String,

        groupPricing: [
          {
            people: String,
            price: Number,
          },
        ],
      },
    ],

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        altitude: String,
        meals: String,
        accommodation: String,
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

const initialProducts = [
    {
        name: "Premium Kashmiri Almonds",
        price: 699,
        description: "Handpicked from the valleys of Kashmir, our premium almonds are rich in protein, healthy fats, and essential vitamins. Perfect for health enthusiasts and luxury gifting.",
        type: "Almonds",
        stock: 100,
        features: ["Rich in Protein", "Natural & Unprocessed", "No Preservatives", "Premium Grade"],
        variants: [
            { name: "Raw Natural", hex: "#D4A76A", image: "/nuts-collection.png" },
            { name: "Roasted Salted", hex: "#8B6914", image: "/nuts-collection.png" },
            { name: "Honey Glazed", hex: "#C8860A", image: "/nuts-collection.png" }
        ]
    },
    {
        name: "Royal Cashew W240",
        price: 899,
        description: "Whole, plump W240-grade cashews sourced from the finest farms. Buttery smooth, naturally sweet, and incredibly fresh \u2013 a true indulgence for nut lovers.",
        type: "Cashews",
        stock: 80,
        features: ["W240 Grade", "Whole Kernels", "Naturally Sweet", "Freshly Packed"],
        variants: [
            { name: "Natural Raw", hex: "#F5E6CA", image: "/nuts-collection.png" },
            { name: "Lightly Salted", hex: "#E8D5A3", image: "/nuts-collection.png" }
        ]
    },
    {
        name: "Mixed Dry Fruit Box",
        price: 799,
        description: "A curated blend of premium raisins, figs, dates, apricots, and berries. Each piece is selected for maximum flavour and nutritional value. Ideal for gifting.",
        type: "Dry Fruits",
        stock: 120,
        features: ["7 Varieties", "Naturally Dried", "No Added Sugar", "Gift-Ready Pack"],
        variants: [
            { name: "Classic Mix", hex: "#8B2500", image: "/nuts-collection.png" }
        ]
    }
];

export async function GET(req) {
    try {
        await dbConnect();
        await Product.deleteMany({});
        const products = await Product.insertMany(initialProducts);
        return NextResponse.json({ success: true, count: products.length }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

const { SquareClient, SquareEnvironment } = require("square");

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

function convertBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value,
    ),
  );
}

export async function GET() {
  try {
    const response = await client.catalog.list({
      types: ["CATEGORY"],
    });

    const raw = convertBigInt(response);
    const categories = (raw.data || []).map((cat) => ({
      id: cat.id,
      name: cat.categoryData?.name || "Unknown",
    }));

    return Response.json({ categories });
  } catch (error) {
    console.error("Square categories error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

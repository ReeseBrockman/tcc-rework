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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const response = await client.catalog.list({
      types: ["ITEM"],
    });

    const raw = convertBigInt(response);
    let items = raw.data || [];

    if (category) {
      items = items.filter((item) =>
        item.itemData?.categories?.some((cat) =>
          cat.name?.toLowerCase().includes(category.toLowerCase()),
        ),
      );
    }

    return Response.json({ items });
  } catch (error) {
    console.error("Square API error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

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
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return Response.json({ error: "No imageId provided" }, { status: 400 });
    }

    const response = await client.catalog.object.get({
      objectId: imageId,
    });

    const raw = convertBigInt(response);
    const imageUrl = raw.object?.imageData?.url || null;

    return Response.json({ imageUrl });
  } catch (error) {
    console.error("Square image error:", error);
    return Response.json(
      { error: error.message || "Failed to fetch image" },
      { status: 500 },
    );
  }
}
